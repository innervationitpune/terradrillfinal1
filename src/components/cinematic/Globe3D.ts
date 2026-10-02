import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// ── Helper ────────────────────────────────────────────────────────────────────

export function latLngToVector3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
  );
}

// ── Trayana Network: ONLY 5 locations (India hub + 4 international) ───────────

const TRAYANA_LOCATIONS = [
  { name: 'INDIA',       lat: 20.5937, lng:  78.9629, hub: true  },
  { name: 'DUBAI',       lat: 25.2048, lng:  55.2708, hub: false },
  { name: 'FRANCE',      lat: 50.9513, lng:   1.8587, hub: false },
  { name: 'KUALA LUMPUR',lat:  3.1390, lng: 101.6869, hub: false },
  { name: 'SINGAPORE',   lat:  1.3521, lng: 103.8198, hub: false },
] as const;

const ORANGE = 0xff5500;

// Rim glow shared by the outer halo and the inner shell: orange on top, blue below.
const GLOW_VERT = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv     = modelViewMatrix * vec4(position, 1.0);
    vNormal     = normalize(normalMatrix * normal);
    vView       = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const GLOW_COLOR = /* glsl */`
  vec3 glowColor(float y) {
    return mix(vec3(0.05, 0.30, 1.0), vec3(1.0, 0.42, 0.08), smoothstep(-0.4, 0.5, y));
  }
`;

// ── Globe3D ───────────────────────────────────────────────────────────────────

export class Globe3D {

  public  group:          THREE.Group;
  public  baseSphere:     THREE.Mesh;
  public  arcsGroup:      THREE.Group;
  public  nodesGroup:     THREE.Group;
  public  landParticles:  THREE.Points | null = null;
  public  manualRotationY = 0;
  public  manualRotationX = 0;  // vertical drag

  private radius:         number;
  private animTime        = 0;
  private autoRotTime     = 0;
  private loadTime        = 0;
  private isDragging      = false;
  private lastDragTime    = 0;
  private prevMouseX      = 0;
  private prevMouseY      = 0;
  private velocityX       = 0;
  private velocityY       = 0;
  private disposed        = false;
  private interactive     = true;
  private dotSize         = 0.02;
  private el:             HTMLElement | null = null;
  // Globe outline on screen (NDC centre + radius in NDC-y units), for drag hit-testing
  private screen          = { x: 0, y: 0, r: 0, aspect: 1 };

  private arcTime = { value: 0 };
  private pins: { normal: THREE.Vector3; ring: THREE.Mesh; label: HTMLElement; phase: number }[] = [];

  private boundDown: (e: PointerEvent) => void;
  private boundMove: (e: PointerEvent) => void;
  private boundUp:   ()  => void;

  // ── Constructor ─────────────────────────────────────────────────────────────

  constructor(radius = 4.2) {
    this.radius = radius;

    this.group      = new THREE.Group();
    this.arcsGroup  = new THREE.Group();
    this.nodesGroup = new THREE.Group();

    // ① Pitch-black base sphere (also hides the far-side dots via depth)
    this.baseSphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    this.group.add(this.baseSphere);

    // ② Evenly spaced land dots
    this.buildContinentParticles();

    // ③ Rim glow — orange on top, blue at the bottom
    this.buildAtmosphere();

    // ④ Network nodes, labels, arcs
    this.buildNetworkLayer();
    this.group.add(this.arcsGroup);
    this.group.add(this.nodesGroup);

    // ⑤ Orient Earth so INDIA faces camera.
    // With latLngToVector3: 90°W (Americas) = +z (camera-facing at rot=0).
    // India (79°E) is at -z (hidden). Adding π flips India to +z = visible.
    this.group.rotation.y =  Math.PI - 0.4;
    this.group.rotation.x =  0.10;

    // Bind pointer handlers
    this.boundDown = this.onDown.bind(this);
    this.boundMove = this.onMove.bind(this);
    this.boundUp   = this.onUp.bind(this);
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  public initInteraction(el: HTMLElement) {
    this.el           = el;
    this.loadTime     = performance.now();
    this.lastDragTime = performance.now();
    // The canvas is pointer-events-none (text sits above it), so listen on window
    // and hit-test against the globe outline in onDown.
    window.addEventListener('pointerdown', this.boundDown);
    window.addEventListener('pointermove', this.boundMove);
    window.addEventListener('pointerup',   this.boundUp);
  }

  public dispose() {
    this.disposed = true;
    window.removeEventListener('pointerdown', this.boundDown);
    window.removeEventListener('pointermove', this.boundMove);
    window.removeEventListener('pointerup',   this.boundUp);
    this.pins.forEach(p => p.label.remove());
  }

  /** @param interactive false once the hero phase is over (no dragging, labels hidden) */
  public update(delta: number, camera: THREE.PerspectiveCamera, interactive: boolean) {
    const now = performance.now();
    this.animTime += delta;
    this.arcTime.value = this.animTime;
    this.interactive = interactive;
    if (!interactive) this.isDragging = false;

    // Inertia decay after drag release
    if (!this.isDragging) {
      if (Math.abs(this.velocityX) > 0.00005) {
        this.velocityX       *= 0.92;
        this.manualRotationX += this.velocityX;
        // Clamp X rotation so globe doesn't flip upside down
        this.manualRotationX  = Math.max(-0.8, Math.min(0.8, this.manualRotationX));
      }
      if (Math.abs(this.velocityY) > 0.00005) {
        this.velocityY       *= 0.92;
        this.manualRotationY += this.velocityY;
      }
    }

    // Auto-rotation: hold 2.5 s on load, pause 1.5 s after drag
    const sinceLoad = now - this.loadTime;
    const sinceDrag = now - this.lastDragTime;
    if (!this.isDragging && sinceLoad > 2500 && sinceDrag > 1500) {
      this.autoRotTime += delta;
    }

    // Bounded gentle oscillation — India/network stays in view
    const base  = Math.PI - 0.4;
    const swing = Math.sin(this.autoRotTime * 0.16) * 0.22;
    this.group.rotation.y = base + swing + this.manualRotationY;
    this.group.rotation.x = 0.10 + this.manualRotationX;
    this.group.rotation.z = -0.03;
    this.group.updateMatrixWorld(true);

    const scale = this.group.scale.x;
    // PointsMaterial size is in world units and ignores the group scale
    if (this.landParticles) (this.landParticles.material as THREE.PointsMaterial).size = this.dotSize * scale;

    // Pins: pulse ring + label visible only on the camera-facing side
    const center = new THREE.Vector3().setFromMatrixPosition(this.group.matrixWorld);
    const q = this.group.getWorldQuaternion(new THREE.Quaternion());
    const n = new THREE.Vector3();
    const toCam = new THREE.Vector3();
    this.pins.forEach(pin => {
      const pulse = (this.animTime * 0.6 + pin.phase) % 1;
      pin.ring.scale.setScalar(1 + pulse * 2.2);
      (pin.ring.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - pulse);

      n.copy(pin.normal).applyQuaternion(q);
      toCam.copy(n).multiplyScalar(this.radius * scale).add(center).sub(camera.position).negate().normalize();
      const facing = interactive && n.dot(toCam) > 0.05;
      pin.label.style.opacity = facing ? '1' : '0';
      pin.label.style.filter  = facing ? 'none' : 'blur(4px)';
    });

    // Screen-space outline for drag hit-testing
    const c = center.clone().project(camera);
    const edge = center.clone()
      .add(new THREE.Vector3(0, this.radius * scale, 0).applyQuaternion(camera.quaternion))
      .project(camera);
    this.screen = { x: c.x, y: c.y, r: Math.abs(edge.y - c.y), aspect: camera.aspect };
  }

  // ── Private builders ────────────────────────────────────────────────────────

  private async buildContinentParticles() {
    let polygons: number[][][][];
    try {
      const res = await fetch('/data/land-110m.geo.json');
      polygons = (await res.json()).coordinates;
    } catch {
      return; // globe still renders (glow, pins, arcs) without continents
    }
    if (this.disposed) return;

    // Rasterise land polygons to an equirectangular mask, then sample it
    const W = 2048, H = 1024;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const ctx = cvs.getContext('2d', { willReadFrequently: true })!;
    ctx.fillStyle = '#fff';
    polygons.forEach(rings => {
      ctx.beginPath();
      rings.forEach(ring => {
        // Rings that cross the antimeridian (Eurasia, Fiji) would otherwise smear
        // across the whole map: unwrap the longitudes and draw a copy on each side.
        let off = 0, prev = ring[0][0], wrapped = false;
        const pts = ring.map(([lng, lat]) => {
          if (lng + off - prev > 180) { off -= 360; wrapped = true; }
          else if (lng + off - prev < -180) { off += 360; wrapped = true; }
          prev = lng + off;
          return [prev, lat];
        });
        const X = (lng: number) => ((lng + 180) / 360) * W;
        const Y = (lat: number) => ((90 - lat) / 180) * H;
        if (off !== 0) {
          // Ring winds once around a pole (Antarctica): one strip closed along the pole edge
          const poleY = pts[0][1] < 0 ? H : 0;
          [-off, 0, off].forEach((shift, s) => pts.forEach(([lng, lat], i) => {
            if (s === 0 && i === 0) ctx.moveTo(X(lng + shift), Y(lat)); else ctx.lineTo(X(lng + shift), Y(lat));
          }));
          ctx.lineTo(X(pts[pts.length - 1][0] + off), poleY);
          ctx.lineTo(X(pts[0][0] - off), poleY);
          ctx.closePath();
        } else {
          for (const shift of wrapped ? [-360, 0, 360] : [0]) {
            pts.forEach(([lng, lat], i) => {
              if (i === 0) ctx.moveTo(X(lng + shift), Y(lat)); else ctx.lineTo(X(lng + shift), Y(lat));
            });
            ctx.closePath();
          }
        }
      });
      ctx.fill('evenodd');
    });
    const { data } = ctx.getImageData(0, 0, W, H);

    // Even spacing: longitude step widens with latitude, odd rows offset half a step
    const latStep = window.innerWidth < 768 ? 1.4 : 1.0;
    const positions: number[] = [];
    let row = 0;
    for (let lat = -90 + latStep / 2; lat < 90; lat += latStep, row++) {
      const lngStep = latStep / Math.max(0.15, Math.cos(lat * Math.PI / 180));
      const count = Math.round(360 / lngStep);
      for (let j = 0; j < count; j++) {
        const lng = -180 + ((j + (row % 2 ? 0.5 : 0)) * 360) / count;
        const px  = Math.min(W - 1, Math.floor(((lng + 180) / 360) * W));
        const py  = Math.min(H - 1, Math.floor(((90 - lat)  / 180) * H));
        if (data[(py * W + px) * 4] > 127) {
          const v = latLngToVector3(lat, lng, this.radius * 1.002);
          positions.push(v.x, v.y, v.z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const spacing = this.radius * latStep * Math.PI / 180;
    this.dotSize = spacing * 0.55;
    const mat = new THREE.PointsMaterial({
      size: this.dotSize,
      map:  new THREE.CanvasTexture(this.makeDotTexture()),
      color: 0xffffff, transparent: true, depthWrite: false,
      sizeAttenuation: true,
    });

    this.landParticles = new THREE.Points(geo, mat);
    this.group.add(this.landParticles);
  }

  private makeDotTexture(): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    // Solid disc with a thin feathered edge — crisp, no square aliasing
    const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grd.addColorStop(0,    'rgba(255,255,255,1)');
    grd.addColorStop(0.8,  'rgba(255,255,255,1)');
    grd.addColorStop(1,    'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    return c;
  }

  private buildAtmosphere() {
    // Outer halo: back faces of a larger shell, brightest at the globe's limb,
    // fading to nothing at the shell's own silhouette.
    const HALO = 1.15;
    const k = Math.sqrt(1 - 1 / (HALO * HALO));
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius * HALO, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT,
        fragmentShader: /* glsl */`
          varying vec3 vNormal;
          varying vec3 vView;
          ${GLOW_COLOR}
          void main() {
            float g = pow(clamp(-dot(vNormal, vView) / ${k.toFixed(4)}, 0.0, 1.0), 2.5);
            gl_FragColor = vec4(glowColor(vNormal.y) * g * 1.4, g);
          }
        `,
        blending: THREE.AdditiveBlending, side: THREE.BackSide,
        transparent: true, depthWrite: false,
      }),
    );
    this.group.add(halo);

    // Inner shell: fresnel on the disc edge — broad blue at the bottom, thin orange on top
    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius * 1.004, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: GLOW_VERT,
        fragmentShader: /* glsl */`
          varying vec3 vNormal;
          varying vec3 vView;
          ${GLOW_COLOR}
          void main() {
            float top = smoothstep(-0.4, 0.5, vNormal.y);
            float f = pow(1.0 - max(dot(vNormal, vView), 0.0), mix(2.0, 4.0, top));
            gl_FragColor = vec4(glowColor(vNormal.y) * f * 1.2, f);
          }
        `,
        blending: THREE.AdditiveBlending,
        transparent: true, depthWrite: false,
      }),
    );
    inner.renderOrder = 2;
    this.group.add(inner);
  }

  private buildNetworkLayer() {
    const R = this.radius;
    const indiaData = TRAYANA_LOCATIONS.find(l => l.name === 'INDIA')!;
    const indiaVec  = latLngToVector3(indiaData.lat, indiaData.lng, R);

    TRAYANA_LOCATIONS.forEach((loc, idx) => {
      const pos = latLngToVector3(loc.lat, loc.lng, R * 1.004);

      // ── Pin dot + pulse ring ───────────────────────────────────────────
      const r   = R * (loc.hub ? 0.008 : 0.0055);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 16),
        new THREE.MeshBasicMaterial({ color: ORANGE }),
      );
      dot.position.copy(pos);
      this.nodesGroup.add(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r * 1.3, r * 1.6, 48),
        new THREE.MeshBasicMaterial({ color: ORANGE, side: THREE.DoubleSide, transparent: true, depthWrite: false }),
      );
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      this.nodesGroup.add(ring);

      // ── Label chip (HTML, stays sharp at any zoom) ─────────────────────
      const el = document.createElement('div');
      el.textContent = loc.name;
      el.className =
        'px-2 py-1 bg-[#111] font-mono text-[10px] md:text-[11px] uppercase tracking-wider whitespace-nowrap ' +
        'transition-[opacity,filter] duration-300 ' + (loc.hub ? 'text-[#ff7733]' : 'text-white');
      const label = new CSS2DObject(el);
      // Just above the pin; Singapore goes below so it doesn't cover Kuala Lumpur
      label.center.set(0.5, loc.name === 'SINGAPORE' ? -0.6 : 1.6);
      dot.add(label);

      this.pins.push({ normal: pos.clone().normalize(), ring, label: el, phase: idx * 0.23 });

      // ── Connection arc: India → International ──────────────────────────
      if (!loc.hub) {
        const target = latLngToVector3(loc.lat, loc.lng, R);
        const alt = 0.02 + Math.min(0.2, (indiaVec.distanceTo(target) / R) * 0.08);
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 32; i++) {
          const t = i / 32;
          pts.push(
            indiaVec.clone().lerp(target, t).normalize()
              .multiplyScalar(R * (1.004 + 4 * alt * t * (1 - t))),
          );
        }

        // Faint full line + bright dash travelling India → destination
        const mat = new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, depthWrite: false });
        const offset = { value: idx * 1.618 };
        mat.onBeforeCompile = shader => {
          shader.uniforms.uTime   = this.arcTime;
          shader.uniforms.uOffset = offset;
          shader.vertexShader = 'varying float vProgress;\n' + shader.vertexShader
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvProgress = uv.x;');
          shader.fragmentShader = 'uniform float uTime;\nuniform float uOffset;\nvarying float vProgress;\n' + shader.fragmentShader
            .replace('#include <map_fragment>', /* glsl */`
              float pr = mod(uTime * 0.5 + uOffset, 2.5);
              float st = clamp(pr - 1.0, 0.0, 1.0);
              float en = clamp(pr, 0.0, 1.0);
              float dash = (vProgress < st || vProgress > en) ? 0.0 : smoothstep(st, en + 0.001, vProgress);
              diffuseColor.a *= 0.22 + 0.78 * dash;
            `);
        };
        this.arcsGroup.add(new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, R * 0.0016, 6, false),
          mat,
        ));
      }
    });
  }

  // ── Pointer interaction ──────────────────────────────────────────────────────

  private onDown(e: PointerEvent) {
    if (!this.interactive || !this.el) return;
    if ((e.target as Element | null)?.closest?.('a,button')) return;
    // Only start a drag when the pointer is on the globe itself
    const rect = this.el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    const dx = (nx - this.screen.x) * this.screen.aspect;
    const dy = ny - this.screen.y;
    if (dx * dx + dy * dy > this.screen.r * this.screen.r) return;

    this.isDragging = true;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
    this.velocityX  = 0;
    this.velocityY  = 0;
  }

  private onMove(e: PointerEvent) {
    if (!this.isDragging) return;
    const dx = e.clientX - this.prevMouseX;
    const dy = e.clientY - this.prevMouseY;
    this.velocityY       = dx * 0.0025;
    this.velocityX       = dy * 0.0025;
    this.manualRotationY += this.velocityY;
    this.manualRotationX += this.velocityX;
    // Clamp X so it doesn’t flip
    this.manualRotationX = Math.max(-0.8, Math.min(0.8, this.manualRotationX));
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  private onUp() {
    if (!this.isDragging) return;
    this.isDragging   = false;
    this.lastDragTime = performance.now();
  }
}
