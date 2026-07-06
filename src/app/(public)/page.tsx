import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const highlights = [
  {
    title: 'Gestão de clientes',
    description:
      'Cadastro, consulta e organização com suporte para CPF, CNPJ, observações e tipos de pessoa.',
    icon: Users,
  },
  {
    title: 'Controle financeiro',
    description:
      'Estrutura para contas a pagar, contas a receber, centro de custo e plano de contas.',
    icon: Wallet,
  },
  {
    title: 'Anamnese digital',
    description:
      'Registro clínico com queixa principal, histórico, sinais e campos personalizados de atendimento.',
    icon: ClipboardList,
  },
  {
    title: 'Painel operacional',
    description:
      'Base para acompanhar o sistema em um dashboard central, com acesso rápido às rotinas do dia a dia.',
    icon: BarChart3,
  },
];

const metrics = [
  { label: 'módulos centrais', value: '4+' },
  { label: 'fluxos integrados', value: '360°' },
  { label: 'base para operação', value: '24/7' },
];

const workflow = [
  {
    step: '01',
    title: 'Entrada inteligente',
    description:
      'A tela inicial apresenta o sistema de forma clara e conduz o acesso para login.',
  },
  {
    step: '02',
    title: 'Gestão unificada',
    description:
      'Clientes, financeiro e anamnese ficam organizados em uma navegação consistente.',
  },
  {
    step: '03',
    title: 'Operação em escala',
    description:
      'O sistema prepara a rotina para crescer sem perder clareza visual nem velocidade.',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
      <div className="absolute top-0 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/90 shadow-[0_0_40px_rgba(34,211,238,0.24)]">
              <Image
                src="/assets/logo-mlControl.svg"
                alt="ML Control"
                width={28}
                height={28}
                priority
              />
            </div>
            <div>
              <p className="text-[0.7rem] tracking-[0.32em] text-cyan-200/70 uppercase">
                MlControl
              </p>
              <p className="text-sm text-white/70">
                Sistema de controle e operação
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="hidden border-white/15 bg-white/5 text-white hover:bg-white/10 sm:inline-flex"
          >
            <Link href="/login">Entrar</Link>
          </Button>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.12fr_0.88fr] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-[0.3em] text-cyan-100/80 uppercase">
              <Sparkles className="size-4" />
              Plataforma em modo futurista
            </div>

            <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              Uma central moderna para comandar{' '}
              <span className="bg-[linear-gradient(90deg,#67e8f9,#60a5fa,#a78bfa)] bg-clip-text text-transparent">
                clientes, financeiro e anamnese
              </span>
              .
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              O MLControl organiza a operação em um único ambiente, conectando
              cadastro de clientes, rotinas financeiras, registros de anamnese e
              visão de gestão para acelerar o trabalho com clareza e precisão.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-cyan-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(34,211,238,0.35)] hover:bg-cyan-300"
              >
                <Link href="/login">
                  Acessar o sistema
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-sm text-white hover:bg-white/10"
              >
                <Link href="#modulos">Explorar módulos</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                >
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.15),rgba(59,130,246,0.06))] blur-2xl" />
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-[0_0_80px_rgba(15,23,42,0.6)] backdrop-blur-2xl">
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div>
                  <p className="text-xs tracking-[0.28em] text-cyan-200/70 uppercase">
                    Status do sistema
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    Operação centralizada
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
                  <ShieldCheck className="size-4" />
                  Pronto para uso
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-200">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Clientes</p>
                      <p className="text-lg font-semibold text-white">
                        Cadastro e consulta
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-blue-400/10 p-3 text-blue-200">
                      <CreditCard className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Financeiro</p>
                      <p className="text-lg font-semibold text-white">
                        Contas e centros
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-violet-400/10 p-3 text-violet-200">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Anamnese</p>
                      <p className="text-lg font-semibold text-white">
                        Dados clínicos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-200">
                      <BarChart3 className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Dashboard</p>
                      <p className="text-lg font-semibold text-white">
                        Visão executiva
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modulos" className="py-6 sm:py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-cyan-200/70 uppercase">
                Módulos
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Tudo que o sistema já reúne em uma interface só
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={cn(
                    'group rounded-[1.75rem] border border-white/10',
                    'bg-white/[0.06] p-5 backdrop-blur-xl transition-all duration-300',
                    'hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/8',
                  )}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 py-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-10">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-xs tracking-[0.28em] text-cyan-200/70 uppercase">
              Fluxo
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Uma jornada de uso simples, com cara de console avançado
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A apresentação inicial foi pensada para transmitir confiança,
              destacar os recursos do produto e orientar a navegação para o
              login sem poluição visual.
            </p>

            <div className="mt-6 space-y-4">
              {workflow.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-sm font-semibold text-cyan-100">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(8,15,34,0.92),rgba(4,8,22,0.98))] p-6 shadow-[0_0_80px_rgba(14,165,233,0.14)]">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs tracking-[0.28em] text-cyan-200/70 uppercase">
                Base do produto
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Um núcleo visual para evoluir com o sistema
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                A landing conecta a identidade do MLControl com os principais
                fluxos já presentes no projeto. Isso reforça o posicionamento do
                sistema e oferece uma primeira impressão mais sofisticada.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Identidade</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Futurista e limpa
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Experiência</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Direta e responsiva
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Navegação</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Foco no acesso
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Escalabilidade</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Base para crescer
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-full bg-cyan-400 px-5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  <Link href="/login">Entrar no MLControl</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-white/15 bg-white/5 px-5 text-sm text-white hover:bg-white/10"
                >
                  <Link href="#modulos">Ver funcionalidades</Link>
                </Button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
