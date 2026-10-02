'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Globe3D } from './Globe3D';
import { Underground3D, GROUND_Y } from './Underground3D';
import { T, range } from './timeline';

interface MasterCinematicCanvasProps {
  progressRef: React.RefObject<number>;
}

const GLOBE_RADIUS = 3.6;
const FOV = 40;
const GLOBE_CAM_Z = 8.5;

function makeSkyTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 2; c.height = 256;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#030814');
  g.addColorStop(0.55, '#0c2040');
  g.addColorStop(1, '#1b3f6e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 2, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function MasterCinematicCanvas({ progressRef }: MasterCinematicCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene: stars for the globe phase, dusk sky for the river crossing
    const scene = new THREE.Scene();
    const sky = makeSkyTexture();

    const starGeo = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let i = 0; i < 5000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 180 + Math.random() * 40;
      starPositions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, transparent: true, opacity: 0.85, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 1000);

    // 3. Renderers: WebGL + HTML label layer for the globe chips
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setClearColor(0x010205, 1); // Deep space black
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    Object.assign(labelRenderer.domElement.style, { position: 'absolute', inset: '0', pointerEvents: 'none' });
    container.appendChild(labelRenderer.domElement);

    // 4. Lighting (globe is unlit; these light the river crossing)
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(-8, 14, 20);
    scene.add(keyLight);

    // 5. Globe & underground scenes
    const globe = new Globe3D(GLOBE_RADIUS);
    globe.initInteraction(container);
    scene.add(globe.group);

    const underground = new Underground3D();
    scene.add(underground.group);

    // 6. Size everything from the container
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Globe as a full circle for any aspect: sized from the camera frustum.
    const layoutGlobe = (p: number) => {
      const halfH = GLOBE_CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const halfW = halfH * camera.aspect;
      let radius: number, x: number, y: number;
      if (camera.aspect < 1) {
        // Portrait: large globe low on the right, behind the text
        radius = 1.15 * halfW; x = 0.35 * halfW; y = -0.3 * halfH;
      } else {
        // Full circle clear of the nav (top) and metrics bar (bottom), just kissing the right edge.
        // Narrow landscape: bleed further right so it stays off the headline.
        radius = 0.7 * halfH; x = halfW - (camera.aspect < 1.5 ? 0.5 : 0.9) * radius; y = 0.06 * halfH;
      }
      const zoom = 1 + 0.3 * range(p, T.globeEnd, T.cut);
      globe.group.position.set(x, y, 0);
      globe.group.scale.setScalar((radius / GLOBE_RADIUS) * zoom);
    };

    // 7. Render loop
    let frameId = 0;
    let prevTime = performance.now();
    let time = 0;
    let wasUnderground = false;
    const focus = new THREE.Vector3();
    const wantPos = new THREE.Vector3();
    const wantLook = new THREE.Vector3();
    const look = new THREE.Vector3();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min(0.1, (now - prevTime) / 1000);
      prevTime = now;
      time += delta;

      const p = progressRef.current ?? 0;
      const isUnderground = p >= T.cut;

      globe.group.visible = !isUnderground;
      stars.visible = !isUnderground;
      scene.background = isUnderground ? sky : null;
      // Portrait: the globe sits behind the hero text, chips would only add clutter
      labelRenderer.domElement.style.opacity = p < T.globeEnd && camera.aspect >= 1 ? '1' : '0';

      underground.update(p, time);

      if (!isUnderground) {
        camera.position.set(0, 0, GLOBE_CAM_Z);
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();
        layoutGlobe(p);
        globe.update(delta, camera, p < T.globeEnd);
      } else {
        // Pull back on narrow screens so the same width of scene stays in frame
        const zScale = camera.aspect < 1 ? 1.6 : 1;
        if (p < T.boreStart) {
          // Establishing shot: the river, then push in on the rig on the left bank
          const e = THREE.MathUtils.smoothstep(range(p, T.cut, T.boreStart), 0, 1);
          wantPos.set(31, 11, 60 * zScale).lerp(focus.set(-15, GROUND_Y + 1.5, 24 * zScale), e);
          wantLook.set(31, 1, 0).lerp(focus.set(-14, GROUND_Y, 0), e);
        } else {
          // Track the drill head — same parameter as the pipe.
          // Framed high enough that the river bed above the bore stays in view.
          underground.focus(p, focus);
          // Railway phase: rise and pull back so the track above the bore is in frame
          const rail = range(p, T.microEnd, T.microEnd + 0.04);
          const lookY = Math.min(focus.y + 3 + rail * 2.5, GROUND_Y);
          wantPos.set(focus.x + 3, lookY + 1.5, (22 + rail * 6) * zScale);
          wantLook.set(focus.x + 4, lookY, 0);
        }
        // Snap on the cut (hidden by the veil), damp afterwards
        const k = wasUnderground ? 1 - Math.exp(-delta * 5) : 1;
        camera.position.lerp(wantPos, k);
        look.lerp(wantLook, k);
        camera.lookAt(look);
      }
      wasUnderground = isUnderground;

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      globe.dispose();
      scene.traverse(obj => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        mats.forEach(m => {
          (m as THREE.MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      });
      sky.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      labelRenderer.domElement.remove();
    };
  }, [progressRef]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
