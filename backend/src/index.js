import cors from "cors";
import express from "express";
import { products } from "./data/menu.js";

const app = express();
const port = process.env.PORT || 4000;
const orders = [];

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/api/products", (_request, response) => {
  response.json(products);
});

app.post("/api/orders", (request, response) => {
  const { cliente, telefone, endereco, itens, total, pagamento, tipoEntrega } = request.body;

  if (!cliente || !telefone || !itens?.length || !pagamento || !tipoEntrega) {
    return response.status(400).json({
      message: "Dados obrigatorios ausentes para concluir o pedido.",
    });
  }

  const order = {
    id: `pedido-${Date.now()}`,
    cliente,
    telefone,
    endereco,
    itens,
    total,
    pagamento,
    tipoEntrega,
    criadoEm: new Date().toISOString(),
  };

  orders.unshift(order);
  return response.status(201).json(order);
});

app.get("/api/orders", (_request, response) => {
  response.json(orders);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
