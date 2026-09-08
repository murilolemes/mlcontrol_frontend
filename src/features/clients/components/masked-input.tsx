'use client';

import { ChangeEvent } from 'react';

import { Input } from '@/components/ui/input';
import { useMask } from '@react-input/mask';

type MaskedInputProps = {
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

export function MaskedInput({
  id,
  mask,
  placeholder,
  value,
  name,
  className,
  onBlur,
  onChange,
  disabled,
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
      disabled={disabled}
    />
  );
}
