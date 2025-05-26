"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/components/main-nav"
import { User, MapPin, Mail, Building, Calendar, Package, Star, Shield } from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function ProfilePage() {
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    businessName: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mejorar la verificación de autenticación en el perfil
    // Verificar si hay un usuario en localStorage directamente
    const storedUser = localStorage.getItem("equipz_user")
    const loadingTimeout = setTimeout(() => setIsLoading(false), 1000) // Asegurar que el estado de carga termine

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        // Inicializar el formulario con los datos del usuario
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          location: userData.location || "",
          businessName: userData.businessName || "",
          description: userData.description || "",
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Error parsing user data:", error)
        // No redirigir automáticamente, solo mostrar el mensaje de error
        setIsLoading(false)
      }
    } else {
      // Si no hay usuario en localStorage, no redirigir automáticamente
      setIsLoading(false)
    }

    return () => clearTimeout(loadingTimeout)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    // Actualizar el usuario en localStorage
    const storedUser = localStorage.getItem("equipz_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        const updatedUser = {
          ...userData,
          ...formData,
        }
        localStorage.setItem("equipz_user", JSON.stringify(updatedUser))

        toast({
          title: "Perfil actualizado",
          description: "Los cambios en tu perfil han sido guardados correctamente",
        })
      } catch (error) {
        console.error("Error updating user data:", error)
        toast({
          title: "Error",
          description: "No se pudo actualizar el perfil",
          variant: "destructive",
        })
      }
    }

    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex flex-1 items-center justify-center">
          <p>Cargando perfil...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario autenticado, mostrar mensaje
  if (!user && !isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Acceso denegado</CardTitle>
              <CardDescription>Debes iniciar sesión para ver esta página</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Por favor, inicia sesión para acceder a tu perfil.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" onClick={() => router.push("/login")}>
                Iniciar Sesión
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="container py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={formData.firstName} />
                      <AvatarFallback className="text-2xl">
                        {formData.firstName?.charAt(0)}
                        {formData.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">
                      {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="text-muted-foreground">
                      {user?.accountType === "provider" ? "Proveedor" : "Cliente"}
                    </p>

                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{formData.location}</span>
                    </div>

                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{formData.email}</span>
                    </div>

                    {user?.accountType === "provider" && formData.businessName && (
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{formData.businessName}</span>
                      </div>
                    )}

                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Miembro desde mayo 2025</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="w-full space-y-2">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/profile">
                          <Calendar className="h-4 w-4 mr-2" />
                          Mis Reservas
                        </Link>
                      </Button>

                      {user?.accountType === "provider" && (
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/dashboard">
                            <Package className="h-4 w-4 mr-2" />
                            Panel de Proveedor
                          </Link>
                        </Button>
                      )}

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/profile">
                          <Star className="h-4 w-4 mr-2" />
                          Favoritos
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/profile">
                          <Shield className="h-4 w-4 mr-2" />
                          Seguridad y Privacidad
                        </Link>
                      </Button>

                      <Button variant="destructive" className="w-full mt-4" onClick={logout}>
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Mi Perfil</CardTitle>
                      <CardDescription>Gestiona tu información personal</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveProfile}>Guardar</Button>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="personal">Información Personal</TabsTrigger>
                      {user?.accountType === "provider" && (
                        <TabsTrigger value="provider">Información de Proveedor</TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 pt-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">Nombre</Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Apellido</Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Ubicación</Label>
                            <Input
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                              <p>{formData.firstName}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Apellido</h3>
                              <p>{formData.lastName}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Correo Electrónico</h3>
                            <p>{formData.email}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Ubicación</h3>
                            <p>{formData.location}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Tipo de Cuenta</h3>
                            <p>{user?.accountType === "provider" ? "Proveedor" : "Cliente"}</p>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    {user?.accountType === "provider" && (
                      <TabsContent value="provider" className="space-y-4 pt-4">
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="businessName">Nombre del Negocio</Label>
                              <Input
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description">Descripción</Label>
                              <textarea
                                id="description"
                                name="description"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.description}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Nombre del Negocio</h3>
                              <p>{formData.businessName || "No especificado"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                              <p>{formData.description || "No hay descripción disponible"}</p>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Estado de la Cuenta</h3>
                              <div className="flex items-center mt-1">
                                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                <span>Verificado</span>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Equipos Publicados</h3>
                              <p>3 equipos activos</p>
                            </div>

                            <div className="pt-2">
                              <Button asChild>
                                <Link href="/dashboard">Ir al Panel de Proveedor</Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>

                <CardFooter className="border-t pt-6">
                  <p className="text-sm text-muted-foreground">
                    La información de tu perfil es visible para otros usuarios cuando realizas o recibes reservas.
                  </p>
                </CardFooter>
              </Card>

              {/* Actividad Reciente */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Tus últimas interacciones en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-[#0F5132]" />
                      </div>
                      <div>
                        <p className="font-medium">Reserva confirmada</p>
                        <p className="text-sm text-muted-foreground">Has reservado Kayak Amarillo Profesional</p>
                        <p className="text-xs text-muted-foreground">Hace 2 días</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                        <Star className="h-4 w-4 text-[#0F5132]" />
                      </div>
                      <div>
                        <p className="font-medium">Nueva reseña</p>
                        <p className="text-sm text-muted-foreground">Has dejado una reseña para Bicicleta de Montaña</p>
                        <p className="text-xs text-muted-foreground">Hace 1 semana</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                        <User className="h-4 w-4 text-[#0F5132]" />
                      </div>
                      <div>
                        <p className="font-medium">Perfil actualizado</p>
                        <p className="text-sm text-muted-foreground">Has actualizado tu información de perfil</p>
                        <p className="text-xs text-muted-foreground">Hace 2 semanas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
