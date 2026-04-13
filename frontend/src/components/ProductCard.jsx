export function ProductCard({ product, onSelect }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_14px_40px_rgba(47,29,20,0.08)] transition hover:-translate-y-1">
      <button type="button" onClick={() => onSelect(product)} className="w-full text-left">
        <div className="relative h-44 overflow-hidden">
          <img src={product.imagem} alt={product.nome} className="h-full w-full object-cover" />
          {product.destaque ? (
            <span className="absolute left-4 top-4 rounded-full bg-corn px-3 py-1 text-xs font-bold text-ink">
              {product.destaque}
            </span>
          ) : null}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-ink">{product.nome}</h3>
              <p className="mt-1 text-sm leading-6 text-ink/70">{product.descricao}</p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
              R$ {product.preco.toFixed(2).replace(".", ",")}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink/55">{product.opcoes.length ? "Personalizavel" : "Pronto para pedir"}</span>
            <span className="font-semibold text-chili">Adicionar</span>
          </div>
        </div>
      </button>
    </article>
  );
}
