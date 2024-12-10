import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { useApp } from '@/contexts/app-context'

export default function Posts() {
  const { posts } = useApp()

  return (
    <div className="container py-8 lg:w-[50vw]">
      <div className="grid gap-20">
        {posts.map(post => {
          const description = post.description || post.content
          return (
            <article key={post.id} className="space-y-2 flex flex-col group">
              <Link className="transition-all flex flex-col" to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold hover:text-primary mb-4">{post.title}</h2>
                <div className="text-sm text-muted-foreground flex items-center gap-4 group-hover:brightness-150 transition-all">
                  <time>{dayjs(post.date).format('YYYY-MM-DD')}</time>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map(tag => (
                      <div
                        key={tag}
                        className="rounded-lg bg-foreground/10 px-3 py-1 text-foreground"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground pt-2 group-hover:brightness-150 transition-all">
                  {description}
                </p>
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
