"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  Home,
  Search,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  User,
  Package,
  HelpCircle,
  Info,
  Bell,
  History,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mejorar la persistencia de la autenticación
export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay información de usuario en localStorage
    const storedUser = localStorage.getItem("equipz_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("equipz_user")
      }
    }
  }, [])

  const login = (userData: any) => {
    // Asegurarse de que el objeto userData tenga todos los campos necesarios
    const completeUserData = {
      ...userData,
      // Añadir campos por defecto si no existen
      firstName: userData.firstName || "Usuario",
      lastName: userData.lastName || "Ejemplo",
      email: userData.email || "usuario@ejemplo.com",
      accountType: userData.accountType || "client",
      location: userData.location || "Buenos Aires, Argentina",
    }

    setUser(completeUserData)
    setIsLoggedIn(true)
    localStorage.setItem("equipz_user", JSON.stringify(completeUserData))

    // Mostrar notificación de éxito
    toast({
      title: "Inicio de sesión exitoso",
      description: `Bienvenido/a, ${completeUserData.firstName}!`,
    })
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("equipz_user")

    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })

    router.push("/")
  }

  return { isLoggedIn, user, login, logout }
}

// Actualizar los enlaces de navegación para que apunten a las páginas correctas
const navItems = [
  { href: "/", label: "Inicio", icon: <Home className="h-5 w-5 mr-2" /> },
  { href: "/search", label: "Buscar Equipos", icon: <Search className="h-5 w-5 mr-2" /> },
  { href: "/categories", label: "Categorías", icon: <Package className="h-5 w-5 mr-2" /> },
  { href: "/profile", label: "Mis Reservas", icon: <Calendar className="h-5 w-5 mr-2" />, authRequired: true },
  { href: "/profile", label: "Favoritos", icon: <Heart className="h-5 w-5 mr-2" />, authRequired: true },
  { href: "/profile", label: "Mensajes", icon: <MessageSquare className="h-5 w-5 mr-2" />, authRequired: true },
  {
    href: "/dashboard",
    label: "Panel de Proveedor",
    icon: <Package className="h-5 w-5 mr-2" />,
    authRequired: true,
    providerOnly: true,
  },
  { href: "/mvp", label: "Sobre EQUIPZ", icon: <Info className="h-5 w-5 mr-2" /> },
  { href: "/profile", label: "Ayuda", icon: <HelpCircle className="h-5 w-5 mr-2" /> },
]

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile")
    } else {
      router.push("/login")
    }
  }

  const handleNotificationClick = () => {
    setUnreadNotifications(0)
    toast({
      title: "Notificaciones",
      description: "Has marcado todas las notificaciones como leídas",
    })
  }

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <Link href="/" className="flex items-center gap-2 px-4">
                      <Image src="/images/logo.png" alt="EQUIPZ Logo" width={30} height={30} />
                      <span className="text-lg font-semibold text-[#0F5132]">EQUIPZ</span>
                    </Link>
                  </div>

                  {isLoggedIn && user && (
                    <div className="py-4 px-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="cursor-pointer" onClick={handleProfileClick}>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.firstName} />
                          <AvatarFallback>
                            {user.firstName?.charAt(0)}
                            {user.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <Button variant="link" className="p-0 h-auto text-[#0F5132]" onClick={handleProfileClick}>
                            Ver perfil
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <nav className="flex-1 py-4">
                    <ul className="space-y-1">
                      {navItems
                        .filter((item) => !item.authRequired || (item.authRequired && isLoggedIn))
                        .filter((item) => !item.providerOnly || (item.providerOnly && user?.accountType === "provider"))
                        .map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={`flex items-center py-2 px-4 text-sm ${
                                pathname === item.href
                                  ? "bg-[#E8F5E9] text-[#0F5132] font-medium"
                                  : "text-muted-foreground hover:bg-muted"
                              } rounded-md transition-colors`}
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </nav>

                  {isLoggedIn ? (
                    <div className="py-4 px-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={logout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4 px-4 border-t space-y-2">
                      <Button className="w-full bg-[#0F5132] hover:bg-[#0B3E27]" asChild>
                        <Link href="/login">Iniciar Sesión</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/register">Registrarse</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="EQUIPZ Logo" width={40} height={40} />
            <span className="text-lg font-semibold text-[#0F5132]">EQUIPZ</span>
          </Link>

          {!isMobile && (
            <nav className="ml-8 hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-sm ${pathname === "/" ? "text-[#0F5132] font-medium" : "text-muted-foreground"} hover:text-[#0F5132] transition-colors`}
              >
                Inicio
              </Link>
              <Link
                href="/search"
                className={`text-sm ${pathname === "/search" ? "text-[#0F5132] font-medium" : "text-muted-foreground"} hover:text-[#0F5132] transition-colors`}
              >
                Buscar
              </Link>
              <Link
                href="/categories"
                className={`text-sm ${pathname === "/categories" ? "text-[#0F5132] font-medium" : "text-muted-foreground"} hover:text-[#0F5132] transition-colors`}
              >
                Categorías
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    href="/reservations"
                    className={`text-sm ${pathname === "/reservations" ? "text-[#0F5132] font-medium" : "text-muted-foreground"} hover:text-[#0F5132] transition-colors`}
                  >
                    Mis Reservas
                  </Link>
                  {user?.accountType === "provider" && (
                    <Link
                      href="/dashboard"
                      className={`text-sm ${pathname === "/dashboard" ? "text-[#0F5132] font-medium" : "text-muted-foreground"} hover:text-[#0F5132] transition-colors`}
                    >
                      Panel
                    </Link>
                  )}
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Más
                    <span className="sr-only">Más opciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {isLoggedIn && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/favorites" className="flex items-center cursor-pointer">
                          <Heart className="h-4 w-4 mr-2" />
                          Favoritos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/messages" className="flex items-center cursor-pointer">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Mensajes
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/mvp" className="flex items-center cursor-pointer">
                      <Info className="h-4 w-4 mr-2" />
                      Sobre EQUIPZ
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="flex items-center cursor-pointer">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Ayuda
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>

          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.firstName} />
                    <AvatarFallback>
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/reservations")} className="cursor-pointer">
                  <Calendar className="h-4 w-4 mr-2" />
                  Mis Reservas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/history")} className="cursor-pointer">
                  <History className="h-4 w-4 mr-2" />
                  Historial de Alquileres
                </DropdownMenuItem>
                {user.accountType === "provider" && (
                  <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    Panel de Proveedor
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 text-[#0F5132]">
                Iniciar Sesión
              </Link>
              <Button className="bg-[#0F5132] hover:bg-[#0B3E27]" asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
