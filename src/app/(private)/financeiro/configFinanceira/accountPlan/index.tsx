"use client";

export default function AccountPlan() {
  return (
    <div>
      <h4>Plano de Contas</h4>
      <div className="accountPlan">
        <input type="text" />
        <select name="costCenter" id="costCenter">
          <option value="teste_1">Teste 1</option>
          <option value="teste_2">Teste 2</option>
        </select>
        <button>Salvar</button>
      </div>
    </div>
  )
}