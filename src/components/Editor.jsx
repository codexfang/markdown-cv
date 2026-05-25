import { useRef, useCallback, useEffect } from 'react'
import { saveContent } from '../utils/storage'

export default function Editor({ content, onChange }) {
  const debounceRef = useRef(null)

  const handleChange = useCallback((e) => {
    const value = e.target.value
    onChange(value)

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      saveContent(value)
    }, 500)
  }, [onChange])

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const lineCount = content.split('\n').length

  return (
    <div className="editor-panel">
      <div className="panel-header">
        <h2 className="panel-title">Editor</h2>
        <span className="panel-meta">{lineCount} lines</span>
      </div>
      <textarea
        className="editor-textarea"
        value={content}
        onChange={handleChange}
        placeholder="Start writing your resume in Markdown..."
        spellCheck="true"
      />
    </div>
  )
}
