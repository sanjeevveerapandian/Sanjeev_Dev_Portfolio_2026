"use client";
import { useEffect, useRef } from "react";
import type {
  Mesh,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from "three";

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let animId = 0;
    let teardown: (() => void) | undefined;

    const load = import("three").then((THREE) => {
      let renderer: WebGLRenderer | null = null;
      let scene: Scene | null = null;
      let camera: PerspectiveCamera | null = null;
      let outerSphere: Mesh | null = null;
      let innerSphere: Mesh | null = null;
      let particles: Points | null = null;
      let ring1: Mesh | null = null;
      let ring2: Mesh | null = null;
      let core: Mesh | null = null;

      let mouseX = 0;
      let mouseY = 0;
      let t = 0;

      const handleMouse = (e: MouseEvent) => {
        if (!camera || !canvas) return;
        const rect = canvas.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;
        if (W < 1 || H < 1) return;
        mouseX = ((e.clientX - rect.left) / W - 0.5) * 2;
        mouseY = -((e.clientY - rect.top) / H - 0.5) * 2;
      };

      function resize() {
        if (!renderer || !camera || !canvas) return;
        const W = Math.max(2, Math.floor(canvas.clientWidth));
        const H = Math.max(2, Math.floor(canvas.clientHeight));
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H, false);
      }

      function initScene() {
        const W = Math.max(2, Math.floor(canvas!.clientWidth));
        const H = Math.max(2, Math.floor(canvas!.clientHeight));

        renderer = new THREE.WebGLRenderer({ canvas: canvas!, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H, false);
        renderer.setClearColor(0x000000, 0);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.set(0, 0, 4.5);

        const outerGeo = new THREE.IcosahedronGeometry(1.5, 2);
        const outerMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        });
        outerSphere = new THREE.Mesh(outerGeo, outerMat);
        scene.add(outerSphere);

        const innerGeo = new THREE.IcosahedronGeometry(1.0, 4);
        const innerMat = new THREE.MeshBasicMaterial({
          color: 0xb45309,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        innerSphere = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerSphere);

        const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0xfcd34d,
          transparent: true,
          opacity: 0.06,
        });
        core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        const particleCount = 120;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = 2 * Math.PI * Math.random();
          const r = 1.7 + Math.random() * 0.7;
          positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = r * Math.cos(phi);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
          color: 0xfde68a,
          size: 0.035,
          transparent: true,
          opacity: 0.7,
        });
        particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        const ring1Geo = new THREE.TorusGeometry(1.85, 0.004, 8, 80);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.22 });
        ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        scene.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(2.1, 0.003, 8, 80);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x92400e, transparent: true, opacity: 0.14 });
        ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = -Math.PI / 5;
        ring2.rotation.z = Math.PI / 6;
        scene.add(ring2);

        window.addEventListener("mousemove", handleMouse, { passive: true });
        window.addEventListener("resize", resize);
      }

      function animate() {
        if (disposed || !renderer || !scene || !camera) return;
        animId = requestAnimationFrame(animate);
        t += 0.005;

        if (outerSphere && innerSphere && particles && ring1 && ring2 && core) {
          outerSphere.rotation.y = t * 0.18;
          outerSphere.rotation.x = t * 0.09 + mouseY * 0.15;
          innerSphere.rotation.y = -t * 0.25;
          innerSphere.rotation.z = t * 0.12;
          particles.rotation.y = t * 0.08;
          ring1.rotation.z = t * 0.22;
          ring2.rotation.y = t * 0.15;

          const targetX = mouseX * 0.3;
          const targetY = mouseY * 0.3;
          scene.rotation.y += (targetX - scene.rotation.y) * 0.04;
          scene.rotation.x += (targetY - scene.rotation.x) * 0.04;

          const breathe = 1 + Math.sin(t * 0.8) * 0.025;
          outerSphere.scale.setScalar(breathe);
          core.scale.setScalar(1 + Math.sin(t * 1.2) * 0.08);
        }

        renderer.render(scene, camera);
      }

      function tryBoot() {
        if (disposed || renderer) return;
        const w = canvas!.clientWidth;
        const h = canvas!.clientHeight;
        if (w < 2 || h < 2) return;

        initScene();
        animate();
      }

      const ro = new ResizeObserver(() => {
        if (!renderer) tryBoot();
        else resize();
      });
      ro.observe(canvas);

      tryBoot();
      requestAnimationFrame(() => tryBoot());

      teardown = () => {
        ro.disconnect();
        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animId);
        renderer?.dispose();
        renderer = null;
        scene = null;
        camera = null;
      };
    }).catch(() => {
      /* WebGL / module load failures must not blank the page */
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      void load.then(() => teardown?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
