'use client';

import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { cn } from '@/lib/utils';

export default function AccountsPayable() {
  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <TriggerSideBar title="Financeiro" subTitle={['Contas à pagar']} />
      <div>
        <div className="accountDescription"></div>
      </div>
    </div>
  );
}
