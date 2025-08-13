"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Company {
  cuit: string
  name: string
}

const mockCompanies: Company[] = [
  { cuit: "23426081231", name: "Streambe Participe" },
  { cuit: "20123456789", name: "Empresa Demo SA" },
  { cuit: "27987654321", name: "Comercial Ejemplo SRL" },
]

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockCompanies.filter(
        (company) =>
          company.cuit.includes(searchQuery) || company.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredCompanies(filtered)
      setIsSearchOpen(true)
    } else {
      setFilteredCompanies([])
      setIsSearchOpen(false)
    }
  }, [searchQuery])

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company)
    setSearchQuery("")
    setIsSearchOpen(false)
    localStorage.setItem("selectedCompany", JSON.stringify(company))
    window.dispatchEvent(new CustomEvent("companySelected", { detail: company }))
    router.push("/dashboard/resumen")
  }

  const clearCompanySelection = () => {
    setSelectedCompany(null)
    localStorage.removeItem("selectedCompany")
    window.dispatchEvent(new CustomEvent("companyCleared"))
  }

  useEffect(() => {
    const saved = localStorage.getItem("selectedCompany")
    if (saved) {
      setSelectedCompany(JSON.parse(saved))
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/garantizar-logo.png" alt="Garantizar" width={140} height={32} className="h-8 w-auto" />
        </div>

        <div className="flex-1 max-w-md mx-8 relative">
          {selectedCompany ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Building2 className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-900">{selectedCompany.name}</div>
                <div className="text-xs text-blue-600">CUIT: {selectedCompany.cuit}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompanySelection}
                className="text-blue-600 hover:text-blue-800 h-6 px-2"
              >
                ×
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar empresa por CUIT o nombre..."
                className="pl-10 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
              />

              {isSearchOpen && filteredCompanies.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredCompanies.map((company) => (
                    <button
                      key={company.cuit}
                      onClick={() => handleCompanySelect(company)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">CUIT: {company.cuit}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/dashboard/solicitudes/nueva">Nueva solicitud</Link>
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>

          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
