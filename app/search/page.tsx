"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Star, X } from "lucide-react"
import { MainNav } from "@/components/main-nav"

// Datos de ejemplo de equipos
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
  },
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
  },
]

// Categorías disponibles
const categories = ["Acuáticos", "Montaña", "Camping", "Nieve", "Urbano", "Tecnología", "Pesca", "Observación", "Golf"]

// Ubicaciones disponibles
const locations = ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Bariloche", "Mar del Plata", "Salta", "Tigre"]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filtrar equipos
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

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => selectedCategories.includes(item.category))
    }

    // Filtrar por ubicaciones
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((item) => selectedLocations.includes(item.location))
    }

    // Filtrar por rango de precio
    filtered = filtered.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    // Filtrar por calificación mínima
    if (minRating > 0) {
      filtered = filtered.filter((item) => item.rating >= minRating)
    }

    setFilteredEquipment(filtered)

    // Actualizar filtros activos
    const newActiveFilters = []
    if (searchTerm) newActiveFilters.push(`Búsqueda: ${searchTerm}`)
    if (selectedCategories.length > 0) newActiveFilters.push(`Categorías: ${selectedCategories.join(", ")}`)
    if (selectedLocations.length > 0) newActiveFilters.push(`Ubicaciones: ${selectedLocations.join(", ")}`)
    if (priceRange[0] > 0 || priceRange[1] < 50000)
      newActiveFilters.push(`Precio: $${priceRange[0]} - $${priceRange[1]}`)
    if (minRating > 0) newActiveFilters.push(`Calificación mínima: ${minRating}`)
    setActiveFilters(newActiveFilters)
  }, [searchTerm, selectedCategories, selectedLocations, priceRange, minRating])

  // Función para eliminar un filtro
  const removeFilter = (filter: string) => {
    if (filter.startsWith("Búsqueda:")) {
      setSearchTerm("")
    } else if (filter.startsWith("Categorías:")) {
      setSelectedCategories([])
    } else if (filter.startsWith("Ubicaciones:")) {
      setSelectedLocations([])
    } else if (filter.startsWith("Precio:")) {
      setPriceRange([0, 50000])
    } else if (filter.startsWith("Calificación")) {
      setMinRating(0)
    }
  }

  // Manejar cambio de categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Manejar cambio de ubicación
  const handleLocationChange = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda ya se realiza automáticamente por el useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 bg-gradient-to-b from-[#E8F5E9] to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#0F5132]">
                  Buscar Equipos
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Encuentra el equipo perfecto para tus actividades
                </p>
              </div>
              <div className="w-full max-w-md">
                <form onSubmit={handleSearch} className="relative w-full">
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
                  setSelectedCategories([])
                  setSelectedLocations([])
                  setPriceRange([0, 50000])
                  setMinRating(0)
                }}
              >
                Limpiar todos
              </Button>
            </div>
          </div>
        )}

        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Filtros */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Filtros</h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Categorías</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Ubicación</h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => handleLocationChange(location)}
                          />
                          <Label htmlFor={`location-${location}`}>{location}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Rango de precio</h4>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 50000]}
                      max={50000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Calificación mínima</h4>
                    <div className="flex items-center space-x-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <Button
                          key={rating}
                          variant={minRating === rating ? "default" : "outline"}
                          size="sm"
                          className={minRating === rating ? "bg-[#0F5132] hover:bg-[#0B3E27]" : ""}
                          onClick={() => setMinRating(rating)}
                        >
                          {rating > 0 ? (
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              {rating}+
                            </div>
                          ) : (
                            "Todos"
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {filteredEquipment.length} {filteredEquipment.length === 1 ? "resultado" : "resultados"}
                </h3>
              </div>

              {filteredEquipment.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                            <Badge variant="outline" className="bg-[#E8F5E9] text-[#0F5132] border-[#C8E6C9]">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="font-semibold text-[#0F5132]">${item.price} / día</div>
                            <Button size="sm" className="bg-[#0F5132] hover:bg-[#0B3E27]">
                              Alquilar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                  <p className="text-muted-foreground mb-4">
                    No hay equipos que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategories([])
                      setSelectedLocations([])
                      setPriceRange([0, 50000])
                      setMinRating(0)
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <img src="/images/logo.png" alt="EQUIPZ Logo" width={30} height={30} />
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
