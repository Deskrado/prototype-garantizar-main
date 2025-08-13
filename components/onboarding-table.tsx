import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

const onboardingData = [
  {
    id: "SOL-2024-001",
    documento: "20-35678901-2",
    nombre: "Carlos",
    apellido: "Mendoza",
    monto: "$4.500.000",
    estado: "completado",
  },
  {
    id: "SOL-2024-002",
    documento: "27-42198654-3",
    nombre: "Ana",
    apellido: "García",
    monto: "$7.200.000",
    estado: "proceso",
  },
  {
    id: "SOL-2024-003",
    documento: "23-18765432-9",
    nombre: "Roberto",
    apellido: "Silva",
    monto: "$3.200.000",
    estado: "pendiente",
  },
  {
    id: "SOL-2024-004",
    documento: "25-29384756-1",
    nombre: "María",
    apellido: "López",
    monto: "$9.800.000",
    estado: "rechazado",
  },
  {
    id: "SOL-2024-005",
    documento: "30-15923847-6",
    nombre: "Jorge",
    apellido: "Fernández",
    monto: "$5.600.000",
    estado: "proceso",
  },
  {
    id: "SOL-2024-006",
    documento: "33-47829156-4",
    nombre: "Laura",
    apellido: "Martínez",
    monto: "$12.500.000",
    estado: "completado",
  },
]

const getStatusBadge = (estado: string) => {
  switch (estado) {
    case "completado":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
    case "proceso":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Proceso</Badge>
    case "pendiente":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pendiente</Badge>
    case "rechazado":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
    default:
      return <Badge variant="secondary">{estado}</Badge>
  }
}

export function OnboardingTable() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Solicitud
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {onboardingData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.documento}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{record.monto}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(record.estado)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
