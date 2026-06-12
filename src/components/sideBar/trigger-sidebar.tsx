'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

type TriggerSideBarProps = {
  title: string;
  subTitle?: string[];
};

export default function TriggerSideBar({
  title,
  subTitle,
}: TriggerSideBarProps) {
  return (
    <SidebarInset>
      <header
        className={cn(
          'flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear',
          'rounded-md group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
          'bg-background shadow-[0_0_6px_rgba(0,0,0,0.5)]',
        )}
      >
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 border" />
          <Separator
            orientation="vertical"
            className="mt-1.5 mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="md:block">
                <BreadcrumbLink href="#">{title}</BreadcrumbLink>
              </BreadcrumbItem>
              {subTitle &&
                subTitle.map((sub, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator className="md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{sub}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div> */}
    </SidebarInset>
  );
}
