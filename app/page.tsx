import ExpenseForm from "@/components/expense-form"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Control de Gastos</h1>
        <ExpenseForm />
        <Toaster />
      </div>
    </main>
  )
}
