import { DashboardLayout } from "@/components/dashboard-layout"
import { OnboardingTable } from "@/components/onboarding-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Plus } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Socios Partícipes</h1>
            <p className="text-gray-600 mt-1">Gestión del proceso de registro y onboarding de nuevos socios</p>
          </div>
          <Link href="/dashboard/onboarding/nuevo">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Registro
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtros</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600 mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar por ID, nombre, documento..." className="pl-10" />
              </div>
            </div>

            <div className="w-48">
              <label className="text-sm text-gray-600 mb-2 block">Estado</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                  <SelectItem value="proceso">En Proceso</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="rechazado">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Nuevos Prospectos (8)</h2>
          <Button variant="outline" className="text-gray-600 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>

        {/* Table */}
        <OnboardingTable />
      </div>
    </DashboardLayout>
  )
}
