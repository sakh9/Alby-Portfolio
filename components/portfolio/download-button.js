'use client';
import { Download } from 'lucide-react';
export function DownloadButton() {
  return <button onClick={() => window.print()} className="button-outline inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold"><Download size={14}/> Download PDF portfolio</button>;
}
