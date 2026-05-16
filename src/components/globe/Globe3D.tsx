'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const RADIUS = 1.7

/** Evenly distributes `count` points on a sphere using the Fibonacci lattice. */
function fibonacciSphere(count: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * RADIUS
    positions[i * 3 + 1] = y * RADIUS
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS
  }
  return positions
}

/** Converts geographic coordinates to a 3D position on the globe surface. */
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Major financial centres represented on the globe.
const REGIONS = [
  { lat: 40.7, lng: -74 }, // New York
  { lat: 50.1, lng: 8.7 }, // Frankfurt
  { lat: 51.5, lng: -0.1 }, // London
  { lat: 35.7, lng: 139.7 }, // Tokyo
  { lat: 1.35, lng: 103.8 }, // Singapore
]

const ARC_PAIRS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 3],
  [0, 4],
  [1, 2],
  [2, 3],
]

/** Builds the points of a great-circle-style arc that bows away from the globe. */
function buildArcPoints(start: THREE.Vector3, end: THREE.Vector3): THREE.Vector3[] {
  const mid = start.clone().add(end).multiplyScalar(0.5)
  const len = mid.length()
  mid.normalize().multiplyScalar(len + 0.7)
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
  return curve.getPoints(48)
}

function GlobeDots() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(2200), 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.022} color="#3b82f6" sizeAttenuation transparent opacity={0.55} />
    </points>
  )
}

function GlobeShell() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
      <meshBasicMaterial color="#0a0a0a" transparent opacity={0.85} />
    </mesh>
  )
}

function Arcs() {
  const arcs = useMemo(
    () =>
      ARC_PAIRS.map(([a, b]) => {
        const start = latLngToVec3(REGIONS[a].lat, REGIONS[a].lng, RADIUS)
        const end = latLngToVec3(REGIONS[b].lat, REGIONS[b].lng, RADIUS)
        return buildArcPoints(start, end)
      }),
    []
  )

  return (
    <>
      {arcs.map((pts, i) => (
        <Line key={i} points={pts} color="#10b981" lineWidth={1.5} transparent opacity={0.5} />
      ))}
    </>
  )
}

function RegionMarkers() {
  const markers = useMemo(() => REGIONS.map((r) => latLngToVec3(r.lat, r.lng, RADIUS)), [])

  return (
    <>
      {markers.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.034, 16, 16]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      ))}
    </>
  )
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.09
    }
  })

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0.15]}>
      <GlobeShell />
      <GlobeDots />
      <Arcs />
      <RegionMarkers />
    </group>
  )
}

export default function Globe3D() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene reducedMotion={reducedMotion} />
    </Canvas>
  )
}
