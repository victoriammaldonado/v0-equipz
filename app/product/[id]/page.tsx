"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, CalendarIcon, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/components/main-nav"

// Actualizar los precios en la página de producto
const productsData = [
  {
    id: "1",
    title: "Kayak Naranja",
    description:
      "Kayak naranja profesional ideal para ríos y lagos. Excelente estado, estable y fácil de maniobrar. Incluye remo de alta calidad.",
    price: 18000,
    location: "Buenos Aires, Argentina",
    distance: 1.2,
    category: "Acuáticos",
    rating: 4.8,
    reviews: 24,
    avgPrice: 20000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Carlos Martínez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      since: "2023",
      responseTime: "1 hora",
    },
    images: ["/images/kayak.png", "/images/kayak.png", "/images/kayak.png"],
    features: [
      "Longitud: 3.2 metros",
      "Material: Polietileno de alta densidad",
      "Incluye: Remo de aluminio",
      "Capacidad: 1 persona (hasta 100kg)",
      "Ideal para aguas tranquilas y ríos",
    ],
    similarProducts: [
      {
        id: "21",
        title: "Kayak Inflable",
        price: 35000,
        image: "/images/kayak-inflable.png",
        distance: 2.6,
        rating: 4.6,
      },
      {
        id: "22",
        title: "Canoa",
        price: 45000,
        image: "/images/canoa.png",
        distance: 2.8,
        rating: 4.7,
      },
      {
        id: "3",
        title: "Tabla de Surf",
        price: 12000,
        image: "/images/tabla-surf.png",
        distance: 3.7,
        rating: 4.3,
      },
    ],
  },
  {
    id: "2",
    title: "Bicicleta de Montaña",
    description:
      "Bicicleta de montaña en excelente estado, ideal para rutas de dificultad media. Suspensión delantera y frenos de disco.",
    price: 3500,
    location: "Córdoba, Argentina",
    distance: 3.5,
    category: "Montaña",
    rating: 4.6,
    reviews: 18,
    avgPrice: 3500,
    priceComparison: "average",
    availability: true,
    owner: {
      name: "Laura Gómez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      since: "2022",
      responseTime: "30 minutos",
    },
    images: ["/images/bicicleta.png", "/images/bicicleta.png", "/images/bicicleta.png"],
    features: [
      "Talla M (para altura 165-175cm)",
      "Suspensión delantera",
      "Frenos de disco hidráulicos",
      "Cambios Shimano 21 velocidades",
      "Incluye casco y kit de reparación",
    ],
    similarProducts: [
      {
        id: "13",
        title: "Bicicleta de Montaña Premium",
        price: 4500,
        image: "/images/bicicleta2.png",
        distance: 4.2,
        rating: 4.5,
      },
      {
        id: "20",
        title: "Scooter Eléctrico",
        price: 5500,
        image: "/images/scooter.png",
        distance: 2.8,
        rating: 4.9,
      },
      {
        id: "15",
        title: "Bastones de Trekking",
        price: 1200,
        image: "/images/bastones.png",
        distance: 1.5,
        rating: 4.4,
      },
    ],
  },
  {
    id: "3",
    title: "Patines en Línea",
    description:
      "Patines en línea de alta calidad, ideales para uso urbano o recreativo. Talla ajustable y ruedas de alto rendimiento.",
    price: 15000,
    location: "Rosario, Argentina",
    distance: 2.8,
    category: "Urbano",
    rating: 4.7,
    reviews: 15,
    avgPrice: 17000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Ana López",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      since: "2023",
      responseTime: "2 horas",
    },
    images: ["/images/patines.png", "/images/patines.png", "/images/patines.png"],
    features: [
      "Talla ajustable (38-42 EU)",
      "Ruedas de poliuretano de 80mm",
      "Rodamientos ABEC-7",
      "Cierre de seguridad con hebilla y velcro",
      "Incluye bolsa de transporte",
    ],
    similarProducts: [
      {
        id: "26",
        title: "Patines Profesionales",
        price: 15000,
        image: "/images/patines-negros.png",
        distance: 1.1,
        rating: 4.7,
      },
      {
        id: "20",
        title: "Scooter Eléctrico",
        price: 18000,
        image: "/images/scooter.png",
        distance: 1.3,
        rating: 4.5,
      },
      {
        id: "2",
        title: "Bicicleta de Montaña",
        price: 12000,
        image: "/images/bicicleta.png",
        distance: 3.5,
        rating: 4.6,
      },
    ],
  },
  {
    id: "9",
    title: "Mochila de Trekking",
    description:
      "Mochila de trekking de alta resistencia, ideal para excursiones de varios días. Múltiples compartimentos y sistema de soporte ergonómico.",
    price: 2500,
    location: "Salta, Argentina",
    distance: 3.2,
    category: "Montaña",
    rating: 4.5,
    reviews: 8,
    avgPrice: 2800,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Martín Rodríguez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      since: "2023",
      responseTime: "2 horas",
    },
    images: [
      "/images/mochila-trekking-verde.png",
      "/images/mochila-trekking-verde.png",
      "/images/mochila-trekking-verde.png",
    ],
    features: [
      "Capacidad: 60 litros",
      "Material: Nylon impermeable",
      "Sistema de soporte ajustable",
      "Múltiples compartimentos",
      "Incluye cubierta para lluvia",
    ],
    similarProducts: [
      {
        id: "15",
        title: "Bastones de Trekking",
        price: 1200,
        image: "/images/bastones.png",
        distance: 2.2,
        rating: 4.3,
      },
      {
        id: "4",
        title: "Carpa para 4 Personas",
        price: 4000,
        image: "/images/carpa.png",
        distance: 5.1,
        rating: 4.5,
      },
      {
        id: "16",
        title: "Colchoneta de Camping",
        price: 800,
        image: "/images/colchoneta.png",
        distance: 1.4,
        rating: 4.1,
      },
    ],
  },
  // Nuevos productos con las imágenes proporcionadas
  {
    id: "24",
    title: "Bicicleta Montaña Premium",
    description:
      "Bicicleta de montaña de alta gama con cuadro de carbono, suspensión completa y componentes de primera calidad. Ideal para rutas técnicas y descensos.",
    price: 8500,
    location: "Córdoba, Argentina",
    distance: 2.4,
    category: "Montaña",
    rating: 4.9,
    reviews: 27,
    avgPrice: 9000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Diego Fernández",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      since: "2022",
      responseTime: "15 minutos",
    },
    images: [
      "/images/bicicleta-montana-verde.png",
      "/images/bicicleta-montana-verde.png",
      "/images/bicicleta-montana-verde.png",
    ],
    features: [
      "Cuadro de carbono ultraligero",
      "Suspensión delantera y trasera ajustable",
      "Frenos hidráulicos de alto rendimiento",
      "Cambios electrónicos de 12 velocidades",
      "Ruedas tubeless de 29 pulgadas",
    ],
    similarProducts: [
      {
        id: "2",
        title: "Bicicleta de Montaña",
        price: 3500,
        image: "/images/bicicleta.png",
        distance: 3.5,
        rating: 4.6,
      },
      {
        id: "15",
        title: "Bastones de Trekking",
        price: 1200,
        image: "/images/bastones.png",
        distance: 2.2,
        rating: 4.3,
      },
      {
        id: "9",
        title: "Mochila de Trekking",
        price: 2500,
        image: "/images/mochila-trekking-verde.png",
        distance: 3.2,
        rating: 4.5,
      },
    ],
  },
  {
    id: "25",
    title: "Kayak Amarillo Profesional",
    description:
      "Kayak amarillo de alta estabilidad para aguas tranquilas y ríos. Fabricado con materiales de primera calidad y diseñado para máxima comodidad y rendimiento.",
    price: 6000,
    location: "Tigre, Argentina",
    distance: 1.7,
    category: "Acuáticos",
    rating: 4.8,
    reviews: 19,
    avgPrice: 6200,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Ana Gutiérrez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      since: "2023",
      responseTime: "45 minutos",
    },
    images: ["/images/kayak-amarillo.png", "/images/kayak-amarillo.png", "/images/kayak-amarillo.png"],
    features: [
      "Longitud: 3.5 metros",
      "Material: Polietileno rotomoldeado de alta densidad",
      "Asiento ergonómico ajustable",
      "Compartimentos impermeables",
      "Incluye remo de aluminio y chaleco salvavidas",
    ],
    similarProducts: [
      {
        id: "1",
        title: "Kayak Naranja",
        price: 5000,
        image: "/images/kayak.png",
        distance: 1.2,
        rating: 4.8,
      },
      {
        id: "21",
        title: "Kayak Inflable",
        price: 12000,
        image: "/images/kayak-inflable.png",
        distance: 2.6,
        rating: 4.6,
      },
      {
        id: "22",
        title: "Canoa",
        price: 15000,
        image: "/images/canoa.png",
        distance: 2.8,
        rating: 4.7,
      },
    ],
  },
  {
    id: "26",
    title: "Patines Profesionales",
    description:
      "Patines en línea de alta gama con botas reforzadas y ruedas de competición. Ideales para patinaje urbano, slalom o velocidad.",
    price: 3200,
    location: "Buenos Aires, Argentina",
    distance: 1.1,
    category: "Urbano",
    rating: 4.7,
    reviews: 23,
    avgPrice: 3500,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Lucía Méndez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
      since: "2022",
      responseTime: "1 hora",
    },
    images: ["/images/patines-negros.png", "/images/patines-negros.png", "/images/patines-negros.png"],
    features: [
      "Botas de alta resistencia con cierre de velcro y hebilla",
      "Ruedas de 80mm/85A para máxima velocidad y durabilidad",
      "Rodamientos ABEC-9 de alta precisión",
      "Chasis de aluminio reforzado",
      "Freno desmontable de alta calidad",
    ],
    similarProducts: [
      {
        id: "3",
        title: "Patines en Línea",
        price: 2000,
        image: "/images/patines.png",
        distance: 2.8,
        rating: 4.7,
      },
      {
        id: "20",
        title: "Scooter Eléctrico",
        price: 5500,
        image: "/images/scooter.png",
        distance: 1.3,
        rating: 4.5,
      },
      {
        id: "24",
        title: "Bicicleta Montaña Premium",
        price: 8500,
        image: "/images/bicicleta-montana-verde.png",
        distance: 2.4,
        rating: 4.9,
      },
    ],
  },
  {
    id: "27",
    title: "Carpa Familiar Azul",
    description:
      "Carpa familiar para 4-6 personas, impermeable y de fácil montaje. Perfecta para camping, festivales o excursiones de fin de semana.",
    price: 4800,
    location: "Mendoza, Argentina",
    distance: 3.3,
    category: "Camping",
    rating: 4.6,
    reviews: 14,
    avgPrice: 4500,
    priceComparison: "expensive",
    availability: true,
    owner: {
      name: "Roberto Sánchez",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      since: "2021",
      responseTime: "2 horas",
    },
    images: ["/images/carpa-azul.png", "/images/carpa-azul.png", "/images/carpa-azul.png"],
    features: [
      "Capacidad: 4-6 personas",
      "Material: Poliéster impermeable con costuras selladas",
      "Estructura de fibra de vidrio resistente",
      "Doble capa con sobretecho",
      "Incluye bolsa de transporte y estacas reforzadas",
    ],
    similarProducts: [
      {
        id: "4",
        title: "Carpa para 4 Personas",
        price: 4000,
        image: "/images/carpa.png",
        distance: 5.1,
        rating: 4.5,
      },
      {
        id: "14",
        title: "Carpa de Pesca",
        price: 5500,
        image: "/images/carpa-pesca.png",
        distance: 3.9,
        rating: 4.4,
      },
      {
        id: "16",
        title: "Colchoneta de Camping",
        price: 800,
        image: "/images/colchoneta.png",
        distance: 1.4,
        rating: 4.1,
      },
    ],
  },
  {
    id: "28",
    title: "Esquís Rojos Competición",
    description:
      "Esquís de competición de alta gama, ideales para esquiadores avanzados. Excelente respuesta en todo tipo de nieve y condiciones.",
    price: 7500,
    location: "Bariloche, Argentina",
    distance: 2.1,
    category: "Nieve",
    rating: 4.9,
    reviews: 31,
    avgPrice: 8000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Javier Morales",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      since: "2020",
      responseTime: "30 minutos",
    },
    images: ["/images/esquis-rojos.png", "/images/esquis-rojos.png", "/images/esquis-rojos.png"],
    features: [
      "Longitud: 170cm",
      "Núcleo de madera con refuerzo de titanio",
      "Cantos de acero templado",
      "Diseño para máxima velocidad y control",
      "Incluye bastones de carbono y bolsa de transporte",
    ],
    similarProducts: [
      {
        id: "5",
        title: "Esquís Profesionales",
        price: 6000,
        image: "/images/esquis.png",
        distance: 1.5,
        rating: 4.9,
      },
      {
        id: "13",
        title: "Raquetas para Nieve",
        price: 4500,
        image: "/images/raquetas-nieve.png",
        distance: 2.7,
        rating: 4.6,
      },
      {
        id: "19",
        title: "Traje de Neopreno",
        price: 9000,
        image: "/images/traje-neopreno-negro.png",
        distance: 3.1,
        rating: 4.8,
      },
    ],
  },
  {
    id: "29",
    title: "Mochila Expedición 70L",
    description:
      "Mochila de expedición de gran capacidad (70L) con sistema de carga ergonómico. Ideal para trekking de varios días o viajes de mochilero.",
    price: 5500,
    location: "Salta, Argentina",
    distance: 2.8,
    category: "Montaña",
    rating: 4.8,
    reviews: 16,
    avgPrice: 5800,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Gabriela Torres",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      since: "2022",
      responseTime: "1 hora",
    },
    images: [
      "/images/mochila-trekking-verde.png",
      "/images/mochila-trekking-verde.png",
      "/images/mochila-trekking-verde.png",
    ],
    features: [
      "Capacidad: 70 litros",
      "Material: Cordura ripstop ultraresistente",
      "Sistema de carga ajustable con soporte lumbar",
      "Múltiples compartimentos y acceso frontal",
      "Funda impermeable integrada",
    ],
    similarProducts: [
      {
        id: "9",
        title: "Mochila de Trekking",
        price: 2500,
        image: "/images/mochila.png",
        distance: 3.2,
        rating: 4.5,
      },
      {
        id: "15",
        title: "Bastones de Trekking",
        price: 1200,
        image: "/images/bastones.png",
        distance: 2.2,
        rating: 4.3,
      },
      {
        id: "4",
        title: "Carpa para 4 Personas",
        price: 4000,
        image: "/images/carpa.png",
        distance: 5.1,
        rating: 4.5,
      },
    ],
  },
  {
    id: "30",
    title: "Traje Neopreno Profesional",
    description:
      "Traje de neopreno de 3mm para deportes acuáticos. Ofrece excelente aislamiento térmico y flexibilidad para surf, buceo o natación en aguas frías.",
    price: 12000,
    location: "Mar del Plata, Argentina",
    distance: 2.5,
    category: "Acuáticos",
    rating: 4.9,
    reviews: 22,
    avgPrice: 13000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Martín Acosta",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      since: "2021",
      responseTime: "20 minutos",
    },
    images: [
      "/images/traje-neopreno-negro.png",
      "/images/traje-neopreno-negro.png",
      "/images/traje-neopreno-negro.png",
    ],
    features: [
      "Grosor: 3mm para aguas templadas/frías",
      "Material: Neopreno elástico con costuras selladas",
      "Cremallera dorsal YKK con tirador largo",
      "Refuerzos en rodillas y codos",
      "Cuello ajustable con velcro",
    ],
    similarProducts: [
      {
        id: "19",
        title: "Traje de Neopreno",
        price: 9000,
        image: "/images/traje-neopreno.png",
        distance: 3.1,
        rating: 4.8,
      },
      {
        id: "1",
        title: "Kayak Naranja",
        price: 5000,
        image: "/images/kayak.png",
        distance: 1.2,
        rating: 4.8,
      },
      {
        id: "6",
        title: "Equipo de Snorkel",
        price: 1500,
        image: "/images/snorkel.png",
        distance: 4.2,
        rating: 4.4,
      },
    ],
  },
  {
    id: "31",
    title: "Set Completo de Golf",
    description:
      "Set completo de palos de golf para jugadores de nivel intermedio a avanzado. Incluye todos los palos necesarios y bolsa de transporte.",
    price: 18000,
    location: "Buenos Aires, Argentina",
    distance: 3.2,
    category: "Golf",
    rating: 4.8,
    reviews: 17,
    avgPrice: 20000,
    priceComparison: "cheaper",
    availability: true,
    owner: {
      name: "Eduardo Blanco",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      since: "2022",
      responseTime: "1 hora",
    },
    images: ["/images/bolsa-golf.png", "/images/bolsa-golf.png", "/images/bolsa-golf.png"],
    features: [
      "Set completo: 14 palos (drivers, hierros, wedges y putter)",
      "Bolsa de transporte con soporte y múltiples bolsillos",
      "Palos con shaft de grafito y cabezas de aleación",
      "Grips ergonómicos antideslizantes",
      "Incluye fundas protectoras para drivers",
    ],
    similarProducts: [
      {
        id: "10",
        title: "Binoculares Profesionales",
        price: 3000,
        image: "/images/binoculares.png",
        distance: 4.5,
        rating: 4.8,
      },
      {
        id: "11",
        title: "Cámara de Acción",
        price: 8000,
        image: "/images/camara.png",
        distance: 2.1,
        rating: 4.9,
      },
      {
        id: "18",
        title: "GPS de Mano",
        price: 7000,
        image: "/images/gps.png",
        distance: 1.9,
        rating: 4.7,
      },
    ],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const [product, setProduct] = useState<any>(null)
  const [selectedDates, setSelectedDates] = useState<any>({
    from: undefined,
    to: undefined,
  })
  const [totalDays, setTotalDays] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [hasReserved, setHasReserved] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactMessage, setContactMessage] = useState("")

  // Cargar datos del producto
  useEffect(() => {
    // Convertir el id a string para asegurar la comparación correcta
    const foundProduct = productsData.find((p) => p.id === params.id)

    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      // Si no se encuentra el producto con el ID exacto, usar el primer producto como fallback
      setProduct(productsData[0])
      console.log(`Producto con ID ${params.id} no encontrado, mostrando producto por defecto`)
    }
  }, [params.id])

  // Calcular días totales cuando cambian las fechas
  useEffect(() => {
    if (selectedDates.from && selectedDates.to) {
      const diffTime = Math.abs(selectedDates.to.getTime() - selectedDates.from.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setTotalDays(diffDays)
    } else {
      setTotalDays(0)
    }
  }, [selectedDates])

  // Mostrar notificación de reserva
  const showReservationNotification = () => {
    if (!isLoggedIn) {
      toast({
        title: "Inicia sesión para reservar",
        description: "Debes iniciar sesión para poder reservar este equipo",
        action: (
          <ToastAction altText="Iniciar sesión" onClick={() => router.push("/login")}>
            Iniciar sesión
          </ToastAction>
        ),
        variant: "destructive",
      })
      return
    }

    if (totalDays > 0) {
      setHasReserved(true)

      // Guardar la reserva en localStorage
      const reservations = JSON.parse(localStorage.getItem("equipz_reservations") || "[]")
      const newReservation = {
        id: Date.now().toString(),
        productId: product.id,
        productTitle: product.title,
        productImage: product.image || product.images[0],
        startDate: selectedDates.from,
        endDate: selectedDates.to,
        totalDays,
        totalPrice: product.price * totalDays + Math.round(product.price * totalDays * 0.1),
        status: "Confirmada",
        ownerName: product.owner.name,
        ownerImage: product.owner.image,
        createdAt: new Date(),
      }
      reservations.push(newReservation)
      localStorage.setItem("equipz_reservations", JSON.stringify(reservations))

      toast({
        title: "Reserva realizada",
        description: `Has reservado ${product.title} por ${totalDays} días`,
        action: (
          <ToastAction altText="Ver" onClick={() => router.push("/reservations")}>
            Ver mis reservas
          </ToastAction>
        ),
      })
    } else {
      toast({
        title: "Selecciona fechas",
        description: "Debes seleccionar fechas para realizar la reserva",
        variant: "destructive",
      })
    }
  }

  // Función para contactar al propietario
  const handleContact = () => {
    if (!isLoggedIn) {
      toast({
        title: "Inicia sesión para contactar",
        description: "Debes iniciar sesión para poder contactar al propietario",
        action: (
          <ToastAction altText="Iniciar sesión" onClick={() => router.push("/login")}>
            Iniciar sesión
          </ToastAction>
        ),
        variant: "destructive",
      })
      return
    }

    if (!hasReserved) {
      toast({
        title: "Realiza una reserva primero",
        description: "Debes realizar una reserva para contactar al propietario",
        variant: "destructive",
      })
      return
    }

    // Simular envío de mensaje
    toast({
      title: "Mensaje enviado",
      description: `Tu mensaje ha sido enviado a ${product.owner.name}`,
    })
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  // Renderizar etiqueta de comparación de precio
  const renderPriceComparison = (comparison: string) => {
    switch (comparison) {
      case "cheaper":
        return (
          <div className="flex items-center text-green-600 text-sm mt-2">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Más barato que el promedio (${product.avgPrice})</span>
          </div>
        )
      case "expensive":
        return (
          <div className="flex items-center text-amber-600 text-sm mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Más caro que el promedio (${product.avgPrice})</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Precio promedio en la zona</span>
          </div>
        )
    }
  }

  // Verificar que similarProducts tenga IDs válidos antes de renderizar
  const validSimilarProducts =
    product?.similarProducts?.filter(
      (item) =>
        // Asegurarse de que el ID existe y es válido
        item && item.id && item.image && item.title && item.price,
    ) || []

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-[#E8F5E9] text-[#0F5132] border-[#C8E6C9] cursor-pointer"
                    onClick={() => router.push(`/categories?category=${product.category.toLowerCase()}`)}
                  >
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{product.location}</span>
                    <span className="text-xs">({product.distance} km)</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-[#0F5132]">{product.title}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-[#0F5132] text-[#0F5132]" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    <span className="ml-1 text-sm text-muted-foreground">({product.reviews} reseñas)</span>
                  </div>
                  {renderPriceComparison(product.priceComparison)}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  width={600}
                  height={400}
                  className="aspect-[4/3] rounded-lg object-cover sm:col-span-2 lg:col-span-3"
                />
                <img
                  src={product.images[1] || "/placeholder.svg"}
                  alt={`${product.title} - vista alternativa 1`}
                  width={300}
                  height={200}
                  className="aspect-[4/3] rounded-lg object-cover"
                />
                <img
                  src={product.images[2] || "/placeholder.svg"}
                  alt={`${product.title} - vista alternativa 2`}
                  width={300}
                  height={200}
                  className="aspect-[4/3] rounded-lg object-cover"
                />
              </div>
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Descripción</TabsTrigger>
                  <TabsTrigger value="features">Características</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <p className="text-muted-foreground">{product.description}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-[#0F5132]">Productos similares cerca de ti</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {validSimilarProducts.map((item: any) => (
                        <Link href={`/product/${item.id}`} key={item.id} className="group">
                          <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                width={200}
                                height={150}
                                className="object-cover w-full h-32"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-white text-[#0F5132] hover:bg-white">
                                  <Star className="h-3 w-3 fill-[#0F5132] text-[#0F5132] mr-1" />
                                  {item.rating}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <h4 className="font-medium text-sm truncate">{item.title}</h4>
                              <div className="flex items-center justify-between mt-1">
                                <div className="font-semibold text-sm text-[#0F5132]">${item.price}/día</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{item.distance} km</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="mt-4 border-[#0F5132] text-[#0F5132]"
                      onClick={() => setIsComparing(!isComparing)}
                    >
                      {isComparing ? "Ocultar comparación" : "Comparar precios"}
                    </Button>

                    {isComparing && (
                      <div className="mt-4 border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Comparación de precios</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-[#0F5132] mr-2"></div>
                              <span>Este producto</span>
                            </div>
                            <span className="font-semibold">${product.price}/día</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
                              <span>Precio promedio en la zona</span>
                            </div>
                            <span>${product.avgPrice}/día</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                              <span>Producto más caro</span>
                            </div>
                            <span>
                              ${Math.max(...(product.similarProducts?.map((p: any) => p.price) || [0]), product.price)}
                              /día
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                              <span>Producto más barato</span>
                            </div>
                            <span>
                              $
                              {Math.min(
                                ...(product.similarProducts?.map((p: any) => p.price) || [Number.POSITIVE_INFINITY]),
                                product.price,
                              )}
                              /día
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm">
                            {product.priceComparison === "cheaper" ? (
                              <p className="text-green-600">
                                Este producto está por debajo del precio promedio en la zona.
                              </p>
                            ) : product.priceComparison === "expensive" ? (
                              <p className="text-amber-600">
                                Este producto está por encima del precio promedio en la zona.
                              </p>
                            ) : (
                              <p className="text-gray-600">Este producto tiene un precio promedio para la zona.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="features" className="pt-4">
                  <ul className="grid gap-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0F5132]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="reviews" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Usuario Ejemplo</h4>
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 5 ? "fill-[#0F5132] text-[#0F5132]" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Abril 2025</p>
                        <p className="text-sm">
                          Excelente {product.title.toLowerCase()}, muy{" "}
                          {product.category === "Acuáticos" ? "estable en el agua" : "cómodo de usar"}. El dueño fue muy
                          amable y me dio buenos consejos.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@usuario2" />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Otro Usuario</h4>
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 4 ? "fill-[#0F5132] text-[#0F5132]" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Marzo 2025</p>
                        <p className="text-sm">
                          Muy buena experiencia. El {product.title.toLowerCase()} estaba en perfectas condiciones y el
                          proceso de alquiler fue muy sencillo.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="text-2xl font-bold text-[#0F5132]">
                        ${product.price} <span className="text-sm font-normal text-muted-foreground">/ día</span>
                      </div>
                      <Badge
                        variant={product.availability ? "outline" : "secondary"}
                        className={product.availability ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {product.availability ? "Disponible" : "No disponible"}
                      </Badge>
                    </div>
                    {renderPriceComparison(product.priceComparison)}
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Selecciona fechas</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Selecciona fechas de alquiler</span>
                        </div>
                        <Calendar
                          mode="range"
                          selected={selectedDates}
                          onSelect={setSelectedDates}
                          className="border rounded-md p-3"
                        />
                      </div>
                    </div>

                    {totalDays > 0 && (
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex justify-between text-sm">
                          <span>
                            ${product.price} x {totalDays} días
                          </span>
                          <span>${product.price * totalDays}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tarifa de servicio</span>
                          <span>${Math.round(product.price * totalDays * 0.1)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                          <span>Total</span>
                          <span>${product.price * totalDays + Math.round(product.price * totalDays * 0.1)}</span>
                        </div>
                      </div>
                    )}

                    <Button className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" onClick={showReservationNotification}>
                      {totalDays > 0 ? "Reservar ahora" : "Verificar disponibilidad"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">No se te cobrará nada todavía</p>
                  </div>
                </CardContent>
              </Card>
              {hasReserved ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={product.owner.image || "/placeholder.svg"} alt={product.owner.name} />
                        <AvatarFallback>{product.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{product.owner.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-[#0F5132] text-[#0F5132]" />
                          <span>{product.owner.rating}</span>
                          <span className="text-muted-foreground">• En EQUIPZ desde {product.owner.since}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Tiempo de respuesta: {product.owner.responseTime}</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <Button
                      variant="outline"
                      className="w-full border-[#0F5132] text-[#0F5132]"
                      onClick={handleContact}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contactar
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Información del propietario</h3>
                    <p className="text-sm text-muted-foreground">
                      Los datos del propietario estarán disponibles una vez que realices la reserva.
                    </p>
                    <div className="mt-4 p-4 bg-[#F1F8F2] rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Nota:</span> Por seguridad, solo mostramos la información de
                        contacto después de confirmar la reserva.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Preguntas frecuentes</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm">¿Qué incluye el alquiler?</AccordionTrigger>
                      <AccordionContent>
                        El alquiler incluye el {product.title.toLowerCase()} y todos los accesorios mencionados en las
                        características. También incluye seguro básico contra daños.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-sm">¿Cómo funciona la recogida y devolución?</AccordionTrigger>
                      <AccordionContent>
                        Puedes coordinar directamente con el propietario para recoger y devolver el equipo. También
                        ofrecemos servicio de entrega por un costo adicional.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-sm">¿Qué pasa si daño el equipo?</AccordionTrigger>
                      <AccordionContent>
                        El seguro básico cubre daños menores. Para daños mayores o pérdida, se aplicará un cargo
                        adicional según las condiciones acordadas.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
