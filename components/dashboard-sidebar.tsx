"use client"

import { cn } from "@/lib/utils"
import { BarChart3, Settings, User, ChevronDown, ChevronRight, Home, Shield, Building2, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const defaultMenuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/resumen",
  },
  {
    title: "Gestión Socios Partícipes",
    icon: Shield,
    hasSubmenu: true,
    submenu: [
      { title: "Nuevo Prospecto", href: "/dashboard/onboarding" },
      { title: "Gestión de solicitud", href: "/dashboard/solicitudes" },
      { title: "Instrumentación de Garantía", href: "/dashboard/instrumentacion" },
    ],
  },
  {
    title: "Gestión Socios Protectores",
    icon: Building2,
    hasSubmenu: true,
    submenu: [
      { title: "Nuevo Prospecto", href: "/dashboard/socios/onboarding" },
      { title: "Gestión de solicitud", href: "/dashboard/socios/solicitudes" },
      { title: "Instrumentación de aporte", href: "/dashboard/socios/instrumentacion" },
    ],
  },
  {
    title: "Fori",
    icon: TrendingUp,
    hasSubmenu: true,
    submenu: [
      { title: "Cupo disponible", href: "/dashboard/fori/cupo" },
      { title: "Distribución por fec...", href: "/dashboard/fori/distribucion" },
      { title: "Rendimientos", href: "/dashboard/fori/rendimientos" },
    ],
  },
  {
    title: "Reportes",
    icon: BarChart3,
    href: "/dashboard/reportes",
  },
  {
    title: "Perfil de Usuario",
    icon: User,
    href: "/dashboard/perfil",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/dashboard/configuracion",
  },
]

const companyMenuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard/resumen",
  },
  {
    title: "Empresa",
    icon: Building2,
    hasSubmenu: true,
    submenu: [
      { title: "Datos generales", href: "/dashboard/empresa/datos-generales" },
      { title: "Datos bancarios", href: "/dashboard/empresa/datos-bancarios" },
      { title: "Datos de contacto", href: "/dashboard/empresa/datos-contacto" },
      { title: "Composición societaria", href: "/dashboard/empresa/composicion-societaria" },
      { title: "Documentación", href: "/dashboard/empresa/documentacion" },
      { title: "Contragarantías", href: "/dashboard/empresa/contragarantias" },
      { title: "Acciones", href: "/dashboard/empresa/acciones" },
    ],
  },
  {
    title: "Reportes",
    icon: BarChart3,
    href: "/dashboard/reportes",
  },
  {
    title: "Perfil de Usuario",
    icon: User,
    href: "/dashboard/perfil",
  },
  {
    title: "Configuración",
    icon: Settings,
    href: "/dashboard/configuracion",
  },
]

export function DashboardSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleCompanySelected = (event: any) => {
      setSelectedCompany(event.detail)
    }

    const handleCompanyCleared = () => {
      setSelectedCompany(null)
    }

    // Load selected company on mount
    const saved = localStorage.getItem("selectedCompany")
    if (saved) {
      setSelectedCompany(JSON.parse(saved))
    }

    window.addEventListener("companySelected", handleCompanySelected)
    window.addEventListener("companyCleared", handleCompanyCleared)

    return () => {
      window.removeEventListener("companySelected", handleCompanySelected)
      window.removeEventListener("companyCleared", handleCompanyCleared)
    }
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const menuItems = selectedCompany ? companyMenuItems : defaultMenuItems

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {selectedCompany && (
        <div className="p-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-blue-900">{selectedCompany.name}</div>
              <div className="text-xs text-blue-600">CUIT: {selectedCompany.cuit}</div>
            </div>
          </div>
        </div>
      )}

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.hasSubmenu ? (
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors text-gray-700",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-gray-500" />
                  <span>{item.title}</span>
                </div>
                {expandedItems.includes(item.title) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors",
                  isActive(item.href!) ? "bg-green-100 text-green-800" : "text-gray-700",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4", isActive(item.href!) ? "text-green-600" : "text-gray-500")} />
                  <span>{item.title}</span>
                </div>
              </Link>
            )}

            {item.hasSubmenu && expandedItems.includes(item.title) && (
              <div className="ml-6 mt-1 space-y-1">
                {item.submenu?.map((subItem) => (
                  <Link
                    key={subItem.title}
                    href={subItem.href}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors text-left",
                      isActive(subItem.href)
                        ? "bg-green-100 text-green-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
