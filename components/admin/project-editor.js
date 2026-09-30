'use client';
import { useState } from 'react';
import { saveProject } from '../../app/admin/actions';
import { X } from 'lucide-react';

export function ProjectEditor({ project, onClose }) {
  const [pending, setPending] = useState(false);
  async function submit(formData) {
    setPending(true);
    try { await saveProject(formData); onClose(); } finally { setPending(false); }
  }
  return <div className="fixed inset-0 z-40 grid place-items-center overflow-auto bg-black/30 p-4"><div className="my-6 max-h-[92vh] w-full max-w-2xl overflow-auto bg-[var(--paper)] p-6 md:p-9">
    <div className="mb-7 flex items-start justify-between"><div><p className="mono text-[10px] uppercase tracking-[.2em] text-[var(--accent)]">Project details</p><h2 className="serif mt-2 text-4xl tracking-[-.05em]">{project ? 'Edit project' : 'New project'}</h2></div><button onClick={onClose} aria-label="Close"><X size={19}/></button></div>
    <form action={submit} className="grid gap-4 md:grid-cols-2">{project && <input type="hidden" name="id" value={project.id}/>}
      <label className="text-xs">Title<input required name="title" defaultValue={project?.title} className="admin-field mt-2"/></label>
      <label className="text-xs">Tagline<input name="tagline" defaultValue={project?.tagline} className="admin-field mt-2"/></label>
      <label className="text-xs md:col-span-2">Description<textarea rows={4} name="description" defaultValue={project?.description} className="admin-field mt-2 resize-y"/></label>
      <label className="text-xs md:col-span-2">Tech stack <span className="text-[var(--muted)]">(comma separated)</span><input name="tech_stack" defaultValue={project?.tech_stack?.join(', ')} className="admin-field mt-2"/></label>
      <label className="text-xs md:col-span-2">Image URL<input name="image_url" defaultValue={project?.image_url} className="admin-field mt-2"/></label>
      <label className="text-xs">Live link<input type="url" name="live_link" defaultValue={project?.live_link} className="admin-field mt-2"/></label>
      <label className="text-xs">GitHub link<input type="url" name="github_link" defaultValue={project?.github_link} className="admin-field mt-2"/></label>
      <label className="text-xs md:col-span-2">Layout style<select name="style_variant" defaultValue={project?.style_variant || 'split'} className="admin-field mt-2"><option value="split">Split</option><option value="card">Card</option><option value="editorial">Editorial</option></select></label>
      <div className="mt-3 flex items-center justify-end gap-3 md:col-span-2"><button type="button" onClick={onClose} className="button-outline px-4 py-3 text-xs">Cancel</button><button disabled={pending} className="button-primary px-5 py-3 text-xs font-semibold">{pending ? 'Saving…' : 'Save as draft'}</button></div>
    </form>
  </div></div>;
}
