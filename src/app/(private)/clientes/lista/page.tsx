'use client';

import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClient } from '@/context/clientContext';
import { cn } from '@/lib/utils';
import { formatCpfCnpj } from '@/utils/formatedCpfCnpj';
import { DotsThreeIcon } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ClientList() {
  const { clients } = useClient();

  console.log('-->', clients);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtro
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredData = clients.filter((client) =>
    client.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // Paginação
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // Excluir
  async function handleDelete(id: string) {
    try {
      console.log(id);

      toast.success('Centro de custo excluido com sucesso!');
    } catch (err) {
      toast.error('Falha ao excluir o centro de custo!');
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-2">
      {/* <h4 className="font-bold text-blue-900">Lista de Clientes</h4> */}
      <TriggerSideBar title="Clientes" subTitle={['Lista']} />

      <div className="rounded-sm shadow-[0_0_2px] shadow-gray-400">
        <div className="flex items-center gap-2 p-2">
          <InputGroup className={cn('w-90')}>
            <InputGroupInput
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <InputGroupAddon>
              <Search size={16} />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              <TableHead className="font-bold text-blue-900">Nome</TableHead>

              <TableHead className="font-bold text-blue-900">
                CPF/CNPJ
              </TableHead>

              <TableHead className="font-bold text-blue-900">Tipo</TableHead>

              <TableHead className="font-bold text-blue-900">
                Observação
              </TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="h-full font-medium text-gray-500">
                  <div className="wrap-break-words line-clamp-2 max-w-full whitespace-normal">
                    {client.name}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-gray-500">
                  {client.cpfCnpj
                    ? formatCpfCnpj(client.type, client.cpfCnpj)
                    : '-'}
                </TableCell>

                <TableCell className="font-medium text-gray-500">
                  {client.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </TableCell>

                <TableCell className="font-medium text-gray-500">
                  {client.observation || '-'}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 hover:bg-gray-200"
                      >
                        <DotsThreeIcon size={16} className="text-gray-950" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => handleDelete(client.id)}
                        variant="destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4 pb-1">
        <Field orientation="horizontal" className="w-fit text-blue-900">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>

          <Select
            defaultValue="25"
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger
              className="focus:shadow[0_0_2px] w-20"
              id="select-rows-per-page"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Pagination className="mx-0 w-auto text-blue-900">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={
                  page === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            <span className="px-2 text-sm">
              Página {page} de {totalPages}
            </span>

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  page === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
