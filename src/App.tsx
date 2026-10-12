import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { StalkerSection } from './components/StalkerSection';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PlatformType } from './types/stalker';
import { ShieldCheck, Eye, Terminal, Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [activePlatform, setActivePlatform] = useState<PlatformType>('whatsapp');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectPlatform = (platform: PlatformType) => {
    setActivePlatform(platform);
    const element = document.getElementById('search-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreFeatures = () => {
    const element = document.getElementById('fitur-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartSearch = () => {
    const element = document.getElementById('search-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#BAE6FD] text-[#000000] font-sans selection:bg-[#FDE047] selection:text-[#000000]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Navbar */}
      <Navbar
        activePlatform={activePlatform}
        onSelectPlatform={handleSelectPlatform}
      />

      {/* Hero Section */}
      <Hero
        onStartSearch={handleStartSearch}
        onExploreFeatures={handleExploreFeatures}
      />

      {/* Ticker marquee bar */}
      <div className="bg-[#000000] text-[#FFFFFF] py-2.5 overflow-hidden whitespace-nowrap border-b-3 border-[#000000]">
        <div className="inline-block font-mono text-xs font-black tracking-widest uppercase animate-[marquee_20s_linear_infinite]">
          ⚡ WHATSAPP CHANNEL · TIKTOK PROFILES · INSTAGRAM METRICS · TWITTER/X STALKER · 100% LIVE API · ZERO DUMMY DATA · NEO-BRUTALISM UI · ⚡
        </div>
      </div>

      {/* Main Stalker Search Interface */}
      <main>
        <StalkerSection
          activePlatform={activePlatform}
          onPlatformChange={setActivePlatform}
          onShowToast={(msg) => setToastMessage(msg)}
        />

        {/* Feature Cards Showcase */}
        <FeatureCards onSelectFeature={handleSelectPlatform} />

        {/* How It Works Guide */}
        <HowItWorks />

        {/* Frequently Asked Questions (FAQ) */}
        <FAQ />

        {/* Security & Public Data Ethics Box */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
          <div className="neo-card p-6 sm:p-8 bg-[#FFFFFF] border-3 border-[#000000] shadow-[6px_6px_0px_#000000]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#FDE047] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-[#000000] uppercase">
                  Transparansi &amp; Keamanan Privasi
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-700">
                  RzzStalker mematuhi prinsip pencarian informasi publik yang etis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-[#F3F4F6] border-2 border-[#000000]">
                <div className="font-mono text-xs font-bold text-gray-500 mb-1">01 · DATA PUBLIK</div>
                <h4 className="font-black text-sm uppercase mb-1">Hanya Informasi Terbuka</h4>
                <p className="text-xs font-semibold text-gray-700">
                  Hanya mengekstrak nama, foto profil, dan statistik yang secara publik disediakan oleh API platform resmi.
                </p>
              </div>

              <div className="p-4 bg-[#F3F4F6] border-2 border-[#000000]">
                <div className="font-mono text-xs font-bold text-gray-500 mb-1">02 · TANPA PASSWORD</div>
                <h4 className="font-black text-sm uppercase mb-1">Bebas Login &amp; Kredensial</h4>
                <p className="text-xs font-semibold text-gray-700">
                  Kami tidak pernah meminta password, token login, kode OTP, atau informasi kredensial sensitif pengguna.
                </p>
              </div>

              <div className="p-4 bg-[#F3F4F6] border-2 border-[#000000]">
                <div className="font-mono text-xs font-bold text-gray-500 mb-1">03 · PROXY AMAN</div>
                <h4 className="font-black text-sm uppercase mb-1">Validasi &amp; Sanitasi</h4>
                <p className="text-xs font-semibold text-gray-700">
                  Setiap permintaan disaring dari celah SSRF, dibatasi panjang input, dan diverifikasi domainnya.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Hubungi Owner Quick Button */}
      <aside aria-label="Kontak Cepat Owner" className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <a
          href="https://wa.me/62881022762735"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#22C55E] text-[#000000] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] px-3.5 py-2.5 flex items-center gap-2 font-black text-xs sm:text-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_#000000] transition-all cursor-pointer"
        >
          <div className="w-2.5 h-2.5 bg-black rounded-full animate-ping" />
          <MessageCircle className="w-4 h-4 fill-black stroke-black" />
          <span>Hubungi Owner</span>
        </a>
      </aside>

      {/* Footer */}
      <Footer onSelectPlatform={handleSelectPlatform} />
    </div>
  );
}
