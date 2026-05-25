import { forwardRef } from 'react'
import ReactMarkdown from 'react-markdown'

const Preview = forwardRef(function Preview({ content, template }, ref) {
  return (
    <div className="preview-panel">
      <div className="panel-header">
        <h2 className="panel-title">Preview</h2>
      </div>
      <div className="preview-scroll">
        <div className={`resume-wrapper template-${template}`} ref={ref}>
          <div className="resume-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="resume-name">{children}</h1>,
                h2: ({ children }) => <h2 className="resume-title">{children}</h2>,
                h3: ({ children }) => <h3 className="resume-section-title">{children}</h3>,
                hr: () => <hr className="resume-divider" />,
                ul: ({ children }) => <ul className="resume-list">{children}</ul>,
                p: ({ children }) => {
                  const text = typeof children === 'string' ? children : ''
                  if (text.includes('|') || text.includes('@') || text.includes('linkedin') || text.includes('github')) {
                    return <p className="resume-contact">{children}</p>
                  }
                  return <p className="resume-paragraph">{children}</p>
                },
                strong: ({ children }) => <strong className="resume-strong">{children}</strong>,
                em: ({ children }) => <em className="resume-em">{children}</em>,
              }}
            >
              {content || '_Start writing your resume..._'}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Preview
