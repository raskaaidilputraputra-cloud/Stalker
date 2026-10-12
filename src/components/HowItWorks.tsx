import React from 'react';
import { MousePointerClick, Edit3, Send, Clock, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pilih Platform',
      desc: 'Tentukan media sosial yang ingin Anda stalker: WhatsApp Channel, TikTok, Instagram, atau Twitter/X.',
      icon: <MousePointerClick className="w-6 h-6 stroke-[2.5]" />,
      bg: '#BAE6FD',
    },
    {
      num: '02',
      title: 'Masukkan Input',
      desc: 'Ketik link saluran WhatsApp atau username akun tujuan. Awalan "@" akan otomatis dibersihkan.',
      icon: <Edit3 className="w-6 h-6 stroke-[2.5]" />,
      bg: '#FFFFFF',
    },
    {
      num: '03',
      title: 'Tekan Cari',
      desc: 'Klik tombol "Cari Informasi" atau tekan Enter pada keyboard untuk mengirim permintaan.',
      icon: <Send className="w-6 h-6 stroke-[2.5]" />,
      bg: '#FDE047',
    },
    {
      num: '04',
      title: 'Proses Pencarian',
      desc: 'Sistem proxy RzzStalker menghubungi API resmi dengan perlindungan timeout dan validasi.',
      icon: <Clock className="w-6 h-6 stroke-[2.5]" />,
      bg: '#FFFFFF',
    },
    {
      num: '05',
      title: 'Lihat Hasil Asli',
      desc: 'Eksplorasi data profil, foto, followers, bio, dan salin username atau buka langsung ke aplikasi.',
      icon: <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />,
      bg: '#38BDF8',
    },
  ];

  return (
    <section id="cara-pakai" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t-4 border-[#000000]">
      <div className="text-center mb-10">
        <div className="inline-block bg-[#FFFFFF] border-3 border-[#000000] px-4 py-1 shadow-[3px_3px_0px_#000000] font-mono text-xs font-black uppercase mb-3">
          PANDUAN LANGKAH DEMI LANGKAH
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#000000] uppercase tracking-tight">
          CARA MENGGUNAKAN
        </h2>
        <p className="mt-3 text-base sm:text-lg font-bold text-gray-800 max-w-xl mx-auto">
          Ikuti lima tahap mudah untuk menemukan informasi publik secara cepat dan akurat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="neo-card p-5 flex flex-col justify-between"
            style={{ backgroundColor: step.bg }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-black text-[#000000]">
                  {step.num}
                </span>
                <div className="w-10 h-10 bg-white border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-display font-black text-lg text-[#000000] uppercase mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-black/20 font-mono text-[10px] font-bold text-gray-700 uppercase">
              TAHAP {step.num} DARI 05
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
