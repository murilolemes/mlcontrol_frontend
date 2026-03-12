"use client";

export default function TypePlan() {
  return (
    <div>
      <h4>Tipo de Plano</h4>
      <div className="typePlan">
        <input type="text" />
        <input type="radio" id="credito" name="radio" value="credito" />
        <label htmlFor="credito">Credito</label>
        <input type="radio" id="debito" name="radio" value="debito" />
        <label htmlFor="debito">Debito</label>
        <button>Salvar</button>
      </div>
    </div>
  )
}