'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
  parseISO,
} from 'date-fns';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { ButtonRegister } from '@/components/forms/button-register';
import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useConsult } from '@/context/consultCnpj';
import { cn } from '@/lib/utils';
import { apiCep } from '@/services/api';
import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';
import { useMask } from '@react-input/mask';
import { CalendarIcon, Check, PlusIcon, Search, Trash2 } from 'lucide-react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { toast } from 'react-toastify';

const clientFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome é obrigatório e deve conter no mínimo 3 caracteres'),
    fantasyName: z.string().optional(),
    type: z.enum(['PF', 'PJ']),
    cpfCnpj: z.string().optional(),
    stateRegistration: z.string().optional(),
    emails: z.array(
      z.object({
        address: z.string().trim().email('E-mail inválido').or(z.literal('')),
      }),
    ),
    phones: z.array(
      z.object({
        number: z.string().trim().optional(),
      }),
    ),
    observation: z.string().optional(),
    birthDate: z.string().optional(),
    age: z.string().optional(),
    clinicalDiagnosis: z.string().optional(),
    gender: z.string().optional(),
    occupation: z.string().optional(),
    address: z.string().optional(),
    number: z.string().optional(),
    neighborhood: z.string().optional(),
    complement: z.string().optional(),
    cep: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    uf: z.string().optional(),
    emergencyContact: z.string().optional(),
    emergencyContactName: z.string().optional(),
    rg: z.string().optional(),
    ie: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { type } = data;
    if (!data.cpfCnpj) {
      return;
    }
    const cpfCnpj = data.cpfCnpj.replace(/\D/g, '');

    if (type === 'PF') {
      if (cpfCnpj.length !== 11 || !validateCpf(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CPF inválido',
        });
      }
    }

    if (type === 'PJ') {
      if (cpfCnpj.length !== 14 || !validateCnpj(cpfCnpj)) {
        ctx.addIssue({
          path: ['cpfCnpj'],
          code: 'custom',
          message: 'CNPJ inválido',
        });
      }
    }
  });

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

const initialFormValues: ClientFormSchema = {
  name: '',
  fantasyName: '',
  type: 'PF',
  cpfCnpj: '',
  stateRegistration: '',
  emails: [{ address: '' }],
  phones: [{ number: '' }],
  observation: '',
  birthDate: '',
  age: '',
  gender: '',
  occupation: '',
  address: '',
  number: '',
  neighborhood: '',
  complement: '',
  cep: '',
  city: '',
  state: '',
  uf: '',
  rg: '',
  ie: '',
};

const brazilianStates = [
  { value: 'AC', label: 'AC - Acre', name: 'Acre' },
  { value: 'AL', label: 'AL - Alagoas', name: 'Alagoas' },
  { value: 'AP', label: 'AP - Amapá', name: 'Amapá' },
  { value: 'AM', label: 'AM - Amazonas', name: 'Amazonas' },
  { value: 'BA', label: 'BA - Bahia', name: 'Bahia' },
  { value: 'CE', label: 'CE - Ceará', name: 'Ceará' },
  { value: 'DF', label: 'DF - Distrito Federal', name: 'Distrito Federal' },
  { value: 'ES', label: 'ES - Espírito Santo', name: 'Espírito Santo' },
  { value: 'GO', label: 'GO - Goiás', name: 'Goiás' },
  { value: 'MA', label: 'MA - Maranhão', name: 'Maranhão' },
  { value: 'MT', label: 'MT - Mato Grosso', name: 'Mato Grosso' },
  { value: 'MS', label: 'MS - Mato Grosso do Sul', name: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'MG - Minas Gerais', name: 'Minas Gerais' },
  { value: 'PA', label: 'PA - Pará', name: 'Pará' },
  { value: 'PB', label: 'PB - Paraíba', name: 'Paraíba' },
  { value: 'PR', label: 'PR - Paraná', name: 'Paraná' },
  { value: 'PE', label: 'PE - Pernambuco', name: 'Pernambuco' },
  { value: 'PI', label: 'PI - Piauí', name: 'Piauí' },
  { value: 'RJ', label: 'RJ - Rio de Janeiro', name: 'Rio de Janeiro' },
  {
    value: 'RN',
    label: 'RN - Rio Grande do Norte',
    name: 'Rio Grande do Norte',
  },
  { value: 'RS', label: 'RS - Rio Grande do Sul', name: 'Rio Grande do Sul' },
  { value: 'RO', label: 'RO - Rondônia', name: 'Rondônia' },
  { value: 'RR', label: 'RR - Roraima', name: 'Roraima' },
  { value: 'SC', label: 'SC - Santa Catarina', name: 'Santa Catarina' },
  { value: 'SP', label: 'SP - São Paulo', name: 'São Paulo' },
  { value: 'SE', label: 'SE - Sergipe', name: 'Sergipe' },
  { value: 'TO', label: 'TO - Tocantins', name: 'Tocantins' },
] as const;

function normalizeBrazilianState(value?: string) {
  if (!value) {
    return '';
  }

  const normalizedValue = value.trim().toLowerCase();
  const normalizedCode = value.trim().toUpperCase();

  const matchedByCode = brazilianStates.find(
    (state) => state.value === normalizedCode,
  );

  if (matchedByCode) {
    return matchedByCode.value;
  }

  const matchedByName = brazilianStates.find(
    (state) => state.name.toLowerCase() === normalizedValue,
  );

  return matchedByName?.value ?? '';
}

type MaskedInputProps = {
  id: string;
  mask: string;
  placeholder: string;
  value?: string;
  name: string;
  className?: string;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function MaskedInput({
  id,
  mask,
  placeholder,
  value,
  name,
  className,
  onBlur,
  onChange,
}: MaskedInputProps) {
  const inputRef = useMask({
    mask,
    replacement: { _: /\d/ },
  });

  return (
    <Input
      id={id}
      placeholder={placeholder}
      ref={inputRef}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      className={className}
    />
  );
}

function MaskedInputGroupInput({
  id,
  mask,
  placeholder,
  value,
  name,
  className,
  onBlur,
  onChange,
}: MaskedInputProps) {
  const inputRef = useMask({
    mask,
    replacement: { _: /\d/ },
  });

  return (
    <InputGroupInput
      id={id}
      placeholder={placeholder}
      ref={inputRef}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      className={className}
    />
  );
}

export default function CreateClient() {
  const { handleConsult } = useConsult();
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [cnpj, setCnpj] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const maskCpf = '___.___.___-__';
  const maskCnpj = '__.___.___/____-__';
  const maskRg = '__.___.___-_';
  const maskIe = '___.___.___.___';
  const maskPhone = '(__) _____-____';
  const maskCep = '_____-___';

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialFormValues,
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  const birthDateValue = useWatch({
    control,
    name: 'birthDate',
  });

  function handleResetForm(type: 'PF' | 'PJ' = 'PF') {
    reset({
      ...initialFormValues,
      type,
    });
    setClientType(type);
    setCnpj('');
  }

  function handleTypeChange(nextType: 'PF' | 'PJ') {
    const values = getValues();

    reset({
      ...values,
      type: nextType,
      cpfCnpj: '',
      rg: '',
      occupation: '',
      gender: '',
      birthDate: '',
      age: '',
      fantasyName: '',
      stateRegistration: '',
      ie: '',
    });

    setClientType(nextType);
    setCnpj('');
  }

  async function onSubmit(data: ClientFormSchema) {
    try {
      console.log(data);
      // const emails = data.emails
      //   .map((item) => item.address.trim().toLowerCase())
      //   .filter(Boolean);

      // const phones = data.phones
      //   .map((item) => item.number?.trim() || '')
      //   .filter(Boolean);

      // await createClient({
      //   name: data.name.trim(),
      //   fantasyName: data.fantasyName?.trim() || undefined,
      //   type: data.type,
      //   cpfCnpj: data.cpfCnpj ? data.cpfCnpj.replace(/\D/g, '') : undefined,
      //   email: emails[0],
      //   emails,
      //   phone: phones[0],
      //   phones,
      //   stateRegistration:
      //     data.type === 'PJ'
      //       ? data.stateRegistration?.trim() || undefined
      //       : undefined,
      //   observation: data.observation?.trim() || undefined,
      // });

      handleResetForm();
    } catch {}
  }

  function handleConsultCnpj(cnpj: string) {
    handleConsult(cnpj);
    // console.log(cnpj);
  }

  useEffect(() => {
    if (!birthDateValue) {
      setValue('age', '');
      return;
    }

    const birthDate = parseISO(birthDateValue);

    if (!isValid(birthDate)) {
      setValue('age', '');
      return;
    }

    const today = new Date();

    const years = differenceInYears(today, birthDate);

    const dateAfterYears = addYears(birthDate, years);

    const months = differenceInMonths(today, dateAfterYears);

    const dateAfterMonths = addMonths(dateAfterYears, months);

    const days = differenceInDays(today, dateAfterMonths);

    setValue('age', `${years} anos, ${months} meses e ${days} dias`);
  }, [birthDateValue, setValue]);

  async function handleSearchCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      toast.error('Informe um CEP válido com 8 dígitos.');
      return;
    }

    setLoadingCep(true);

    try {
      const response = await apiCep.get(`/${cleanCep}/json`);
      const data = response.data;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (data?.erro) {
        toast.error('CEP não encontrado.');
        return;
      }

      setValue('address', data.logradouro ?? data.street ?? '', {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('neighborhood', data.bairro ?? data.district ?? '', {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('city', data.localidade ?? data.city ?? '', {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue('state', data.estado ?? data.state ?? data.uf ?? '', {
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue(
        'uf',
        normalizeBrazilianState(data.uf ?? data.state ?? data.estado),
        {
          shouldDirty: true,
          shouldTouch: true,
        },
      );
      setValue('cep', cleanCep, {
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao consultar o CEP.');
    } finally {
      setLoadingCep(false);
    }
  }

  return (
    <div className={cn('flex w-full flex-col gap-4')}>
      {/* TITULO */}
      <TriggerSideBar title="Clientes" subTitle={['Cadastro']} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => handleResetForm()}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between gap-4',
        )}
      >
        <div className={cn('flex w-full flex-col gap-2')}>
          <div className="flex flex-col gap-2 md:flex-row">
            {/* TIPO DE CLIENTE */}
            <div className={cn('flex flex-1 flex-col gap-0.5')}>
              <div className="flex flex-col gap-0.5">
                <Label className="text-foreground/60">Tipo</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={field.value || 'PF'}
                      onValueChange={(value: 'PF' | 'PJ') => {
                        field.onChange(value);
                        handleTypeChange(value);
                      }}
                    >
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="PF">Pessoa Fisica</SelectItem>
                          <SelectItem value="PJ">Pessoa Juridica</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.type && (
                <small className="text-2sm text-red-400">
                  {errors.type.message}
                </small>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-end">
              {/* CPF || CNPJ */}
              <div className="flex w-full">
                <div className="flex flex-1 flex-col gap-0.5">
                  <Label htmlFor="cpfCnpj" className="text-foreground/60">
                    {clientType === 'PF' ? 'CPF' : 'CNPJ'}
                  </Label>

                  <Controller
                    name="cpfCnpj"
                    control={control}
                    render={({ field }) => {
                      const isValidCpfCnpj = field.value
                        ? clientType === 'PF'
                          ? validateCpf(field.value)
                          : validateCnpj(field.value)
                        : false;

                      return (
                        <InputGroup>
                          <MaskedInputGroupInput
                            id="cpfCnpj"
                            mask={clientType === 'PF' ? maskCpf : maskCnpj}
                            placeholder={`Digite seu ${clientType === 'PF' ? 'CPF' : 'CNPJ'}`}
                            value={field.value}
                            onChange={(event) => {
                              field.onChange(event);
                              setCnpj(event.target.value);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            className="w-full"
                          />
                          <InputGroupAddon align="inline-end">
                            {isValidCpfCnpj && (
                              <Check size={16} className="text-green-600" />
                            )}
                          </InputGroupAddon>
                        </InputGroup>
                      );
                    }}
                  />

                  {errors.cpfCnpj && (
                    <small className="text-sm text-red-400">
                      {errors.cpfCnpj.message}
                    </small>
                  )}
                </div>
              </div>
              {/* BOTÃO DE CONSULTA */}
              {clientType === 'PJ' && (
                <Button
                  type="button"
                  disabled
                  onClick={() => handleConsultCnpj(cnpj)}
                  className={cn(
                    'bg-background border-2 border-blue-600 text-blue-600',
                    'hover:enabled:text-background text-xs transition-all',
                    'font-bold duration-200 hover:enabled:bg-blue-600',
                  )}
                >
                  Consultar CNPJ
                </Button>
              )}
            </div>
          </div>

          {/* NOME */}
          <div className="flex flex-1 flex-col gap-0.5">
            <Label htmlFor="name" className="text-foreground/60">
              Nome
            </Label>

            <Input
              id="name"
              placeholder="Digite seu nome"
              {...register('name')}
            />

            {errors.name && (
              <small className="text-sm text-red-400">
                {errors.name.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            {/* RG */}
            {clientType === 'PF' && (
              <div className="flex flex-1 flex-col gap-0.5">
                <Label htmlFor="rg" className="text-foreground/60">
                  RG
                </Label>

                <Controller
                  name="rg"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MaskedInput
                        id="rg"
                        mask={maskRg}
                        placeholder="Digite seu RG"
                        value={clientType === 'PF' ? field.value : ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    );
                  }}
                />

                {errors.rg && (
                  <small className="text-sm text-red-400">
                    {errors.rg.message}
                  </small>
                )}
              </div>
            )}

            {/* NOME FANTASIA */}
            {clientType === 'PJ' && (
              <div className="flex flex-1 flex-col gap-0.5">
                <Label htmlFor="fantasyName" className="text-foreground/60">
                  Nome Fantasia
                </Label>

                <Input
                  id="fantasyName"
                  placeholder="Digite o nome fantasia"
                  {...register('fantasyName')}
                />

                {errors.fantasyName && (
                  <small className="text-sm text-red-400">
                    {errors.fantasyName.message}
                  </small>
                )}
              </div>
            )}

            {/* DATA DE NASCIMENTO */}
            <Field className="flex flex-col gap-0.5 md:w-fit">
              <Label className="text-foreground/60">
                Data de {clientType === 'PF' ? 'Nascimento' : 'Abertura'}
              </Label>

              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger
                      className={cn(
                        'text-foreground/60 flex h-8 items-center justify-between',
                        'bg-background rounded-lg border px-2 py-1 text-sm',
                      )}
                    >
                      {field.value
                        ? format(parseISO(field.value), 'dd/MM/yyyy')
                        : 'Data'}

                      <CalendarIcon size={16} className="text-foreground/60" />
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? parseISO(field.value) : undefined
                        }
                        defaultMonth={
                          field.value ? parseISO(field.value) : undefined
                        }
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                          field.onChange(
                            selectedDate
                              ? format(selectedDate, 'yyyy-MM-dd')
                              : '',
                          );

                          setOpenCalendar(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {errors.birthDate && (
                <small className="text-sm text-red-400">
                  {errors.birthDate.message}
                </small>
              )}
            </Field>

            {/* IDADE */}
            {clientType === 'PF' && (
              <div className="flex w-full flex-col gap-0.5 md:max-w-50">
                <Label htmlFor="age" className="text-foreground/60">
                  Idade
                </Label>

                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="age"
                      placeholder="Idade"
                      readOnly
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="bg-input/30"
                    />
                  )}
                />

                {errors.age && (
                  <small className="text-sm text-red-400">
                    {errors.age.message}
                  </small>
                )}
              </div>
            )}

            {/* INSCRIÇÃO ESTADUAL */}
            {clientType === 'PJ' && (
              <div className="flex flex-col gap-0.5">
                <Label
                  htmlFor="stateRegistration"
                  className="text-foreground/60"
                >
                  Inscrição Estadual
                </Label>

                <Controller
                  name="stateRegistration"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MaskedInput
                        id="stateRegistration"
                        mask={maskIe}
                        placeholder="Digite sua inscrição estadual"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    );
                  }}
                />

                {errors.stateRegistration && (
                  <small className="text-sm text-red-400">
                    {errors.stateRegistration.message}
                  </small>
                )}
              </div>
            )}
          </div>

          {clientType === 'PF' && (
            <div className="flex flex-col gap-2 md:flex-row">
              {/* PROFISSÃO */}
              <div className="flex flex-1 flex-col gap-0.5">
                <Label htmlFor="occupation" className="text-foreground/60">
                  Profissão
                </Label>

                <Input
                  id="occupation"
                  placeholder="Digite a profissão"
                  {...register('occupation')}
                />

                {errors.occupation && (
                  <small className="text-sm text-red-400">
                    {errors.occupation.message}
                  </small>
                )}
              </div>

              {/* SEXO */}
              <div className="flex flex-1 flex-col gap-0.5">
                <Label className="text-foreground/60">Sexo</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                          <SelectItem value="O">Outros</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 md:flex-row">
            {/* CEP */}
            <div className="flex flex-col gap-0.5 md:w-50">
              <Label htmlFor="cep" className="text-foreground/60">
                CEP
              </Label>

              <div className="flex items-end gap-1.5">
                <Controller
                  name="cep"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MaskedInput
                        id="cep"
                        mask={maskCep}
                        placeholder="Digite o CEP"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    );
                  }}
                />

                <Button
                  type="button"
                  disabled={loadingCep}
                  onClick={() => handleSearchCep(getValues('cep') || '')}
                  className={cn(
                    'bg-background text-foreground/50 border-input border',
                  )}
                >
                  <Search size={16} />
                </Button>
              </div>

              {errors.cep && (
                <small className="text-sm text-red-400">
                  {errors.cep.message}
                </small>
              )}
            </div>

            {/* LOGRADOURO */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="address" className="text-foreground/60">
                Logradouro
              </Label>

              <InputGroup>
                <InputGroupInput
                  id="address"
                  readOnly={loadingCep}
                  placeholder="Digite o logradouro"
                  {...register('address')}
                />
                {loadingCep && (
                  <InputGroupAddon align="inline-end">
                    <Spinner />
                  </InputGroupAddon>
                )}
              </InputGroup>

              {errors.address && (
                <small className="text-sm text-red-400">
                  {errors.address.message}
                </small>
              )}
            </div>

            {/* NUMERO */}
            <div className="flex flex-col gap-0.5 md:w-50">
              <Label htmlFor="number" className="text-foreground/60">
                Número
              </Label>

              <Input
                id="number"
                placeholder="Digite o número"
                {...register('number')}
              />

              {errors.number && (
                <small className="text-sm text-red-400">
                  {errors.number.message}
                </small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            {/* BAIRRO */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="neighborhood" className="text-foreground/60">
                Bairro
              </Label>

              <InputGroup>
                <InputGroupInput
                  id="neighborhood"
                  readOnly={loadingCep}
                  placeholder="Digite o bairro"
                  {...register('neighborhood')}
                />
                {loadingCep && (
                  <InputGroupAddon align="inline-end">
                    <Spinner />
                  </InputGroupAddon>
                )}
              </InputGroup>

              {errors.neighborhood && (
                <small className="text-sm text-red-400">
                  {errors.neighborhood.message}
                </small>
              )}
            </div>

            {/* COMPLEMENTO */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="complement" className="text-foreground/60">
                Complemento
              </Label>

              <Input
                id="complement"
                placeholder="Digite o complemento"
                {...register('complement')}
              />

              {errors.complement && (
                <small className="text-sm text-red-400">
                  {errors.complement.message}
                </small>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            {/* CIDADE */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="city" className="text-foreground/60">
                Cidade
              </Label>

              <InputGroup>
                <InputGroupInput
                  id="city"
                  readOnly={loadingCep}
                  placeholder="Digite a cidade"
                  {...register('city')}
                />
                {loadingCep && (
                  <InputGroupAddon align="inline-end">
                    <Spinner />
                  </InputGroupAddon>
                )}
              </InputGroup>

              {errors.city && (
                <small className="text-sm text-red-400">
                  {errors.city.message}
                </small>
              )}
            </div>

            {/* ESTADO */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="state" className="text-foreground/60">
                Estado
              </Label>
              <InputGroup>
                <InputGroupInput
                  id="state"
                  readOnly={loadingCep}
                  placeholder="Digite o estado"
                  {...register('state')}
                />
                {loadingCep && (
                  <InputGroupAddon align="inline-end">
                    <Spinner />
                  </InputGroupAddon>
                )}
              </InputGroup>

              {errors.state && (
                <small className="text-sm text-red-400">
                  {errors.state.message}
                </small>
              )}
            </div>

            {/* UF */}
            <div className="flex flex-col gap-0.5 md:w-50">
              <Label className="text-foreground/60">UF</Label>
              <Controller
                control={control}
                name="uf"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loadingCep}
                  >
                    <SelectTrigger id="uf" className="w-full">
                      <SelectValue placeholder="Selecione a UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {brazilianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.uf && (
                <small className="text-sm text-red-400">
                  {errors.uf.message}
                </small>
              )}
            </div>
          </div>

          {/* OBSERVAÇÃO */}
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="observation" className="text-foreground/60">
              Observação
            </Label>

            <Textarea
              id="observation"
              placeholder="Digite uma observação"
              {...register('observation')}
            />

            {errors.observation && (
              <small className="text-sm text-red-400">
                {errors.observation.message}
              </small>
            )}
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            {/* E-MAIL */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="email" className="text-foreground/60">
                E-mail
              </Label>

              <div className="flex flex-col gap-1.5">
                {emailFields.map((field, index) => {
                  const emailError = errors.emails?.[index]?.address;
                  return (
                    <div key={field.id} className="flex flex-col gap-0.5">
                      <div className="flex gap-1.5">
                        <Input
                          id={`email-${index}`}
                          placeholder="Digite seu email"
                          {...register(`emails.${index}.address` as const)}
                        />

                        <Button
                          type="button"
                          onClick={() => appendEmail({ address: '' })}
                          className={cn(
                            'bg-background text-foreground/50 border-input border',
                          )}
                          aria-label="Adicionar e-mail"
                        >
                          <PlusIcon />
                        </Button>

                        {emailFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeEmail(index)}
                            className={cn(
                              'bg-background text-foreground/50 border-input border',
                            )}
                            aria-label="Remover e-mail"
                          >
                            <Trash2 />
                          </Button>
                        )}
                      </div>
                      {emailError ? (
                        <small
                          key={`email-error-${field.id}`}
                          className="text-sm text-red-400"
                        >
                          {emailError.message}
                        </small>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TELEFONE */}
            <div className="flex flex-1 flex-col gap-0.5">
              <Label htmlFor="phone" className="text-foreground/60">
                Telefone
              </Label>

              <div className="flex flex-col gap-1.5">
                {phoneFields.map((field, index) => {
                  const phoneError = errors.phones?.[index]?.number;
                  return (
                    <div key={field.id} className="flex flex-col gap-0.5">
                      <div key={field.id} className="flex gap-1.5">
                        <Controller
                          name={`phones.${index}.number` as const}
                          control={control}
                          render={({ field: phoneField }) => {
                            return (
                              <MaskedInput
                                id={`phone-${index}`}
                                mask={maskPhone}
                                placeholder="Digite seu telefone"
                                value={phoneField.value || ''}
                                onChange={phoneField.onChange}
                                onBlur={phoneField.onBlur}
                                name={phoneField.name}
                              />
                            );
                          }}
                        />

                        <Button
                          type="button"
                          onClick={() => appendPhone({ number: '' })}
                          className={cn(
                            'bg-background text-foreground/50 border-input border',
                          )}
                          aria-label="Adicionar telefone"
                        >
                          <PlusIcon />
                        </Button>

                        {phoneFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removePhone(index)}
                            className={cn(
                              'bg-background text-foreground/50 border-input border',
                            )}
                            aria-label="Remover telefone"
                          >
                            <Trash2 />
                          </Button>
                        )}
                      </div>
                      {phoneError ? (
                        <small
                          key={`phone-error-${field.id}`}
                          className="text-sm text-red-400"
                        >
                          {phoneError.message}
                        </small>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <ButtonRegister />
      </form>
    </div>
  );
}
