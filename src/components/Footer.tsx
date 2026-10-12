import React from 'react';
import { Search, Shield, Heart, ArrowUp } from 'lucide-react';
import { PlatformType } from '../types/stalker';

interface FooterProps {
  onSelectPlatform: (platform: PlatformType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPlatform }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFFFF] border-t-4 border-[#000000] text-[#000000] mt-16">
      {/* Top Banner strip */}
      <div className="bg-[#FDE047] border-b-3 border-[#000000] py-2 px-4 text-center font-mono text-xs font-black uppercase tracking-wider overflow-hidden">
        ★ RZZSTALKER · PLATFORM PENCARIAN INFORMASI PUBLIK MEDIA SOSIAL TERPERCAYA · 100% ETHICAL STALKING ★
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-[#38BDF8] border-3 border-[#000000] shadow-[2.5px_2.5px_0px_#000000] flex items-center justify-center">
                <Search className="w-5 h-5 text-[#000000] stroke-[3]" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-[#000000]">
                Rzz<span className="text-[#38BDF8]">Stalker</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-gray-800 max-w-md leading-relaxed">
              Platform pencarian informasi publik media sosial melalui link saluran atau username untuk WhatsApp Channel, TikTok, Instagram, dan Twitter/X. Dirancang dengan presisi visual Neo-Brutalism.
            </p>

            <div className="p-3 bg-[#BAE6FD] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] text-xs font-bold text-gray-900 max-w-md">
              <div className="flex items-center gap-1.5 font-black uppercase mb-1">
                <Shield className="w-4 h-4" />
                Catatan Penggunaan Bertanggung Jawab
              </div>
              Data yang ditampilkan bersumber dari data publik API eksternal resmi. Tidak ada data pribadi rahasia yang disimpan atau diakses tanpa izin. Gunakan untuk kebutuhan penelitian, verifikasi, atau pencarian positif.
            </div>

            {/* Direct Hubungi Owner Card */}
            <div className="p-4 bg-[#FDE047] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] max-w-md">
              <span className="font-mono text-[10px] font-black uppercase bg-black text-[#FDE047] px-1.5 py-0.5">
                DUKUNGAN PENGGUNA
              </span>
              <h5 className="font-display font-black text-base text-black uppercase mt-1 mb-1">
                Ada Pertanyaan atau Kendala?
              </h5>
              <p className="text-xs font-bold text-gray-800 mb-3">
                Hubungi langsung owner RzzStalker melalui WhatsApp resmi.
              </p>
              <a
                href="https://wa.me/62881022762735"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000000] uppercase"
              >
                <span>Hubungi Owner (+62 881-0227-62735)</span>
              </a>
            </div>
          </div>

          {/* Navigasi Fitur */}
          <div>
            <h4 className="font-display font-black text-base text-[#000000] uppercase mb-4 border-b-2 border-[#000000] pb-1 inline-block">
              Navigasi Fitur
            </h4>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <button
                  onClick={() => onSelectPlatform('whatsapp')}
                  className="hover:underline hover:text-[#0284C7] cursor-pointer flex items-center gap-1.5"
                >
                  → WhatsApp Channel Stalker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('tiktok')}
                  className="hover:underline hover:text-[#0284C7] cursor-pointer flex items-center gap-1.5"
                >
                  → TikTok Stalker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('instagram')}
                  className="hover:underline hover:text-[#0284C7] cursor-pointer flex items-center gap-1.5"
                >
                  → Instagram Stalker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPlatform('twitter')}
                  className="hover:underline hover:text-[#0284C7] cursor-pointer flex items-center gap-1.5"
                >
                  → Twitter/X Stalker
                </button>
              </li>
              <li>
                <a
                  href="#faq-section"
                  className="hover:underline hover:text-[#0284C7] cursor-pointer flex items-center gap-1.5"
                >
                  → Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi API & Status */}
          <div>
            <h4 className="font-display font-black text-base text-[#000000] uppercase mb-4 border-b-2 border-[#000000] pb-1 inline-block">
              Status API Terhubung
            </h4>
            <div className="space-y-2 text-xs font-mono font-semibold">
              <div className="flex items-center justify-between p-2 bg-gray-100 border border-black">
                <span>NexaDev WhatsApp API</span>
                <span className="text-emerald-700 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-100 border border-black">
                <span>NexaDev TikTok API</span>
                <span className="text-emerald-700 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-100 border border-black">
                <span>NexaDev Instagram API</span>
                <span className="text-emerald-700 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-100 border border-black">
                <span>NexaDev Twitter/X API</span>
                <span className="text-emerald-700 font-bold">ONLINE</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-4 w-full neo-btn-white py-2 text-xs font-black uppercase cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Kembali Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t-3 border-[#000000] flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-gray-700 gap-2">
          <p>© {new Date().getFullYear()} RzzStalker. All rights reserved.</p>
          <p className="font-mono">
            Ditenagai oleh API NexaDev &middot; Desain Neo-Brutalism Asli
          </p>
        </div>
      </div>
    </footer>
  );
};
