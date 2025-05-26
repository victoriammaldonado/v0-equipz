"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Package, CreditCard, Settings, PlusCircle, Calendar, MessageSquare, BarChart3, LogOut } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/components/main-nav"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    location: "",
    images: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticación
  useEffect(() => {
    // Verificar si hay un usuario en localStorage directamente
    const storedUser = localStorage.getItem("equipz_user")
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)

      if (!storedUser) {
        toast({
          title: "Acceso denegado",
          description: "Debes iniciar sesión para acceder al panel de proveedor",
          variant: "destructive",
        })
        router.push("/login")
      } else {
        try {
          const userData = JSON.parse(storedUser)
          if (userData.accountType !== "provider") {
            toast({
              title: "Acceso denegado",
              description: "Necesitas una cuenta de proveedor para acceder al panel",
              variant: "destructive",
            })
            router.push("/")
          }
        } catch (error) {
          console.error("Error parsing user data:", error)
          router.push("/login")
        }
      }
    }, 500)

    return () => clearTimeout(loadingTimeout)
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: e.target.files,
    }))
  }

  const handleAddEquipment = (e) => {
    e.preventDefault()

    // Validar que todos los campos obligatorios estén completos
    if (!formData.title || !formData.category || !formData.description || !formData.price || !formData.location) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulación de carga de archivos y publicación
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Equipo publicado",
        description: "Tu equipo ha sido publicado correctamente",
      })
      setFormData({
        title: "",
        category: "",
        description: "",
        price: "",
        location: "",
        images: null,
      })
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex flex-1 items-center justify-center">
          <p>Cargando panel de proveedor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <div className="grid flex-1 md:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <span className="text-primary">Panel de Proveedor</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Package className="h-4 w-4" />
                  Mis Equipos
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Calendar className="h-4 w-4" />
                  Reservas
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <MessageSquare className="h-4 w-4" />
                  Mensajes
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">8</Badge>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  Pagos
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <BarChart3 className="h-4 w-4" />
                  Estadísticas
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <Link href="/">
                  <LogOut className="h-4 w-4" />
                  Volver a la Plataforma
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Tabs defaultValue="equipments">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="equipments">Mis Equipos</TabsTrigger>
                  <TabsTrigger value="add">Añadir Equipo</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="equipments" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Mis Equipos Publicados</h2>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Añadir Equipo
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Tabla de Surf Profesional",
                      price: "25000",
                      image: "/images/tabla-surf.png",
                      status: "Activo",
                      reservations: 8,
                    },
                    {
                      title: "Kayak Inflable Doble",
                      price: "30000",
                      image: "/images/kayak-inflable.png",
                      status: "Activo",
                      reservations: 5,
                    },
                    {
                      title: "Set de Snorkel Completo",
                      price: "15000",
                      image: "/images/snorkel.png",
                      status: "Inactivo",
                      reservations: 0,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="p-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={300}
                          height={200}
                          className="aspect-video w-full object-cover"
                        />
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">${item.price} / día</p>
                          </div>
                          <Badge variant={item.status === "Activo" ? "default" : "secondary"}>{item.status}</Badge>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="text-muted-foreground">Reservas totales:</span> {item.reservations}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Ver Reservas
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="add" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Añadir Nuevo Equipo</CardTitle>
                    <CardDescription>Completa la información para publicar tu equipo en la plataforma</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleAddEquipment}>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Ej: Tabla de Surf Profesional"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Categoría</Label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Selecciona una categoría</option>
                          <option value="water">Acuáticos</option>
                          <option value="mountain">Montaña</option>
                          <option value="ball">Balones</option>
                          <option value="camping">Camping</option>
                          <option value="snow">Nieve</option>
                          <option value="urban">Urbano</option>
                          <option value="tech">Tecnología</option>
                          <option value="fishing">Pesca</option>
                          <option value="observation">Observación</option>
                          <option value="golf">Golf</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe tu equipo, estado, características, etc."
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="price">Precio por día ($)</Label>
                          <Input
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            type="number"
                            placeholder="15000"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="location">Ubicación</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Ciudad, Provincia"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="images">Imágenes</Label>
                        <Input id="images" name="images" onChange={handleFileChange} type="file" multiple />
                        <p className="text-xs text-muted-foreground">
                          Puedes subir hasta 5 imágenes. Formatos: JPG, PNG (máx. 5MB cada una)
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button">
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isUploading}>
                        {isUploading ? "Publicando..." : "Publicar Equipo"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
