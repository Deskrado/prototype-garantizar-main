"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, AlertCircle, CheckCircle, Upload, X, FileText } from "lucide-react"
import Link from "next/link"

interface DocumentRequirement {
  id: string
  name: string
  required: boolean
  status: "pending" | "uploaded" | "error"
  file?: File
  error?: string
  hasAutoRetrieve?: boolean
  autoRetrieveSource?: string
}

const PRODUCT_DOCUMENTS: Record<string, { required: DocumentRequirement[]; optional: DocumentRequirement[] }> = {
  "Garantía Financiera": {
    required: [
      {
        id: "certificado_pyme",
        name: "Certificado PyME",
        required: true,
        status: "pending",
        hasAutoRetrieve: true,
        autoRetrieveSource: "SePyME",
      },
      { id: "detalle_ventas_compras", name: "Detalle de ventas y compras", required: true, status: "pending" },
      {
        id: "estados_contables",
        name: "Estados contables (balance)",
        required: true,
        status: "pending",
        hasAutoRetrieve: true,
        autoRetrieveSource: "LUFE",
      },
      { id: "composicion_societaria", name: "Composición Societaria CUIT", required: true, status: "pending" },
      { id: "detalle_contragarantia", name: "Detalle de contragarantía a ofrecer", required: true, status: "pending" },
    ],
    optional: [
      { id: "contratos_obras_vigentes", name: "Contratos de obras vigentes", required: false, status: "pending" },
      { id: "detalle_deuda_bancaria", name: "Detalle deuda bancaria y financiera", required: false, status: "pending" },
      { id: "manifestacion_bienes", name: "Manifestación de bienes", required: false, status: "pending" },
      { id: "referencias_comerciales", name: "Referencias Comerciales", required: false, status: "pending" },
      { id: "plan_negocios", name: "Plan de Negocios", required: false, status: "pending" },
    ],
  },
  "Garantía Comercial": {
    required: [
      { id: "contrato_comercial", name: "Contrato Comercial", required: true, status: "pending" },
      { id: "factura_proforma", name: "Factura Proforma", required: true, status: "pending" },
      { id: "certificado_origen", name: "Certificado de Origen", required: true, status: "pending" },
    ],
    optional: [
      { id: "contratos_obras_vigentes", name: "Contratos de obras vigentes", required: false, status: "pending" },
      { id: "detalle_deuda_bancaria", name: "Detalle deuda bancaria y financiera", required: false, status: "pending" },
      { id: "manifestacion_bienes", name: "Manifestación de bienes", required: false, status: "pending" },
      { id: "seguro_mercancia", name: "Seguro de Mercancía", required: false, status: "pending" },
      { id: "carta_credito", name: "Carta de Crédito", required: false, status: "pending" },
    ],
  },
}

export default function NuevaSolicitudPage() {
  const [formData, setFormData] = useState({
    cuit: "",
    nombreEmpresa: "",
    tipoPersona: "",
    montoSolicitado: "",
    moneda: "Peso",
    tipoProducto: "",
    finalidad: "",
    actividadEconomica: "",
  })

  const [isValidating, setIsValidating] = useState(false)
  const [validationStatus, setValidationStatus] = useState<"idle" | "success" | "error" | "insufficient">("idle")
  const [availableProducts, setAvailableProducts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState<{ required: DocumentRequirement[]; optional: DocumentRequirement[] }>({
    required: [],
    optional: [],
  })
  const [showDocuments, setShowDocuments] = useState(false)
  const [isValidatingDocument, setIsValidatingDocument] = useState<string | null>(null)
  const [isRetrievingDocument, setIsRetrievingDocument] = useState<string | null>(null)

  useEffect(() => {
    const registrationData = localStorage.getItem("registrationData")
    if (registrationData) {
      const companyData = JSON.parse(registrationData)
      setFormData((prev) => ({
        ...prev,
        cuit: companyData.cuit || "23426081231",
        nombreEmpresa: companyData.razonSocial || companyData.nombreComercial || "Empresa CUIT 23426081231",
        tipoPersona: companyData.tipoPersona || "Jurídica",
      }))
      setValidationStatus("success")
      setAvailableProducts(["Garantía Financiera", "Garantía Comercial"])
      localStorage.removeItem("registrationData")
    }
  }, [])

  const handleCuitValidation = async () => {
    if (!formData.cuit) return

    setIsValidating(true)
    setValidationStatus("idle")

    if (formData.cuit === "23426081231") {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setFormData((prev) => ({
        ...prev,
        nombreEmpresa: "Empresa CUIT 23426081231",
        tipoPersona: "Jurídica",
      }))
      setAvailableProducts(["Garantía Financiera", "Garantía Comercial"])
      setValidationStatus("success")
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const randomResult = Math.random()
      if (randomResult > 0.7) {
        setValidationStatus("error")
      } else if (randomResult > 0.3) {
        setValidationStatus("insufficient")
      } else {
        setFormData((prev) => ({
          ...prev,
          nombreEmpresa: `Empresa CUIT ${formData.cuit}`,
          tipoPersona: "Jurídica",
        }))
        setAvailableProducts(["Garantía Financiera"])
        setValidationStatus("success")
      }
    }

    setIsValidating(false)
  }

  const handleProductChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoProducto: value }))
    if (value && PRODUCT_DOCUMENTS[value]) {
      setDocuments({
        required: [...PRODUCT_DOCUMENTS[value].required],
        optional: [...PRODUCT_DOCUMENTS[value].optional],
      })
      setShowDocuments(true)
    } else {
      setDocuments({ required: [], optional: [] })
      setShowDocuments(false)
    }
  }

  const handleAutoRetrieve = async (documentId: string, source: string) => {
    setIsRetrievingDocument(documentId)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    const isSuccessful = Math.random() > 0.1

    if (isSuccessful) {
      const mockFile = new File([`Mock ${source} data`], `${source}_document.pdf`, { type: "application/pdf" })

      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId ? { ...doc, status: "uploaded", file: mockFile, error: undefined } : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId ? { ...doc, status: "uploaded", file: mockFile, error: undefined } : doc,
        ),
      }))
    } else {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error: `No fue posible obtener el documento desde ${source}. Intente nuevamente o cargue manualmente.`,
              }
            : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error: `No fue posible obtener el documento desde ${source}. Intente nuevamente o cargue manualmente.`,
              }
            : doc,
        ),
      }))
    }

    setIsRetrievingDocument(null)
  }

  const handleFileUpload = async (documentId: string, file: File) => {
    const allowedFormats = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedFormats.includes(file.type)) {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error:
                  "El archivo no cumple con las especificaciones. Verifique el formato y el tamaño máximo permitido.",
              }
            : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error:
                  "El archivo no cumple con las especificaciones. Verifique el formato y el tamaño máximo permitido.",
              }
            : doc,
        ),
      }))
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId
            ? { ...doc, status: "error", error: "El archivo excede el tamaño máximo permitido (10MB)." }
            : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId
            ? { ...doc, status: "error", error: "El archivo excede el tamaño máximo permitido (10MB)." }
            : doc,
        ),
      }))
      return
    }

    setIsValidatingDocument(documentId)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const isValidDocument = Math.random() > 0.1

    if (isValidDocument) {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId ? { ...doc, status: "uploaded", file, error: undefined } : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId ? { ...doc, status: "uploaded", file, error: undefined } : doc,
        ),
      }))
    } else {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error: "El documento está borroso o en blanco. Por favor, cargue un archivo legible.",
              }
            : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error",
                error: "El documento está borroso o en blanco. Por favor, cargue un archivo legible.",
              }
            : doc,
        ),
      }))
    }

    setIsValidatingDocument(null)
  }

  const handleFileRetry = (documentId: string) => {
    setDocuments((prev) => ({
      required: prev.required.map((doc) =>
        doc.id === documentId ? { ...doc, status: "pending", file: undefined, error: undefined } : doc,
      ),
      optional: prev.optional.map((doc) =>
        doc.id === documentId ? { ...doc, status: "pending", file: undefined, error: undefined } : doc,
      ),
    }))
  }

  const handleFileRemove = (documentId: string) => {
    if (window.confirm("¿Está seguro que desea eliminar este documento?")) {
      setDocuments((prev) => ({
        required: prev.required.map((doc) =>
          doc.id === documentId ? { ...doc, status: "pending", file: undefined, error: undefined } : doc,
        ),
        optional: prev.optional.map((doc) =>
          doc.id === documentId ? { ...doc, status: "pending", file: undefined, error: undefined } : doc,
        ),
      }))
    }
  }

  const handleFileReplace = (documentId: string) => {
    if (window.confirm("¿Está seguro que desea reemplazar este documento?")) {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = ".jpg,.jpeg,.png,.pdf"
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          handleFileUpload(documentId, file)
        }
      }
      input.click()
    }
  }

  const canProceed = () => {
    if (!showDocuments) return false
    return documents.required.every((doc) => doc.status === "uploaded")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canProceed()) {
      alert("Debe cargar todos los documentos obligatorios antes de continuar.")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert("Solicitud creada exitosamente en estado Pendiente")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderDocumentSection = (docs: DocumentRequirement[], title: string) => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 border-b pb-2">{title}</h4>
      {docs.map((doc) => (
        <div key={doc.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="font-medium">
                {doc.name} {doc.required && <span className="text-red-500">*</span>}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {doc.status === "pending" && (
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Pendiente</span>
              )}
              {doc.status === "uploaded" && (
                <span className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded">Cargado</span>
              )}
              {doc.status === "error" && (
                <span className="text-sm text-red-700 bg-red-100 px-2 py-1 rounded">Error</span>
              )}
            </div>
          </div>

          {doc.status === "pending" && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(doc.id, file)
                    }}
                    className="hidden"
                    id={`file-${doc.id}`}
                  />
                  <label
                    htmlFor={`file-${doc.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-4 h-4" />
                    Adjuntar archivo
                  </label>
                </div>

                {doc.hasAutoRetrieve && doc.autoRetrieveSource && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAutoRetrieve(doc.id, doc.autoRetrieveSource!)}
                    disabled={isRetrievingDocument === doc.id}
                    className="px-4 py-2"
                  >
                    {isRetrievingDocument === doc.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        Obteniendo...
                      </div>
                    ) : (
                      `Obtener ${doc.autoRetrieveSource}`
                    )}
                  </Button>
                )}
              </div>

              <p className="text-xs text-gray-500">Formatos admitidos: JPG, PNG, PDF. Tamaño máximo: 10MB</p>
            </div>
          )}

          {isRetrievingDocument === doc.id && (
            <div className="flex items-center gap-2 text-blue-600 mt-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Obteniendo información desde {doc.autoRetrieveSource}...</span>
            </div>
          )}

          {isValidatingDocument === doc.id && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Validando documento...</span>
            </div>
          )}

          {doc.status === "uploaded" && doc.file && (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">{doc.file.name}</span>
                <span className="text-xs text-gray-500">({(doc.file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => handleFileReplace(doc.id)}>
                  Reemplazar
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => handleFileRemove(doc.id)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {doc.status === "error" && doc.error && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-800">{doc.error}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-sm font-medium text-gray-700">Opciones para continuar:</p>
                <div className="flex flex-wrap gap-2">
                  <div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(doc.id, file)
                      }}
                      className="hidden"
                      id={`file-error-${doc.id}`}
                    />
                    <label
                      htmlFor={`file-error-${doc.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Cargar otro archivo
                    </label>
                  </div>
                  {doc.hasAutoRetrieve && doc.autoRetrieveSource && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAutoRetrieve(doc.id, doc.autoRetrieveSource!)}
                      disabled={isRetrievingDocument === doc.id}
                      className="px-4 py-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      {isRetrievingDocument === doc.id ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          Obteniendo...
                        </div>
                      ) : (
                        `Reintentar ${doc.autoRetrieveSource}`
                      )}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleFileRetry(doc.id)}
                    className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Eliminar y reintentar
                  </Button>
                </div>
                <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                  <strong>Consejos:</strong>
                  <ul className="mt-1 space-y-1 list-disc list-inside">
                    <li>Verifique que el archivo esté en formato JPG, PNG o PDF</li>
                    <li>Asegúrese de que el archivo no exceda 10MB</li>
                    <li>El documento debe ser legible y no estar borroso</li>
                    <li>Si el problema persiste, puede continuar con otros documentos y volver más tarde</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard/resumen" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm text-gray-600">Volver al Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Solicitud de Garantía</h1>
          <p className="text-gray-600">Complete la información para crear una nueva solicitud</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                Datos Básicos de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ... existing form content ... */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cuit">CUIT *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cuit"
                      value={formData.cuit}
                      onChange={(e) => handleInputChange("cuit", e.target.value)}
                      placeholder="20-12345678-9"
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleCuitValidation}
                      disabled={isValidating || !formData.cuit}
                      className="px-3"
                    >
                      {isValidating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {isValidating && <p className="text-sm text-blue-600 mt-1">Validando con NOSIS y Garantizar...</p>}
                </div>

                <div>
                  <Label htmlFor="nombreEmpresa">Nombre Empresa</Label>
                  <Input
                    id="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    readOnly
                    className="bg-gray-50"
                    placeholder="Se cargará automáticamente"
                  />
                </div>

                <div>
                  <Label htmlFor="tipoPersona">Tipo de Persona</Label>
                  <Input
                    id="tipoPersona"
                    value={formData.tipoPersona}
                    readOnly
                    className="bg-gray-50"
                    placeholder="Se cargará automáticamente"
                  />
                </div>
              </div>

              {validationStatus === "success" && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800">Empresa validada exitosamente. Productos disponibles cargados.</span>
                </div>
              )}

              {validationStatus === "insufficient" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800">
                    La empresa no se encuentra habilitada para el producto solicitado debido a su calificación en NOSIS.
                  </span>
                </div>
              )}

              {validationStatus === "error" && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800">
                    No fue posible validar la solicitud. Intente nuevamente más tarde.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ... existing form sections ... */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                Datos de la Solicitud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="montoSolicitado">Monto Solicitado *</Label>
                  <Input
                    id="montoSolicitado"
                    type="number"
                    value={formData.montoSolicitado}
                    onChange={(e) => handleInputChange("montoSolicitado", e.target.value)}
                    placeholder="Ingrese el monto"
                    maxLength={30}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="moneda">Moneda *</Label>
                  <Select value={formData.moneda} onValueChange={(value) => handleInputChange("moneda", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Peso">Peso</SelectItem>
                      <SelectItem value="Dólar">Dólar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tipoProducto">Tipo de Producto *</Label>
                  <Select
                    value={formData.tipoProducto}
                    onValueChange={handleProductChange}
                    disabled={validationStatus !== "success"}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={validationStatus !== "success" ? "Valide CUIT primero" : "Seleccione un producto"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="finalidad">Finalidad de la Solicitud *</Label>
                  <Select value={formData.finalidad} onValueChange={(value) => handleInputChange("finalidad", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione finalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Capital de trabajo">Capital de trabajo</SelectItem>
                      <SelectItem value="Inversión">Inversión</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="actividadEconomica">Actividad Económica *</Label>
                  <Select
                    value={formData.actividadEconomica}
                    onValueChange={(value) => handleInputChange("actividadEconomica", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione actividad económica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Comercio">Comercio</SelectItem>
                      <SelectItem value="Industria">Industria</SelectItem>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Construcción">Construcción</SelectItem>
                      <SelectItem value="Agropecuario">Agropecuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {showDocuments && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  Indexar Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Cargue los documentos requeridos para el producto seleccionado. Los campos marcados con * son
                  obligatorios.
                </p>

                {renderDocumentSection(documents.required, "Documentos Obligatorios")}

                {documents.optional.length > 0 && (
                  <div className="pt-4">{renderDocumentSection(documents.optional, "Documentos Opcionales")}</div>
                )}

                {!canProceed() && documents.required.length > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-800">
                      Debe cargar todos los documentos obligatorios antes de continuar.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3 pt-6">
            <Link href="/dashboard/resumen">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading || validationStatus !== "success" || (showDocuments && !canProceed())}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando...
                </div>
              ) : (
                "Crear Solicitud"
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
