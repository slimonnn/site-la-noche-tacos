import { useEffect, useMemo, useState } from "react";

function buildInitialSelections(product) {
  return (product?.opcoes || []).reduce((accumulator, option) => {
    if (option.tipo === "single") {
      const defaultChoice =
        option.escolhas.find((choice) => choice.preco === 0)?.nome || option.escolhas[0]?.nome || "";
      accumulator[option.nome] = defaultChoice;
    }
    return accumulator;
  }, {});
}

export function ProductModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selections, setSelections] = useState({});

  useEffect(() => {
    setQuantity(1);
    setNotes("");
    setSelections(buildInitialSelections(product));
  }, [product]);

  const extraPrice = useMemo(() => {
    if (!product) {
      return 0;
    }

    return product.opcoes.reduce((total, option) => {
      const selectedChoice = option.escolhas.find((choice) => choice.nome === selections[option.nome]);
      return total + (selectedChoice?.preco || 0);
    }, 0);
  }, [product, selections]);

  if (!product) {
    return null;
  }

  const total = (product.preco + extraPrice) * quantity;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-white pb-28 sm:rounded-[2rem]">
        <div className="relative h-60">
          <img src={product.imagem} alt={product.nome} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-ink shadow"
          >
            Fechar
          </button>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-ink">{product.nome}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{product.descricao}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                R$ {product.preco.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          {product.opcoes.map((option) => (
            <section key={option.nome} className="rounded-[1.5rem] border border-brand-100 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">{option.nome}</h3>
                <span className="text-xs font-medium text-ink/50">
                  {option.obrigatorio ? "Obrigatorio" : "Opcional"}
                </span>
              </div>

              <div className="space-y-2">
                {option.escolhas.map((choice) => (
                  <label
                    key={`${option.nome}-${choice.nome}`}
                    className="flex cursor-pointer items-center justify-between rounded-2xl bg-crema px-4 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={option.nome}
                        value={choice.nome}
                        checked={selections[option.nome] === choice.nome}
                        onChange={(event) =>
                          setSelections((current) => ({
                            ...current,
                            [option.nome]: event.target.value,
                          }))
                        }
                        className="h-4 w-4 accent-brand-700"
                      />
                      <span className="text-sm font-medium text-ink">{choice.nome}</span>
                    </span>
                    <span className="text-sm text-ink/70">
                      {choice.preco ? `+ R$ ${choice.preco.toFixed(2).replace(".", ",")}` : "Incluso"}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-[1.5rem] border border-brand-100 p-4">
            <label className="mb-2 block font-semibold text-ink" htmlFor="notes">
              Observacoes
            </label>
            <textarea
              id="notes"
              rows="3"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none transition focus:border-brand-500"
              placeholder="Ex: sem cebola, molho a parte..."
            />
          </section>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-brand-100 bg-white/95 p-4 backdrop-blur sm:left-auto sm:right-auto sm:w-full sm:max-w-2xl sm:rounded-b-[2rem]">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full bg-crema p-1">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-10 w-10 rounded-full text-xl font-semibold text-ink"
              >
                -
              </button>
              <span className="min-w-10 text-center text-sm font-semibold text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="h-10 w-10 rounded-full text-xl font-semibold text-ink"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                onAdd({
                  product,
                  quantity,
                  notes,
                  selections,
                  unitPrice: product.preco + extraPrice,
                })
              }
              className="flex-1 rounded-full bg-brand-700 px-5 py-4 text-sm font-semibold text-white"
            >
              Adicionar por R$ {total.toFixed(2).replace(".", ",")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
