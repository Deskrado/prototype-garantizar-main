"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

type FormStep = "cuit-validation" | "complete-form" | "success"

export default function NuevoRegistroPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>("cuit-validation")
  const [isValidating, setIsValidating] = useState(false)
  const [cuitValidated, setCuitValidated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    cuit: "",
    // Basic info (populated from ARCA) - removed: fechaAlta, empresa, socio, estado, activo, categoria
    razonSocial: "",
    nombreComercial: "",
    regimenFiscal: "Responsable Inscripto",
    tipoPersona: "Jurídica",
    generoPersona: "Masculino",
    telefono: "",
    tipoIdentificacionFiscal: "CUIT",
    condicionGanancias: "Activo",
    condicionFrenteIVA: "RI Responsable Inscripto",
    nif: "",
    // Commercial info
    asesorComercial: "",
    categoriaCanal: "",
    subcategoriaCanal: "",
    canal: "",
    tipoEmpresa: "",
    condicionIVA: "",
    tamanoEmpresa: "",
    actividad: "",
    fechaInicioActividad: "",
    cierreBalance: "",
    importador: "",
    exportador: "",
    paginaWeb: "",
    nroIngresosBrutos: "",
    condicionIngresosBrutos: "",
    sedeIngresosBrutos: "",
    sectorSepyme: "",
    sectorARCA: "",
    actividadEconomicaARCA: "",
    cnae: "",
    sectorARCASecundaria: "",
    sectorSepymeSecundaria: "",
    // Address info
    calle: "Dirección no disponible",
    numero: "0000",
    piso: "5",
    oficina: "A",
    cpa: "C1000AAA",
    provincia: "Capital Federal",
    municipio: "CABA",
    localidad: "Buenos Aires",
    apartadoCorreo: "123456",
    // Representative info
    documentoRepresentante: "00000000",
    nombreRepresentante: "Nombre",
    apellidoRepresentante: "Apellido",
    cargo: "Presidente",
    tipoTelefono: "",
    codigoArea: "11",
    telefonoRepresentante: "1100000000",
    correoElectronico: "contacto@empresa1231.com",
    telefonoAdicional: "12345678",
    correoElectronicoAdicional: "",
  })

  const handleCuitValidation = async () => {
    if (!formData.cuit || formData.cuit.length !== 11) {
      alert("Por favor, ingrese los 11 dígitos del CUIT sin espacios ni guiones.")
      return
    }

    setIsValidating(true)

    // Simulate checking if partner exists
    setTimeout(() => {
      // Show "no partner found" message first
      setTimeout(() => {
        setIsValidating(false)
        setCuitValidated(true)

        setFormData((prev) => ({
          ...prev,
          razonSocial: "Empresa CUIT 23426081231",
          nombreComercial: "Comercial 1231",
        }))

        setTimeout(() => {
          setCurrentStep("complete-form")
        }, 1500)
      }, 1500)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setCurrentStep("success")
  }

  const renderSuccessMessage = () => (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Prospecto registrado exitosamente!</h2>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Deseas crear una solicitud.</h3>
          <p className="text-gray-600">Avanzaremos añadiendo una solicitud al prospecto creado</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/dashboard/solicitudes/nueva">Crear solicitud</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/resumen">No, volver a dashboard.</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCuitValidation = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Información del Registro</span>
        </div>
        <CardTitle className="text-xl">Nuevo Registro de Socio Partícipe</CardTitle>
        <p className="text-gray-600">Completa la información para crear un nuevo registro</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Ingrese y valide el CUIT para continuar</h3>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Validación de CUIT</h4>

          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT *</Label>
            <div className="flex gap-3">
              <Input
                id="cuit"
                placeholder="20123456789"
                value={formData.cuit}
                onChange={(e) => handleInputChange("cuit", e.target.value)}
                maxLength={11}
                className="flex-1"
              />
              <Button
                onClick={handleCuitValidation}
                disabled={isValidating || cuitValidated}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Validando...
                  </>
                ) : cuitValidated ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validado
                  </>
                ) : (
                  "Validar CUIT"
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500">Ingrese los 11 dígitos del CUIT sin espacios ni guiones.</p>
          </div>

          {isValidating && (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-blue-800 font-medium">Buscando socio existente...</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">Verificando si ya existe un socio con este CUIT</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                  <span className="text-yellow-800 font-medium">No se encontró socio existente</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">Validando con ARCA para obtener datos básicos...</p>
              </div>
            </div>
          )}

          {cuitValidated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-800 font-medium">CUIT Validado</span>
              </div>
              <p className="text-green-700 text-sm mt-1">Datos obtenidos exitosamente. Redirigiendo al formulario...</p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/onboarding">Cancelar</Link>
          </Button>
          <Button
            disabled={!cuitValidated}
            onClick={() => setCurrentStep("complete-form")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Crear registro
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCompleteForm = () => (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Información del Registro</span>
        </div>
        <CardTitle className="text-xl">Completa todos los campos para dar de alta el prospecto de un socio partícipe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* CUIT Validation Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Validación de CUIT</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CUIT *</p>
              <p className="font-mono">{formData.cuit}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 text-sm">CUIT Validado</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentStep("cuit-validation")}>
                Modificar CUIT
              </Button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg border-b pb-2">Información Básica</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Razón social *</Label>
              <Input value={formData.razonSocial} onChange={(e) => handleInputChange("razonSocial", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Nombre comercial</Label>
              <Input
                value={formData.nombreComercial}
                onChange={(e) => handleInputChange("nombreComercial", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Régimen fiscal *</Label>
              <Select
                value={formData.regimenFiscal}
                onValueChange={(value) => handleInputChange("regimenFiscal", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                  <SelectItem value="Monotributo">Monotributo</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo persona *</Label>
              <Select value={formData.tipoPersona} onValueChange={(value) => handleInputChange("tipoPersona", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jurídica">Jurídica</SelectItem>
                  <SelectItem value="Física">Física</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Género persona *</Label>
              <Select
                value={formData.generoPersona}
                onValueChange={(value) => handleInputChange("generoPersona", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Teléfono *</Label>
              <Input
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="1150000000"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo identificación fiscal *</Label>
              <Select
                value={formData.tipoIdentificacionFiscal}
                onValueChange={(value) => handleInputChange("tipoIdentificacionFiscal", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUIT">CUIT</SelectItem>
                  <SelectItem value="CUIL">CUIL</SelectItem>
                  <SelectItem value="CDI">CDI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Impuestos - grupo de impuestos *</Label>
              <Select
                value={formData.condicionGanancias}
                onValueChange={(value) => handleInputChange("condicionGanancias", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C-RI responsable inscripto">C-RI responsable inscripto</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Condición de ganancias *</Label>
              <Select
                value={formData.condicionGanancias}
                onValueChange={(value) => handleInputChange("condicionGanancias", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                  <SelectItem value="No Inscripto">No Inscripto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condición frente al IVA *</Label>
              <Select
                value={formData.condicionFrenteIVA}
                onValueChange={(value) => handleInputChange("condicionFrenteIVA", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RI Responsable Inscripto">RI Responsable Inscripto</SelectItem>
                  <SelectItem value="Monotributo">Monotributo</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>NIF *</Label>
            <Input
              value={formData.nif}
              onChange={(e) => handleInputChange("nif", e.target.value)}
              placeholder="23426081231"
              className="max-w-md"
            />
          </div>
        </div>

        {/* Commercial Information */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg border-b pb-2">Información Comercial</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Asesor comercial</Label>
              <Input
                value={formData.asesorComercial}
                onChange={(e) => handleInputChange("asesorComercial", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría canal</Label>
              <Input
                value={formData.categoriaCanal}
                onChange={(e) => handleInputChange("categoriaCanal", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subcategoría canal</Label>
              <Input
                value={formData.subcategoriaCanal}
                onChange={(e) => handleInputChange("subcategoriaCanal", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Input value={formData.canal} onChange={(e) => handleInputChange("canal", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Economic Activity Information */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg border-b pb-2">Información de Actividad Económica</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo empresa</Label>
              <Select value={formData.tipoEmpresa} onValueChange={(value) => handleInputChange("tipoEmpresa", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SA">Sociedad Anónima</SelectItem>
                  <SelectItem value="SRL">Sociedad de Responsabilidad Limitada</SelectItem>
                  <SelectItem value="Unipersonal">Unipersonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condición IVA</Label>
              <Select value={formData.condicionIVA} onValueChange={(value) => handleInputChange("condicionIVA", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar condición IVA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RI">Responsable Inscripto</SelectItem>
                  <SelectItem value="Monotributo">Monotributo</SelectItem>
                  <SelectItem value="Exento">Exento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tamaño empresa</Label>
              <Input
                value={formData.tamanoEmpresa}
                onChange={(e) => handleInputChange("tamanoEmpresa", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Actividad</Label>
              <Input value={formData.actividad} onChange={(e) => handleInputChange("actividad", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fecha inicio actividad</Label>
              <Input
                type="date"
                value={formData.fechaInicioActividad}
                onChange={(e) => handleInputChange("fechaInicioActividad", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Cierre Balance</Label>
              <Input
                type="date"
                value={formData.cierreBalance}
                onChange={(e) => handleInputChange("cierreBalance", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Importador</Label>
              <Input value={formData.importador} onChange={(e) => handleInputChange("importador", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Exportador</Label>
              <Input value={formData.exportador} onChange={(e) => handleInputChange("exportador", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Página web</Label>
              <Input value={formData.paginaWeb} onChange={(e) => handleInputChange("paginaWeb", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nro. Ingresos Brutos</Label>
              <Input
                value={formData.nroIngresosBrutos}
                onChange={(e) => handleInputChange("nroIngresosBrutos", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Condición de Ingresos Brutos</Label>
              <Input
                value={formData.condicionIngresosBrutos}
                onChange={(e) => handleInputChange("condicionIngresosBrutos", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sede Ingresos Brutos</Label>
              <Input
                value={formData.sedeIngresosBrutos}
                onChange={(e) => handleInputChange("sedeIngresosBrutos", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Actividad Económica ARCA Primaria</Label>
              <Input
                value={formData.actividadEconomicaARCA}
                onChange={(e) => handleInputChange("actividadEconomicaARCA", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>C.N.A.E.</Label>
              <Input value={formData.cnae} onChange={(e) => handleInputChange("cnae", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sector ARCA</Label>
              <Input value={formData.sectorARCA} onChange={(e) => handleInputChange("sectorARCA", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sector Sepyme</Label>
              <Input
                value={formData.sectorSepyme}
                onChange={(e) => handleInputChange("sectorSepyme", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Actividad Económica ARCA Secundaria</Label>
              <Input
                value={formData.sectorARCASecundaria}
                onChange={(e) => handleInputChange("sectorARCASecundaria", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg border-b pb-2">Información de Dirección</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Calle *</Label>
              <Input value={formData.calle} onChange={(e) => handleInputChange("calle", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Número *</Label>
              <Input value={formData.numero} onChange={(e) => handleInputChange("numero", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Piso</Label>
              <Input value={formData.piso} onChange={(e) => handleInputChange("piso", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Oficina</Label>
              <Input value={formData.oficina} onChange={(e) => handleInputChange("oficina", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>CPA *</Label>
              <Input value={formData.cpa} onChange={(e) => handleInputChange("cpa", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Provincia *</Label>
              <Input value={formData.provincia} onChange={(e) => handleInputChange("provincia", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Municipio</Label>
              <Input value={formData.municipio} onChange={(e) => handleInputChange("municipio", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Localidad</Label>
              <Input value={formData.localidad} onChange={(e) => handleInputChange("localidad", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Apdo. Correo</Label>
            <Input
              value={formData.apartadoCorreo}
              onChange={(e) => handleInputChange("apartadoCorreo", e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        {/* Representative Information */}
        <div className="space-y-6">
          <h3 className="font-medium text-lg border-b pb-2">Información del Representante Legal</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Documento del representante *</Label>
              <Input
                value={formData.documentoRepresentante}
                onChange={(e) => handleInputChange("documentoRepresentante", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Nombre del representante *</Label>
              <Input
                value={formData.nombreRepresentante}
                onChange={(e) => handleInputChange("nombreRepresentante", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Apellido del representante *</Label>
              <Input
                value={formData.apellidoRepresentante}
                onChange={(e) => handleInputChange("apellidoRepresentante", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Cargo *</Label>
              <Select value={formData.cargo} onValueChange={(value) => handleInputChange("cargo", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Presidente">Presidente</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Apoderado">Apoderado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo teléfono</Label>
              <Input
                value={formData.tipoTelefono}
                onChange={(e) => handleInputChange("tipoTelefono", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Cód. Área</Label>
              <Input value={formData.codigoArea} onChange={(e) => handleInputChange("codigoArea", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input
                value={formData.telefonoRepresentante}
                onChange={(e) => handleInputChange("telefonoRepresentante", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Correo electrónico *</Label>
              <Input
                type="email"
                value={formData.correoElectronico}
                onChange={(e) => handleInputChange("correoElectronico", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo teléfono adicional</Label>
              <Input
                value={formData.telefonoAdicional}
                onChange={(e) => handleInputChange("telefonoAdicional", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Correo electrónico adicional</Label>
            <Input
              type="email"
              value={formData.correoElectronicoAdicional}
              onChange={(e) => handleInputChange("correoElectronicoAdicional", e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => setCurrentStep("cuit-validation")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a validación
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/onboarding">Cancelar</Link>
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creando...
                </div>
              ) : (
                "Crear registro"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard/onboarding" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm text-gray-600">Volver a Socio Participe</span>
          </div>
        </div>

        {/* Form Steps */}
        {currentStep === "cuit-validation" && renderCuitValidation()}
        {currentStep === "complete-form" && renderCompleteForm()}
        {currentStep === "success" && renderSuccessMessage()}
      </div>
    </DashboardLayout>
  )
}
