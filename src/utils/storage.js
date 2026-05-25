const CONTENT_KEY = 'markdown-cv-content'
const TEMPLATE_KEY = 'markdown-cv-template'

export function loadContent() {
  try {
    return localStorage.getItem(CONTENT_KEY) || ''
  } catch {
    return ''
  }
}

export function saveContent(content) {
  try {
    localStorage.setItem(CONTENT_KEY, content)
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadTemplate() {
  try {
    return localStorage.getItem(TEMPLATE_KEY) || 'minimal'
  } catch {
    return 'minimal'
  }
}

export function saveTemplate(template) {
  try {
    localStorage.setItem(TEMPLATE_KEY, template)
  } catch {
    // localStorage may be full or unavailable
  }
}
