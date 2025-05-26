"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/main-nav"
import { MainNav } from "@/components/main-nav"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mejorar el manejo de autenticación en el login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (email && password) {
      // Simulación de inicio de sesión exitoso
      setTimeout(() => {
        setIsLoading(false)

        // Crear un usuario de ejemplo
        const userData = {
          firstName: "Usuario",
          lastName: "Ejemplo",
          email: email,
          accountType: "client", // Por defecto es cliente
          location: "Buenos Aires, Argentina",
        }

        // Guardar en el estado global y localStorage
        login(userData)

        toast({
          title: "Inicio de sesión exitoso",
          description: "Has iniciado sesión correctamente",
        })

        // Redirigir a la página principal
        router.push("/")
      }, 1000)
    } else {
      setIsLoading(false)
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register" onClick={() => router.push("/register")}>
                Registrarse
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>Ingresa tus credenciales para acceder a tu cuenta</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <Link href="#" className="text-xs text-[#0F5132] hover:underline">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" disabled={isLoading}>
                      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Cuenta</CardTitle>
                  <CardDescription>Regístrate para alquilar o publicar equipos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <Button className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" onClick={() => router.push("/register")}>
                      Ir a Registro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <Link href="#" className="text-[#0F5132] hover:underline">
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link href="#" className="text-[#0F5132] hover:underline">
              Política de Privacidad
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
