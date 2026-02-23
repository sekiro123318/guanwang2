"use client"

import { useEffect, useRef, useState } from "react"

interface Protein3DComplexProps {
  className?: string
}

export function Protein3DComplex({ className }: Protein3DComplexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef(true)

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

    // Protein complex structure - a spherical virus capsid-like structure
    const atoms: Array<{
      x: number
      y: number
      z: number
      radius: number
      color: string
      group: number
    }> = []

    // Create multiple concentric shells
    const shellColors = ["#0891b2", "#06b6d4", "#14b8a6", "#10b981"]
    const shellRadii = [60, 45, 30, 15]
    const atomsPerShell = [30, 24, 18, 12]

    shellRadii.forEach((radius, shellIndex) => {
      const numAtoms = atomsPerShell[shellIndex]
      const color = shellColors[shellIndex]
      
      for (let i = 0; i < numAtoms; i++) {
        // Spiral distribution on sphere
        const phi = Math.acos(1 - 2 * (i + 0.5) / numAtoms)
        const theta = Math.sqrt(numAtoms * Math.PI) * phi
        
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)
        
        atoms.push({
          x,
          y,
          z,
          radius: 4 - shellIndex * 0.5,
          color,
          group: shellIndex + 1
        })
      }
    })

    // Add central core structure
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 8
      const r = 10 + Math.sin(i * 0.5) * 5
      atoms.push({
        x: Math.cos(angle) * r,
        y: (i - 10) * 4,
        z: Math.sin(angle) * r,
        radius: 2.5,
        color: "#2dd4bf",
        group: 5
      })
    }

    // Add connecting bonds between atoms in same shell
    const bonds: Array<{ from: number, to: number }> = []
    let atomIndex = 0
    atomsPerShell.forEach((numAtoms) => {
      for (let i = 0; i < numAtoms; i++) {
        for (let j = i + 1; j < numAtoms; j++) {
          const a1 = atoms[atomIndex + i]
          const a2 = atoms[atomIndex + j]
          const dist = Math.sqrt(
            (a1.x - a2.x) ** 2 + 
            (a1.y - a2.y) ** 2 + 
            (a1.z - a2.z) ** 2
          )
          if (dist < 40) {
            bonds.push({ from: atomIndex + i, to: atomIndex + j })
          }
        }
      }
      atomIndex += numAtoms
    })

    let time = 0

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      autoRotateRef.current = false
      const rect = canvas.getBoundingClientRect()
      lastMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const deltaX = mouseX - lastMousePos.current.x
      const deltaY = mouseY - lastMousePos.current.y
      
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      
      lastMousePos.current = { x: mouseX, y: mouseY }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseLeave = () => {
      setIsDragging(false)
    }

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)
      autoRotateRef.current = false
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      lastMousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!isDragging) return
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      const touchX = touch.clientX - rect.left
      const touchY = touch.clientY - rect.top
      
      const deltaX = touchX - lastMousePos.current.x
      const deltaY = touchY - lastMousePos.current.y
      
      rotationRef.current.y += deltaX * 0.01
      rotationRef.current.x += deltaY * 0.01
      
      lastMousePos.current = { x: touchX, y: touchY }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    const rotatePoint = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      // Rotate around X axis
      let y1 = y * Math.cos(rotX) - z * Math.sin(rotX)
      let z1 = y * Math.sin(rotX) + z * Math.cos(rotX)
      
      // Rotate around Y axis
      let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY)
      let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY)
      
      return { x: x2, y: y1, z: z2 }
    }

    const render = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw dark cyan/black background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(8, 47, 73, 0.95)")
      gradient.addColorStop(0.5, "rgba(15, 23, 42, 0.98)")
      gradient.addColorStop(1, "rgba(6, 78, 59, 0.95)")
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated particles in background
      for (let i = 0; i < 30; i++) {
        const particleX = (Math.sin(time * 0.001 + i * 0.5) * 0.5 + 0.5) * canvas.width
        const particleY = (Math.cos(time * 0.0015 + i * 0.7) * 0.5 + 0.5) * canvas.height
        const size = 1.5 + Math.sin(time * 0.0025 + i) * 0.8
        
        ctx.beginPath()
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 209, ${0.2 + Math.sin(time * 0.003 + i * 0.8) * 0.15})`
        ctx.fill()
      }

      // Center the protein structure
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const scale = Math.min(canvas.width, canvas.height) / 350

      // Auto-rotate if not dragging
      if (autoRotateRef.current) {
        rotationRef.current.y += 0.003
        rotationRef.current.x += 0.001
      }

      // Transform and sort atoms
      const transformedAtoms = atoms.map((atom, index) => {
        const rotated = rotatePoint(atom.x, atom.y, atom.z, rotationRef.current.x, rotationRef.current.y)
        return {
          ...atom,
          tx: rotated.x,
          ty: rotated.y,
          tz: rotated.z,
          index
        }
      }).sort((a, b) => b.tz - a.tz)

      // Draw protein structure
      transformedAtoms.forEach((atom) => {
        const screenX = centerX + atom.tx * scale
        const screenY = centerY + atom.ty * scale
        
        // Calculate size based on depth
        const depthScale = 1 + atom.tz / 250
        const radius = atom.radius * depthScale * scale

        // Draw atom
        ctx.beginPath()
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2)
        
        // Create gradient for 3D effect
        const gradient = ctx.createRadialGradient(
          screenX - radius * 0.3, screenY - radius * 0.3, 0,
          screenX, screenY, radius
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
        gradient.addColorStop(0.6, atom.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)")
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw glow effect
        ctx.beginPath()
        ctx.arc(screenX, screenY, radius * 1.5, 0, Math.PI * 2)
        const glowGradient = ctx.createRadialGradient(
          screenX, screenY, radius * 0.5,
          screenX, screenY, radius * 1.5
        )
        glowGradient.addColorStop(0, `${atom.color}40`)
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.fill()
      })

      // Draw bonds between atoms
      bonds.forEach((bond) => {
        const atom1 = transformedAtoms.find(a => a.index === bond.from)
        const atom2 = transformedAtoms.find(a => a.index === bond.to)
        if (!atom1 || !atom2) return
        
        const screenX1 = centerX + atom1.tx * scale
        const screenY1 = centerY + atom1.ty * scale
        const screenX2 = centerX + atom2.tx * scale
        const screenY2 = centerY + atom2.ty * scale

        ctx.beginPath()
        ctx.moveTo(screenX1, screenY1)
        ctx.lineTo(screenX2, screenY2)
        const avgZ = (atom1.tz + atom2.tz) / 2
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.3 + 0.15 * Math.sin(time * 0.003 + bond.from)})`
        ctx.lineWidth = 1.5 * scale * (avgZ / 200 + 0.7)
        ctx.stroke()
      })

      // Update animation
      time += 16

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", updateSize)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          background: "transparent",
        }}
      />
      {/* Glowing overlay effect - cyan/black theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-emerald-500/10 mix-blend-overlay pointer-events-none" />
    </div>
  )
}
