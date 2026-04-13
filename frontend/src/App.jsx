import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { CategoryTabs } from "./components/CategoryTabs";
import { ProductCard } from "./components/ProductCard";
import { ProductModal } from "./components/ProductModal";
import { CartBar } from "./components/CartBar";
import { CartDrawer } from "./components/CartDrawer";
import { mockMenu } from "./data/mockMenu";

const API_URL = "http://localhost:4000/api";
const LAST_ORDER_KEY = "la-noche-tacos-last-order";

function getStoreStatus() {
  const hour = new Date().getHours();
  return hour >= 11 && hour < 23 ? "Aberto" : "Fechado";
}

function createCartItem({ product, quantity, notes, selections, unitPrice }) {
  return {
    id: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    productId: product.id,
    nome: product.nome,
    imagem: product.imagem,
    quantity,
    notes,
    selections,
    unitPrice,
  };
}

export default function App() {
  const [menu, setMenu] = useState(mockMenu);
  const [activeCategory, setActiveCategory] = useState("Tacos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [lastOrder, setLastOrder] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    cliente: "",
    telefone: "",
    endereco: "",
    pagamento: "Pix",
    tipoEntrega: "Entrega",
  });

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
          throw new Error("Nao foi possivel carregar o cardapio.");
        }
        const products = await response.json();
        setMenu(products);
      } catch (error) {
        setMenu(mockMenu);
      }
    }

    loadMenu();
  }, []);

  useEffect(() => {
    const storedOrder = localStorage.getItem(LAST_ORDER_KEY);
    if (storedOrder) {
      setLastOrder(JSON.parse(storedOrder));
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      setOrderSent(false);
    }
  }, [cart]);

  const categories = useMemo(() => [...new Set(menu.map((item) => item.categoria))], [menu]);

  useEffect(() => {
    if (categories.length && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  const filteredMenu = useMemo(
    () => menu.filter((product) => product.categoria === activeCategory),
    [activeCategory, menu],
  );

  const suggestions = useMemo(
    () => menu.filter((item) => item.categoria !== activeCategory).slice(0, 3),
    [activeCategory, menu],
  );

  const itemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);
  const status = getStoreStatus();

  function handleAddToCart(payload) {
    setCart((current) => [...current, createCartItem(payload)]);
    setSelectedProduct(null);
    setDrawerOpen(true);
  }

  function handleAdjustQuantity(itemId, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleSuggestionAdd(item) {
    setOrderSent(false);
    setCart((current) => [
      ...current,
      createCartItem({
        product: item,
        quantity: 1,
        notes: "",
        selections: {},
        unitPrice: item.preco,
      }),
    ]);
  }

  function handleChangeForm(field, value) {
    setCheckoutForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "tipoEntrega" && value === "Retirada" ? { endereco: "" } : {}),
    }));
  }

  async function handleSubmitOrder(event) {
    event.preventDefault();
    if (!cart.length) {
      return;
    }

    const payload = {
      cliente: checkoutForm.cliente,
      telefone: checkoutForm.telefone,
      endereco: checkoutForm.tipoEntrega === "Entrega" ? checkoutForm.endereco : "Retirada no local",
      tipoEntrega: checkoutForm.tipoEntrega,
      pagamento: checkoutForm.pagamento,
      itens: cart,
      total,
    };

    try {
      setSubmitting(true);
      setOrderSent(false);
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar pedido");
      }

      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(cart));
      setLastOrder(cart);
      setOrderSent(true);
      setCart([]);
      setCheckoutForm({
        cliente: "",
        telefone: "",
        endereco: "",
        pagamento: "Pix",
        tipoEntrega: "Entrega",
      });
    } catch (error) {
      window.alert("Nao foi possivel enviar o pedido agora. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReorder() {
    if (!lastOrder.length) {
      return;
    }
    setOrderSent(false);
    const clonedItems = lastOrder.map((item) => ({
      ...item,
      id: `${item.productId}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    }));
    setCart(clonedItems);
    setDrawerOpen(true);
  }

  return (
    <div className="min-h-screen bg-crema pb-28 text-ink">
      <Header
        restaurantName="La Noche Tacos"
        status={status}
        reopenText={status === "Aberto" ? "Recebendo pedidos agora" : "Reabre hoje as 11h"}
        onReorder={handleReorder}
        canReorder={Boolean(lastOrder.length)}
      />

      <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-700">Mais pedidos</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">{activeCategory}</h2>
          </div>
          <p className="max-w-xs text-right text-sm text-ink/60">
            Escolha seus favoritos, personalize e finalize em poucos toques.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenu.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </section>
      </main>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={handleAddToCart} />

      <CartDrawer
        open={drawerOpen}
        cart={cart}
        suggestions={suggestions}
        total={total}
        onClose={() => setDrawerOpen(false)}
        onAdjustQuantity={handleAdjustQuantity}
        onAddSuggestion={handleSuggestionAdd}
        form={checkoutForm}
        onChangeForm={handleChangeForm}
        onSubmitOrder={handleSubmitOrder}
        submitting={submitting}
        orderSent={orderSent}
      />

      <CartBar itemCount={itemCount} total={total} onOpen={() => setDrawerOpen(true)} />
    </div>
  );
}
