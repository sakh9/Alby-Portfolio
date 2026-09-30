import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { getPublishedProjects } from '../lib/projects';
import { ProjectShowcase } from '../components/portfolio/project-showcase';
import { DownloadButton } from '../components/portfolio/download-button';

export const revalidate = 0;

export default async function Home() {
  const projects = await getPublishedProjects();
  return <main className="grain overflow-hidden">
    <div className="no-print">
    <header className="wrap flex h-[82px] items-center justify-between border-b border-[var(--line)]">
      <a href="#home" className="flex items-center gap-2 text-sm font-bold tracking-[-.04em]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--ink)] text-[12px] text-white">swe</span>A S PARISYA BINTANG MARZUKI
      </a>
      <nav className="flex items-center gap-7 text-xs text-[var(--muted)]">
        <a className="line-link" href="#work">Work</a>
        <a className="line-link" href="#about">About</a>
        <a className="line-link" href="#contact">Contact</a>
      </nav>
    </header>
    <section id="home" className="wrap relative grid min-h-[680px] items-center gap-14 py-24 md:grid-cols-[1.2fr_.8fr]">
      <div>
        <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/50 px-3 py-2 text-[10px] uppercase tracking-[.13em]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6b9c6d]"/>Alive and Ready
        </div>
        <p className="mono mb-5 text-[11px] uppercase tracking-[.2em] text-[var(--muted)]">
          Calm developer · Surabaya, Indonesia
        </p>
        <h1 className="serif max-w-[800px] text-[clamp(4rem,9vw,8.2rem)] leading-[.88] tracking-[-.075em]">Hi, i'm Alby <span className="italic text-[var(--accent)]">Software Engineering</span>  person.</h1>
        <p className="mt-8 max-w-md text-sm leading-7 text-[var(--muted)]">I take a strong interest in Web Development, Data Analyst, and currently a basic understanding of Cybersecurity aswell.<br></br>Still a long way to go!</p>
        <div className="mt-9 flex flex-wrap gap-3"><a href="#work" className="button-primary inline-flex items-center gap-3 px-5 py-3 text-xs font-semibold">Explore work <ArrowDownRight size={15}/></a><DownloadButton/></div>
      </div>
      <div className="relative hidden h-[460px] items-center justify-center md:flex">
        <div className="absolute right-4 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-[var(--line)]"/>
        <div className="absolute right-14 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-[var(--line)]"/>
        <div className="relative mr-14 grid h-52 w-52 place-items-center rounded-full bg-[#e9e4d9]"><span className="serif text-7xl italic tracking-[-.1em]">am.</span><span className="absolute -right-2 top-8 h-4 w-4 rounded-full bg-[var(--accent)]"/></div>
        <p className="mono absolute bottom-3 right-0 max-w-32 text-[9px] uppercase leading-5 tracking-[.16em] text-[var(--muted)]">Good work starts with a good eager to learn.</p>
        <ArrowDownRight className="absolute bottom-12 left-1/4 text-[var(--accent)]" size={22}/>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between border-t border-[var(--line)] pt-5 text-[10px] uppercase tracking-[.13em] text-[var(--muted)]"><span>Scroll to explore</span><span>Product · Engineering · Direction</span><span>01 — 03</span></div>
    </section>
    <section id="work" className="wrap py-28">
      <div className="mb-14 flex items-end justify-between"><div><p className="mono mb-4 text-[10px] uppercase tracking-[.2em] text-[var(--accent)]">A few things I’ve made</p><h2 className="serif text-5xl tracking-[-.06em] md:text-7xl">Built Projects<span className="text-[var(--accent)]">.</span></h2></div><p className="hidden max-w-[220px] text-xs leading-6 text-[var(--muted)] md:block">Collections of my independent projects.</p></div>
      <ProjectShowcase projects={projects}/>
    </section>
    <section id="about" className="border-y border-[var(--line)] bg-[#f0f0eb]">
      <div className="wrap grid gap-12 py-24 md:grid-cols-[.7fr_1.3fr]">
        <p className="mono text-[10px] uppercase tracking-[.18em] text-[var(--muted)]">A thing about me / 02</p>
        <div>
          <p className="serif max-w-3xl text-3xl leading-[1.35] tracking-[-.035em] md:text-[2.2rem]">
            I build fast, interactive web applications grounded in solid data and built to stay secure. Whether I'm crafting fluid front-end interfaces, deriving actionable insights from messy data streams, or patching potential attack vectors before deployment, I care about the entire lifecycle of a digital system. <span className="italic text-[var(--accent)]"> Design and Engineer</span>
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[var(--line)] pt-6 text-xs">
            <div>
              <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--muted)]">Currently</p>
              <p>Improving OSINT Project (OpenSynt). </p>
            </div>
            <div>
              <p className="mono mb-3 text-[10px] uppercase tracking-widest text-[var(--muted)]">Often using</p>
              <p>React · Next.js · Laravel<br/>Figma · Supabase · Coffee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact" className="wrap grid gap-10 py-28 md:grid-cols-[1fr_auto] md:items-end"><div><p className="mono mb-5 text-[10px] uppercase tracking-[.2em] text-[var(--accent)]">Have something in mind? / 03</p><h2 className="serif max-w-2xl text-6xl tracking-[-.06em] md:text-8xl">Let’s make it <span className="italic">matter.</span></h2><a href="mailto:albysakha205@gmail.com" className="line-link mt-7 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm">albysakha205@gmail.com <ArrowUpRight size={14}/></a></div><div className="flex gap-3"><a aria-label="LinkedIn" className="button-outline grid h-11 w-11 place-items-center" href="https://linkedin.com"><Linkedin size={16}/></a><a aria-label="GitHub" className="button-outline grid h-11 w-11 place-items-center" href="https://github.com"><Github size={16}/></a><a aria-label="Email" className="button-outline grid h-11 w-11 place-items-center" href="mailto:albysakha205@gmail.com"><Mail size={16}/></a></div></section>
    <footer className="wrap flex flex-wrap justify-between gap-3 border-t border-[var(--line)] py-6 text-[10px] text-[var(--muted)]"><span>© 2026 By the owner of this pages.</span><span className="flex gap-5"><span>Surabaya, Indonesia</span><a href="/admin/login" className="line-link">Admin</a><a href="#home" className="line-link">Back to top ↑</a></span></footer>
    </div>
    <div className="hidden print:block">
      <section className="print-page grid grid-cols-2 items-center gap-16"><div><p className="mono text-xs uppercase tracking-[.2em]">Alby Sakha · Independent developer</p><h1 className="serif mt-10 text-7xl tracking-[-.07em]">I make digital things feel simple.</h1><p className="mt-8 max-w-xl text-lg leading-8">Product-minded developer partnering with thoughtful teams to turn complex ideas into clear, useful experiences.</p><p className="mt-12 text-sm">albysakha205@gmail.com · Surabaya, Indonesia</p></div><div className="border-l border-[var(--line)] pl-12"><p className="mono text-xs uppercase tracking-[.2em]">Selected work · 2024—25</p><p className="mt-5 text-sm">Product · Engineering · Direction</p></div></section>
      {projects.map((p,i)=><section key={p.id} className="print-page grid grid-cols-2 items-center gap-14"><div className="project-art aspect-[1.35]"><img src={p.image_url} alt=""/></div><div><p className="mono text-xs uppercase tracking-[.2em]">0{i+1} / Selected project</p><h2 className="serif mt-8 text-6xl tracking-[-.06em]">{p.title}</h2><p className="mt-4 text-lg text-[var(--accent)]">{p.tagline}</p><p className="mt-8 leading-7">{p.description}</p><p className="mt-8 text-sm">{p.tech_stack?.join(' · ')}</p><p className="mt-3 text-sm">{p.live_link}</p></div></section>)}
    </div>
  </main>;
}
