import React from 'react';
import { MessageSquare, Video, Camera, Twitter, ArrowRight, ShieldCheck } from 'lucide-react';
import { PlatformType } from '../types/stalker';

interface FeatureCardsProps {
  onSelectFeature: (platform: PlatformType) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeature }) => {
  const features: Array<{
    id: PlatformType;
    title: string;
    badge: string;
    desc: string;
    inputDesc: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Channel Stalker',
      badge: 'URL BERBASIS SALURAN',
      desc: 'Dapatkan informasi publik nama saluran, foto profil, dan jumlah pengikut langsung dari tautan resmi.',
      inputDesc: 'Mendukung format whatsapp.com/channel/...',
      icon: <MessageSquare className="w-8 h-8 text-black stroke-[2.5]" />,
      color: '#BAE6FD',
    },
    {
      id: 'tiktok',
      title: 'TikTok Stalker',
      badge: 'PROFIL & STATISTIK',
      desc: 'Lihat profil publik kreator, bio, total suka, followers, following, dan jumlah postingan video.',
      inputDesc: 'Cukup masukkan username dengan atau tanpa @',
      icon: <Video className="w-8 h-8 text-black stroke-[2.5]" />,
      color: '#FFFFFF',
    },
    {
      id: 'instagram',
      title: 'Instagram Stalker',
      badge: 'AKUN & METRIK',
      desc: 'Telusuri identitas publik akun Instagram: foto profil resolusi tinggi, bio, jumlah postingan, dan pengikut.',
      inputDesc: 'Mendukung username akun publik',
      icon: <Camera className="w-8 h-8 text-black stroke-[2.5]" />,
      color: '#FFFFFF',
    },
    {
      id: 'twitter',
      title: 'Twitter/X Stalker',
      badge: 'MICROBLOG STALKER',
      desc: 'Cari informasi akun Twitter/X berdasarkan username melalui endpoint resmi stalkertwiter secara akurat.',
      inputDesc: 'Mendukung username akun Twitter/X',
      icon: <Twitter className="w-8 h-8 text-black stroke-[2.5]" />,
      color: '#BAE6FD',
    },
  ];

  return (
    <section id="fitur-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-block bg-[#FDE047] border-3 border-[#000000] px-4 py-1 shadow-[3px_3px_0px_#000000] font-mono text-xs font-black uppercase mb-3">
          4 PLATFORM TERSEDIA
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#000000] uppercase tracking-tight">
          PILIH FITUR STALKER
        </h2>
        <p className="mt-3 text-base sm:text-lg font-bold text-gray-800 max-w-xl mx-auto">
          Klik tombol pada kartu untuk langsung mengaktifkan formulir pencarian platform terkait.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className="neo-card flex flex-col justify-between p-6 hover:-translate-y-1 transition-transform"
            style={{ backgroundColor: feature.color }}
          >
            <div>
              {/* Header card */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-[#38BDF8] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="font-mono text-2xl font-black text-[#000000]">
                  0{idx + 1}
                </span>
              </div>

              <div className="inline-block bg-[#000000] text-[#FFFFFF] text-[10px] font-mono font-bold px-2 py-0.5 mb-2 uppercase tracking-wider">
                {feature.badge}
              </div>

              <h3 className="font-display font-black text-xl text-[#000000] leading-snug mb-2">
                {feature.title}
              </h3>

              <p className="text-sm font-semibold text-gray-800 mb-4 leading-relaxed">
                {feature.desc}
              </p>

              <div className="bg-white/80 border-2 border-dashed border-[#000000] p-2 text-xs font-mono font-bold text-gray-700 mb-6">
                💡 {feature.inputDesc}
              </div>
            </div>

            <button
              onClick={() => onSelectFeature(feature.id)}
              className="w-full neo-btn py-3 font-black text-sm uppercase flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Mulai Stalking</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
