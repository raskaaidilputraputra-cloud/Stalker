import React, { useState } from 'react';
import { Search, Menu, X, Globe, Sparkles, MessageCircle } from 'lucide-react';
import { PlatformType } from '../types/stalker';
import { RealtimeClock } from './RealtimeClock';

interface NavbarProps {
  onSelectPlatform: (platform: PlatformType) => void;
  activePlatform: PlatformType;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectPlatform, activePlatform }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (platform?: PlatformType) => {
    if (platform) {
      onSelectPlatform(platform);
      const element = document.getElementById('search-form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-4 border-[#000000]">
      {/* Top Bar with Realtime Date/Time & Status */}
      <div className="bg-[#FDE047] border-b-2 border-[#000000] px-4 py-1.5 text-xs font-mono font-bold flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-black text-[#FDE047] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
            WAKTU NYATA
          </span>
          <RealtimeClock />
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/62881022762735"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase text-black hover:underline cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black stroke-black" />
            <span>Hubungi Owner: +62 881-0227-62735</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick()}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-12 h-12 bg-[#38BDF8] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">
            <Search className="w-6 h-6 text-[#000000] stroke-[2.75]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-2xl tracking-tight text-[#000000]">
                Rzz<span className="text-[#38BDF8] underline decoration-[#000000] decoration-3">Stalker</span>
              </span>
              <span className="bg-[#FDE047] text-[10px] font-black border-2 border-[#000000] px-1.5 py-0.2 shadow-[1.5px_1.5px_0px_#000000] uppercase tracking-wider hidden sm:inline-block">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">
              Find Social Media Information
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleNavClick()}
            className="px-3.5 py-2 font-black text-sm border-2 border-transparent hover:border-[#000000] hover:bg-[#BAE6FD] hover:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('whatsapp')}
            className={`px-3 py-2 font-black text-sm border-2 border-[#000000] transition-all cursor-pointer ${
              activePlatform === 'whatsapp'
                ? 'bg-[#38BDF8] shadow-[3px_3px_0px_#000000]'
                : 'bg-white hover:bg-[#BAE6FD] hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => handleNavClick('tiktok')}
            className={`px-3 py-2 font-black text-sm border-2 border-[#000000] transition-all cursor-pointer ${
              activePlatform === 'tiktok'
                ? 'bg-[#38BDF8] shadow-[3px_3px_0px_#000000]'
                : 'bg-white hover:bg-[#BAE6FD] hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            TikTok
          </button>
          <button
            onClick={() => handleNavClick('instagram')}
            className={`px-3 py-2 font-black text-sm border-2 border-[#000000] transition-all cursor-pointer ${
              activePlatform === 'instagram'
                ? 'bg-[#38BDF8] shadow-[3px_3px_0px_#000000]'
                : 'bg-white hover:bg-[#BAE6FD] hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            Instagram
          </button>
          <button
            onClick={() => handleNavClick('twitter')}
            className={`px-3 py-2 font-black text-sm border-2 border-[#000000] transition-all cursor-pointer ${
              activePlatform === 'twitter'
                ? 'bg-[#38BDF8] shadow-[3px_3px_0px_#000000]'
                : 'bg-white hover:bg-[#BAE6FD] hover:shadow-[2px_2px_0px_#000000]'
            }`}
          >
            Twitter/X
          </button>
          <a
            href="#faq-section"
            className="px-3 py-2 font-black text-sm border-2 border-[#000000] bg-[#FFFFFF] hover:bg-[#FDE047] hover:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer"
          >
            FAQ
          </a>

          {/* Hubungi Owner Button */}
          <a
            href="https://wa.me/62881022762735"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3.5 py-2 bg-[#22C55E] text-[#000000] font-black text-sm border-3 border-[#000000] shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1.5px_1.5px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black stroke-black" />
            <span>Hubungi Owner</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="https://wa.me/62881022762735"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#22C55E] text-[#000000] font-black text-xs border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black stroke-black" />
            <span>Owner</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
            className="w-11 h-11 bg-[#FDE047] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#000000] stroke-[3]" />
            ) : (
              <Menu className="w-6 h-6 text-[#000000] stroke-[3]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-3 border-[#000000] bg-[#FFFFFF] px-4 pt-3 pb-5 space-y-2.5 shadow-[0px_6px_0px_#000000]">
          <button
            onClick={() => handleNavClick()}
            className="w-full text-left font-black text-base py-2.5 px-3 bg-[#F3F4F6] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-between"
          >
            <span>Beranda</span>
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavClick('whatsapp')}
            className={`w-full text-left font-black text-base py-2.5 px-3 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-between ${
              activePlatform === 'whatsapp' ? 'bg-[#38BDF8]' : 'bg-[#FFFFFF]'
            }`}
          >
            <span>WhatsApp Channel Stalker</span>
            <span className="text-xs bg-white border border-black px-1.5 py-0.5">Link</span>
          </button>
          <button
            onClick={() => handleNavClick('tiktok')}
            className={`w-full text-left font-black text-base py-2.5 px-3 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-between ${
              activePlatform === 'tiktok' ? 'bg-[#38BDF8]' : 'bg-[#FFFFFF]'
            }`}
          >
            <span>TikTok Stalker</span>
            <span className="text-xs bg-white border border-black px-1.5 py-0.5">@Username</span>
          </button>
          <button
            onClick={() => handleNavClick('instagram')}
            className={`w-full text-left font-black text-base py-2.5 px-3 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-between ${
              activePlatform === 'instagram' ? 'bg-[#38BDF8]' : 'bg-[#FFFFFF]'
            }`}
          >
            <span>Instagram Stalker</span>
            <span className="text-xs bg-white border border-black px-1.5 py-0.5">@Username</span>
          </button>
          <button
            onClick={() => handleNavClick('twitter')}
            className={`w-full text-left font-black text-base py-2.5 px-3 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-between ${
              activePlatform === 'twitter' ? 'bg-[#38BDF8]' : 'bg-[#FFFFFF]'
            }`}
          >
            <span>Twitter / X Stalker</span>
            <span className="text-xs bg-white border border-black px-1.5 py-0.5">@Username</span>
          </button>
          <a
            href="#faq-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-left font-black text-base py-2.5 px-3 bg-[#FFFFFF] border-2 border-[#000000] shadow-[2px_2px_0px_#000000]"
          >
            Pertanyaan Umum (FAQ)
          </a>

          <div className="pt-2 space-y-2">
            <a
              href="https://wa.me/62881022762735"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-3 bg-[#22C55E] text-black font-black text-base border-3 border-[#000000] shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-black stroke-black" />
              <span>Hubungi Owner (WhatsApp)</span>
            </a>
            <a
              href="#cara-pakai"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full py-2.5 bg-[#FDE047] font-black border-2 border-[#000000] shadow-[2px_2px_0px_#000000]"
            >
              Lihat Panduan Pemakaian
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
