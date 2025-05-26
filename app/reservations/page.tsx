"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MessageSquare, Package, AlertCircle } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { useAuth } from "@/components/main-nav"
import { toast } from "@/hooks/use-toast"

// Tipo para las reservas
type Reservation = {
  id: string
  productId: string
  productTitle: string
  productImage: string
  startDate: Date
  endDate: Date
  totalDays: number
  totalPrice: number
  status: "Confirmada" | "Pendiente" | "Completada" | "Cancelada"
  ownerName: string
  ownerImage: string
  createdAt: Date
}

export default function ReservationsPage() {
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    if (!isLoggedIn) {
      toast({
        title: "Acceso denegado",
        description: "Debes iniciar sesión para ver tus reservas",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Cargar reservas desde localStorage
    const loadReservations = () => {
      try {
        const storedReservations = localStorage.getItem("equipz_reservations")
        if (storedReservations) {
          const parsedReservations = JSON.parse(storedReservations).map((reservation: any) => ({
            ...reservation,
            startDate: new Date(reservation.startDate),
            endDate: new Date(reservation.endDate),
            createdAt: new Date(reservation.createdAt),
          }))
          setReservations(parsedReservations)
        }
      } catch (error) {
        console.error("Error loading reservations:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las reservas",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadReservations()
  }, [isLoggedIn, router])

  // Función para cancelar una reserva
  const cancelReservation = (reservationId: string) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId ? { ...reservation, status: "Cancelada" as const } : reservation,
    )
    setReservations(updatedReservations)
    localStorage.setItem("equipz_reservations", JSON.stringify(updatedReservations))

    toast({
      title: "Reserva cancelada",
      description: "La reserva ha sido cancelada correctamente",
    })
  }

  // Función para contactar al propietario
  const contactOwner = (ownerName: string) => {
    toast({
      title: "Mensaje enviado",
      description: `Tu mensaje ha sido enviado a ${ownerName}`,
    })
  }

  // Filtrar reservas por estado
  const activeReservations = reservations.filter((r) => r.status === "Confirmada" || r.status === "Pendiente")
  const completedReservations = reservations.filter((r) => r.status === "Completada")
  const cancelledReservations = reservations.filter((r) => r.status === "Cancelada")

  // Función para formatear fechas
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Función para obtener el color del badge según el estado
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmada":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>
      case "Completada":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Componente para renderizar una reserva
  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card key={reservation.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={reservation.productImage || "/placeholder.svg"}
            alt={reservation.productTitle}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{reservation.productTitle}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(reservation.status)}
                  <span className="text-sm text-muted-foreground">
                    Reservado el {formatDate(reservation.createdAt)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-lg text-[#0F5132]">${reservation.totalPrice}</div>
                <div className="text-sm text-muted-foreground">{reservation.totalDays} días</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{reservation.totalDays} días de alquiler</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={reservation.ownerImage || "/placeholder.svg"} alt={reservation.ownerName} />
                    <AvatarFallback className="text-xs">{reservation.ownerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>Propietario: {reservation.ownerName}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push(`/product/${reservation.productId}`)}>
                <Package className="h-4 w-4 mr-2" />
                Ver producto
              </Button>
              {(reservation.status === "Confirmada" || reservation.status === "Pendiente") && (
                <>
                  <Button variant="outline" size="sm" onClick={() => contactOwner(reservation.ownerName)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contactar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => cancelReservation(reservation.id)}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex flex-1 items-center justify-center">
          <p>Cargando reservas...</p>
        </div>
      </div>
    )
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
                  Mis Reservas
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Gestiona todas tus reservas de equipos deportivos
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-8 md:px-6">
          {reservations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tienes reservas</h3>
              <p className="text-muted-foreground mb-4">Cuando realices tu primera reserva, aparecerá aquí.</p>
              <Button className="bg-[#0F5132] hover:bg-[#0B3E27]" asChild>
                <Link href="/">Explorar equipos</Link>
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">Activas ({activeReservations.length})</TabsTrigger>
                <TabsTrigger value="completed">Completadas ({completedReservations.length})</TabsTrigger>
                <TabsTrigger value="cancelled">Canceladas ({cancelledReservations.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <div className="space-y-4">
                  {activeReservations.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No tienes reservas activas</p>
                    </div>
                  ) : (
                    activeReservations.map((reservation) => (
                      <ReservationCard key={reservation.id} reservation={reservation} />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="space-y-4">
                  {completedReservations.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No tienes reservas completadas</p>
                    </div>
                  ) : (
                    completedReservations.map((reservation) => (
                      <ReservationCard key={reservation.id} reservation={reservation} />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cancelled" className="mt-6">
                <div className="space-y-4">
                  {cancelledReservations.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No tienes reservas canceladas</p>
                    </div>
                  ) : (
                    cancelledReservations.map((reservation) => (
                      <ReservationCard key={reservation.id} reservation={reservation} />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
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
