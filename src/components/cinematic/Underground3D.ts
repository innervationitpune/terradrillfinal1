import * as THREE from 'three';
import { T, range } from './timeline';

// One coordinate system for the whole scene: a side-on cutaway.
//   x = along the bore, y = up, cut face at z = 0 (ground occupies z < 0).
export const GROUND_Y = 4;
const DEPTH = 15;                 // how far the ground extends behind the cut face
const X_MIN = -45, X_MAX = 165;
// River channel: banks slope from the surface down to the bed
const BANK_L = 2, BED_L = 6, BED_R = 56, BANK_R = 60, BED_Y = 1.5;
const WATER_Y = GROUND_Y - 0.4;

const BORE_R = 0.62;              // reamed bore radius = drill head radius
const PIPE_R = 0.48;
const TUBE_SEGMENTS = 800;
const TUBE_RADIAL = 16;

const RAIL_X = 90;                // railway on the right bank, crossed by the same bore
// One continuous bore; each story card covers one leg of it (x where the leg ends).
const RIVER_MID = (BED_L + BED_R) / 2, RAIL_APPROACH = RAIL_X - 20, RAIL_PASSED = RAIL_X + 18;
const CARD_P = [T.boreStart, T.boreEnd, T.microEnd, T.railEnd, 1];

export class Underground3D {
  public group: THREE.Group;
  public borePathCurve: THREE.CatmullRomCurve3;

  private drillHead = new THREE.Group();
  private spinner = new THREE.Group();
  private pipe: THREE.Mesh;
  private tunnel: THREE.Mesh;
  private waterSurface: THREE.Mesh;
  private cardT: number[];          // bore parameter at each CARD_P boundary

  constructor() {
    this.group = new THREE.Group();
    this.group.visible = false;

    this.borePathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-18, GROUND_Y, 0),  // entry on the left bank
      new THREE.Vector3(-10, 0.5, 0),
      new THREE.Vector3(-2, -4, 0),
      new THREE.Vector3(6, -6.5, 0),        // horizontal run under the river bed
      new THREE.Vector3(20, -6.5, 0),
      new THREE.Vector3(34, -6.5, 0),
      new THREE.Vector3(48, -6.5, 0),
      new THREE.Vector3(62, -6.5, 0),
      new THREE.Vector3(78, -6.5, 0),       // on under the railway
      new THREE.Vector3(95, -6.5, 0),
      new THREE.Vector3(112, -6.5, 0),
      new THREE.Vector3(120, -4, 0),
      new THREE.Vector3(128, 0.5, 0),
      new THREE.Vector3(136, GROUND_Y, 0),  // exit beyond the railway
    ]);
    this.cardT = [0, this.tAtX(RIVER_MID), this.tAtX(RAIL_APPROACH), this.tAtX(RAIL_PASSED), 1];

    this.createGround();
    this.waterSurface = this.createRiver();
    this.createRig();

    // Pipe and bore are built once along the whole path and revealed with drawRange,
    // so the pipe end and the drill head come from the same curve parameter.
    // Bore: tube squashed flat onto the cut face → dark band around the pipe.
    this.tunnel = new THREE.Mesh(
      new THREE.TubeGeometry(this.borePathCurve, TUBE_SEGMENTS, BORE_R, TUBE_RADIAL, false),
      new THREE.MeshBasicMaterial({ color: '#05070c' }),
    );
    this.tunnel.scale.z = 0.05;
    this.pipe = new THREE.Mesh(
      new THREE.TubeGeometry(this.borePathCurve, TUBE_SEGMENTS, PIPE_R, TUBE_RADIAL, false),
      new THREE.MeshStandardMaterial({ color: '#3b4a63', metalness: 0.7, roughness: 0.3, emissive: '#0f172a' }),
    );
    this.group.add(this.tunnel, this.pipe);

    this.createDrillHead();
    this.createRailway();
    this.setBoreProgress(0);
  }

  // ── Ground: contiguous bands, top band carries the river channel ────────────

  private createGround() {
    const width = X_MAX - X_MIN;
    const cx = (X_MIN + X_MAX) / 2;

    // Top soil with the river channel cut into it (one mesh, no seams)
    const profile = new THREE.Shape();
    profile.moveTo(X_MIN, 1);
    profile.lineTo(X_MIN, GROUND_Y);
    profile.lineTo(BANK_L, GROUND_Y);
    profile.lineTo(BED_L, BED_Y);
    profile.lineTo(BED_R, BED_Y);
    profile.lineTo(BANK_R, GROUND_Y);
    profile.lineTo(X_MAX, GROUND_Y);
    profile.lineTo(X_MAX, 1);
    profile.closePath();
    const soilGeo = new THREE.ExtrudeGeometry(profile, { depth: DEPTH, bevelEnabled: false });
    soilGeo.translate(0, 0, -DEPTH);
    this.group.add(new THREE.Mesh(soilGeo, new THREE.MeshStandardMaterial({ color: '#5a3a22', roughness: 0.95 })));

    // Lower strata: [top, bottom]
    const bands: [string, number, number][] = [
      ['#4a2c18', 1, -3],       // clay & gravel
      ['#3a2313', -3, -7.5],    // dense sandstone
      ['#2a1a10', -7.5, -12],   // hard rock
      ['#1a110b', -12, -18],    // deep bedrock
    ];
    bands.forEach(([color, top, bottom]) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, top - bottom, DEPTH),
        new THREE.MeshStandardMaterial({ color, roughness: 0.95 }),
      );
      mesh.position.set(cx, (top + bottom) / 2, -DEPTH / 2);
      this.group.add(mesh);
    });

    // Grass on both banks (also draws the ground line)
    const grassMat = new THREE.MeshStandardMaterial({ color: '#3d5a2c', roughness: 1 });
    [[X_MIN, BANK_L], [BANK_R, X_MAX]].forEach(([a, b]) => {
      const grass = new THREE.Mesh(new THREE.BoxGeometry(b - a, 0.12, DEPTH), grassMat);
      grass.position.set((a + b) / 2, GROUND_Y + 0.06, -DEPTH / 2);
      this.group.add(grass);
    });

    // Gravel specks on the cut face
    const pos: number[] = [];
    for (let i = 0; i < 2000; i++) {
      pos.push(X_MIN + Math.random() * width, -18 + Math.random() * 18.5, 0.02);
    }
    const speckGeo = new THREE.BufferGeometry();
    speckGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    this.group.add(new THREE.Points(
      speckGeo,
      new THREE.PointsMaterial({ size: 0.1, color: '#d97706', transparent: true, opacity: 0.3 }),
    ));
  }

  // ── River: bed, boulders, water volume and rippling surface ─────────────────

  private createRiver(): THREE.Mesh {
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(BED_R - BED_L, 0.14, DEPTH),
      new THREE.MeshStandardMaterial({ color: '#8a7a5c', roughness: 1 }),
    );
    bed.position.set((BED_L + BED_R) / 2, BED_Y + 0.07, -DEPTH / 2);
    this.group.add(bed);

    const rockMat = new THREE.MeshStandardMaterial({ color: '#6b6457', roughness: 0.9, flatShading: true });
    for (let i = 0; i < 24; i++) {
      const r = 0.18 + Math.random() * 0.28;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), rockMat);
      rock.position.set(BED_L + 1 + Math.random() * (BED_R - BED_L - 2), BED_Y + 0.1 + r * 0.5, -0.4 - Math.random() * 4);
      rock.rotation.set(Math.random() * 3, Math.random() * 3, 0);
      this.group.add(rock);
    }

    // Water volume: fills the channel, bed stays visible through it on the cut face
    const slope = (BED_L - BANK_L) / (GROUND_Y - BED_Y);
    const wl = BANK_L + (GROUND_Y - WATER_Y) * slope;
    const wr = BANK_R - (GROUND_Y - WATER_Y) * slope;
    const shape = new THREE.Shape();
    shape.moveTo(wl, WATER_Y - 0.1);
    shape.lineTo(BED_L, BED_Y);
    shape.lineTo(BED_R, BED_Y);
    shape.lineTo(wr, WATER_Y - 0.1);
    shape.closePath();
    const volGeo = new THREE.ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: false });
    volGeo.translate(0, 0, -DEPTH);
    const volume = new THREE.Mesh(volGeo, new THREE.MeshPhysicalMaterial({
      color: '#2a8ad8', emissive: '#0b3a66', transparent: true, opacity: 0.55, roughness: 0.15, depthWrite: false,
    }));
    volume.renderOrder = 1;
    this.group.add(volume);

    // Surface: subdivided plane, rippled in update()
    const surfGeo = new THREE.PlaneGeometry(wr - wl, DEPTH, 110, 24);
    surfGeo.rotateX(-Math.PI / 2);
    const surface = new THREE.Mesh(surfGeo, new THREE.MeshStandardMaterial({
      color: '#6cc0f5', emissive: '#12507f', transparent: true, opacity: 0.65, roughness: 0.2, metalness: 0.3, depthWrite: false,
    }));
    surface.position.set((wl + wr) / 2, WATER_Y, -DEPTH / 2);
    surface.renderOrder = 2;
    this.group.add(surface);
    return surface;
  }

  // ── HDD rig on the left bank, rack in line with the bore entry ──────────────

  private createRig() {
    const entry = this.borePathCurve.getPointAt(0);
    const dir = this.borePathCurve.getTangentAt(0).normalize();
    const align = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
    const orange = new THREE.MeshStandardMaterial({ color: '#ff5500', metalness: 0.5, roughness: 0.4 });
    const dark = new THREE.MeshStandardMaterial({ color: '#1f2937', metalness: 0.6, roughness: 0.5 });
    const steel = new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.85, roughness: 0.25 });
    const rig = new THREE.Group();

    // Rack + drill rod along the bore axis, ending at the entry point
    const RACK = 7.5;
    const rack = new THREE.Mesh(new THREE.BoxGeometry(RACK, 0.3, 0.7), orange);
    rack.quaternion.copy(align);
    rack.position.copy(entry).addScaledVector(dir, -(RACK / 2 + 0.6));
    rack.position.y -= 0.32;
    const rodGeo = new THREE.CylinderGeometry(0.16, 0.16, RACK + 0.6, 12);
    rodGeo.rotateZ(Math.PI / 2);
    const rod = new THREE.Mesh(rodGeo, steel);
    rod.quaternion.copy(align);
    rod.position.copy(entry).addScaledVector(dir, -(RACK + 0.6) / 2);
    // Carriage (rotary drive) at the top of the rack
    const carriage = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.9), dark);
    carriage.quaternion.copy(align);
    carriage.position.copy(entry).addScaledVector(dir, -(RACK - 0.2));
    rig.add(rack, rod, carriage);

    // Tracked base, engine housing and cab sit behind the cut face, beside the rack
    const baseX = entry.x - 5.2;
    const tracks = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.8, 2.2), dark);
    tracks.position.set(baseX, GROUND_Y + 0.52, -1.5);
    const body = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.1, 1.9), orange);
    body.position.set(baseX - 0.2, GROUND_Y + 1.47, -1.5);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1.5), dark);
    cab.position.set(baseX - 2.0, GROUND_Y + 2.67, -1.5);
    // Front anchor plate where the rod enters the ground
    const anchor = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 1.6), dark);
    anchor.position.set(entry.x - 0.9, GROUND_Y + 0.5, -0.4);
    rig.add(tracks, body, cab, anchor);

    // Exit pit on the right bank
    const exit = this.borePathCurve.getPointAt(1);
    const pit = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 2.5), new THREE.MeshStandardMaterial({ color: '#120b06' }));
    pit.position.set(exit.x, GROUND_Y - 0.1, -1.3);
    rig.add(pit);

    this.group.add(rig);
  }

  // ── Drill head: back face at the local origin, tip along +X ─────────────────

  private createDrillHead() {
    const cutterGeo = new THREE.ConeGeometry(BORE_R, 1.8, 16);
    cutterGeo.rotateZ(-Math.PI / 2);   // tip along +X
    cutterGeo.translate(0.9, 0, 0);    // base at x = 0
    this.spinner.add(new THREE.Mesh(cutterGeo, new THREE.MeshStandardMaterial({
      color: '#ff5500', metalness: 0.8, roughness: 0.2, emissive: '#331100',
    })));

    // Tungsten carbide teeth on the cone surface
    const toothMat = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.9, roughness: 0.1 });
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.3), toothMat);
      tooth.position.set(0.5, Math.cos(angle) * 0.46, Math.sin(angle) * 0.46);
      tooth.rotation.x = -angle;
      this.spinner.add(tooth);
    }
    this.drillHead.add(this.spinner);

    // Collar overlapping the pipe end — hides the (sub-segment) drawRange step
    const collarGeo = new THREE.CylinderGeometry(PIPE_R + 0.06, PIPE_R + 0.06, 0.5, 16);
    collarGeo.rotateZ(Math.PI / 2);
    collarGeo.translate(-0.25, 0, 0);
    this.drillHead.add(new THREE.Mesh(collarGeo, new THREE.MeshStandardMaterial({ color: '#1f2937', metalness: 0.8, roughness: 0.3 })));

    this.group.add(this.drillHead);
  }

  /** t = 0…1 along the bore. Head, pipe end and bore end all derive from it. */
  private setBoreProgress(t: number) {
    const tangent = this.borePathCurve.getTangentAt(t).normalize();
    this.drillHead.position.copy(this.borePathCurve.getPointAt(t));
    this.drillHead.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
    this.spinner.rotation.x = t * Math.PI * 80;

    const count = Math.floor(t * TUBE_SEGMENTS) * TUBE_RADIAL * 6;
    this.pipe.geometry.setDrawRange(0, count);
    this.tunnel.geometry.setDrawRange(0, count);
  }

  /** Bore parameter t where the path reaches x (x is monotonic along the bore). */
  private tAtX(x: number): number {
    let lo = 0, hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (this.borePathCurve.getPointAt(mid).x < x) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }

  /** Scroll progress → bore parameter: one leg of the bore per story card. */
  private boreT(p: number): number {
    for (let i = 0; i < 4; i++) {
      if (p <= CARD_P[i + 1]) {
        return THREE.MathUtils.lerp(this.cardT[i], this.cardT[i + 1], range(p, CARD_P[i], CARD_P[i + 1]));
      }
    }
    return 1;
  }

  // ── Railway on the right bank, above the bore line ──────────────────────────

  private createRailway() {
    // Railway running across the view (along z) above the bore
    const ballast = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 0.4, DEPTH),
      new THREE.MeshStandardMaterial({ color: '#475569', roughness: 0.9 }),
    );
    ballast.position.set(RAIL_X, GROUND_Y + 0.3, -DEPTH / 2);
    this.group.add(ballast);
    const tieMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1' });
    for (let z = -0.6; z > -DEPTH; z -= 1.5) {
      const tie = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.2, 0.35), tieMat);
      tie.position.set(RAIL_X, GROUND_Y + 0.6, z);
      this.group.add(tie);
    }
    const railMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.95, roughness: 0.1 });
    [-1, 1].forEach(side => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, DEPTH), railMat);
      rail.position.set(RAIL_X + side * 1.1, GROUND_Y + 0.8, -DEPTH / 2);
      this.group.add(rail);
    });
  }

  // ── Per-frame ───────────────────────────────────────────────────────────────

  /** Point the camera should track for scroll progress p. */
  public focus(p: number, out: THREE.Vector3): THREE.Vector3 {
    return this.borePathCurve.getPointAt(this.boreT(p), out);
  }

  public update(p: number, time: number) {
    this.group.visible = p >= T.cut;
    if (!this.group.visible) return;

    this.setBoreProgress(this.boreT(p));

    // Gentle ripples on the water surface
    const pos = this.waterSurface.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i);
      pos.setY(i, Math.sin(x * 0.9 + time * 1.4) * 0.035 + Math.sin(z * 1.3 + time * 0.9) * 0.025);
    }
    pos.needsUpdate = true;
    this.waterSurface.geometry.computeVertexNormals();
  }
}
