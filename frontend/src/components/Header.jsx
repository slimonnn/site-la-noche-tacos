const statusStyles = {
  Aberto: "bg-emerald-100 text-emerald-700",
  Fechado: "bg-slate-200 text-slate-600",
};

export function Header({ restaurantName, status, reopenText, onReorder, canReorder }) {
  return (
    <header className="relative overflow-hidden rounded-b-[2rem] bg-ink px-5 pb-8 pt-6 text-crema shadow-float">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,209,102,0.28),_transparent_32%),radial-gradient(circle_at_left,_rgba(255,138,31,0.28),_transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-crema/75">Cardapio digital</p>
            <h1 className="text-3xl font-extrabold tracking-tight">{restaurantName}</h1>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            {status}
          </span>
        </div>

        <p className="max-w-xl text-sm leading-6 text-crema/80">
          Tacos, combos e sobremesas com clima de rua mexicana e fluxo simples para pedir pelo celular.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="rounded-2xl bg-crema/10 px-4 py-3 text-sm">
            <span className="block text-crema/60">Horario</span>
            <strong className="font-semibold">11h as 23h todos os dias</strong>
          </div>
          <div className="rounded-2xl bg-crema/10 px-4 py-3 text-sm">
            <span className="block text-crema/60">Retirada ou entrega</span>
            <strong className="font-semibold">{reopenText}</strong>
          </div>
          <button
            type="button"
            onClick={onReorder}
            disabled={!canReorder}
            className="rounded-2xl bg-corn px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Peca novamente
          </button>
        </div>
      </div>
    </header>
  );
}
