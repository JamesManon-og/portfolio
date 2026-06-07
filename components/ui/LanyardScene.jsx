/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useTexture } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

/**
 * Full-viewport lanyard scene.
 *
 * The canvas covers the entire screen with `pointer-events: none` so page
 * content remains interactive. R3F receives pointer events via
 * `eventSource={document.body}` — raycasting only triggers handlers when
 * the pointer is actually over the card mesh.
 */
export default function LanyardScene({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
}) {
  const [isMobile, setIsMobile] = useState(false);
  // Pause rendering + physics while the tab is in the background.
  const [frameloop, setFrameloop] = useState('always');

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.hidden ? 'never' : 'always');
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="lanyard-wrapper relative h-full w-full">
      <Canvas
        frameloop={frameloop}
        camera={{ position, fov: 20 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, antialias: true }}
        eventSource={document.body}
        eventPrefix="client"
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={Math.PI * 0.4} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment background={false} blur={0.75}>
          <Lightformer
            intensity={2}
            color="#86ffa1"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#4ade80"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="#22c55e"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="#86ffa1"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function useStripeTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 32;
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#040a05';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(74,222,128,0.85)';
    for (let i = 0; i < 8; i++) ctx.fillRect(i * 32, 12, 18, 8);
    ctx.fillStyle = 'rgba(134,255,161,0.5)';
    for (let i = 0; i < 16; i++) ctx.fillRect(i * 16 + 6, 0, 2, 4);
    ctx.fillStyle = 'rgba(74,222,128,0.25)';
    for (let i = 0; i < 60; i++) {
      ctx.fillRect(Math.random() * c.width, 22 + Math.random() * 8, 2, 1);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Band({ isMobile = false }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  // Reusable vector / quaternion scratch pads (no GC pressure)
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const clipOffset = useMemo(() => new THREE.Vector3(), []);
  const quatScratch = useMemo(() => new THREE.Quaternion(), []);

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const texture = useStripeTexture();
  const photoTexture = useTexture('/images/myImage.jpg');

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
    []
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // ── Physics joints ────────────────────────────────────────────────────
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  // Attach j3 to the card's clip-hole position (top of the card visual).
  // With the visual group centered on the RB and scale 1.85, the clip hole
  // at local y = 0.6 maps to RB-local y = 0.6 * 1.85 = 1.11.
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.11, 0]]);

  // ── Global pointer-up to end drag even when cursor is far from card ──
  useEffect(() => {
    if (dragged) {
      const handleUp = () => drag(false);
      window.addEventListener('pointerup', handleUp);
      return () => window.removeEventListener('pointerup', handleUp);
    }
  }, [dragged]);

  // ── Cursor feedback ──────────────────────────────────────────────────
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  // ── Per-frame physics + rope rendering ────────────────────────────────
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      // Smooth intermediate joint positions
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const d = Math.max(
          0.1,
          Math.min(
            1,
            ref.current.lerped.distanceTo(ref.current.translation())
          )
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (10 + d * 40)
        );
      });

      // Compute the clip-hole's world position so the rope ends exactly
      // where the ring visual is on the card — no floating gap.
      const ct = card.current.translation();
      const cr = card.current.rotation(); // quaternion {x,y,z,w}
      quatScratch.set(cr.x, cr.y, cr.z, cr.w);
      clipOffset.set(0, 1.11, 0).applyQuaternion(quatScratch);

      curve.points[0].set(
        ct.x + clipOffset.x,
        ct.y + clipOffset.y,
        ct.z + clipOffset.z
      );
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current?.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      // Gentle yaw stabilisation so the card naturally faces the camera
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      {/* ── Rope chain ──────────────────────────────────────────────── */}
      <group position={[7, 5.2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.3, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.6, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.9, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* ── ID card ───────────────────────────────────────────────── */}
        <RigidBody
          position={[1.2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          {/* Collider matches the scaled card visual (0.9*1.85/2 x 1.25*1.85/2) */}
          <CuboidCollider args={[0.83, 1.16, 0.01]} />
          <group
            scale={1.85}
            position={[0, 0, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={() => drag(false)}
            onPointerDown={(e) => {
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* Card body with photo texture */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.9, 1.25, 0.02]} />
              <meshStandardMaterial map={photoTexture} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Clip ring — rope attaches here (y=0.6 in group-local =
                0.6*1.85 = 1.11 in RB-local, matching the joint offset) */}
            <mesh position={[0, 0.6, 0.012]}>
              <ringGeometry args={[0.02, 0.04, 24]} />
              <meshBasicMaterial toneMapped={false} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* ── Rope visual (MeshLine) ──────────────────────────────────── */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#86ffa1"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={texture ? 1 : 0}
          map={texture ?? undefined}
          repeat={[-4, 1]}
          lineWidth={.1}
        />
      </mesh>
    </>
  );
}
