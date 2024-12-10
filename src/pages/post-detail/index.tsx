import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import Image from '@/components/ui/image'
import { useApp } from '@/contexts/app-context'
import { cn } from '@/lib/utils'

export function PostDetail() {
  const { id } = useParams()
  const { getPostById } = useApp()
  const post = getPostById(id || '')

  if (!post) {
    return <div className="container py-8">文章不存在</div>
  }

  return (
    <div className="container py-8">
      <article className="prose dark:prose-invert mx-auto text-foreground lg:max-w-[62rem]">
        <h1>{post.title}</h1>
        {/* <div className="text-sm text-muted-foreground">
          <time>{dayjs(post.date).format('YYYY-MM-DD')}</time>
        </div> */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match?.[1]
              return match ? (
                <div className="flex flex-col">
                  <div className="flex items-center">{language}</div>
                  <SyntaxHighlighter
                    {...props}
                    ref={null}
                    style={oneDark}
                    language={language}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  {...props}
                  className={cn('text-code before:content-[""] after:content-[""]', className)}
                >
                  {children}
                </code>
              )
            },
            img({ src, alt, className }) {
              return <Image src={src} alt={alt} className={className} />
            },
            video({ src, className, ...props }) {
              return <video src={src} className={cn('rounded-lg', className)} {...props} />
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
