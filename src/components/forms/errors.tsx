'use client';

type ErrorsFormProps = {
  infError: string | undefined;
};

export function Errors({ infError }: ErrorsFormProps) {
  return <small className="text-2sm text-red-400">{infError}</small>;
}
