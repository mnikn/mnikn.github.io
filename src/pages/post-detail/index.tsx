import { useParams } from 'react-router-dom'

export default function PostDetail() {
  const { id } = useParams()

  return (
    <div className="container py-8">
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        <h1>文章标题</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time>2024-03-21</time>
          <div>阅读时间：5分钟</div>
        </div>
        <div className="flex gap-2 my-4">
          {['React', 'TypeScript'].map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <p>这里是文章内容...</p>
      </article>
    </div>
  )
}
