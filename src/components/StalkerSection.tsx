import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MessageSquare,
  Video,
  Camera,
  Twitter,
  Copy,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Code2,
  Share2,
  UserCheck,
  Lock,
  Globe,
  Heart,
  Users,
  Film,
  Sparkles,
} from 'lucide-react';
import { PlatformType, StalkerResult } from '../types/stalker';

interface StalkerSectionProps {
  activePlatform: PlatformType;
  onPlatformChange: (platform: PlatformType) => void;
  onShowToast: (message: string) => void;
}

export const StalkerSection: React.FC<StalkerSectionProps> = ({
  activePlatform,
  onPlatformChange,
  onShowToast,
}) => {
  // Input states per platform
  const [inputs, setInputs] = useState<Record<PlatformType, string>>({
    whatsapp: 'https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N',
    tiktok: 'rzzpr2tg',
    instagram: 'rzkadl1',
    twitter: 'rasss',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<StalkerResult | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [imageError, setImageError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Platform metadata
  const platformConfig: Record<
    PlatformType,
    {
      title: string;
      desc: string;
      label: string;
      placeholder: string;
      helper: string;
      icon: React.ReactNode;
      endpoint: string;
      sample: string;
      profileUrlBase?: (handle: string) => string;
    }
  > = {
    whatsapp: {
      title: 'WhatsApp Channel Stalker',
      desc: 'Cari informasi publik saluran WhatsApp resmi berdasarkan URL saluran yang valid.',
      label: 'Tautan Saluran WhatsApp (URL)',
      placeholder: 'https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N',
      helper: 'Masukkan URL lengkap dari domain whatsapp.com yang memuat /channel/',
      icon: <MessageSquare className="w-5 h-5" />,
      endpoint: '/api/stalk/whatsapp',
      sample: 'https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N',
      profileUrlBase: (url) => url,
    },
    tiktok: {
      title: 'TikTok Stalker',
      desc: 'Cari informasi profil publik kreator TikTok berdasarkan username pengguna.',
      label: 'Username Akun TikTok',
      placeholder: 'rzzpr2tg atau @rzzpr2tg',
      helper: 'Username boleh diketik dengan atau tanpa simbol @',
      icon: <Video className="w-5 h-5" />,
      endpoint: '/api/stalk/tiktok',
      sample: 'rzzpr2tg',
      profileUrlBase: (handle) => `https://www.tiktok.com/@${handle.replace(/^@/, '')}`,
    },
    instagram: {
      title: 'Instagram Stalker',
      desc: 'Cari informasi publik profil pengguna Instagram berdasarkan username.',
      label: 'Username Akun Instagram',
      placeholder: 'rzkadl1 atau @rzkadl1',
      helper: 'Username boleh diketik dengan atau tanpa simbol @',
      icon: <Camera className="w-5 h-5" />,
      endpoint: '/api/stalk/instagram',
      sample: 'rzkadl1',
      profileUrlBase: (handle) => `https://www.instagram.com/${handle.replace(/^@/, '')}`,
    },
    twitter: {
      title: 'Twitter / X Stalker',
      desc: 'Cari informasi publik akun Twitter/X melalui endpoint stalkertwiter resmi.',
      label: 'Username Akun Twitter / X',
      placeholder: 'rasss atau @rasss',
      helper: 'Username boleh diketik dengan atau tanpa simbol @',
      icon: <Twitter className="w-5 h-5" />,
      endpoint: '/api/stalk/twitter',
      sample: 'rasss',
      profileUrlBase: (handle) => `https://x.com/${handle.replace(/^@/, '')}`,
    },
  };

  const currentConfig = platformConfig[activePlatform];

  // Handle Tab Switch
  const handleTabChange = (platform: PlatformType) => {
    onPlatformChange(platform);
    setErrorMsg(null);
    setResult(null);
    setShowRawJson(false);
    setImageError(false);
  };

  const handleInputChange = (val: string) => {
    setInputs((prev) => ({ ...prev, [activePlatform]: val }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg(null);
    setShowRawJson(false);
    setImageError(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Perform search
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    const rawInput = inputs[activePlatform].trim();
    if (!rawInput) {
      setErrorMsg(
        activePlatform === 'whatsapp'
          ? 'Silakan masukkan tautan saluran WhatsApp terlebih dahulu.'
          : 'Silakan masukkan username terlebih dahulu.'
      );
      return;
    }

    // Client-side quick validations
    if (activePlatform === 'whatsapp') {
      try {
        const urlToTest = rawInput.startsWith('http://') || rawInput.startsWith('https://')
          ? rawInput
          : `https://${rawInput}`;
        const parsed = new URL(urlToTest);
        if (!['whatsapp.com', 'www.whatsapp.com'].includes(parsed.hostname.toLowerCase())) {
          setErrorMsg('Tautan harus berasal dari domain whatsapp.com atau www.whatsapp.com.');
          return;
        }
        if (!parsed.pathname.includes('/channel/')) {
          setErrorMsg('Tautan harus memuat direktori saluran WhatsApp (/channel/).');
          return;
        }
      } catch {
        setErrorMsg('Format tautan WhatsApp tidak valid. Pastikan format URL sudah benar.');
        return;
      }
    } else {
      const cleanUser = rawInput.replace(/^@+/, '').trim();
      if (!cleanUser) {
        setErrorMsg('Username tidak boleh kosong.');
        return;
      }
      if (cleanUser.length > 60) {
        setErrorMsg('Username terlalu panjang (maksimal 60 karakter).');
        return;
      }
    }

    setLoading(true);
    setErrorMsg(null);
    setResult(null);
    setShowRawJson(false);
    setImageError(false);

    try {
      let targetApiUrl = '';
      if (activePlatform === 'whatsapp') {
        const fullUrl = rawInput.startsWith('http') ? rawInput : `https://${rawInput}`;
        targetApiUrl = `${currentConfig.endpoint}?url=${encodeURIComponent(fullUrl)}`;
      } else {
        const cleanUser = rawInput.replace(/^@+/, '').trim();
        targetApiUrl = `${currentConfig.endpoint}?username=${encodeURIComponent(cleanUser)}`;
      }

      const response = await fetch(targetApiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        const err = responseData.message || `Server merespons dengan kode HTTP ${response.status}.`;
        setErrorMsg(err);
        setResult({
          status: false,
          statusCode: response.status,
          message: err,
          rawJson: responseData,
        });
        return;
      }

      // Check if API payload signaled failure
      if (responseData.status === false) {
        const failureMessage =
          responseData.message ||
          (responseData.statusCode === 400
            ? 'Pengguna atau saluran tidak ditemukan.'
            : 'API gagal memproses permintaan.');
        setErrorMsg(failureMessage);
        setResult({
          status: false,
          statusCode: responseData.statusCode || 400,
          message: failureMessage,
          rawJson: responseData,
        });
        return;
      }

      // Successful result
      setResult({
        status: true,
        author: responseData.author,
        data: responseData.data,
        rawJson: responseData,
      });
      onShowToast(`Berhasil menemukan data ${currentConfig.title}!`);
    } catch (err: any) {
      const msg = err.message || 'Koneksi ke server gagal. Periksa koneksi internet Anda.';
      setErrorMsg(msg);
      setResult({
        status: false,
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper Copy Functions
  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      onShowToast(`${label} berhasil disalin!`);
    } catch {
      onShowToast(`Gagal menyalin ${label}.`);
    }
  };

  const copyFullResult = () => {
    if (!result || !result.data) return;
    const formatted = JSON.stringify(result.data, null, 2);
    copyToClipboard(formatted, 'Semua data hasil');
  };

  // Profile URL generator
  const getProfileUrl = () => {
    if (activePlatform === 'whatsapp') {
      return inputs.whatsapp.startsWith('http')
        ? inputs.whatsapp
        : `https://${inputs.whatsapp}`;
    }
    const cleanHandle = (result?.data?.username || inputs[activePlatform]).replace(/^@/, '');
    if (currentConfig.profileUrlBase) {
      return currentConfig.profileUrlBase(cleanHandle);
    }
    return '';
  };

  // Safe image display helper (proxies if CDN fails or CORS issues)
  const getDisplayPhoto = (originalPhotoUrl?: string) => {
    if (!originalPhotoUrl) return '';
    if (imageError) {
      // Return local proxy URL
      return `/api/proxy-image?url=${encodeURIComponent(originalPhotoUrl)}`;
    }
    return originalPhotoUrl;
  };

  return (
    <section id="search-form-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Platform Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {(['whatsapp', 'tiktok', 'instagram', 'twitter'] as PlatformType[]).map((pKey) => {
          const cfg = platformConfig[pKey];
          const isActive = activePlatform === pKey;
          return (
            <button
              key={pKey}
              onClick={() => handleTabChange(pKey)}
              disabled={loading}
              className={`p-3.5 border-3 border-[#000000] font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-[#38BDF8] shadow-[4px_4px_0px_#000000] translate-x-0.5 translate-y-0.5'
                  : 'bg-[#FFFFFF] shadow-[3px_3px_0px_#000000] hover:bg-[#BAE6FD] hover:shadow-[1px_1px_0px_#000000]'
              }`}
            >
              {cfg.icon}
              <span className="truncate">{cfg.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Search Box Card */}
      <div className="neo-card p-6 sm:p-8 bg-[#FFFFFF] relative">
        {/* Platform Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b-3 border-[#000000] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FDE047] border-3 border-[#000000] shadow-[3px_3px_0px_#000000] flex items-center justify-center">
              {currentConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-2xl text-[#000000]">
                  {currentConfig.title}
                </h3>
                <span className="bg-[#BAE6FD] text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase hidden sm:inline-block">
                  LIVE API
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">
                {currentConfig.desc}
              </p>
            </div>
          </div>

          {/* Quick Example Button */}
          <button
            type="button"
            onClick={() => {
              handleInputChange(currentConfig.sample);
              onShowToast('Contoh terisi di kolom!');
            }}
            className="self-start sm:self-auto px-3 py-1.5 bg-[#F3F4F6] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-mono text-xs font-bold hover:bg-[#FDE047] transition-all cursor-pointer"
          >
            📋 Isi Contoh Uji
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label
              htmlFor="stalker-input"
              className="block font-black text-sm text-[#000000] uppercase tracking-wide mb-2 flex items-center justify-between"
            >
              <span>{currentConfig.label}</span>
              <span className="font-mono text-xs font-normal text-gray-600">
                {inputs[activePlatform].length} karakter
              </span>
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="stalker-input"
                type="text"
                value={inputs[activePlatform]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentConfig.placeholder}
                disabled={loading}
                className="w-full neo-input text-base sm:text-lg pr-12 focus:bg-amber-50/20"
              />
              {inputs[activePlatform] && (
                <button
                  type="button"
                  onClick={() => handleInputChange('')}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-gray-200 hover:bg-red-400 hover:text-white border border-black px-2 py-1 transition-colors"
                >
                  Hapus
                </button>
              )}
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-600">
              ℹ️ {currentConfig.helper}
            </p>
          </div>

          {/* Submit & Reset Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 neo-btn py-3.5 text-base sm:text-lg font-black uppercase cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sedang Mengambil Data Dari API...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 stroke-[3]" />
                  <span>Cari Informasi</span>
                </>
              )}
            </button>

            {result && (
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="w-full sm:w-auto neo-btn-white py-3.5 px-6 font-black uppercase cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Cari Lagi</span>
              </button>
            )}
          </div>
        </form>

        {/* Loading Visual Indicator */}
        {loading && (
          <div className="mt-8 p-6 bg-[#BAE6FD] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] text-center">
            <div className="inline-block p-3 bg-white border-2 border-[#000000] shadow-[2px_2px_0px_#000000] animate-spin mb-3">
              <Loader2 className="w-7 h-7 text-[#000000]" />
            </div>
            <h4 className="font-display font-black text-lg text-[#000000] uppercase">
              Menghubungi API {currentConfig.title}...
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mt-1">
              Mohon tunggu beberapa detik, data sedang diambil langsung dari server publik.
            </p>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMsg && !loading && (
          <div className="mt-8 p-5 bg-[#FEE2E2] border-3 border-[#000000] shadow-[4px_4px_0px_#000000]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-400 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-black text-base text-[#000000] uppercase">
                  Pencarian Gagal / Data Tidak Ditemukan
                </h4>
                <p className="text-sm font-bold text-red-950 mt-1 leading-relaxed">
                  {errorMsg}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="px-3 py-1.5 bg-[#FFFFFF] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-black text-xs hover:bg-[#FDE047] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Coba Lagi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleInputChange(currentConfig.sample);
                      setTimeout(() => handleSearch(), 50);
                    }}
                    className="px-3 py-1.5 bg-[#BAE6FD] border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-black text-xs hover:bg-[#38BDF8] transition-all cursor-pointer"
                  >
                    Coba dengan Contoh Valid ({currentConfig.sample})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Panel */}
        {result && result.status && result.data && !loading && (
          <div className="mt-8 border-3 border-[#000000] shadow-[6px_6px_0px_#000000] bg-[#FFFFFF] p-6 sm:p-8">
            {/* Result Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b-2 border-[#000000]">
              <div className="inline-flex items-center gap-2 bg-[#FDE047] border-2 border-[#000000] px-3 py-1 shadow-[2px_2px_0px_#000000]">
                <CheckCircle className="w-4 h-4 text-black stroke-[3]" />
                <span className="font-mono text-xs font-black uppercase text-black">
                  HASIL API RESMI ({result.author || 'NexaDev'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyFullResult}
                  className="px-3 py-1 bg-white border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-mono text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Salin Semua Data</span>
                </button>
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="px-3 py-1 bg-white border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-mono text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showRawJson ? 'Tutup JSON' : 'Lihat JSON Asli'}</span>
                </button>
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Profile Photo */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#BAE6FD] border-3 border-[#000000] shadow-[4px_4px_0px_#000000] overflow-hidden flex items-center justify-center">
                  {result.data.photo ? (
                    <img
                      src={getDisplayPhoto(result.data.photo)}
                      alt={result.data.name || result.data.username || 'Foto Profil'}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={() => {
                        if (!imageError) {
                          setImageError(true);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-display font-black text-3xl text-[#000000]">
                      {(result.data.name || result.data.username || 'R')[0]}
                    </span>
                  )}
                </div>
                {result.data.verified && (
                  <div
                    title="Akun Terverifikasi"
                    className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#38BDF8] border-2 border-[#000000] shadow-[1.5px_1.5px_0px_#000000] rounded-full flex items-center justify-center text-xs font-black"
                  >
                    ✓
                  </div>
                )}
              </div>

              {/* Profile Identity Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                    {result.data.name || result.data.username || 'Saluran WhatsApp'}
                  </h3>

                  {/* Badges */}
                  {result.data.verified !== undefined && (
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 border-2 border-black ${
                        result.data.verified
                          ? 'bg-[#38BDF8] text-black shadow-[1.5px_1.5px_0px_#000000]'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {result.data.verified ? 'TERVERIFIKASI' : 'BELUM TERVERIFIKASI'}
                    </span>
                  )}

                  {result.data.private !== undefined && (
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 border-2 border-black ${
                        result.data.private
                          ? 'bg-[#FDE047] text-black shadow-[1.5px_1.5px_0px_#000000]'
                          : 'bg-emerald-100 text-emerald-950 shadow-[1.5px_1.5px_0px_#000000]'
                      }`}
                    >
                      {result.data.private ? '🔒 AKUN PRIVAT' : '🌐 AKUN PUBLIK'}
                    </span>
                  )}
                </div>

                {result.data.username && (
                  <p className="font-mono text-sm sm:text-base font-bold text-gray-700 flex items-center gap-2">
                    <span>@{result.data.username}</span>
                    <button
                      onClick={() => copyToClipboard(result.data.username, 'Username')}
                      className="p-1 hover:bg-gray-200 border border-black shadow-[1px_1px_0px_#000000] cursor-pointer"
                      title="Salin username"
                    >
                      <Copy className="w-3.5 h-3.5 text-black" />
                    </button>
                  </p>
                )}

                {/* ID if available */}
                {result.data.id && (
                  <p className="font-mono text-xs font-semibold text-gray-600 mt-1">
                    ID Akun: <span className="bg-gray-100 px-1 border border-gray-400">{result.data.id}</span>
                  </p>
                )}

                {/* Bio text */}
                {result.data.bio !== undefined && (
                  <div className="mt-3 p-3 bg-[#F3F4F6] border-2 border-[#000000] text-sm font-semibold text-gray-900 leading-relaxed max-w-2xl">
                    <span className="font-mono text-[10px] text-gray-600 font-bold block mb-1">
                      BIOGRAFI AKUN:
                    </span>
                    {result.data.bio ? result.data.bio : <span className="italic text-gray-500">(Tidak ada bio)</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Metrics Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              {/* Followers */}
              {result.data.followers !== undefined && (
                <div className="bg-[#BAE6FD] border-3 border-[#000000] p-4 shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-800 mb-1">
                    <span>PENGIKUT</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                    {typeof result.data.followers === 'number'
                      ? result.data.followers.toLocaleString('id-ID')
                      : result.data.followers}
                  </div>
                </div>
              )}

              {/* Following */}
              {result.data.following !== undefined && (
                <div className="bg-[#FFFFFF] border-3 border-[#000000] p-4 shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-800 mb-1">
                    <span>MENGIKUTI</span>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                    {result.data.following.toLocaleString('id-ID')}
                  </div>
                </div>
              )}

              {/* Likes */}
              {result.data.likes !== undefined && (
                <div className="bg-[#FDE047] border-3 border-[#000000] p-4 shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-800 mb-1">
                    <span>TOTAL LIKES</span>
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                    {result.data.likes.toLocaleString('id-ID')}
                  </div>
                </div>
              )}

              {/* Posts / Videos */}
              {result.data.posts !== undefined && (
                <div className="bg-[#FFFFFF] border-3 border-[#000000] p-4 shadow-[3px_3px_0px_#000000]">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-800 mb-1">
                    <span>POSTINGAN</span>
                    <Film className="w-4 h-4" />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#000000]">
                    {result.data.posts.toLocaleString('id-ID')}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="pt-4 border-t-2 border-[#000000] flex flex-wrap items-center gap-3">
              {result.data.username && (
                <button
                  onClick={() => copyToClipboard(result.data.username, 'Username')}
                  className="neo-btn-white py-2.5 px-4 font-black text-xs uppercase cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Username</span>
                </button>
              )}

              <button
                onClick={copyFullResult}
                className="neo-btn-yellow py-2.5 px-4 font-black text-xs uppercase cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Salin Hasil</span>
              </button>

              {getProfileUrl() && (
                <a
                  href={getProfileUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn py-2.5 px-4 font-black text-xs uppercase cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {activePlatform === 'whatsapp' ? 'Buka Saluran' : 'Buka Profil'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={handleReset}
                className="ml-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border-2 border-[#000000] shadow-[2px_2px_0px_#000000] font-black text-xs uppercase cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cari Akun Lain</span>
              </button>
            </div>

            {/* Raw JSON Developer View */}
            {showRawJson && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#000000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-gray-700">
                    RESPONS RESMI API (JSON):
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(result.rawJson || result, null, 2),
                        'Raw JSON'
                      )
                    }
                    className="font-mono text-[11px] underline font-bold cursor-pointer"
                  >
                    Salin Raw JSON
                  </button>
                </div>
                <pre className="bg-[#000000] text-[#38BDF8] p-4 text-xs font-mono overflow-x-auto border-2 border-[#000000] shadow-[3px_3px_0px_#000000] max-h-72">
                  {JSON.stringify(result.rawJson || result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
