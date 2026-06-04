import { useState, useEffect, useRef, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import TemplateSelector from './components/TemplateSelector'
import ExportPanel from './components/ExportPanel'
import { loadContent, saveContent, loadTemplate, saveTemplate } from './utils/storage'
import './styles/index.css'

const DEFAULT_CONTENT = `# Alex Chen
## Senior Full Stack Engineer

alex.chen@email.com | (415) 555-0192 | linkedin.com/in/alexchen | github.com/alexchen

---

## Professional Summary

Senior Full Stack Engineer with 7+ years of experience building distributed systems and cloud-native applications. Proven track record of improving performance by 40–60%, reducing costs by 35%, and leading engineering teams. Expert in React, Node.js, TypeScript, Go, and AWS.

---

## Experience

### Senior Software Engineer — TechCorp
*Jan 2021 – Present*
- Architected event-driven microservices on AWS ECS/Kubernetes serving 2M+ monthly active users with 99.99% uptime
- Designed GraphQL API layer (Apollo, Node.js, TypeScript) reducing mobile data payloads by 55% and improving page load times by 40%
- Established CI/CD pipelines (GitHub Actions, Docker, Terraform) reducing deployment cycle from 2 hours to 12 minutes
- Mentored 6 engineers through code reviews, architecture RFCs, and pair programming sessions

### Full Stack Developer — StartupX
*Jun 2018 – Dec 2020*
- Built React/Redux SPA with real-time collaboration features (WebSocket, CRDT) used by 50K+ daily active users
- Developed RESTful APIs in Node.js/Express with PostgreSQL reducing p95 latency by 45%
- Implemented Redis caching layer and CDN strategy (CloudFront) improving API response times by 60%
- Collaborated in agile (Scrum) cross-functional pod of 8 engineers, designers, and product managers

### Junior Developer — DevLab
*Sep 2016 – May 2018*
- Contributed to Python/Flask monolith serving 100K+ requests per day; reduced technical debt through strategic refactoring
- Automated data processing pipelines with Apache Airflow and Python, reducing manual reporting effort by 20 hours per week
- Built internal monitoring dashboards using React, D3.js, and Prometheus/Grafana
- Participated in on-call rotation and incident response, maintaining 99.9% service availability

---

## Education

### B.S. Computer Science — UC Berkeley
*2010 – 2014*
- GPA: 3.85/4.0 — Dean's List, EECS Honors Program
- Undergraduate Research Assistant: Database Systems Lab

---

## Skills

**Languages:** TypeScript, JavaScript, Python, Go, Java, SQL, GraphQL, HTML/CSS
**Frontend:** React, Next.js, Redux, Tailwind CSS, D3.js, WebSocket
**Backend & APIs:** Node.js, Express, Apollo, Fastify, REST, GraphQL, gRPC
**Cloud & Infrastructure:** AWS (ECS, Lambda, DynamoDB, SQS, S3, CloudFront), Docker, Kubernetes, Terraform, GitHub Actions
**Databases:** PostgreSQL, MongoDB, Redis, DynamoDB, Elasticsearch
**Observability:** Prometheus, Grafana, OpenTelemetry, Datadog, Sentry
**Practices:** Microservices, Event-Driven Architecture, CQRS, TDD, Agile/Scrum`

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
