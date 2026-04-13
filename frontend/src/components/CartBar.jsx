export function CartBar({ itemCount, total, onOpen }) {
  if (!itemCount) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 px-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full bg-brand-700 px-5 py-4 text-white shadow-float">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/60">Carrinho</p>
          <p className="text-sm font-semibold">{itemCount} item(ns)</p>
        </div>
        <button type="button" onClick={onOpen} className="flex items-center gap-3">
          <span className="text-sm font-semibold">Ver pedido</span>
          <span className="rounded-full bg-white/15 px-3 py-2 text-sm font-bold">
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </button>
      </div>
    </div>
  );
}
