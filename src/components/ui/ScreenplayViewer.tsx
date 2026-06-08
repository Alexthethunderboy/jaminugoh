'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ScreenplayViewerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenplayViewer({ url, isOpen, onClose }: ScreenplayViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);

  // Animation for open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(containerRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', display: 'flex' });
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(containerRef.current, { y: '100%', opacity: 0, duration: 0.5, ease: 'power3.in', display: 'none' });
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[400] bg-obsidian text-silver hidden flex-col w-full h-full transform translate-y-full opacity-0"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-charcoal/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="hover:text-white transition-colors flex items-center gap-2">
            <X size={24} />
            <span className="text-sm font-mono uppercase tracking-widest hidden md:inline">Close</span>
          </button>
        </div>

        {numPages && (
          <div className="flex items-center gap-6 font-mono text-sm">
            <button 
              disabled={pageNumber <= 1} 
              onClick={() => changePage(-1)}
              className="hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span>Page {pageNumber} of {numPages}</span>
            <button 
              disabled={pageNumber >= numPages} 
              onClick={() => changePage(1)}
              className="hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.2))} className="hover:text-white transition-colors">
            <ZoomOut size={20} />
          </button>
          <span className="font-mono text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(3, s + 0.2))} className="hover:text-white transition-colors">
            <ZoomIn size={20} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-y-auto w-full flex justify-center bg-obsidian/90 py-8 px-4">
        <Document 
          file={url} 
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center"
          loading={
            <div className="flex h-[50vh] items-center justify-center font-mono text-silver/50 tracking-widest animate-pulse">
              LOADING SCRIPT...
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            className="shadow-2xl bg-white" 
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
