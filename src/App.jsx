import { useState, useEffect, useRef, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import TemplateSelector from './components/TemplateSelector'
import ExportPanel from './components/ExportPanel'
import { loadContent, saveContent, loadTemplate, saveTemplate } from './utils/storage'
import './styles/index.css'

const DEFAULT_CONTENT = `# John Doe
## Full Stack Developer

john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe

---

## Experience

### Senior Developer — Tech Corp
*Jan 2020 - Present*
- Led development of microservices architecture serving 1M+ users
- Implemented CI/CD pipelines reducing deployment time by 60%
- Mentored a team of 5 junior developers
- Architected cloud-native solutions on AWS reducing costs by 35%

### Full Stack Developer — Startup Inc
*Jun 2017 - Dec 2019*
- Built React-based single-page application with real-time data visualization
- Designed and implemented RESTful APIs using Node.js and Express
- Optimized PostgreSQL queries improving performance by 40%
- Collaborated in an agile team of 8 engineers

---

## Education

### B.S. Computer Science — University of Technology
*2013 - 2017*
- GPA: 3.8/4.0 — Dean's List
- ACM International Collegiate Programming Contest finalist
- Teaching Assistant for Data Structures and Algorithms

---

## Skills

**Languages:** JavaScript, TypeScript, Python, SQL, Go
**Frameworks & Libraries:** React, Node.js, Express, Next.js, Tailwind CSS
**Tools & Platforms:** Git, Docker, AWS, Kubernetes, CI/CD, Linux
**Databases:** PostgreSQL, MongoDB, Redis`

export default function App() {
  const [content, setContent] = useState('')
  const [template, setTemplate] = useState('minimal')
  const [ready, setReady] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    const savedContent = loadContent()
    const savedTemplate = loadTemplate()
    setContent(savedContent || DEFAULT_CONTENT)
    setTemplate(savedTemplate)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    saveContent(content)
  }, [content, ready])

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent)
  }, [])

  const handleTemplateChange = useCallback((newTemplate) => {
    setTemplate(newTemplate)
    saveTemplate(newTemplate)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Markdown CV</h1>
        <div className="header-center">
          <TemplateSelector active={template} onChange={handleTemplateChange} />
        </div>
        <ExportPanel previewRef={previewRef} />
      </header>
      <main className="app-main">
        <Editor content={content} onChange={handleContentChange} />
        <Preview content={content} template={template} ref={previewRef} />
      </main>
    </div>
  )
}
