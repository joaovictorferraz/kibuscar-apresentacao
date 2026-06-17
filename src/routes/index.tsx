import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

const sections = [
  { id: 'abertura', keyword: 'KIBUSCAR' },
  { id: 'problema-mercado', keyword: 'Problema & Mercado' },
  { id: 'solucao', keyword: 'Solução' },
  { id: 'mvp', keyword: 'MVP' },
  { id: 'viabilidade', keyword: 'Viabilidade' },
  { id: 'cenario-ravel', keyword: 'Cenário Viável' },
  { id: 'proximos-passos', keyword: 'Próximos Passos' },
  { id: 'equipe', keyword: 'Fundadores' },
] as const

type SectionId = typeof sections[number]['id']

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={`fade-in ${inView ? 'visible' : ''} ${className}`}>{children}</div>
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <FadeInSection className="text-center mb-16 md:mb-20">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
      <div className="section-divider mt-8 max-w-2xl mx-auto" />
    </FadeInSection>
  )
}

function Index() {
  const [activeSection, setActiveSection] = useState<SectionId>('abertura')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="bg-deco">
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
        <svg viewBox="0 0 112 60" xmlns="http://www.w3.org/2000/svg"><path d="M0 30v10h7a8 8 0 0 0 16 0h34a8 8 0 0 0 16 0h7V30l-6-12-8-8H40l-4-8H16l-8 8H0v12"/><circle cx="15" cy="40" r="5"/><circle cx="81" cy="40" r="5"/></svg>
      </div>

      {/* Keyword top bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex flex-row justify-center items-center gap-x-3 md:gap-x-5 gap-y-0.5 flex-wrap px-4 py-2.5"
        style={{
          background: 'oklch(12.9% .042 264.695 / 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid oklch(100% 0 0 / 0.06)',
        }}
      >
        <a
          href="https://kibuscar.com.br/?i=2"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14"
        >
          <img src="/kibuscar-logo.png" alt="KIBUSCAR" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
        </a>
        {sections.map(({ id, keyword }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`keyword-item ${activeSection === id ? 'active' : ''}`}
          >
            <span className="keyword-dot" />
            <span className="keyword-label">{keyword}</span>
          </a>
        ))}
      </nav>

      {/* ===== HERO ===== */}
      <section id="abertura" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="section-container w-full">
          <FadeInSection className="flex flex-col items-center text-center">
            <p className="text-teal font-semibold tracking-[0.15em] uppercase text-sm mb-6">
              KIBUSCAR · CARROS, OFICINAS E PESSOAS
            </p>
            <a href="https://kibuscar.com.br/?i=2" target="_blank" rel="noopener noreferrer" className="inline-block mx-auto mb-10 w-40 h-40">
              <img src="/kibuscar-logo.png" alt="KIBUSCAR" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
            <h1 className="sr-only">KIBUSCAR | Carros, Oficinas e Pessoas</h1>
            <p className="hero-headline max-w-3xl mb-10">
              Ajudamos oficinas e pessoas a se conectarem com transparência e confiança no cuidado do seu carro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#solucao" className="btn-primary">
                Ver apresentação
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===== PROBLEMA & MERCADO ===== */}
      <section id="problema-mercado" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="O problema e o mercado" subtitle="Os desafios que motoristas e oficinas enfrentam todos os dias" />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {[
              { title: 'Falta de transparência', desc: 'Motoristas não sabem o preço justo nem confiam no diagnóstico.', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Baixa fidelização', desc: 'Oficinas dependem de indicação boca a boca para conquistar clientes.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              { title: 'Gestão manual', desc: 'Agenda, orçamento e histórico em papel ou WhatsApp.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map((item) => (
              <FadeInSection key={item.title}>
                <div className="glass-card p-8 h-full">
                  <div className="icon-box mb-5">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { title: 'Insegurança', desc: 'Medo de ser enganado é a principal barreira do motorista.' },
              { title: 'Sem dados', desc: 'Oficinas não medem retorno, ticket médio nem recorrência.' },
            ].map((item) => (
              <FadeInSection key={item.title}>
                <div className="glass-card p-6 md:p-8 flex items-start gap-4">
                  <div className="icon-box-sm shrink-0">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                  </div>
                  <div><h3 className="card-title !text-lg">{item.title}</h3><p className="card-text-sm">{item.desc}</p></div>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection>
            <div className="glass-card p-8 md:p-10">
              <h3 className="card-title text-center mb-6">Mercado</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div><p className="text-4xl font-black accent-gradient">150</p><p className="card-text-sm mt-1">Oficinas alvo</p></div>
                <div><p className="text-4xl font-black accent-gradient">36</p><p className="card-text-sm mt-1">Oficinas na cidade</p></div>
                <div><p className="text-4xl font-black accent-gradient">5</p><p className="card-text-sm mt-1">Concorrentes analisados</p></div>
                <div><p className="text-sm font-black accent-gradient">Preço abaixo da média</p><p className="card-text-sm mt-1">Benchmarking regional</p></div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===== SOLUÇÃO + PLANOS ===== */}
      <section id="solucao" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Nossa solução — KIBUSCAR" subtitle="Plataforma que conecta motoristas a oficinas verificadas" />
          <FadeInSection>
            <div className="glass-card p-8 md:p-10 mb-12 max-w-4xl mx-auto text-center">
              <p className="text-lg text-white/75 leading-relaxed">Plataforma que conecta motoristas a oficinas verificadas, com orçamentos transparentes, histórico do veículo e gestão completa para a oficina parceira.</p>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Proposta de valor', value: 'Confiança + transparência + gestão' },
              { label: 'Segmento', value: 'Oficinas EPP/ME e motoristas urbanos' },
              { label: 'Receita', value: 'Assinatura SaaS recorrente por oficina' },
              { label: 'Canais', value: 'Comercial direto + marketing local digital' },
            ].map((item) => (
              <FadeInSection key={item.label}>
                <div className="metric-card">
                  <p className="text-teal font-semibold text-sm mb-1">{item.label}</p>
                  <p className="card-text !text-foreground">{item.value}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">Planos</h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Básico', price: 'R$ 129,90', features: ['Cadastro na plataforma', 'Agenda online', 'Até 50 OS/mês'] },
              { name: 'Profissional', price: 'R$ 199,90', features: ['Tudo do Básico', 'OS ilimitadas', 'Histórico do veículo', 'Relatórios básicos'], featured: true },
              { name: 'Premium', price: 'R$ 349,90', features: ['Tudo do Profissional', 'API e integrações', 'Gestão completa para a oficina parceira'] },
            ].map((plan) => (
              <FadeInSection key={plan.name}>
                <div className={`plan-card h-full flex flex-col ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && <span className="text-xs font-semibold tracking-widest uppercase text-teal mb-2">Mais Popular</span>}
                  <h3 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="mb-4"><span className="text-4xl font-black accent-gradient">{plan.price}</span><span className="card-text-sm">/mês</span></p>
                  <ul className="space-y-3 mt-auto">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 card-text-sm">
                        <svg className="w-4 h-4 shrink-0 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MVP ===== */}
      <section id="mvp" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Landing Page + MVP final" subtitle="Do marketing à validação real do produto" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeInSection>
              <div className="plan-card h-full">
                <div className="icon-box mb-5">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="card-title">Landing pública</h3>
                <p className="card-text mb-4">Captação de oficinas + lista de espera</p>
                <p className="card-text-sm mb-4">Onboarding em 60 segundos, prova social local e CTA único para cadastro da oficina.</p>
                <a href="https://kibuscar.com.br/?i=2" target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 !text-sm self-start">
                  Acessar site
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="plan-card h-full">
                <div className="icon-box mb-5">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>
                </div>
                <h3 className="card-title">MVP funcional</h3>
                <p className="card-text mb-4">Painel da oficina</p>
                <p className="card-text-sm">OS, agenda, clientes e relatórios em produção para validação real.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===== VIABILIDADE ===== */}
      <section id="viabilidade" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Viabilidade econômica" subtitle="Projeções financeiras realistas para os primeiros 24 meses" />
          <div className="max-w-5xl mx-auto space-y-10">
            <FadeInSection>
              <div className="glass-card p-8 md:p-10">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Ticket médio</p>
                <p className="text-5xl md:text-6xl font-black accent-gradient mb-2">R$ 172,90</p>
                <p className="card-text-sm">Ticket médio mensal por oficina</p>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="glass-card p-8 md:p-10">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">MRR no mês 24</p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: 'Pessimista', value: 'R$ 6.623' },
                    { label: 'Realista', value: 'R$ 12.607' },
                    { label: 'Otimista', value: 'R$ 22.280' },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                      <p className="card-text-sm mb-1">{s.label}</p>
                      <p className="text-3xl font-black accent-gradient">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <div className="grid md:grid-cols-3 gap-6">
              <FadeInSection>
                <div className="glass-card p-6 md:p-8">
                  <p className="card-text-sm uppercase tracking-wider mb-2">Investimento total</p>
                  <p className="text-4xl font-black accent-gradient">R$ 53.425</p>
                  <ul className="mt-4 space-y-2 card-text-sm">
                    <li className="flex justify-between"><span>Fixos</span><span className="text-foreground">R$ 41.175</span></li>
                    <li className="flex justify-between"><span>Pré-operacionais</span><span className="text-foreground">R$ 5.800</span></li>
                    <li className="flex justify-between"><span>Capital de giro</span><span className="text-foreground">R$ 6.450</span></li>
                  </ul>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="glass-card p-6 md:p-8">
                  <p className="card-text-sm uppercase tracking-wider mb-2">Custo operacional mensal</p>
                  <p className="text-4xl font-black accent-gradient">R$ 2.150</p>
                  <ul className="mt-4 space-y-2 card-text-sm">
                    <li className="flex justify-between"><span>Claude Max IA</span><span className="text-foreground">R$ 1.100</span></li>
                    <li className="flex justify-between"><span>Marketing</span><span className="text-foreground">R$ 400</span></li>
                    <li className="flex justify-between"><span>Cloud</span><span className="text-foreground">R$ 300</span></li>
                    <li className="flex justify-between"><span>Outros</span><span className="text-foreground">R$ 350</span></li>
                  </ul>
                </div>
              </FadeInSection>
              <FadeInSection>
                <div className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center h-full">
                  <p className="card-text-sm uppercase tracking-wider mb-2">Margem estimada</p>
                  <p className="text-5xl font-black accent-gradient mb-2">72%</p>
                  <p className="card-text-sm">Margem bruta sobre receita</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CENÁRIO VIÁVEL ===== */}
      <section id="cenario-ravel" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Cenário Viável" subtitle="Por que este é o momento certo para KIBUSCAR" />
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <div className="glass-card p-8 md:p-12">
                <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8">
                  Com um investimento inicial de <strong className="text-foreground">R$ 53 mil</strong> e custo operacional
                  de apenas <strong className="text-foreground">R$ 2.150/mês</strong>, a KIBUSCAR atinge o break-even
                  no cenário realista entre os meses <strong className="text-foreground">12 e 14</strong>.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div><p className="text-4xl font-black accent-gradient">12-14</p><p className="card-text-sm mt-1">Meses para break-even</p></div>
                  <div><p className="text-4xl font-black accent-gradient">72%</p><p className="card-text-sm mt-1">Margem bruta</p></div>
                  <div><p className="text-4xl font-black accent-gradient">R$ 12,6K</p><p className="card-text-sm mt-1">MRR em 24 meses (realista)</p></div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMOS PASSOS ===== */}
      <section id="proximos-passos" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Próximos Passos" subtitle="Nossa jornada para transformar a relação entre oficinas e motoristas" />
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { step: 'MVP', desc: 'Painel da oficina com OS digital, agenda e cadastro de clientes' },
              { step: 'Landing Page', desc: 'Captação de oficinas parceiras com lista de espera e onboarding rápido' },
              { step: 'Validação', desc: 'Teste com 10 oficinas piloto em uma cidade para validação de produto e preço' },
              { step: 'Expansão local', desc: 'Escalada para 36+ oficinas na cidade com marketing local e comercial direto' },
              { step: 'Plataforma completa', desc: 'Abertura para motoristas com orçamentos online, histórico e matching inteligente' },
            ].map((item, i) => (
              <FadeInSection key={item.step}>
                <div className="glass-card p-6 md:p-8 flex items-start gap-6">
                  <div className="step-num">{i + 1}</div>
                  <div><h3 className="card-title">{item.step}</h3><p className="card-text">{item.desc}</p></div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EQUIPE ===== */}
      <section id="equipe" className="relative py-20 md:py-32">
        <div className="section-container">
          <SectionHeader title="Equipe Fundadora" subtitle="Conheça quem está construindo a KIBUSCAR" />
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-3xl mx-auto">
            {[
              { name: 'Fundador 1', role: 'Produto & Estratégia', bio: 'Experiência em produtos digitais e mobilidade urbana.' },
              { name: 'Fundador 2', role: 'Comercial & Operações', bio: 'Sólida trajetória em operações e desenvolvimento de negócios.' },
            ].map((f) => (
              <FadeInSection key={f.name}>
                <div className="team-card">
                  <div className="photo-placeholder"><span>{f.name}</span></div>
                  <h3 className="card-title !text-xl">{f.name}</h3>
                  <p className="text-teal font-medium text-sm mb-2">{f.role}</p>
                  <p className="card-text-sm">{f.bio}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT PHRASE ===== */}
      <section className="relative py-16 md:py-24">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <FadeInSection>
            <a href="https://kibuscar.com.br/" target="_blank" rel="noopener noreferrer" className="inline-block w-20 h-20 mb-6">
              <img src="/kibuscar-logo.png" alt="KIBUSCAR" className="w-full h-full object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-muted-foreground mb-6">
              &ldquo;Transparência que conecta.<br />Confiança que transforma.&rdquo;
            </p>
            <p className="text-lg md:text-xl font-black tracking-[0.15em] uppercase accent-gradient">
              KIBUSCAR
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-8">
        <div className="section-container !py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">&copy; 2026 KIBUSCAR. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              {['Instagram', 'LinkedIn', 'Email'].map((s) => (
                <a key={s} href="#" className="link-accent text-sm">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
