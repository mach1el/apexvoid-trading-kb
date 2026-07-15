import { useEffect } from 'react';

interface DonateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateDialog({ isOpen, onClose }: DonateDialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-bg-elevated border border-border rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2 m-0">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Support My Work
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors cursor-pointer p-1 rounded hover:bg-bg-base">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 flex flex-col items-center gap-5">
          <p className="text-sm text-text-muted text-center m-0">
            If you find this knowledge base helpful, consider supporting its development!
          </p>

          <div className="bg-bg-base border border-border p-2 rounded-xl w-full flex justify-center">
            <img src="/banking-qr.jpg" alt="Banking QR" className="w-full max-w-[200px] rounded-lg" />
          </div>

          <a
            href="https://paypal.me/stmichael01"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0070ba] hover:bg-[#003087] text-white font-medium rounded-lg transition-colors no-underline cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.72a.641.641 0 01.633-.538h6.883c3.118 0 5.093 1.258 5.485 3.522.253 1.455-.17 3.093-1.077 4.394-.856 1.226-2.427 2.028-4.228 2.028h-2.11a.641.641 0 00-.632.538l-.66 4.148-.285 1.796a.641.641 0 00.633.74h-.01zM7.558 4.464l-2.61 16.23h3.585l.59-3.714a.641.641 0 01.632-.538h2.11c1.391 0 2.576-.624 3.23-1.56.711-1.018 1.055-2.31.848-3.5-.32-1.843-1.928-2.827-4.472-2.827H8.64a.641.641 0 00-.632.539l-1.09 6.85h-.001zM20.64 8.76c-.229-1.32-.976-2.222-2.023-2.65-.631-.258-1.392-.37-2.234-.37H11.23a.641.641 0 00-.632.539L8.337 19.34a.641.641 0 00.633.74h3.181l.462-2.905a.641.641 0 01.633-.538h1.22c1.821 0 3.411-.812 4.28-2.056.914-1.314 1.34-2.977 1.084-4.45L20.64 8.76z"/>
            </svg>
            Donate via PayPal
          </a>
        </div>
      </div>
    </div>
  );
}
