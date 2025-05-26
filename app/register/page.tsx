"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/main-nav"
import { MainNav } from "@/components/main-nav"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Determinar la pestaña inicial basada en el parámetro de consulta
  const initialTab = searchParams.get("tab") === "provider" ? "provider" : "client"

  // Estados para los formularios
  const [clientForm, setClientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [providerForm, setProviderForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    location: "",
  })

  // Manejar cambios en el formulario de cliente
  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejar cambios en el formulario de proveedor
  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProviderForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Mejorar el manejo de registro y la creación de cuentas
  const handleClientRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validar que las contraseñas coincidan
    if (clientForm.password !== clientForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validar que todos los campos estén completos
    if (!clientForm.firstName || !clientForm.lastName || !clientForm.email || !clientForm.password) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulación de registro exitoso
    setTimeout(() => {
      setIsLoading(false)

      // Crear un usuario de ejemplo
      const userData = {
        firstName: clientForm.firstName,
        lastName: clientForm.lastName,
        email: clientForm.email,
        accountType: "client",
        location: "Buenos Aires, Argentina",
      }

      // Guardar en el estado global y localStorage
      login(userData)

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      })

      // Redirigir a la página principal
      router.push("/")
    }, 1000)
  }

  // Mejorar el manejo de registro de proveedores
  const handleProviderRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validar que las contraseñas coincidan
    if (providerForm.password !== providerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validar que todos los campos estén completos
    if (
      !providerForm.firstName ||
      !providerForm.lastName ||
      !providerForm.email ||
      !providerForm.password ||
      !providerForm.businessName ||
      !providerForm.location
    ) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulación de registro exitoso
    setTimeout(() => {
      setIsLoading(false)

      // Crear un usuario de ejemplo
      const userData = {
        firstName: providerForm.firstName,
        lastName: providerForm.lastName,
        email: providerForm.email,
        accountType: "provider",
        businessName: providerForm.businessName,
        location: providerForm.location,
      }

      // Guardar en el estado global y localStorage
      login(userData)

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta de proveedor ha sido creada correctamente",
      })

      // Redirigir al panel de proveedor
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="provider">Proveedor</TabsTrigger>
            </TabsList>
            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Cuenta de Cliente</CardTitle>
                  <CardDescription>Regístrate para alquilar equipos deportivos</CardDescription>
                </CardHeader>
                <form onSubmit={handleClientRegister}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={clientForm.firstName}
                          onChange={handleClientChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={clientForm.lastName}
                          onChange={handleClientChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={clientForm.email}
                        onChange={handleClientChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={clientForm.password}
                        onChange={handleClientChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={clientForm.confirmPassword}
                        onChange={handleClientChange}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" disabled={isLoading}>
                      {isLoading ? "Registrando..." : "Registrarse"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="provider">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Cuenta de Proveedor</CardTitle>
                  <CardDescription>Regístrate para ofrecer tus equipos en alquiler</CardDescription>
                </CardHeader>
                <form onSubmit={handleProviderRegister}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="providerFirstName">Nombre</Label>
                        <Input
                          id="providerFirstName"
                          name="firstName"
                          value={providerForm.firstName}
                          onChange={handleProviderChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="providerLastName">Apellido</Label>
                        <Input
                          id="providerLastName"
                          name="lastName"
                          value={providerForm.lastName}
                          onChange={handleProviderChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="providerEmail">Correo Electrónico</Label>
                      <Input
                        id="providerEmail"
                        name="email"
                        type="email"
                        value={providerForm.email}
                        onChange={handleProviderChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nombre del Negocio</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={providerForm.businessName}
                        onChange={handleProviderChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        name="location"
                        value={providerForm.location}
                        onChange={handleProviderChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="providerPassword">Contraseña</Label>
                      <Input
                        id="providerPassword"
                        name="password"
                        type="password"
                        value={providerForm.password}
                        onChange={handleProviderChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="providerConfirmPassword">Confirmar Contraseña</Label>
                      <Input
                        id="providerConfirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={providerForm.confirmPassword}
                        onChange={handleProviderChange}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" disabled={isLoading}>
                      {isLoading ? "Registrando..." : "Registrarse como Proveedor"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-[#0F5132] hover:underline">
              Iniciar Sesión
            </Link>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
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
