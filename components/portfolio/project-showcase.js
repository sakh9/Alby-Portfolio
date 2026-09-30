'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, X } from 'lucide-react';

function ProjectLinks({ project }) {
  return <div className="mt-6 flex gap-5 text-[11px] font-semibold uppercase tracking-[.12em]">
    <a className="line-link inline-flex items-center gap-2" href={project.live_link || '#'} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={13}/></a>
    <a className="line-link inline-flex items-center gap-2" href={project.github_link || '#'} target="_blank" rel="noreferrer"><Github size={13}/> Repository <ArrowUpRight size={13}/></a>
  </div>;
}

export function ProjectShowcase({ projects }) {
  const [activeTag, setActiveTag] = useState('All work');
  const [selected, setSelected] = useState(null);
  const tags = useMemo(() => ['All work', ...new Set(projects.flatMap((p) => p.tech_stack || []))], [projects]);
  const filtered = activeTag === 'All work' ? projects : projects.filter((p) => p.tech_stack?.includes(activeTag));
  return <>
    <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--line)] pb-5">
      {tags.map((tag) => <button key={tag} onClick={() => setActiveTag(tag)} className={'text-xs transition-colors '+(tag === activeTag ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]')}>{tag}<span className="ml-1 text-[var(--accent)]">{tag === activeTag ? '•' : ''}</span></button>)}
    </div>
    <motion.div layout className="space-y-24">
      <AnimatePresence mode="popLayout">
        {filtered.map((project, index) => <motion.article layout key={project.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.38}} className={'grid items-center gap-8 md:grid-cols-12 md:gap-12 '+(project.style_variant === 'card' ? 'md:mx-auto md:max-w-4xl md:rounded-sm md:border md:border-[var(--line)] md:bg-white/55 md:p-5' : '')}>
          <button onClick={() => setSelected(project)} aria-label={'View details for '+project.title} className={'project-art block w-full text-left md:col-span-7 '+(project.style_variant === 'card' ? 'aspect-[1.55] md:col-span-6' : project.style_variant === 'editorial' ? 'aspect-[1.25] md:aspect-[1.15]' : 'aspect-[1.42]')+' '+(index % 2 && project.style_variant !== 'card' ? 'md:order-2' : '')}>
            <img src={project.image_url} alt={project.title+' project preview'} loading="lazy"/>
            <span className="absolute bottom-5 right-5 z-[1] grid h-10 w-10 place-items-center rounded-full bg-[var(--paper)]"><ArrowUpRight size={17}/></span>
          </button>
          <div className={'md:col-span-5 '+(project.style_variant === 'card' ? 'md:col-span-6 md:px-4' : project.style_variant === 'editorial' ? 'md:col-span-4 md:pl-4' : index % 2 ? 'md:order-1 md:pl-10' : 'md:pl-2')}>
            <p className="mono mb-4 text-[10px] uppercase tracking-[.18em] text-[var(--muted)]">0{index+1} / {project.style_variant || 'split'}</p>
            <button onClick={() => setSelected(project)} className="text-left"><h3 className="serif text-4xl tracking-[-.045em] md:text-5xl">{project.title}</h3></button>
            <p className="mt-3 text-sm text-[var(--accent)]">{project.tagline}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted)]">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{project.tech_stack?.map((tech) => <span key={tech} className="rounded-full border border-[var(--line)] px-3 py-1 text-[10px] text-[var(--muted)]">{tech}</span>)}</div>
            <ProjectLinks project={project}/>
          </div>
        </motion.article>)}
      </AnimatePresence>
    </motion.div>
    {filtered.length === 0 && <p className="py-12 text-sm text-[var(--muted)]">No projects with that technology yet.</p>}
    <AnimatePresence>{selected && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}>
      <motion.div role="dialog" aria-modal="true" aria-label={selected.title} className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-[var(--paper)] p-6 md:p-10" initial={{y:20,scale:.98}} animate={{y:0,scale:1}} exit={{y:15,scale:.98}} onClick={(e)=>e.stopPropagation()}>
        <button aria-label="Close project details" onClick={()=>setSelected(null)} className="absolute right-5 top-5"><X size={19}/></button>
        <div className="project-art mb-7 aspect-[1.8]"><img src={selected.image_url} alt={selected.title+' project preview'}/></div>
        <p className="mono text-[10px] uppercase tracking-[.18em] text-[var(--muted)]">Selected project</p><h2 className="serif mt-2 text-5xl tracking-[-.05em]">{selected.title}</h2><p className="mt-2 text-[var(--accent)]">{selected.tagline}</p><p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">{selected.description}</p><ProjectLinks project={selected}/>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}
