'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { DotsThreeIcon } from '@phosphor-icons/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

const typePlan = [
  {
    id: '1',
    name: 'Empresa 1',
    costCenter: 'Debito',
    date: '17/03/2026',
  },
  {
    id: '2',
    name: 'Empresa 2',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '3',
    name: 'Empresa 3',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '4',
    name: 'Empresa 4',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '5',
    name: 'Empresa 5',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '6',
    name: 'Empresa 6',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '7',
    name: 'Empresa 7',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '8',
    name: 'Empresa 8',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '9',
    name: 'Empresa 9',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '10',
    name: 'Empresa 10',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '11',
    name: 'Empresa 11',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '12',
    name: 'Empresa 12',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '13',
    name: 'Empresa 13',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '14',
    name: 'Empresa 14',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '15',
    name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum vel enim, saepe maiores dolor voluptas ipsa? Quibusdam debitis deserunt maxime, dolorem corporis temporibus iusto voluptatibus similique tempore voluptatem veritatis molestias.',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '16',
    name: 'Empresa 16',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
  {
    id: '17',
    name: 'Empresa 17',
    costCenter: 'Credito',
    date: '17/03/2026',
  },
];

const typePlanFormSchema = z.object({
  typePlanName: z.string().min(3, 'O nome de ter no mínimo 3 caracteres'),
  type: z.string().min(1, 'Tipo de plano obrigatório'),
});

export type TypePlanFormSchema = z.infer<typeof typePlanFormSchema>;

export default function TypePlan() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtro
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Editar
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredData = typePlan.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // Paginação
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<TypePlanFormSchema>({
    resolver: zodResolver(typePlanFormSchema),
    defaultValues: {
      typePlanName: '',
      type: '',
    },
  });

  // Adicionar / Editar
  async function onSubmit(data: TypePlanFormSchema) {
    try {
      if (editingItem) {
        console.log('EDITANDO:', editingItem.id, data);

        toast.success('Tipo de plnao atualizado com sucesso!');
      } else {
        console.log('CRIANDO:', data);

        toast.success('Tipo de plnao adicionado com sucesso!');
      }

      setEditingItem(null);
      reset({
        typePlanName: '',
        type: '',
      });
    } catch (err) {
      toast.error('Erro ao salvar o tipo de plnao!');
    }
  }

  // Excluir
  async function handleDelete(id: string) {
    try {
      console.log(id);

      toast.success('Tipo de plano excluido com sucesso!');
    } catch (err) {
      toast.success('Falha ao excluir o tipo de plano!');
    }
  }

  // Editando
  function handleEditing(typePlan: any) {
    setEditingItem(typePlan);

    // Preenche o formulário
    reset({
      typePlanName: typePlan.name,
      type: typePlan.costCenter.toLowerCase(),
    });
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto px-1">
      <h4 className="font-bold text-blue-900">Plano de contas</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex flex-col gap-2 rounded-sm p-2 shadow-[0_0_2px] shadow-gray-400',
        )}
      >
        <p className="text-sm text-blue-900 underline">
          Adicionar novo plano de contas
        </p>
        <div className="items-top flex gap-2">
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="name">Plano de contas</Label>
            <Input
              placeholder="Digite o plano de contas"
              id="name"
              className={`${
                errors.typePlanName &&
                cn(
                  'border-destructive shadow-destructive',
                  'focus-visible:border-destructive focus-visible:shadow-destructive',
                )
              } `}
              {...register('typePlanName')}
            />

            {errors.typePlanName && (
              <small className="text-2sm text-red-400">
                {errors.typePlanName.message}
              </small>
            )}
          </div>

          <div className="flex min-w-fit flex-col gap-1">
            <Label htmlFor="costCenter">Selecione o tipo de plano</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  key={editingItem ? editingItem.id : 'new'}
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex h-full justify-around"
                >
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="debito" id="debito" />
                    <Label htmlFor="debito">Debito</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="credito" id="credito" />
                    <Label htmlFor="credito">Credito</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.type && (
              <small className="text-2sm text-red-400">
                {errors.type.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            className={cn('bg-red-500')}
            onClick={() => {
              reset({
                typePlanName: '',
                type: '',
              });
              setEditingItem(null);
            }}
          >
            Cancelar
          </Button>

          <Button
            className={cn(
              'text-background bg-green-500 shadow-[0_0_4px]',
              'w-fit hover:bg-green-600',
            )}
          >
            {editingItem ? 'Atualizar' : 'Adicionar'}
          </Button>
        </div>
      </form>

      <div className="rounded-sm shadow-[0_0_2px] shadow-gray-400">
        <div className="flex items-center gap-2 p-2">
          <div
            className={cn(
              'flex items-center gap-1 rounded-xl border-2 md:w-1/2 lg:w-1/4',
              'border-gray-300 pl-1 text-gray-400',
            )}
          >
            <Search size={16} />
            <Input
              placeholder="Pesquisar"
              className={cn(
                'focus-visible:border=none border-none px-1 py-1',
                'shadow-none focus-visible:shadow-none',
              )}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              <TableHead className="w-full font-bold text-blue-900">
                Descrição
              </TableHead>

              <TableHead className="font-bold text-blue-900">
                Tipo Plano
              </TableHead>

              <TableHead className="font-bold text-blue-900">
                Data Cadastro
              </TableHead>

              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="h-full font-medium text-gray-500">
                  <div className="wrap-break-words line-clamp-2 max-w-full whitespace-normal">
                    {plan.name}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-gray-500">
                  {plan.costCenter}
                </TableCell>

                <TableCell className="font-medium text-gray-500">
                  {plan.date}
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
                      <DropdownMenuItem onClick={() => handleEditing(plan)}>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => handleDelete(plan.id)}
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
