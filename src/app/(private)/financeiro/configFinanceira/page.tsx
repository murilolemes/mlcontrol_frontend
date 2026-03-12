"use client";

import CostCenter from "./costCenter";
import { FinancialSetUpContainer, FinancialSetUpContent } from "./styles";

export default function FinancialSetUp() {
  return (
    <FinancialSetUpContainer>
      <h3>Configuração Financeira</h3>
      <FinancialSetUpContent>
        <CostCenter />
      </FinancialSetUpContent>
    </FinancialSetUpContainer>
  )
}