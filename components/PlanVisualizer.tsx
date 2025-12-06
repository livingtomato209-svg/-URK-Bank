import React from 'react';
import { WebsitePlan } from '../types';
import { 
  Layout, 
  Palette, 
  Users, 
  Zap, 
  ExternalLink,
  Monitor,
  ArrowRight
} from 'lucide-react';

interface PlanVisualizerProps {
  plan: WebsitePlan | null;
  loading: boolean;
}

const PlanVisualizer: React.FC<PlanVisualizerProps> = ({ plan, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse bg-zinc-950">
        <div className="w-16 h-16 border-2 border-zinc-800 border-t-white animate-spin"></div>
        <div className="space-y-1 text-center">
            <p className="text-white font-mono uppercase tracking-widest text-sm">Processing</p>
            <div className="text-xs text-zinc-500 font-mono">Architecting digital experience...</div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-500 bg-zinc-950">
        <div className="border border-zinc-800 p-8 mb-6">
            <Monitor className="w-12 h-12 opacity-50" />
        </div>
        <h3 className="text-2xl font-light text-white mb-2 tracking-tight">System Idle</h3>
        <p className="max-w-md font-light text-zinc-400">Initiate a project request in the terminal.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
      
      {/* Project Header - Brutalist Style */}
      <div className="border-b border-zinc-800 p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-9xl font-bold select-none pointer-events-none transform translate-x-10 -translate-y-10 group-hover:translate-x-0 transition-transform duration-700">
            01
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-1">Project Concept</span>
                <div className="h-px bg-zinc-800 flex-1"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9] uppercase break-words">
                {plan.projectName}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-light">
                <div className="space-y-2">
                    <span className="block text-xs font-mono text-zinc-500 uppercase">Target Audience</span>
                    <div className="text-xl border-l-2 border-white pl-4 py-1">{plan.targetAudience}</div>
                </div>
                <div className="space-y-2">
                    <span className="block text-xs font-mono text-zinc-500 uppercase">Design Vibe</span>
                    <div className="text-xl border-l-2 border-zinc-700 pl-4 py-1 text-zinc-300">{plan.designVibe}</div>
                </div>
            </div>
        </div>
      </div>

      {/* Aesthetic System */}
      <div className="grid grid-cols-1 md:grid-cols-4 border-b border-zinc-800">
        <div className="p-8 border-r border-zinc-800 md:col-span-1 flex flex-col justify-between">
            <h3 className="font-mono text-xs text-zinc-500 uppercase mb-4 flex items-center gap-2">
                <Palette className="w-3 h-3" /> Color System
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
                Selected chromatic values for interface consistency.
            </p>
        </div>
        <div className="md:col-span-3 p-8 flex flex-wrap gap-0">
             {[
                { name: 'Primary', color: plan.colorPalette.primary, width: 'w-1/4' },
                { name: 'Secondary', color: plan.colorPalette.secondary, width: 'w-1/4' },
                { name: 'Accent', color: plan.colorPalette.accent, width: 'w-1/4' },
                { name: 'Background', color: plan.colorPalette.background, width: 'w-1/4' },
            ].map((c, i) => (
                <div key={i} className="flex-1 min-w-[120px] group relative h-32 border border-zinc-800 -ml-px first:ml-0 hover:z-10 transition-all">
                    <div className="absolute inset-0 p-4 flex flex-col justify-between h-full bg-zinc-900/50 hover:bg-transparent transition-colors">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest group-hover:text-black mix-blend-difference">{c.name}</span>
                        <div className="font-mono text-xs text-zinc-300 group-hover:text-black mix-blend-difference">{c.color}</div>
                    </div>
                    <div 
                        className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: c.color }}
                    />
                </div>
            ))}
        </div>
      </div>

      {/* Sitemap Grid */}
      <div className="p-8 md:p-12 bg-zinc-950">
        <div className="flex items-center gap-4 mb-8">
            <Layout className="w-5 h-5 text-white" />
            <h2 className="text-xl font-bold uppercase tracking-tight">Sitemap Architecture</h2>
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="font-mono text-xs text-zinc-500">TOTAL NODES: {plan.pages.length}</span>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            {plan.pages.map((page, idx) => (
            <div key={idx} className="bg-zinc-950 p-6 md:p-8 hover:bg-zinc-900 transition-colors group h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-zinc-600 group-hover:text-white transition-colors">0{idx + 1}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-800 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1">{page.title}</h3>
                <span className="font-mono text-xs text-green-500 mb-4 block">{page.route}</span>
                
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-grow border-l border-zinc-800 pl-3">
                    {page.summary}
                </p>
                
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {page.keyFeatures.map((feature, fIdx) => (
                            <span key={fIdx} className="inline-block px-2 py-1 text-[10px] font-mono border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-colors uppercase tracking-tight">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className="p-8 border-t border-zinc-800 flex justify-center pb-20">
        <button className="group relative px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
            Export JSON Plan
            <span className="absolute top-0 right-0 w-2 h-2 bg-black -mt-1 -mr-1"></span>
            <span className="absolute bottom-0 left-0 w-2 h-2 bg-black -mb-1 -ml-1"></span>
        </button>
      </div>
    </div>
  );
};

export default PlanVisualizer;