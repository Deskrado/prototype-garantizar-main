"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    // Validate required fields
    const newErrors: { email?: string; password?: string; general?: string } = {}

    if (!email.trim()) {
      newErrors.email = "El email es requerido"
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate authentication with hardcoded credentials
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      if (email === "prueba@ejemplo.com" && password === "123456") {
        window.location.href = "/dashboard/resumen"
      } else {
        setErrors({ general: "Credenciales incorrectas. Intenta de nuevo." })
      }
    } catch (error) {
      setErrors({ general: "Error al iniciar sesión. Intenta de nuevo." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardContent className="p-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center mb-8">
          <Image src="/images/garantizar-logo.png" alt="Garantizar" width={200} height={60} className="h-12 w-auto" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Te damos la bienvenida.</h2>
          <p className="text-gray-600 text-sm">Ingresa tus credenciales para continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 h-12 border-gray-300 rounded-full focus:border-blue-500 focus:ring-blue-500 ${
                  errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 pr-10 h-12 border-gray-300 rounded-full focus:border-blue-500 focus:ring-blue-500 ${
                  errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
