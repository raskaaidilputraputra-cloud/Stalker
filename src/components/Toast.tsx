import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="bg-[#FDE047] text-[#000000] border-3 border-[#000000] shadow-[5px_5px_0px_#000000] px-4 py-3 flex items-center gap-3 max-w-sm">
        <div className="w-6 h-6 bg-black text-white rounded-none flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <p className="font-bold text-sm leading-tight flex-1">
          {message}
        </p>
        <button
          onClick={onClose}
          className="text-black hover:bg-black/10 p-1 cursor-pointer"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
