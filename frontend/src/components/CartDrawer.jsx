import { CheckoutForm } from "./CheckoutForm";

function formatCartOptions(selections) {
  return Object.entries(selections || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join(" • ");
}

export function CartDrawer({
  open,
  cart,
  suggestions,
  total,
  onClose,
  onAdjustQuantity,
  onAddSuggestion,
  form,
  onChangeForm,
  onSubmitOrder,
  submitting,
  orderSent,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-ink/50">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white">
        <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ink/45">Seu pedido</p>
            <h2 className="text-xl font-bold text-ink">Carrinho e checkout</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-crema px-4 py-2 text-sm font-semibold">
            Fechar
          </button>
        </div>

        <div className="flex-1 space-y-6 p-5">
          <section className="space-y-4">
            {cart.length ? (
              cart.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-brand-100 p-4">
                  <div className="flex items-start gap-4">
                    <img src={item.imagem} alt={item.nome} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-ink">{item.nome}</h3>
                          <p className="mt-1 text-xs leading-5 text-ink/60">{formatCartOptions(item.selections)}</p>
                          {item.notes ? <p className="mt-1 text-xs text-ink/50">Obs: {item.notes}</p> : null}
                        </div>
                        <span className="text-sm font-semibold text-brand-700">
                          R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full bg-crema p-1">
                          <button
                            type="button"
                            onClick={() => onAdjustQuantity(item.id, -1)}
                            className="h-9 w-9 rounded-full text-lg font-semibold"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onAdjustQuantity(item.id, 1)}
                            className="h-9 w-9 rounded-full text-lg font-semibold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAdjustQuantity(item.id, -item.quantity)}
                          className="text-sm font-semibold text-chili"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-crema p-5 text-sm text-ink/65">
                Seu carrinho esta vazio. Adicione alguns tacos para continuar.
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Sugestoes para completar</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Upsell</span>
            </div>
            <div className="grid gap-3">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onAddSuggestion(item)}
                  className="flex items-center justify-between rounded-[1.5rem] border border-brand-100 px-4 py-3 text-left"
                >
                  <div>
                    <p className="font-semibold text-ink">{item.nome}</p>
                    <p className="text-sm text-ink/60">{item.descricao}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-700">
                    + R$ {item.preco.toFixed(2).replace(".", ",")}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] bg-crema p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">Finalizar pedido</h3>
              <span className="text-base font-bold text-brand-700">
                Total: R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {orderSent ? (
              <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">
                Pedido enviado com sucesso. Em instantes sua equipe recebe tudo por aqui.
              </div>
            ) : (
              <CheckoutForm
                form={form}
                onChange={onChangeForm}
                onSubmit={onSubmitOrder}
                submitting={submitting}
              />
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
