import { Link } from 'react-router-dom'

import { useApp } from '@/contexts/app-context'

export default function Posts() {
  const { posts } = useApp()

  return (
    <div className="container py-8 lg:w-[50vw]">
      <div className="grid gap-12">
        {posts.map(post => {
          const description = post.description || post.content
          return (
            <article key={post.id} className="space-y-2">
              <Link to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold hover:text-primary">{post.title}</h2>
              </Link>
              <div className="text-sm text-muted-foreground">
                <time>{post.date}</time>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
