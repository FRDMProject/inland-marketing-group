"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/components/motion";

// Reworked from dhileepkumargm's Anomalous Matter (21st.dev demo 9121).
// Our coral material, orbit assembly, lighting and staging form the IDG identity.
// Three.js loads only on desktop. Mobile/reduced-motion use the CSS sculpture.
export function InlandSculpture() {
  const mount = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPreference();
  useEffect(() => {
    const element = mount.current;
    if (!element || paused || !window.matchMedia("(min-width: 900px)").matches) return;
    let disposed = false;
    let teardown = () => {};
    const timer = window.setTimeout(async () => {
      const THREE = await import("three");
      if (disposed) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.z = 9;
      const geometry = new THREE.TorusKnotGeometry(1.65, 0.48, 160, 24, 2, 3);
      const material = new THREE.MeshPhysicalMaterial({
        color: "#ff704e",
        roughness: 0.24,
        metalness: 0.55,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
      });
      const knot = new THREE.Mesh(geometry, material);
      knot.rotation.set(0.3, -0.5, -0.25);
      scene.add(knot);
      scene.add(new THREE.AmbientLight("#ffe5d1", 2));
      const key = new THREE.DirectionalLight("#fff3d8", 7);
      key.position.set(3, 5, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight("#ff482c", 6);
      rim.position.set(-5, -1, 3);
      scene.add(rim);
      const fill = new THREE.DirectionalLight("#a8bfff", 3);
      fill.position.set(2, -3, -2);
      scene.add(fill);
      const ringGeometry = new THREE.TorusGeometry(2.55, 0.009, 8, 120);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: "#dfbaa8",
        transparent: true,
        opacity: 0.55,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.set(1.25, 0.45, -0.25);
      scene.add(ring);
      element.appendChild(renderer.domElement);
      element.dataset.ready = "true";
      const pointer = { x: 0, y: 0 };
      let frame = 0,
        visible = true,
        last = 0,
        angle = 0;
      const draw = (now: number) => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        angle += delta;
        knot.rotation.y = -0.5 + angle * 0.16 + pointer.x * 0.18;
        knot.rotation.x = 0.3 + Math.sin(angle * 0.3) * 0.15 + pointer.y * 0.12;
        knot.position.y = Math.sin(angle * 0.7) * 0.08;
        ring.rotation.z = -0.25 + angle * 0.055;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(draw);
      };
      const sync = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        if (visible && !document.hidden) {
          last = performance.now();
          frame = requestAnimationFrame(draw);
        }
      };
      const resize = new ResizeObserver(() => {
        const w = element.clientWidth,
          h = element.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      resize.observe(element);
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(element);
      const move = (event: PointerEvent) => {
        const box = element.getBoundingClientRect();
        pointer.x = (event.clientX - box.left) / box.width - 0.5;
        pointer.y = (event.clientY - box.top) / box.height - 0.5;
      };
      const lost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        element.dataset.ready = "false";
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      element.addEventListener("pointermove", move);
      document.addEventListener("visibilitychange", sync);
      sync();
      teardown = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resize.disconnect();
        document.removeEventListener("visibilitychange", sync);
        element.removeEventListener("pointermove", move);
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        geometry.dispose();
        material.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        element.dataset.ready = "false";
      };
    }, 120);
    return () => {
      disposed = true;
      clearTimeout(timer);
      teardown();
    };
  }, [paused]);
  return (
    <div className="sculpture" ref={mount} aria-hidden="true">
      <div className="sculpture-fallback">
        <i />
        <i />
        <i />
      </div>
      <div className="sculpture-shadow" />
    </div>
  );
}
