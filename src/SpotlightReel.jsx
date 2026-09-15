// SpotlightReel.jsx — Three.js projector beam with floating dust
import { useEffect, useRef } from "react"
import * as THREE from "three"

const SpotlightReel = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    // Spotlight cone — a projector beam
    const coneGeometry = new THREE.ConeGeometry(3.2, 8, 48, 1, true)
    const coneMaterial = new THREE.MeshBasicMaterial({
      color: 0xe0b465,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    cone.rotation.x = Math.PI
    cone.position.set(0, 5, -3)
    scene.add(cone)

    // Floating dust particles inside the beam
    const dustCount = 120
    const dustGeometry = new THREE.SphereGeometry(0.025, 6, 6)
    const dustMaterial = new THREE.MeshBasicMaterial({ color: 0xf3ede2, transparent: true, opacity: 0.5 })
    const dustParticles = []
    for (let i = 0; i < dustCount; i++) {
      const speck = new THREE.Mesh(dustGeometry, dustMaterial)
      const y = Math.random() * 8 - 3
      const spread = ((y + 3) / 8) * 2.2
      speck.position.set((Math.random() - 0.5) * spread, y, -3 + (Math.random() - 0.5) * 2)
      scene.add(speck)
      dustParticles.push({ mesh: speck, driftSpeed: 0.002 + Math.random() * 0.004, offset: Math.random() * 10 })
    }

    let animationId
    const clock = new THREE.Clock()
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      dustParticles.forEach(({ mesh, driftSpeed, offset }) => {
        mesh.position.x += Math.sin(elapsed * driftSpeed * 40 + offset) * 0.0015
        mesh.position.y -= driftSpeed
        if (mesh.position.y < -3) {
          mesh.position.y = 5
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="spotlight-scene" />
}

export default SpotlightReel