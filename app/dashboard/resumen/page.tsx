"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  FileText,
  Shield,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const systemMetrics = [
  {
    title: "Total Solicitudes",
    value: "148",
    change: "1 más del mes pasado",
    icon: Target,
    trend: "up",
  },
  {
    title: "Usuarios Activos",
    value: "2,847",
    change: "30% del mes pasado",
    icon: Users,
    trend: "up",
  },
  {
    title: "Tasa de Finalización",
    value: "94.2%",
    change: "2% más del mes pasado",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Ingresos",
    value: "$45,231",
    change: "20% del mes pasado",
    icon: DollarSign,
    trend: "up",
  },
]

const companyMetrics = [
  {
    title: "Garantías Activas",
    value: "12",
    change: "2 nuevas este mes",
    icon: Shield,
    trend: "up",
  },
  {
    title: "Avales Instrumentados",
    value: "$2,450,000",
    change: "15% más que el mes anterior",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Solicitudes en Proceso",
    value: "3",
    change: "1 pendiente de documentación",
    icon: Clock,
    trend: "neutral",
  },
  {
    title: "Documentos Pendientes",
    value: "2",
    change: "Balance y estados contables",
    icon: FileText,
    trend: "down",
  },
]

const chartData = [
  { month: "Ene", ingresos: 50000, usuarios: 2000 },
  { month: "Feb", ingresos: 45000, usuarios: 2200 },
  { month: "Mar", ingresos: 60000, usuarios: 2400 },
  { month: "Abr", ingresos: 70000, usuarios: 2600 },
  { month: "May", ingresos: 65000, usuarios: 2700 },
  { month: "Jun", ingresos: 80000, usuarios: 2847 },
]

const pendingTasks = [
  {
    id: 1,
    type: "Documentación",
    description: "Falta cargar Estados Contables actualizados",
    priority: "Alta",
    dueDate: "2024-01-15",
    status: "Pendiente",
  },
  {
    id: 2,
    type: "Contrato",
    description: "Pendiente firma de Contrato de Garantía SOL-2024-007",
    priority: "Media",
    dueDate: "2024-01-20",
    status: "En Proceso",
  },
  {
    id: 3,
    type: "Documentación",
    description: "Actualizar Composición Societaria",
    priority: "Baja",
    dueDate: "2024-01-25",
    status: "Pendiente",
  },
]

const companyRequests = [
  {
    id: "SOL-2024-001",
    document: "20-35678901-2",
    name: "Carlos",
    lastName: "Mendoza",
    amount: "$4.500.000",
    status: "Completado",
    date: "2024-01-10",
  },
  {
    id: "SOL-2024-002",
    document: "27-42198654-3",
    name: "Ana",
    lastName: "García",
    amount: "$7.200.000",
    status: "En Proceso",
    date: "2024-01-08",
  },
  {
    id: "SOL-2024-003",
    document: "23-18765432-9",
    name: "Roberto",
    lastName: "Silva",
    amount: "$3.200.000",
    status: "Pendiente",
    date: "2024-01-05",
  },
  {
    id: "SOL-2024-004",
    document: "25-29384756-1",
    name: "María",
    lastName: "López",
    amount: "$9.800.000",
    status: "Rechazado",
    date: "2024-01-03",
  },
  {
    id: "SOL-2024-005",
    document: "30-15923847-6",
    name: "Jorge",
    lastName: "Fernández",
    amount: "$5.600.000",
    status: "En Proceso",
    date: "2024-01-01",
  },
]

export default function ResumenPage() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  useEffect(() => {
    const company = localStorage.getItem("selectedCompany")
    if (company) {
      setSelectedCompany(JSON.parse(company))
    }

    const handleCompanySelected = (event: any) => {
      setSelectedCompany(event.detail)
    }

    const handleCompanyCleared = () => {
      setSelectedCompany(null)
    }

    window.addEventListener("companySelected", handleCompanySelected)
    window.addEventListener("companyCleared", handleCompanyCleared)

    return () => {
      window.removeEventListener("companySelected", handleCompanySelected)
      window.removeEventListener("companyCleared", handleCompanyCleared)
    }
  }, [])

  const metrics = selectedCompany ? companyMetrics : systemMetrics

  const getRiskIndicator = (score: number) => {
    if (score >= 75) {
      return { color: "bg-green-500", text: "Bajo", textColor: "text-green-700" }
    } else if (score >= 50) {
      return { color: "bg-yellow-500", text: "Medio", textColor: "text-yellow-700" }
    } else {
      return { color: "bg-red-500", text: "Alto", textColor: "text-red-700" }
    }
  }

  const getStatusIndicator = (isActive: boolean) => {
    return {
      color: isActive ? "bg-green-500" : "bg-red-500",
      text: isActive ? "Activo" : "Inactivo",
      textColor: isActive ? "text-green-700" : "text-red-700",
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
      case "En Proceso":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Proceso</Badge>
      case "Pendiente":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pendiente</Badge>
      case "Rechazado":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Alta</Badge>
      case "Media":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Media</Badge>
      case "Baja":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Baja</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {!selectedCompany && (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">¡Bienvenido de vuelta, John!</h1>
              <p className="text-gray-600 mt-1">Esto es lo que está pasando con tus solicitudes hoy.</p>
            </div>
            <div className="text-sm text-gray-500">+12% este mes</div>
          </div>
        )}

        {selectedCompany && (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard - {selectedCompany.name}</h1>
              <p className="text-gray-600 mt-1">CUIT: {selectedCompany.cuit} • Socio Partícipe SGR</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 ${getRiskIndicator(selectedCompany.riskScore || 82).color} rounded-full`}
                ></div>
                <span className={`text-sm font-medium ${getRiskIndicator(selectedCompany.riskScore || 82).textColor}`}>
                  Riesgo {getRiskIndicator(selectedCompany.riskScore || 82).text}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 ${getStatusIndicator(selectedCompany.isActive || true).color} rounded-full`}
                ></div>
                <span
                  className={`text-sm font-medium ${getStatusIndicator(selectedCompany.isActive || true).textColor}`}
                >
                  {getStatusIndicator(selectedCompany.isActive || true).text}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <Card key={metric.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <metric.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCompany && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Tareas Pendientes
              </CardTitle>
              <p className="text-sm text-gray-600">Alertas y tareas pendientes asociadas a la empresa</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Descripción</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Prioridad</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Vencimiento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{task.type}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{task.description}</td>
                        <td className="py-3 px-4">{getPriorityBadge(task.priority)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{task.dueDate}</td>
                        <td className="py-3 px-4">{getStatusBadge(task.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedCompany && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Estado de Solicitudes</CardTitle>
              <p className="text-sm text-gray-600">Últimas 10 solicitudes de la empresa y su estado actual</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">ID Solicitud</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Documento</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Apellido</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Monto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyRequests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-blue-600">{request.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{request.document}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{request.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{request.lastName}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{request.amount}</td>
                        <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {selectedCompany ? "Evolución de Garantías" : "Resumen de Ingresos y Usuarios"}
              </CardTitle>
              <p className="text-sm text-gray-600">
                {selectedCompany
                  ? "Montos garantizados y solicitudes en los últimos 6 meses"
                  : "Ingresos mensuales y crecimiento de usuarios en los últimos 6 meses"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#6B7280" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 150 Q 50 120 100 130 T 200 100 T 300 80 T 400 60 L 400 200 L 0 200 Z"
                    fill="url(#areaGradient)"
                  />
                  <path
                    d="M 0 150 Q 50 120 100 130 T 200 100 T 300 80 T 400 60"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <div className="absolute bottom-4 left-4 flex space-x-6 text-xs text-gray-600">
                  <span>Ene</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
                <div className="absolute left-4 top-4 space-y-2 text-xs text-gray-600">
                  {selectedCompany ? (
                    <>
                      <div>$3M</div>
                      <div>$2.5M</div>
                      <div>$2M</div>
                      <div>$1.5M</div>
                      <div>$1M</div>
                    </>
                  ) : (
                    <>
                      <div>$80000</div>
                      <div>$60000</div>
                      <div>$40000</div>
                      <div>$20000</div>
                      <div>$0</div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {selectedCompany ? "Estado de Garantías" : "Estado de Solicitudes"}
              </CardTitle>
              <p className="text-sm text-gray-600">
                {selectedCompany
                  ? "Distribución actual de las garantías de la empresa"
                  : "Distribución actual del estado de las solicitudes"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48">
                <div className="relative">
                  <svg width="120" height="120" className="transform -rotate-90">
                    <circle cx="60" cy="60" r="45" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    {selectedCompany ? (
                      <>
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#10B981"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${75 * 2.83} 283`}
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#F59E0B"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${20 * 2.83} 283`}
                          strokeDashoffset={`-${75 * 2.83}`}
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#EF4444"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${5 * 2.83} 283`}
                          strokeDashoffset={`-${95 * 2.83}`}
                        />
                      </>
                    ) : (
                      <>
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#10B981"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${65 * 2.83} 283`}
                          strokeDashoffset="0"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#F59E0B"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${25 * 2.83} 283`}
                          strokeDashoffset={`-${65 * 2.83}`}
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#6B7280"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${10 * 2.83} 283`}
                          strokeDashoffset={`-${90 * 2.83}`}
                        />
                      </>
                    )}
                  </svg>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {selectedCompany ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Activas</span>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">En Proceso</span>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Vencidas</span>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Completadas</span>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">En Progreso</span>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Pendientes</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
