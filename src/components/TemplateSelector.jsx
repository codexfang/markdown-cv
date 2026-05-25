const TEMPLATES = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean ATS-friendly' },
  { id: 'modern', label: 'Modern', desc: 'Professional spacing' },
  { id: 'classic', label: 'Classic', desc: 'Traditional layout' },
]

export default function TemplateSelector({ active, onChange }) {
  return (
    <div className="template-selector">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          className={`template-btn ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
          title={t.desc}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
