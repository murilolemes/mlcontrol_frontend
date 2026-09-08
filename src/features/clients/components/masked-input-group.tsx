'use client';

import { ChangeEvent } from 'react';

import { InputGroupInput } from '@/components/ui/input-group';
import { useMask } from '@react-input/mask';

type MaskedInputGroupInputProps = {
  id: string;
  mask: string;
  placeholder: string;
  value?: string;
  name: string;
  className?: string;
  disabled?: boolean;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function MaskedInputGroupInput({
  id,
  mask,
  placeholder,
  value,
  name,
  className,
  onBlur,
  onChange,
}: MaskedInputGroupInputProps) {
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
