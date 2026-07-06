'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isValid,
  parse,
} from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useClient } from '@/context/clientContext';
import { useConsult } from '@/context/consultCnpj';
import { cn } from '@/lib/utils';
import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';
import { useMask } from '@react-input/mask';
import { Check, PlusIcon } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';

const clientFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome é obrigatório e deve conter no mínimo 3 caracteres'),
    fantasyName: z.string().optional(),
    type: z.enum(['PF', 'PJ']),
    cpfCnpj: z.string().optional(),
    stateRegistration: z.string().optional(),
    email: z.string().email('E-mail inválido').or(z.literal('')).optional(),
    phone: z.string().optional(),
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
  email: '',
  phone: '',
  observation: '',
  birthDate: '',
  age: '',
  clinicalDiagnosis: '',
  gender: 'S',
  occupation: '',
  address: '',
  number: '',
  neighborhood: '',
  complement: '',
  cep: '',
  city: '',
  state: '',
  uf: '',
  emergencyContact: '',
  emergencyContactName: '',
  rg: '',
  ie: '',
};

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
  const { createClient } = useClient();
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [cnpj, setCnpj] = useState<string>('');
  const [age, setAge] = useState<string | null>(null);

  const maskCpf = '___.___.___-__';
  const maskCnpj = '__.___.___/____-__';
  const maskRg = '__.___.___-_';
  const maskBirthDate = '__/__/____';
  const maskIe = '___.___.___.___';
  const maskPhone = '(__) _____-____';
  const maskCep = '_____-___';

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialFormValues,
  });

  function handleResetForm(type: 'PF' | 'PJ' = 'PF') {
    reset({
      ...initialFormValues,
      type,
    });
    setClientType(type);
    setCnpj('');
    setAge(null);
  }

  async function onSubmit(data: ClientFormSchema) {
    try {
      await createClient({
        name: data.name.trim(),
        fantasyName: data.fantasyName?.trim() || undefined,
        type: data.type,
        cpfCnpj: data.cpfCnpj ? data.cpfCnpj.replace(/\D/g, '') : undefined,
        email: data.email?.trim() ? data.email.trim().toLowerCase() : undefined,
        phone: data.phone?.trim() || undefined,
        stateRegistration:
          data.type === 'PJ'
            ? data.stateRegistration?.trim() || undefined
            : undefined,
        observation: data.observation?.trim() || undefined,
      });

      handleResetForm();
    } catch {}
  }

  function handleConsultCnpj(cnpj: string) {
    handleConsult(cnpj);
    // console.log(cnpj);
  }

  function handleAgeCalculation(dateString: string) {
    if (!dateString || dateString.includes('_')) {
      return null;
    }

    const birthDate = parse(dateString, 'dd/MM/yyyy', new Date());

    if (!isValid(birthDate)) {
      return null;
    }

    const today = new Date();

    const years = differenceInYears(today, birthDate);

    const dateAfterYears = addYears(birthDate, years);

    const months = differenceInMonths(today, dateAfterYears);

    const dateAfterMonths = addMonths(dateAfterYears, months);

    const days = differenceInDays(today, dateAfterMonths);

    setAge(`${years} anos, ${months} meses e ${days} dias`);
  }

  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      {/* TITULO */}
      <TriggerSideBar title="Clientes" subTitle={['Cadastro']} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => handleResetForm()}
        className={cn(
          'flex h-full w-full flex-col items-center justify-between',
        )}
      >
        <div className={cn('flex w-full flex-col gap-4')}>
          <div className="flex justify-between">
            {/* TIPO DE CLIENTE */}
            <div className={cn('flex items-end justify-between')}>
              <div className={cn('flex w-fit flex-col gap-2')}>
                <Label htmlFor="type" className="text-foreground/60">
                  Tipo
                </Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      key={field.name}
                      onValueChange={(value: 'PF' | 'PJ') => {
                        field.onChange(value);
                        setClientType(value);
                        setValue('cpfCnpj', '');
                        setCnpj('');
                      }}
                      value={field.value}
                      className="flex h-full justify-around gap-8"
                    >
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="PF" id="pf" />
                        <Label
                          htmlFor="pf"
                          className="text-foreground/60 text-sm font-normal"
                        >
                          Pessoa Física
                        </Label>
                      </div>
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="PJ" id="pj" />
                        <Label
                          htmlFor="pj"
                          className="text-foreground/60 text-sm font-normal"
                        >
                          Pessoa Jurídica
                        </Label>
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

            <div className="flex gap-4">
              {/* CPF || CNPJ */}
              <div className="flex w-75">
                <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="cpfCnpj" className="text-foreground/60">
                    {clientType === 'PF' ? 'CPF' : 'CNPJ'}
                  </Label>

                  <div className={cn('flex flex-row items-center gap-2')}>
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
                              value={field.value || ''}
                              onChange={(event) => {
                                field.onChange(event);
                                setCnpj(event.target.value);
                              }}
                              onBlur={field.onBlur}
                              name={field.name}
                              className="w-67"
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
                  </div>

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
                    'bg-background h-full border-2 border-blue-600 font-bold text-blue-600',
                    'hover:enabled:text-background text-xs transition-all duration-200 hover:enabled:bg-blue-600',
                  )}
                >
                  Consultar CNPJ
                </Button>
              )}
            </div>
          </div>

          {/* NOME */}
          <div className="flex flex-1 flex-col gap-2">
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

          <div className="flex gap-4">
            {/* RG */}
            {clientType === 'PF' && (
              <div className="flex flex-1 flex-col gap-2">
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
                        value={field.value || ''}
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
              <div className="flex flex-1 flex-col gap-2">
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="birthDate" className="text-foreground/60">
                Data de {clientType === 'PF' ? 'Nascimento' : 'Abertura'}
              </Label>

              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => {
                  return (
                    <MaskedInput
                      id="birthDate"
                      mask={maskBirthDate}
                      placeholder="Digite a data"
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={() => {
                        handleAgeCalculation(field.value || '');
                        field.onBlur();
                      }}
                      name={field.name}
                    />
                  );
                }}
              />

              {errors.birthDate && (
                <small className="text-sm text-red-400">
                  {errors.birthDate.message}
                </small>
              )}
            </div>

            {/* IDADE */}
            {clientType === 'PF' && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="age" className="text-foreground/60">
                  Idade
                </Label>

                <Input
                  id="age"
                  placeholder="Idade"
                  disabled
                  value={age || ''}
                  {...register('age')}
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
              <div className="flex flex-col gap-2">
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
                        value={field.value || ''}
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

          <div className="flex gap-4">
            {/* E-MAIL */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="email" className="text-foreground/60">
                E-mail
              </Label>

              <div className="flex gap-1.5">
                <Input
                  id="email"
                  placeholder="Digite seu email"
                  {...register('email')}
                />

                <Button
                  type="button"
                  className={cn(
                    'bg-background text-foreground shadow-foreground/60 shadow-[0_0_2px]',
                  )}
                >
                  <PlusIcon />
                </Button>
              </div>
              {errors.email && (
                <small className="text-sm text-red-400">
                  {errors.email.message}
                </small>
              )}
            </div>

            {/* TELEFONE */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="phone" className="text-foreground/60">
                Telefone
              </Label>

              <div className="flex gap-1.5">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => {
                    return (
                      <MaskedInput
                        id="phone"
                        mask={maskPhone}
                        placeholder="Digite seu telefone"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    );
                  }}
                />
                <Button
                  type="button"
                  className={cn(
                    'bg-background text-foreground shadow-foreground/60 shadow-[0_0_2px]',
                  )}
                >
                  <PlusIcon />
                </Button>
              </div>

              {errors.phone && (
                <small className="text-sm text-red-400">
                  {errors.phone.message}
                </small>
              )}
            </div>
          </div>

          {clientType === 'PF' && (
            <div className="flex gap-4">
              {/* PROFISSÃO */}
              <div className="flex flex-1 flex-col gap-2">
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
              <div className="flex flex-1 flex-col gap-2">
                <Label htmlFor="gender" className="text-foreground/60">
                  Sexo
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || 'S'}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="gender" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">Selecione</SelectItem>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Feminino</SelectItem>
                        <SelectItem value="O">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {/* CEP */}
            <div className="flex w-50 flex-col gap-2">
              <Label htmlFor="cep" className="text-foreground/60">
                CEP
              </Label>

              <Controller
                name="cep"
                control={control}
                render={({ field }) => {
                  return (
                    <MaskedInput
                      id="cep"
                      mask={maskCep}
                      placeholder="Digite o CEP"
                      value={field.value || ''}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  );
                }}
              />

              {errors.cep && (
                <small className="text-sm text-red-400">
                  {errors.cep.message}
                </small>
              )}
            </div>

            {/* LOGRADOURO */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="address" className="text-foreground/60">
                Logradouro
              </Label>

              <Input
                id="address"
                placeholder="Digite o logradouro"
                {...register('address')}
              />

              {errors.address && (
                <small className="text-sm text-red-400">
                  {errors.address.message}
                </small>
              )}
            </div>

            {/* NUMERO */}
            <div className="flex w-50 flex-col gap-2">
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

          <div className="flex gap-4">
            {/* BAIRRO */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="neighborhood" className="text-foreground/60">
                Bairro
              </Label>

              <Input
                id="neighborhood"
                placeholder="Digite o bairro"
                {...register('neighborhood')}
              />

              {errors.neighborhood && (
                <small className="text-sm text-red-400">
                  {errors.neighborhood.message}
                </small>
              )}
            </div>

            {/* COMPLEMENTO */}
            <div className="flex flex-1 flex-col gap-2">
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

          <div className="flex gap-4">
            {/* CIDADE */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="city" className="text-foreground/60">
                Cidade
              </Label>

              <Input
                id="city"
                placeholder="Digite a cidade"
                {...register('city')}
              />

              {errors.city && (
                <small className="text-sm text-red-400">
                  {errors.city.message}
                </small>
              )}
            </div>

            {/* ESTADO */}
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="state" className="text-foreground/60">
                Estado
              </Label>

              <Input
                id="state"
                placeholder="Digite o estado"
                {...register('state')}
              />

              {errors.state && (
                <small className="text-sm text-red-400">
                  {errors.state.message}
                </small>
              )}
            </div>

            {/* UF */}
            <div className="flex w-50 flex-col gap-2">
              <Label htmlFor="uf" className="text-foreground/60">
                UF
              </Label>

              <Input id="uf" placeholder="Digite a UF" {...register('uf')} />

              {errors.uf && (
                <small className="text-sm text-red-400">
                  {errors.uf.message}
                </small>
              )}
            </div>
          </div>

          {/* OBSERVAÇÃO */}
          <div className="flex flex-col gap-2">
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
        </div>

        {/* BOTÕES  */}
        <div className={cn('flex w-full justify-between')}>
          <Button
            type="reset"
            className={cn(
              'bg-background text-destructive border-destructive mt-2 border-2 font-bold',
              'hover:text-background transition-all duration-200 hover:bg-red-700',
            )}
          >
            Limpar
          </Button>

          <Button
            type="submit"
            className={cn(
              'bg-background mt-2 border-2 border-green-600 font-bold text-green-600',
              'hover:text-background transition-all duration-200 hover:bg-green-600',
            )}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
