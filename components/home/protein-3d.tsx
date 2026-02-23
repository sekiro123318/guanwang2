"use client"

import { useEffect, useRef } from "react"

interface Protein3DProps {
  className?: string
}

export function Protein3D({ className }: Protein3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const container = canvas.parentElement
      if (container) {
        const rect = container.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Protein structure data (simplified representation)
    const atoms: Array<{
      x: number
      y: number
      z: number
      radius: number
      color: string
      type: "carbon" | "oxygen" | "nitrogen"
    }> = []

    // Create a simplified protein structure
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 4
      const radius = 50 + Math.sin(i * 0.3) * 20
      atoms.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.sin(i * 0.5) * 30,
        radius: 2 + Math.random() * 3,
        color: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#f87171" : "#34d399",
        type: i % 3 === 0 ? "carbon" : i % 3 === 1 ? "oxygen" : "nitrogen"
      })
    }

    let rotation = 0
    let time = 0

    const render = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw animated background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)")
      gradient.addColorStop(1, "rgba(14, 165, 233, 0.1)")
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated particles in background
      for (let i = 0; i < 20; i++) {
        const particleX = (Math.sin(time * 0.001 + i) * 0.5 + 0.5) * canvas.width
        const particleY = (Math.cos(time * 0.001 + i * 2) * 0.5 + 0.5) * canvas.height
        const size = 2 + Math.sin(time * 0.002 + i) * 1
        
        ctx.beginPath()
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time * 0.003 + i) * 0.2})`
        ctx.fill()
      }

      // Center the protein structure
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) / 300

      // Sort atoms by z for proper depth rendering
      const sortedAtoms = [...atoms].sort((a, b) => {
        const aZ = a.z * Math.sin(rotation) + a.x * Math.cos(rotation)
        const bZ = b.z * Math.sin(rotation) + b.x * Math.cos(rotation)
        return bZ - aZ
      })

      // Draw protein structure
      sortedAtoms.forEach((atom, index) => {
        const x = atom.x * Math.cos(rotation) - atom.z * Math.sin(rotation)
        const y = atom.y
        const z = atom.x * Math.sin(rotation) + atom.z * Math.cos(rotation)

        const screenX = centerX + x * scale
        const screenY = centerY + y * scale
        
        // Calculate size based on depth
        const depthScale = 1 + z / 200
        const radius = atom.radius * depthScale * scale

        // Draw atom
        ctx.beginPath()
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2)
        
        // Create gradient for 3D effect
        const gradient = ctx.createRadialGradient(
          screenX - radius * 0.3, screenY - radius * 0.3, 0,
          screenX, screenY, radius
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(0.7, atom.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.3)")
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw connections between nearby atoms
        if (index < sortedAtoms.length - 1) {
          const nextAtom = sortedAtoms[index + 1]
          const nextX = nextAtom.x * Math.cos(rotation) - nextAtom.z * Math.sin(rotation)
          const nextY = nextAtom.y
          const nextScreenX = centerX + nextX * scale
          const nextScreenY = centerY + nextY * scale

          const distance = Math.sqrt((nextX - x) ** 2 + (nextY - y) ** 2)
          if (distance < 30) {
            ctx.beginPath()
            ctx.moveTo(screenX, screenY)
            ctx.lineTo(nextScreenX, nextScreenY)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + 0.2 * Math.sin(time * 0.005 + index)})`
            ctx.lineWidth = 1 * scale
            ctx.stroke()
          }
        }
      })

      // Update animation
      rotation += 0.005
      time += 16

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", updateSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "transparent",
        }}
      />
      {/* Glowing overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 mix-blend-overlay" />
    </div>
  )
}