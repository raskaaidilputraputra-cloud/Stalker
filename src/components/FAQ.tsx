import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldAlert, Lock, Info, MessageCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  badgeColor?: string;
}

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'PRIVASI DATA',
      question: 'Apakah RzzStalker dapat melihat chat pribadi atau nomor telepon?',
      answer:
        'Sama sekali tidak. RzzStalker bekerja secara 100% etis dan hanya mengekstrak data publik terbuka (nama tampilan, bio, foto profil, dan jumlah pengikut/postingan) yang secara resmi diekspos oleh API penyedia. Kami tidak memiliki akses ke chat pribadi WhatsApp, pesan langsung (DM), riwayat panggilan, email tersembunyi, atau kredensial apa pun.',
      badgeColor: '#BAE6FD',
    },
    {
      id: 'faq-2',
      category: 'LIMITASI TOOL',
      question: 'Apakah akun Instagram atau TikTok yang privat bisa diakses kontennya?',
      answer:
        'Tidak. Tool ini menghormati sistem privasi platform sosial. Untuk akun privat, API hanya akan menampilkan identitas dasar publik dan mendeteksi label status "AKUN PRIVAT". Foto, video, cerita (stories), atau feed postingan akun privat tidak dapat dibuka atau diintip melalui RzzStalker.',
      badgeColor: '#FDE047',
    },
    {
      id: 'faq-3',
      category: 'TWITTER / X',
      question: 'Mengapa pencarian Twitter/X terkadang menampilkan pesan "Tidak ditemukan atau terjadi kesalahan"?',
      answer:
        'Endpoint stalkertwiter mengandalkan scraper publik upstream yang sangat bergantung pada kebijakan rate limit dan status perlindungan akun Twitter/X. Jika akun tersebut ditangguhkan (suspended), diubah menjadi privat, atau server upstream mengalami pembatasan frekuensi, sistem akan secara jujur mengembalikan pesan error tanpa membuat data palsu.',
      badgeColor: '#BAE6FD',
    },
    {
      id: 'faq-4',
      category: 'KEAMANAN & LOG',
      question: 'Apakah RzzStalker menyimpan log atau riwayat pencarian saya?',
      answer:
        'Tidak ada log pencarian permanen yang disimpan. Arsitektur backend RzzStalker bersifat stateless proxy, artinya query langsung diteruskan ke API tujuan untuk mengambil data dan segera ditampilkan di browser Anda tanpa mencatat riwayat ke database pengguna.',
      badgeColor: '#FFFFFF',
    },
    {
      id: 'faq-5',
      category: 'WHATSAPP CHANNEL',
      question: 'Mengapa WhatsApp Stalker memerlukan tautan penuh saluran, bukan nama saja?',
      answer:
        'Setiap saluran WhatsApp publik memiliki identifikasi token unik di dalam URL-nya (contoh: whatsapp.com/channel/0029Vb...). Memasukkan link saluran lengkap memastikan API dapat mencocokkan saluran yang benar secara presisi tanpa salah sasaran.',
      badgeColor: '#BAE6FD',
    },
    {
      id: 'faq-6',
      category: 'BATAS PENGGUNAAN',
      question: 'Apakah ada batasan frekuensi pencarian (Rate Limiting)?',
      answer:
        'Ya. Demi mencegah spam dan penyalahgunaan bot otomatis, server menerapkan batas keamanan maksimal 60 permintaan per menit per alamat IP. Batasan ini sangat cukup untuk kebutuhan pencarian manual sehari-hari.',
      badgeColor: '#FDE047',
    },
  ];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t-4 border-[#000000]">
      {/* Header section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#FDE047] border-3 border-[#000000] px-4 py-1.5 shadow-[3px_3px_0px_#000000] mb-3">
          <HelpCircle className="w-4 h-4 stroke-[3]" />
          <span className="font-mono text-xs font-black uppercase tracking-wider">
            PERTANYAAN UMUM &amp; KEBIJAKAN
          </span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#000000] uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="mt-3 text-base sm:text-lg font-bold text-gray-800 max-w-2xl mx-auto">
          Penjelasan lengkap mengenai privasi data, cara kerja, dan batasan teknis tool RzzStalker.
        </p>
      </div>

      {/* Accordion list */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="neo-card transition-all overflow-hidden"
              style={{
                backgroundColor: isOpen ? '#FFFFFF' : '#FAFAFA',
              }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:bg-[#BAE6FD]/40"
              >
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-sm sm:text-base font-black bg-[#000000] text-[#FFFFFF] px-2 py-0.5 border border-black shrink-0 mt-0.5">
                    Q.{String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-gray-600 block uppercase tracking-wider mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-display font-black text-base sm:text-lg text-[#000000] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-9 h-9 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#38BDF8] rotate-180' : 'bg-[#FFFFFF] hover:bg-[#FDE047]'
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-black stroke-[3]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 border-t-2 border-dashed border-[#000000]/30 animate-fadeIn">
                  <div className="p-4 bg-[#BAE6FD]/30 border-2 border-[#000000] text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner inside FAQ */}
      <div className="mt-10 p-6 bg-[#38BDF8] border-3 border-[#000000] shadow-[5px_5px_0px_#000000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-block bg-[#FDE047] border-2 border-[#000000] px-2.5 py-0.5 font-mono text-[11px] font-black uppercase mb-1">
            MASIH MEMILIKI PERTANYAAN LAIN?
          </div>
          <h4 className="font-display font-black text-xl text-[#000000] uppercase">
            Hubungi Tim Owner RzzStalker
          </h4>
          <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
            Kami siap membantu menjelaskan limitasi API atau menanggapi masukan Anda.
          </p>
        </div>

        <a
          href="https://wa.me/62881022762735"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto neo-btn-yellow py-3 px-6 font-black text-sm uppercase shrink-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black stroke-black" />
          <span>Tanya Ke Owner via WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
