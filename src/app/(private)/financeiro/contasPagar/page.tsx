"use client";

import { AccountsPayableContainer, AccountsPayableContent } from "./styles";

export default function AccountsPayable() {
  return (
    <AccountsPayableContainer>
      <AccountsPayableContent>
        <h2>Contas à pagar</h2>
        <div className="accountDescription">

        </div>
      </AccountsPayableContent>
    </AccountsPayableContainer>
  )
}