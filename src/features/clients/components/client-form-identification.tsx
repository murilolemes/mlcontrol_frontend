'use client';

import { Check } from 'lucide-react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { validateCnpj } from '@/utils/validateCnpj';
import { validateCpf } from '@/utils/validateCpf';

import { Errors } from '@/components/forms/errors';
import { clientMasks } from '../constants/client-masks';
import { ClientFormSchema } from '../schemas/client-schema';
import { ClientType } from '../types/client';
import { MaskedInputGroupInput } from './masked-input-group';

type ClientFormIdentificationProps = {
  control: Control<ClientFormSchema>;
  errors: FieldErrors<ClientFormSchema>;
  clientType: ClientType;
  cnpj: string;
  loadingReceitaws: boolean;
  setCnpj: (value: string) => void;
  handleTypeChange: (type: 'PF' | 'PJ') => void;
  handleConsultCnpj: (cnpj: string) => void;
};

export function ClientIndentification({
  control,
  errors,
  clientType,
  cnpj,
  loadingReceitaws,
  setCnpj,
  handleConsultCnpj,
  handleTypeChange,
}: ClientFormIdentificationProps) {
  return (
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
        {errors.type && <Errors infError={errors.type.message} />}
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
                      mask={
                        clientType === 'PF' ? clientMasks.cpf : clientMasks.cnpj
                      }
                      placeholder={`Digite seu ${clientType === 'PF' ? 'CPF' : 'CNPJ'}`}
                      value={field.value}
                      onChange={(event) => {
                        field.onChange(event);
                        setCnpj(event.target.value);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="w-full"
                      disabled={loadingReceitaws}
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

            {errors.cpfCnpj && <Errors infError={errors.cpfCnpj.message} />}
          </div>
        </div>
        {/* BOTÃO DE CONSULTA */}
        {clientType === 'PJ' && (
          <Button
            type="button"
            onClick={() => handleConsultCnpj(cnpj)}
            disabled={loadingReceitaws}
            className={cn(
              'bg-background border-2 border-blue-600 text-blue-600',
              'hover:enabled:text-background text-xs transition-all',
              'font-bold duration-200 hover:enabled:bg-blue-600',
            )}
          >
            {loadingReceitaws ? <Spinner /> : 'Consultar CNPJ'}
          </Button>
        )}
      </div>
    </div>
  );
}
