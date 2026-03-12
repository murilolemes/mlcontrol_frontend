"use client";

import { TrashIcon } from "@phosphor-icons/react";
import { CostCenterContainer, CostCenterContent } from "./styles";

export default function CostCenter() {
  return (
    <CostCenterContainer>
      <h4>Centro de Custo</h4>

      <h1 className="text-3xl font-bold text-red-500">
        Tailwind funcionando
      </h1>
      <CostCenterContent>
        <form action="">
          <input type="text" />
          <button>Adicionar</button>
        </form>

        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-500">Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Teste 1</td>
              <td>
                <button>
                  <TrashIcon size={16} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Teste 2</td>
              <td>
                <button>
                  <TrashIcon size={16} />
                </button>
              </td>
            </tr>
            <tr>
              <td>Teste 2</td>
              <td>
                <button>
                  <TrashIcon size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CostCenterContent>
    </CostCenterContainer>
  )
}