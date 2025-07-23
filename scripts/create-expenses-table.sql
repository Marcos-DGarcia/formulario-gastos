-- Crear tabla para gastos
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "date" DATE NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('efectivo', 'debito', 'mp', 'otro')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datos de ejemplo
INSERT INTO expenses ("date", description, amount, payment_method) VALUES
  ('2024-01-15', 'Almuerzo en restaurante', 12.50 , 'debito'),
  ('2024-01-16', 'Compra en supermercado', 45.99 , 'efectivo'),
  ('2024-01-17', 'Pago de servicios',       80.00 , 'mp');
