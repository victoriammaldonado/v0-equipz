"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Filter, ChevronDown, X, Tag, Star, TrendingUp, Compass, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useMobile } from "@/hooks/use-mobile"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { MainNav } from "@/components/main-nav"
import { useRouter } from "next/navigation"

// Datos de ejemplo con precios actualizados (patines a 15.000 por día)
const equipmentData = [
  {
    id: "1",
    title: "Kayak Naranja",
    price: 18000,
    image: "/images/kayak.png",
    location: "Buenos Aires",
    distance: 1.2,
    category: "Acuáticos",
    rating: 4.8,
    reviews: 24,
    avgPrice: 20000,
    priceComparison: "cheaper",
  },
  {
    id: "2",
    title: "Bicicleta de Montaña",
    price: 12000,
    image: "/images/bicicleta.png",
    location: "Córdoba",
    distance: 3.5,
    category: "Montaña",
    rating: 4.6,
    reviews: 18,
    avgPrice: 12000,
    priceComparison: "average",
  },
  {
    id: "3",
    title: "Patines en Línea",
    price: 15000,
    image: "/images/patines.png",
    location: "Rosario",
    distance: 2.8,
    category: "Urbano",
    rating: 4.7,
    reviews: 15,
    avgPrice: 17000,
    priceComparison: "cheaper",
  },
  {
    id: "4",
    title: "Carpa para 4 Personas",
    price: 14000,
    image: "/images/carpa.png",
    location: "Mendoza",
    distance: 5.1,
    category: "Camping",
    rating: 4.5,
    reviews: 12,
    avgPrice: 12000,
    priceComparison: "expensive",
  },
  {
    id: "5",
    title: "Esquís Profesionales",
    price: 22000,
    image: "/images/esquis.png",
    location: "Bariloche",
    distance: 1.5,
    category: "Nieve",
    rating: 4.9,
    reviews: 30,
    avgPrice: 24000,
    priceComparison: "cheaper",
  },
  {
    id: "6",
    title: "Equipo de Snorkel",
    price: 5500,
    image: "/images/snorkel.png",
    location: "Mar del Plata",
    distance: 4.2,
    category: "Acuáticos",
    rating: 4.4,
    reviews: 9,
    avgPrice: 4500,
    priceComparison: "expensive",
  },
  {
    id: "7",
    title: "Tabla de Surf",
    price: 12000,
    image: "/images/tabla-surf.png",
    location: "Mar del Plata",
    distance: 3.7,
    category: "Acuáticos",
    rating: 4.3,
    reviews: 11,
    avgPrice: 14000,
    priceComparison: "cheaper",
  },
  {
    id: "8",
    title: "Dron con Cámara",
    price: 45000,
    image: "/images/dron.png",
    location: "Buenos Aires",
    distance: 2.3,
    category: "Tecnología",
    rating: 4.7,
    reviews: 14,
    avgPrice: 45000,
    priceComparison: "average",
  },
  {
    id: "9",
    title: "Mochila de Trekking",
    price: 8500,
    image: "/images/mochila-trekking-verde.png",
    location: "Salta",
    distance: 3.2,
    category: "Montaña",
    rating: 4.5,
    reviews: 8,
    avgPrice: 9500,
    priceComparison: "cheaper",
  },
  {
    id: "10",
    title: "Binoculares Profesionales",
    price: 10000,
    image: "/images/binoculares.png",
    location: "Ushuaia",
    distance: 4.5,
    category: "Observación",
    rating: 4.8,
    reviews: 7,
    avgPrice: 9500,
    priceComparison: "expensive",
  },
  {
    id: "11",
    title: "Cámara de Acción",
    price: 25000,
    image: "/images/camara.png",
    location: "Córdoba",
    distance: 2.1,
    category: "Tecnología",
    rating: 4.9,
    reviews: 22,
    avgPrice: 28000,
    priceComparison: "cheaper",
  },
  {
    id: "12",
    title: "Cooler Portátil",
    price: 6000,
    image: "/images/cooler.png",
    location: "Rosario",
    distance: 1.8,
    category: "Camping",
    rating: 4.2,
    reviews: 5,
    avgPrice: 5000,
    priceComparison: "expensive",
  },
  {
    id: "13",
    title: "Raquetas para Nieve",
    price: 16000,
    image: "/images/raquetas-nieve.png",
    location: "Bariloche",
    distance: 2.7,
    category: "Nieve",
    rating: 4.6,
    reviews: 9,
    avgPrice: 18000,
    priceComparison: "cheaper",
  },
  {
    id: "14",
    title: "Carpa de Pesca",
    price: 19000,
    image: "/images/carpa-pesca.png",
    location: "Entre Ríos",
    distance: 3.9,
    category: "Pesca",
    rating: 4.4,
    reviews: 6,
    avgPrice: 17000,
    priceComparison: "expensive",
  },
  {
    id: "15",
    title: "Bastones de Trekking",
    price: 4500,
    image: "/images/bastones.png",
    location: "Mendoza",
    distance: 2.2,
    category: "Montaña",
    rating: 4.3,
    reviews: 11,
    avgPrice: 5000,
    priceComparison: "cheaper",
  },
  {
    id: "16",
    title: "Colchoneta de Camping",
    price: 3000,
    image: "/images/colchoneta.png",
    location: "Córdoba",
    distance: 1.4,
    category: "Camping",
    rating: 4.1,
    reviews: 7,
    avgPrice: 2800,
    priceComparison: "expensive",
  },
  {
    id: "17",
    title: "Moto Acuática",
    price: 75000,
    image: "/images/moto-acuatica.png",
    location: "Mar del Plata",
    distance: 5.3,
    category: "Acuáticos",
    rating: 4.9,
    reviews: 18,
    avgPrice: 85000,
    priceComparison: "cheaper",
  },
  {
    id: "18",
    title: "GPS de Mano",
    price: 22000,
    image: "/images/gps.png",
    location: "Buenos Aires",
    distance: 1.9,
    category: "Tecnología",
    rating: 4.7,
    reviews: 13,
    avgPrice: 20000,
    priceComparison: "expensive",
  },
  {
    id: "19",
    title: "Traje de Neopreno",
    price: 28000,
    image: "/images/traje-neopreno-negro.png",
    location: "Mar del Plata",
    distance: 3.1,
    category: "Acuáticos",
    rating: 4.8,
    reviews: 15,
    avgPrice: 30000,
    priceComparison: "cheaper",
  },
  {
    id: "20",
    title: "Scooter Eléctrico",
    price: 18000,
    image: "/images/scooter.png",
    location: "Buenos Aires",
    distance: 1.3,
    category: "Urbano",
    rating: 4.5,
    reviews: 21,
    avgPrice: 16000,
    priceComparison: "expensive",
  },
  {
    id: "21",
    title: "Kayak Inflable",
    price: 35000,
    image: "/images/kayak-inflable.png",
    location: "Tigre",
    distance: 2.6,
    category: "Acuáticos",
    rating: 4.6,
    reviews: 14,
    avgPrice: 38000,
    priceComparison: "cheaper",
  },
  {
    id: "22",
    title: "Canoa",
    price: 45000,
    image: "/images/canoa.png",
    location: "Tigre",
    distance: 2.8,
    category: "Acuáticos",
    rating: 4.7,
    reviews: 9,
    avgPrice: 42000,
    priceComparison: "expensive",
  },
  {
    id: "23",
    title: "Equipo de Pesca",
    price: 20000,
    image: "/images/equipo-pesca.png",
    location: "Entre Ríos",
    distance: 4.2,
    category: "Pesca",
    rating: 4.4,
    reviews: 12,
    avgPrice: 22000,
    priceComparison: "cheaper",
  },
  // Nuevos productos con las imágenes proporcionadas
  {
    id: "24",
    title: "Bicicleta Montaña Premium",
    price: 28000,
    image: "/images/bicicleta-montana-verde.png",
    location: "Córdoba",
    distance: 2.4,
    category: "Montaña",
    rating: 4.9,
    reviews: 27,
    avgPrice: 30000,
    priceComparison: "cheaper",
  },
  {
    id: "25",
    title: "Kayak Amarillo Profesional",
    price: 20000,
    image: "/images/kayak-amarillo.png",
    location: "Tigre",
    distance: 1.7,
    category: "Acuáticos",
    rating: 4.8,
    reviews: 19,
    avgPrice: 21000,
    priceComparison: "cheaper",
  },
  {
    id: "26",
    title: "Patines Profesionales",
    price: 15000,
    image: "/images/patines-negros.png",
    location: "Buenos Aires",
    distance: 1.1,
    category: "Urbano",
    rating: 4.7,
    reviews: 23,
    avgPrice: 17000,
    priceComparison: "cheaper",
  },
  {
    id: "27",
    title: "Carpa Familiar Azul",
    price: 16000,
    image: "/images/carpa-azul.png",
    location: "Mendoza",
    distance: 3.3,
    category: "Camping",
    rating: 4.6,
    reviews: 14,
    avgPrice: 15000,
    priceComparison: "expensive",
  },
  {
    id: "28",
    title: "Esquís Rojos Competición",
    price: 25000,
    image: "/images/esquis-rojos.png",
    location: "Bariloche",
    distance: 2.1,
    category: "Nieve",
    rating: 4.9,
    reviews: 31,
    avgPrice: 27000,
    priceComparison: "cheaper",
  },
  {
    id: "29",
    title: "Mochila Expedición 70L",
    price: 18000,
    image: "/images/mochila-trekking-verde.png",
    location: "Salta",
    distance: 2.8,
    category: "Montaña",
    rating: 4.8,
    reviews: 16,
    avgPrice: 19500,
    priceComparison: "cheaper",
  },
  {
    id: "30",
    title: "Traje Neopreno Profesional",
    price: 35000,
    image: "/images/traje-neopreno-negro.png",
    location: "Mar del Plata",
    distance: 2.5,
    category: "Acuáticos",
    rating: 4.9,
    reviews: 22,
    avgPrice: 38000,
    priceComparison: "cheaper",
  },
  {
    id: "31",
    title: "Set Completo de Golf",
    price: 55000,
    image: "/images/bolsa-golf.png",
    location: "Buenos Aires",
    distance: 3.2,
    category: "Golf",
    rating: 4.8,
    reviews: 17,
    avgPrice: 60000,
    priceComparison: "cheaper",
  },
]

export default function Home() {
  const isMobile = useMobile()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 80000])
  const [sortBy, setSortBy] = useState("distance")
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData)
  const [userLocation, setUserLocation] = useState("Buenos Aires")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filtrar y ordenar equipos
  useEffect(() => {
    let filtered = equipmentData

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filtrar por rango de precio
    filtered = filtered.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    // Ordenar resultados
    switch (sortBy) {
      case "distance":
        filtered = [...filtered].sort((a, b) => a.distance - b.distance)
        break
      case "price_low":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price_high":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredEquipment(filtered)

    // Actualizar filtros activos
    const newActiveFilters = []
    if (searchTerm) newActiveFilters.push(`Búsqueda: ${searchTerm}`)
    if (selectedCategory !== "all") newActiveFilters.push(`Categoría: ${selectedCategory}`)
    if (priceRange[0] > 0 || priceRange[1] < 80000)
      newActiveFilters.push(`Precio: $${priceRange[0]} - $${priceRange[1]}`)
    setActiveFilters(newActiveFilters)
  }, [searchTerm, selectedCategory, priceRange, sortBy])

  // Función para eliminar un filtro
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Búsqueda:")) {
      setSearchTerm("")
    } else if (filter.startsWith("Categoría:")) {
      setSelectedCategory("all")
    } else if (filter.startsWith("Precio:")) {
      setPriceRange([0, 80000])
    }
  }

  // Renderizar etiqueta de comparación de precio
  const renderPriceComparison = (comparison: string) => {
    switch (comparison) {
      case "cheaper":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Más barato que el promedio
          </Badge>
        )
      case "expensive":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Más caro que el promedio
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Precio promedio
          </Badge>
        )
    }
  }

  // Mostrar notificación toast al cargar la página
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "¡Bienvenido a EQUIPZ!",
        description: "Encuentra los mejores equipos deportivos para alquilar cerca de ti",
        action: (
          <ToastAction altText="Explorar" onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}>
            Explorar
          </ToastAction>
        ),
      })
    }, 1000)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  // Función para navegar a la página de categoría
  const handleCategoryClick = (category: string) => {
    router.push(`/categories?category=${category.toLowerCase()}`)
  }

  // Función para alquilar un equipo
  const handleRent = (id: string) => {
    router.push(`/product/${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#E8F5E9] to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#0F5132]">
                  Alquila equipos deportivos cerca de ti
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Encuentra el equipo perfecto para tus actividades o gana dinero alquilando tus equipos
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form onSubmit={handleSearch} className="relative w-full max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar equipos..."
                    className="w-full bg-background pl-8 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 h-8 bg-[#0F5132] hover:bg-[#0B3E27]"
                  >
                    Buscar
                  </Button>
                </form>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{userLocation}</span>
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setUserLocation("Buenos Aires")}>Buenos Aires</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserLocation("Córdoba")}>Córdoba</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserLocation("Rosario")}>Rosario</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserLocation("Mendoza")}>Mendoza</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserLocation("Bariloche")}>Bariloche</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUserLocation("Mar del Plata")}>
                        Mar del Plata
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filtros</span>
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                        <SheetDescription>Ajusta los filtros para encontrar el equipo perfecto</SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Categoría</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              "Acuáticos",
                              "Montaña",
                              "Camping",
                              "Nieve",
                              "Urbano",
                              "Tecnología",
                              "Pesca",
                              "Observación",
                              "Golf",
                            ].map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={category}
                                  checked={selectedCategory === category.toLowerCase()}
                                  onCheckedChange={() =>
                                    setSelectedCategory(
                                      selectedCategory === category.toLowerCase() ? "all" : category.toLowerCase(),
                                    )
                                  }
                                />
                                <Label htmlFor={category}>{category}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Rango de precio</h3>
                            <span className="text-sm text-muted-foreground">
                              ${priceRange[0]} - ${priceRange[1]}
                            </span>
                          </div>
                          <Slider
                            defaultValue={[0, 80000]}
                            max={80000}
                            step={1000}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="py-4"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Ordenar por</h3>
                          <div className="grid gap-2">
                            {[
                              { id: "distance", label: "Distancia", icon: <Compass className="h-4 w-4 mr-2" /> },
                              {
                                id: "price_low",
                                label: "Precio: menor a mayor",
                                icon: <Tag className="h-4 w-4 mr-2" />,
                              },
                              {
                                id: "price_high",
                                label: "Precio: mayor a menor",
                                icon: <Tag className="h-4 w-4 mr-2" />,
                              },
                              { id: "rating", label: "Mejor valorados", icon: <Star className="h-4 w-4 mr-2" /> },
                            ].map((option) => (
                              <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={option.id}
                                  checked={sortBy === option.id}
                                  onCheckedChange={() => setSortBy(option.id)}
                                />
                                <Label htmlFor={option.id} className="flex items-center">
                                  {option.icon}
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedCategory("all")
                            setPriceRange([0, 80000])
                            setSortBy("distance")
                          }}
                        >
                          Limpiar
                        </Button>
                        <Button className="bg-[#0F5132] hover:bg-[#0B3E27]">Aplicar</Button>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>Ordenar</span>
                        <ChevronDown className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("distance")}>
                        <Compass className="h-4 w-4 mr-2" />
                        Distancia
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price_low")}>
                        <Tag className="h-4 w-4 mr-2" />
                        Precio: menor a mayor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price_high")}>
                        <Tag className="h-4 w-4 mr-2" />
                        Precio: mayor a menor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("rating")}>
                        <Star className="h-4 w-4 mr-2" />
                        Mejor valorados
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </section>

        {activeFilters.length > 0 && (
          <div className="container px-4 md:px-6 py-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filtros activos:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange([0, 80000])
                }}
              >
                Limpiar todos
              </Button>
            </div>
          </div>
        )}

        <section className="w-full py-6 md:py-12 bg-[#F1F8F2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="bg-[#0F5132] text-white border-[#0F5132]">
                  ¡NUEVO!
                </Badge>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-[#0F5132]">
                  Equipos recién añadidos
                </h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Descubre los últimos equipos deportivos disponibles para alquilar
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {equipmentData
                  .slice(-8)
                  .reverse()
                  .map((item) => (
                    <Link href={`/product/${item.id.toString()}`} key={item.id} className="group">
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={300}
                            height={200}
                            className="object-cover w-full h-48"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-white text-[#0F5132] hover:bg-white">
                              <Star className="h-3 w-3 fill-[#0F5132] text-[#0F5132] mr-1" />
                              {item.rating}
                            </Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-[#0F5132] text-white">Nuevo</Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{item.location}</span>
                                <span className="text-xs">({item.distance} km)</span>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-[#E8F5E9] text-[#0F5132] border-[#C8E6C9] cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault()
                                router.push(`/categories?category=${item.category.toLowerCase()}`)
                              }}
                            >
                              {item.category}
                            </Badge>
                          </div>
                          <div className="mt-2">{renderPriceComparison(item.priceComparison)}</div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="font-semibold text-[#0F5132]">${item.price} / día</div>
                            <Button
                              size="sm"
                              className="bg-[#0F5132] hover:bg-[#0B3E27]"
                              onClick={(e) => {
                                e.preventDefault()
                                router.push(`/product/${item.id}`)
                              }}
                            >
                              Alquilar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2 w-full">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-[#0F5132]">
                  {filteredEquipment.length > 0
                    ? `${filteredEquipment.length} equipos disponibles`
                    : "No se encontraron equipos con estos filtros"}
                </h2>
                <Tabs
                  defaultValue={selectedCategory === "all" ? "all" : selectedCategory}
                  onValueChange={(value) => {
                    if (value === "all") {
                      setSelectedCategory("all")
                    } else {
                      router.push(`/categories?category=${value}`)
                    }
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-4 md:grid-cols-9">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="acuáticos">Acuáticos</TabsTrigger>
                    <TabsTrigger value="montaña">Montaña</TabsTrigger>
                    <TabsTrigger value="camping">Camping</TabsTrigger>
                    <TabsTrigger value="nieve">Nieve</TabsTrigger>
                    <TabsTrigger value="urbano">Urbano</TabsTrigger>
                    <TabsTrigger value="tecnología">Tecnología</TabsTrigger>
                    <TabsTrigger value="pesca">Pesca</TabsTrigger>
                    <TabsTrigger value="golf">Golf</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {filteredEquipment.map((item) => (
                        <Link href={`/product/${item.id.toString()}`} key={item.id} className="group">
                          <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={300}
                                height={200}
                                className="object-cover w-full h-48"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-white text-[#0F5132] hover:bg-white">
                                  <Star className="h-3 w-3 fill-[#0F5132] text-[#0F5132] mr-1" />
                                  {item.rating}
                                </Badge>
                              </div>
                              {Number.parseInt(item.id) > 23 && (
                                <div className="absolute top-2 left-2">
                                  <Badge className="bg-[#0F5132] text-white">Nuevo</Badge>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{item.title}</h3>
                                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{item.location}</span>
                                    <span className="text-xs">({item.distance} km)</span>
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="bg-[#E8F5E9] text-[#0F5132] border-[#C8E6C9] cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    router.push(`/categories?category=${item.category.toLowerCase()}`)
                                  }}
                                >
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="mt-2">{renderPriceComparison(item.priceComparison)}</div>
                              <div className="flex items-center justify-between mt-4">
                                <div className="font-semibold text-[#0F5132]">${item.price} / día</div>
                                <Button
                                  size="sm"
                                  className="bg-[#0F5132] hover:bg-[#0B3E27]"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    router.push(`/product/${item.id}`)
                                  }}
                                >
                                  Alquilar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  {/* No necesitamos el resto de TabsContent ya que redirigimos a la página de categorías */}
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-[#E8F5E9]">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-[#0F5132] px-3 py-1 text-sm text-white">
                  Para Proveedores
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#0F5132]">
                  Gana dinero alquilando tus equipos
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  ¿Tienes equipos deportivos o recreativos que no usas? Conviértelos en una fuente de ingresos
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-[#0F5132] hover:bg-[#0B3E27]" asChild>
                    <Link href="/register?tab=provider">Convertirse en Proveedor</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#0F5132] text-[#0F5132]" asChild>
                    <Link href="/mvp">Saber más</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/images/provider-banner.png"
                width={600}
                height={400}
                alt="Proveedor de equipos"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#0F5132]">Cómo funciona</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Alquilar o ofrecer equipos es fácil con nuestra plataforma
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F5132] text-white">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-[#0F5132]">Busca y Reserva</h3>
                  <p className="text-muted-foreground">
                    Encuentra el equipo que necesitas, verifica disponibilidad y reserva en minutos
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F5132] text-white">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-[#0F5132]">Recoge o Recibe</h3>
                  <p className="text-muted-foreground">
                    Coordina con el proveedor para recoger el equipo o recíbelo a domicilio
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F5132] text-white">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-[#0F5132]">Disfruta y Devuelve</h3>
                  <p className="text-muted-foreground">
                    Disfruta de tu actividad y devuelve el equipo en la fecha acordada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-[#F1F8F2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-[#0F5132]">
                  Equipos populares cerca de ti
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {filteredEquipment.slice(0, 4).map((item) => (
                  <Link href={`/product/${item.id.toString()}`} key={item.id} className="group">
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={150}
                        className="object-cover w-full h-32 transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                        <h3 className="text-sm font-medium text-white">{item.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white">${item.price}/día</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-white mr-1" />
                            <span className="text-xs text-white">{item.distance} km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Image src="/images/logo.png" alt="EQUIPZ Logo" width={30} height={30} />
              <span className="text-[#0F5132]">EQUIPZ</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2025 EQUIPZ. Todos los derechos reservados.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#0F5132]">
              Términos
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#0F5132]">
              Privacidad
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-[#0F5132]">
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
