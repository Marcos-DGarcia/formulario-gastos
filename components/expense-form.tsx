"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createExpense } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"




const paymentMethods = [
  { id: "efectivo", label: "Efectivo" },
  { id: "debito", label: "Débito" },
  { id: "mp", label: "MP" },
  { id: "otro", label: "Otro" },
]


export default function ExpenseForm() {
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    const result = await createExpense(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "¡Éxito!",
        description: "Gasto guardado correctamente",
      })
      // Reset form
      setSelectedPayment("")
      const form = document.getElementById("expense-form") as HTMLFormElement
      form?.reset()
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registrar Gasto</CardTitle>
        <CardDescription>Ingresa los detalles de tu gasto</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="expense-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe el gasto..."
              required
              className="min-h-[80px]"
            />
          </div>
                      <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>

          <div className="space-y-3">
            <Label>Forma de Pago</Label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-3 rounded-md border-2 text-sm font-medium transition-colors ${
                    selectedPayment === method.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="payment_method" value={selectedPayment} required />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || !selectedPayment}>
            {isSubmitting ? "Guardando..." : "Guardar Gasto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
