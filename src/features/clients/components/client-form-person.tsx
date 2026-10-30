'use client';

import { format, parseISO } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { clientMasks } from '@/features/clients/constants/client-masks';
import { cn } from '@/lib/utils';

import { Errors } from '@/components/forms/errors';
import { ClientFormSchema } from '../schemas/client-schema';
import { ClientType } from '../types/client';
import { MaskedInput } from './masked-input';

type ClientFormPersonalProps = {
  control: Control<ClientFormSchema>;
  errors: FieldErrors<ClientFormSchema>;
  register: UseFormRegister<ClientFormSchema>;
  clientType: ClientType;
  loadingReceitaws: boolean;
};

export function ClientFormPersonal({
  control,
  errors,
  register,
  clientType,
  loadingReceitaws,
}: ClientFormPersonalProps) {
  const [openCalendar, setOpenCalendar] = useState(false);
  return (
    <>
      {/* NOME */}
      <div className="flex flex-1 flex-col gap-0.5">
        <Label htmlFor="name" className="text-foreground/60">
          Nome
        </Label>

        <InputGroup>
          <InputGroupInput
            id="name"
            placeholder="Digite seu nome"
            readOnly={loadingReceitaws}
            {...register('name')}
          />
          {loadingReceitaws && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </InputGroup>

        {errors.name && <Errors infError={errors.name.message} />}
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
                    mask={clientMasks.rg}
                    placeholder="Digite seu RG"
                    value={clientType === 'PF' ? field.value : ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    disabled={loadingReceitaws}
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

            <InputGroup>
              <InputGroupInput
                id="fantasyName"
                placeholder="Digite o nome fantasia"
                readOnly={loadingReceitaws}
                {...register('fantasyName')}
              />
              {loadingReceitaws && (
                <InputGroupAddon align="inline-end">
                  <Spinner />
                </InputGroupAddon>
              )}
            </InputGroup>

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
                    'text-foreground flex h-8 items-center justify-between',
                    'bg-background gap-2 rounded-lg border px-2 py-1 text-sm',
                  )}
                  disabled={loadingReceitaws}
                >
                  {field.value
                    ? format(parseISO(field.value), 'dd/MM/yyyy')
                    : 'Data'}

                  {loadingReceitaws ? (
                    <Spinner />
                  ) : (
                    <CalendarIcon size={16} className="text-foreground/60" />
                  )}
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? parseISO(field.value) : undefined}
                    defaultMonth={
                      field.value ? parseISO(field.value) : undefined
                    }
                    captionLayout="dropdown"
                    onSelect={(selectedDate) => {
                      field.onChange(
                        selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
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
            <Label htmlFor="stateRegistration" className="text-foreground/60">
              Inscrição Estadual
            </Label>

            <Controller
              name="stateRegistration"
              control={control}
              render={({ field }) => {
                return (
                  <MaskedInput
                    id="stateRegistration"
                    mask={clientMasks.ie}
                    placeholder="Digite sua inscrição estadual"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    disabled={loadingReceitaws}
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
    </>
  );
}
