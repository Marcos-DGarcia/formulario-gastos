"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createExpense(formData: FormData) {
  const date = formData.get("date") as string
  const description = formData.get("description") as string
  const amount = Number.parseFloat(formData.get("amount") as string)
  const paymentMethod = formData.get("payment_method") as string

  if (!date || !description || !paymentMethod) {
    return { error: "Todos los campos son requeridos" }
  }

  if (isNaN(amount)) {
    return { error: "Monto inválido" }
  }

  const { data, error } = await supabase
  .from("expenses")
  .insert([
    {
      columna_fecha: date,
      columna_concepto: description,
      columna_monto: amount,
      forma_pago: paymentMethod
    },
  ]);

  if (error) {
    console.error("Error Supabase:", error)
    const mensaje = typeof error === "object" && error.message
      ? error.message
      : "Error inesperado al guardar"
    return { error: mensaje }
  }

    console.log("Respuesta Supabase:", { data, error });
  revalidatePath("/")
  return { success: true }
}
