export function CheckoutForm({ form, onChange, onSubmit, submitting }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-ink">
          <span>Nome</span>
          <input
            required
            type="text"
            value={form.cliente}
            onChange={(event) => onChange("cliente", event.target.value)}
            className="w-full rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="Seu nome"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-ink">
          <span>Telefone</span>
          <input
            required
            type="tel"
            value={form.telefone}
            onChange={(event) => onChange("telefone", event.target.value)}
            className="w-full rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="(11) 99999-9999"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-ink">
        <span>Entrega ou retirada</span>
        <select
          value={form.tipoEntrega}
          onChange={(event) => onChange("tipoEntrega", event.target.value)}
          className="w-full rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-500"
        >
          <option value="Entrega">Entrega</option>
          <option value="Retirada">Retirada no local</option>
        </select>
      </label>

      {form.tipoEntrega === "Entrega" ? (
        <label className="space-y-2 text-sm font-medium text-ink">
          <span>Endereco</span>
          <input
            required
            type="text"
            value={form.endereco}
            onChange={(event) => onChange("endereco", event.target.value)}
            className="w-full rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-500"
            placeholder="Rua, numero, bairro"
          />
        </label>
      ) : null}

      <label className="space-y-2 text-sm font-medium text-ink">
        <span>Pagamento</span>
        <select
          value={form.pagamento}
          onChange={(event) => onChange("pagamento", event.target.value)}
          className="w-full rounded-2xl border border-brand-100 px-4 py-3 outline-none focus:border-brand-500"
        >
          <option value="Pix">Pix</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartao">Cartao</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-brand-700 px-5 py-4 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? "Enviando pedido..." : "Enviar pedido"}
      </button>
    </form>
  );
}
