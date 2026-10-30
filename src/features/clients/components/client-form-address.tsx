'use client';

import { Search } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

import { brazilianStates } from '../constants/brazilian-states';
import { clientMasks } from '../constants/client-masks';
import { ClientFormSchema } from '../schemas/client-schema';
import { MaskedInput } from './masked-input';

type AddressProps = {
  cep: string;
  setCep: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<ClientFormSchema>;
  control: Control<ClientFormSchema>;
  errors: FieldErrors<ClientFormSchema>;
  register: UseFormRegister<ClientFormSchema>;
  loadingCep: boolean;
  loadingReceitaws: boolean;
  handleConsultCep: (cep: string) => Promise<void>;
};

export function Address({
  control,
  errors,
  register,
  loadingCep,
  loadingReceitaws,
  handleConsultCep,
  cep,
  setCep,
}: AddressProps) {
  return (
    <>
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
                    mask={clientMasks.cep}
                    placeholder="Digite o CEP"
                    value={field.value}
                    onChange={(event) => {
                      field.onChange(event);
                      setCep(event.target.value);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    disabled={loadingCep || loadingReceitaws}
                  />
                );
              }}
            />

            <Button
              type="button"
              disabled={loadingCep || loadingReceitaws}
              onClick={() => handleConsultCep(cep)}
              className={cn(
                'bg-background text-foreground/50 border-input border',
              )}
            >
              {loadingCep || loadingReceitaws ? (
                <Spinner />
              ) : (
                <Search size={16} />
              )}
            </Button>
          </div>

          {errors.cep && (
            <small className="text-sm text-red-400">{errors.cep.message}</small>
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
              readOnly={loadingCep || loadingReceitaws}
              placeholder="Digite o logradouro"
              {...register('street')}
            />
            {(loadingCep || loadingReceitaws) && (
              <InputGroupAddon align="inline-end">
                <Spinner />
              </InputGroupAddon>
            )}
          </InputGroup>

          {errors.street && (
            <small className="text-sm text-red-400">
              {errors.street.message}
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
              readOnly={loadingCep || loadingReceitaws}
              placeholder="Digite o bairro"
              {...register('neighborhood')}
            />
            {(loadingCep || loadingReceitaws) && (
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
              readOnly={loadingCep || loadingReceitaws}
              placeholder="Digite a cidade"
              {...register('city')}
            />
            {(loadingCep || loadingReceitaws) && (
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
              readOnly={loadingCep || loadingReceitaws}
              placeholder="Digite o estado"
              {...register('state')}
            />
            {(loadingCep || loadingReceitaws) && (
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
                disabled={loadingCep || loadingReceitaws}
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
            <small className="text-sm text-red-400">{errors.uf.message}</small>
          )}
        </div>
      </div>
    </>
  );
}
