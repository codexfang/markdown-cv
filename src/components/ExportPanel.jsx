import { useCallback } from 'react'
import html2pdf from 'html2pdf.js'
import { stripHtml, htmlToClipboardData } from '../utils/markdownParser'

export default function ExportPanel({ previewRef }) {
  const handleExportPDF = useCallback(async () => {
    const element = previewRef?.current
    if (!element) return

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('PDF export failed:', err)
    }
  }, [previewRef])

  const handleCopyText = useCallback(async () => {
    const html = previewRef?.current?.innerHTML
    if (!html) return
    const text = stripHtml(html)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }, [previewRef])

  const handleCopyHTML = useCallback(async () => {
    const html = previewRef?.current?.innerHTML
    if (!html) return
    try {
      await navigator.clipboard.write([
        htmlToClipboardData(html),
      ])
    } catch {
      const ta = document.createElement('textarea')
      ta.value = html
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }, [previewRef])

  return (
    <div className="export-panel">
      <button className="header-btn" onClick={handleExportPDF} title="Export as PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        PDF
      </button>
      <button className="header-btn" onClick={handleCopyText} title="Copy as plain text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Text
      </button>
      <button className="header-btn" onClick={handleCopyHTML} title="Copy as HTML">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
        HTML
      </button>
    </div>
  )
}
