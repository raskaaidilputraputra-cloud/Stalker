import React from 'react';
import { Search, Zap, ShieldCheck, ArrowDown, ExternalLink } from 'lucide-react';

interface HeroProps {
  onStartSearch: () => void;
  onExploreFeatures: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSearch, onExploreFeatures }) => {
  return (
    <section className="relative overflow-hidden bg-[#38BDF8] border-b-4 border-[#000000] py-14 md:py-20 px-4 sm:px-6 lg:px-8 neo-grid-pattern">
      {/* Neo-brutalist Floating Geometrics */}
      <div className="absolute top-6 right-8 hidden lg:block">
        <div className="w-20 h-20 bg-[#FDE047] border-3 border-[#000000] shadow-[5px_5px_0px_#000000] rotate-12 flex items-center justify-center font-black text-xs text-center p-1 leading-tight">
          FAST &amp; REAL API
        </div>
      </div>
      <div className="absolute bottom-8 left-6 hidden lg:block">
        <div className="w-16 h-16 bg-[#FFFFFF] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] -rotate-6 flex items-center justify-center font-black text-2xl">
          ★
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-3 border-[#000000] px-4 py-1.5 shadow-[4px_4px_0px_#000000] mb-6">
          <span className="w-3 h-3 bg-emerald-400 border-2 border-[#000000] rounded-full inline-block animate-pulse"></span>
          <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-[#000000]">
            Platform Pencarian Data Publik 4-in-1
          </span>
        </div>

        {/* Main Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#000000] uppercase leading-none drop-shadow-sm">
          STALK. SEARCH.<br />
          <span className="bg-[#FFFFFF] px-3 py-1 border-4 border-[#000000] shadow-[6px_6px_0px_#000000] inline-block mt-2 text-[#000000]">
            DISCOVER.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-base sm:text-xl font-bold text-[#000000] max-w-2xl mx-auto leading-relaxed bg-[#BAE6FD] border-3 border-[#000000] p-4 shadow-[4px_4px_0px_#000000]">
          Cari informasi publik media sosial dengan cepat melalui <span className="underline decoration-2">RzzStalker</span>. Masukkan link saluran atau username untuk melihat informasi yang tersedia.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartSearch}
            className="w-full sm:w-auto px-8 py-4 bg-[#FDE047] text-[#000000] font-black text-lg border-3 border-[#000000] shadow-[5px_5px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-[0px_0px_0px_#000000] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Search className="w-6 h-6 stroke-[3]" />
            <span>Mulai Pencarian</span>
            <ArrowDown className="w-5 h-5 animate-bounce stroke-[3]" />
          </button>

          <button
            onClick={onExploreFeatures}
            className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF] text-[#000000] font-black text-lg border-3 border-[#000000] shadow-[5px_5px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000000] active:translate-x-1.5 active:translate-y-1.5 active:shadow-[0px_0px_0px_#000000] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lihat Semua Fitur</span>
            <ExternalLink className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="bg-[#FFFFFF] border-3 border-[#000000] p-3 shadow-[3px_3px_0px_#000000]">
            <span className="font-mono text-xs font-bold text-gray-600 block">01 · SALURAN</span>
            <span className="font-black text-sm uppercase">WhatsApp Channel</span>
          </div>
          <div className="bg-[#FFFFFF] border-3 border-[#000000] p-3 shadow-[3px_3px_0px_#000000]">
            <span className="font-mono text-xs font-bold text-gray-600 block">02 · VIDEO</span>
            <span className="font-black text-sm uppercase">TikTok Stalker</span>
          </div>
          <div className="bg-[#FFFFFF] border-3 border-[#000000] p-3 shadow-[3px_3px_0px_#000000]">
            <span className="font-mono text-xs font-bold text-gray-600 block">03 · SOSIAL</span>
            <span className="font-black text-sm uppercase">Instagram Stalker</span>
          </div>
          <div className="bg-[#FFFFFF] border-3 border-[#000000] p-3 shadow-[3px_3px_0px_#000000]">
            <span className="font-mono text-xs font-bold text-gray-600 block">04 · MICROBLOG</span>
            <span className="font-black text-sm uppercase">Twitter / X Stalker</span>
          </div>
        </div>
      </div>
    </section>
  );
};
