'use client';

import TriggerSideBar from '@/components/sideBar/trigger-sidebar';
import { cn } from '@/lib/utils';

export default function Accountsreceivable() {
  return (
    <div className={cn('flex h-full w-full flex-col gap-4')}>
      <TriggerSideBar title="Financeiro" subTitle={['Contas à receber']} />
      <div>
        <h2>Contas à Receber</h2>
        <div className="accountDescription"></div>
      </div>
    </div>
  );
}
