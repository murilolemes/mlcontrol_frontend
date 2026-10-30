'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
import { useGetClient } from '@/features/clients/hooks/use-get-client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Client = {
  id: string;
  name: string;
};

interface SearchClientProps {
  setClient: React.Dispatch<React.SetStateAction<Client>>;
}

export function SearchClient({ setClient }: SearchClientProps) {
  const {
    clients,
    // loading,
  } = useGetClient();

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className={cn(
            'w-full bg-blue-100 px-2 py-1.5 text-blue-700 md:h-full md:w-fit',
            'transition-all duration-200 hover:enabled:bg-blue-200',
          )}
          onClick={() => setSearch('')}
        >
          <Search size={4} />
          Buscar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Busca de Clientes</DialogTitle>
          <DialogDescription>
            Pesquise por clientes para selecionar o cliente desejado.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="client">Name</Label>
            <Input
              id="client"
              name="client"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </Field>
          <div className="no-scrollbar h-full max-h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200 hover:bg-gray-200">
                  <TableHead className="font-bold text-blue-900">
                    Nome
                  </TableHead>

                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="h-full font-medium text-gray-500">
                      <div className="wrap-break-words line-clamp-1 max-w-full whitespace-normal">
                        {client.name}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          className={cn(
                            'h-8 bg-blue-100 text-xs font-bold text-blue-600 duration-200',
                            'hover:enabled:text-background transition-all hover:enabled:bg-blue-600',
                          )}
                          onClick={() => {
                            setClient({
                              name: client.name,
                              id: client.id,
                            });
                          }}
                        >
                          Selecionar
                        </Button>
                      </DialogClose>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 pb-1">
            <Field orientation="horizontal" className="w-fit text-blue-900">
              <FieldLabel htmlFor="select-rows-per-page">
                Linhas p/ página
              </FieldLabel>

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
                  <Button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={cn(
                      page === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                      'border-foreground/20 flex h-8 w-8 items-center justify-center',
                      'text-foreground/50 rounded-full border-2 bg-transparent p-2',
                      'hover:bg-foreground/10 duration-200',
                    )}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                </PaginationItem>

                <span className="px-2 text-sm">
                  {page} de {totalPages}
                </span>

                <PaginationItem>
                  <Button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={cn(
                      page === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer',
                      'border-foreground/20 flex h-8 w-8 items-center justify-center',
                      'text-foreground/50 rounded-full border-2 bg-transparent p-2',
                      'hover:bg-foreground/10 duration-200',
                    )}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => setSearch('')}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
