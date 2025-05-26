import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

export default function MVPPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container flex items-center h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la plataforma</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#0F5132]">
              Definición del MVP - EQUIPZ
            </h1>
            <p className="text-muted-foreground max-w-[800px]">
              Producto Mínimo Viable para la plataforma de alquiler de equipos deportivos y recreativos
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Must Have (Debe tener)</CardTitle>
              <CardDescription>Funcionalidades esenciales para el lanzamiento inicial</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Categoría</TableHead>
                    <TableHead>Funcionalidad</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Registro e inicio de sesión</TableCell>
                    <TableCell>Autenticación de usuarios</TableCell>
                    <TableCell>Permite a los usuarios crear cuentas y acceder a la plataforma.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Publicación de equipos</TableCell>
                    <TableCell>Listado de equipos</TableCell>
                    <TableCell>Los propietarios pueden listar sus equipos disponibles para alquiler.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Búsqueda y filtrado</TableCell>
                    <TableCell>Sistema de búsqueda</TableCell>
                    <TableCell>Los usuarios pueden buscar equipos según ubicación, tipo, precio, etc.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Reservas y pagos con seguros</TableCell>
                    <TableCell>Sistema de reservas</TableCell>
                    <TableCell>Sistema para reservar equipos y procesar pagos de manera segura.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Perfil de usuario</TableCell>
                    <TableCell>Gestión de perfil</TableCell>
                    <TableCell>Cada usuario tiene un perfil con su información y actividad.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Should Have (Debería tener)</CardTitle>
              <CardDescription>Funcionalidades importantes pero no críticas para el lanzamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Categoría</TableHead>
                    <TableHead>Funcionalidad</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Valoraciones y reseñas</TableCell>
                    <TableCell>Sistema de reseñas</TableCell>
                    <TableCell>Los usuarios pueden dejar opiniones sobre los equipos y propietarios.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mensajería interna</TableCell>
                    <TableCell>Chat entre usuarios</TableCell>
                    <TableCell>Comunicación directa entre propietarios y arrendatarios.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">En desarrollo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Calendario de disponibilidad</TableCell>
                    <TableCell>Visualización de fechas</TableCell>
                    <TableCell>Visualización de las fechas en las que los equipos están disponibles.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mapa interactivo</TableCell>
                    <TableCell>Geolocalización</TableCell>
                    <TableCell>Muestra la ubicación de los equipos disponibles en un mapa.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">En desarrollo</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Notificaciones</TableCell>
                    <TableCell>Avisos importantes</TableCell>
                    <TableCell>Alertas sobre reservas, mensajes y actualizaciones importantes.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Implementado</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Could Have (Podría tener)</CardTitle>
              <CardDescription>Funcionalidades deseables para futuras actualizaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Categoría</TableHead>
                    <TableHead>Funcionalidad</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Integración con redes sociales</TableCell>
                    <TableCell>Compartir en redes</TableCell>
                    <TableCell>Permite compartir publicaciones y logros en redes sociales.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Planificado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Recomendaciones personalizadas</TableCell>
                    <TableCell>Sistema de recomendación</TableCell>
                    <TableCell>Sugerencias de equipos basadas en el historial del usuario.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Planificado</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sistema de recompensas</TableCell>
                    <TableCell>Programa de fidelización</TableCell>
                    <TableCell>Incentivos para usuarios frecuentes o con buenas valoraciones.</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Planificado</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button className="bg-[#0F5132] hover:bg-[#0B3E27]" asChild>
              <Link href="/">Volver a la plataforma</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
