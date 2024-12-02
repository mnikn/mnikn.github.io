import { useApp } from '@/contexts/app-context'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

export function PostDetail() {
  const { id } = useParams()
  const { getPostById } = useApp()
  const post = getPostById(id || '')

  if (!post) {
    return <div className="container py-8">文章不存在</div>
  }

  return (
    <div className="container py-8">
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        <h1>{post.title}</h1>
        <div className="text-sm text-muted-foreground">
          <time>{post.date}</time>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline: boolean
              className: string
              children: React.ReactNode
              [key: string]: any
            }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter {...props} style={oneDark} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export default PostDetail
