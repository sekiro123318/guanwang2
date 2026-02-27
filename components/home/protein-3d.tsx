"use client"

import { useEffect, useRef } from "react"

interface Protein3DProps {
  className?: string
}

export function Protein3D({ className }: Protein3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      radius: number
      color: string
      alpha: number
    }> = []

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.2,
        radius: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? "#06b6d4" : "#8b5cf6",
        alpha: 0.3 + Math.random() * 0.4
      })
    }

    let rotation = 0
    let time = 0

    const render = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) / 500

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.6)
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.08)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const helixPoints: Array<{
        x: number
        y: number
        z: number
        color: string
        radius: number
      }> = []

      const numPoints = 60
      const helixRadius = 80
      const helixHeight = 300
      const turns = 3

      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints
        const angle = t * Math.PI * 2 * turns + rotation

        const x1 = Math.cos(angle) * helixRadius
        const y1 = (t - 0.5) * helixHeight
        const z1 = Math.sin(angle) * helixRadius

        const x2 = Math.cos(angle + Math.PI) * helixRadius
        const y2 = (t - 0.5) * helixHeight
        const z2 = Math.sin(angle + Math.PI) * helixRadius

        const pulse = 1 + Math.sin(time * 0.003 + t * Math.PI * 2) * 0.15

        const alpha1 = 0.6 + Math.sin(time * 0.002 + i) * 0.2
        const alpha2 = 0.6 + Math.cos(time * 0.002 + i) * 0.2
        const alpha3 = 0.4 + Math.sin(time * 0.004 + i) * 0.15

        helixPoints.push({
          x: x1,
          y: y1,
          z: z1,
          color: `rgba(6, 182, 212, ${alpha1})`,
          radius: 4 * pulse
        })

        helixPoints.push({
          x: x2,
          y: y2,
          z: z2,
          color: `rgba(139, 92, 246, ${alpha2})`,
          radius: 4 * pulse
        })

        if (i < numPoints - 1) {
          const nextT = (i + 1) / numPoints
          const nextAngle = nextT * Math.PI * 2 * turns + rotation

          const nextX1 = Math.cos(nextAngle) * helixRadius
          const nextY1 = (nextT - 0.5) * helixHeight
          const nextZ1 = Math.sin(nextAngle) * helixRadius

          const nextX2 = Math.cos(nextAngle + Math.PI) * helixRadius
          const nextY2 = (nextT - 0.5) * helixHeight
          const nextZ2 = Math.sin(nextAngle + Math.PI) * helixRadius

          helixPoints.push({
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
            z: (z1 + z2) / 2,
            color: `rgba(236, 72, 153, ${alpha3})`,
            radius: 2.5 * pulse
          })
        }
      }

      const sortedPoints = [...helixPoints].sort((a, b) => {
        const aZ = a.z * Math.cos(rotation * 0.5)
        const bZ = b.z * Math.cos(rotation * 0.5)
        return aZ - bZ
      })

      sortedPoints.forEach((point) => {
        const x = point.x * Math.cos(rotation * 0.5) - point.z * Math.sin(rotation * 0.5)
        const y = point.y
        const z = point.x * Math.sin(rotation * 0.5) + point.z * Math.cos(rotation * 0.5)

        const screenX = centerX + x * scale
        const screenY = centerY + y * scale
        const depthScale = 1 + z / 300
        const radius = point.radius * depthScale * scale

        const glowRadius = radius * 3
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowRadius)
        glowGradient.addColorStop(0, point.color.replace(/[\d.]+\)$/, "0.3)"))
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.beginPath()
        ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2)
        const atomGradient = ctx.createRadialGradient(
          screenX - radius * 0.3, screenY - radius * 0.3, 0,
          screenX, screenY, radius
        )
        atomGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
        atomGradient.addColorStop(0.5, point.color)
        atomGradient.addColorStop(1, "rgba(0, 0, 0, 0.3)")
        ctx.fillStyle = atomGradient
        ctx.fill()
      })

      const numHelixPoints = numPoints * 2 + (numPoints - 1)
      for (let i = 0; i < numHelixPoints - 1; i++) {
        const point1 = helixPoints[i]
        const point2 = helixPoints[i + 1]

        const x1 = point1.x * Math.cos(rotation * 0.5) - point1.z * Math.sin(rotation * 0.5)
        const y1 = point1.y
        const screenX1 = centerX + x1 * scale
        const screenY1 = centerY + y1 * scale

        const x2 = point2.x * Math.cos(rotation * 0.5) - point2.z * Math.sin(rotation * 0.5)
        const y2 = point2.y
        const screenX2 = centerX + x2 * scale
        const screenY2 = centerY + y2 * scale

        const midX = (screenX1 + screenX2) / 2
        const midY = (screenY1 + screenY2) / 2

        const strokeAlpha = 0.15 + Math.sin(time * 0.003 + i) * 0.1

        ctx.beginPath()
        ctx.moveTo(screenX1, screenY1)
        ctx.quadraticCurveTo(midX, midY, screenX2, screenY2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${strokeAlpha})`
        ctx.lineWidth = 1.5 * scale
        ctx.stroke()
      }

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (Math.abs(particle.x) > 200) {
          particle.vx *= -1
        }
        if (Math.abs(particle.y) > 200) {
          particle.vy *= -1
        }
        if (Math.abs(particle.z) > 200) {
          particle.vz *= -1
        }

        const x = particle.x * Math.cos(rotation * 0.3) - particle.z * Math.sin(rotation * 0.3)
        const y = particle.y
        const z = particle.x * Math.sin(rotation * 0.3) + particle.z * Math.cos(rotation * 0.3)

        const screenX = centerX + x * scale
        const screenY = centerY + y * scale
        const depthScale = 1 + z / 400
        const radius = particle.radius * depthScale * scale

        const dx = screenX - mouseRef.current.x
        const dy = screenY - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseEffect = Math.max(0, 1 - distance / 150)

        const fillAlpha = particle.alpha + mouseEffect * 0.3

        ctx.beginPath()
        ctx.arc(screenX, screenY, radius * (1 + mouseEffect * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, fillAlpha + ")")
        ctx.fill()

        if (mouseEffect > 0.3) {
          ctx.beginPath()
          ctx.arc(screenX, screenY, radius * (1 + mouseEffect * 0.5) * 2, 0, Math.PI * 2)
          const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, radius * 4)
          const glowAlpha = mouseEffect * 0.2
          glowGradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, glowAlpha + ")"))
          glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
          ctx.fillStyle = glowGradient
          ctx.fill()
        }
      })

      rotation += 0.003
      time += 16

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", updateSize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "transparent",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 mix-blend-overlay" />
    </div>
  )
}
