"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { MapPin, Star } from "lucide-react"

// Categorías disponibles
const categories = [
  { id: "acuáticos", name: "Acuáticos", icon: "🏄‍♂️", count: 8 },
  { id: "montaña", name: "Montaña", icon: "🏔️", count: 12 },
  { id: "camping", name: "Camping", icon: "⛺", count: 6 },
  { id: "nieve", name: "Nieve", icon: "🏂", count: 5 },
  { id: "urbano", name: "Urbano", icon: "🛴", count: 7 },
  { id: "tecnología", name: "Tecnología", icon: "📷", count: 4 },
  { id: "pesca", name: "Pesca", icon: "🎣", count: 3 },
  { id: "observación", name: "Observación", icon: "🔭", count: 2 },
  { id: "golf", name: "Golf", icon: "⛳", count: 1 },
]

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
  },
]

export default function CategoriesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || null)
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData)

  // Actualizar la categoría seleccionada cuando cambia el parámetro de URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  // Filtrar equipos por categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      const filtered = equipmentData.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
      setFilteredEquipment(filtered)
    } else {
      setFilteredEquipment(equipmentData)
    }
  }, [selectedCategory])

  // Función para cambiar la categoría seleccionada
  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? null : category
    setSelectedCategory(newCategory)

    // Actualizar la URL con el parámetro de categoría
    if (newCategory) {
      router.push(`/categories?category=${newCategory}`)
    } else {
      router.push("/categories")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-[#E8F5E9] to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#0F5132]">
                  Categorías de Equipos
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explora nuestra amplia variedad de equipos deportivos y recreativos por categoría
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`h-auto py-4 flex flex-col items-center justify-center gap-2 ${
                    selectedCategory === category.id ? "bg-[#0F5132] hover:bg-[#0B3E27]" : ""
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="mt-1">
                    {category.count} equipos
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-[#F1F8F2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-[#0F5132]">
                {selectedCategory
                  ? `Equipos de ${
                      categories.find((c) => c.id === selectedCategory)?.name || selectedCategory
                    } (${filteredEquipment.length})`
                  : "Todos los equipos"}
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
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

              {filteredEquipment.length === 0 && (
                <div className="w-full py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron equipos en esta categoría.</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-[#0F5132] text-[#0F5132]"
                    onClick={() => handleCategoryChange("")}
                  >
                    Ver todas las categorías
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
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
