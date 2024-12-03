import { Link } from 'react-router-dom'

import { useApp } from '@/contexts/app-context'

export default function Posts() {
  const { posts } = useApp()

  return (
    <div className="container py-8">
      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.id} className="space-y-2">
            <Link to={`/posts/${post.id}`}>
              <h2 className="text-2xl font-bold hover:text-primary">{post.title}</h2>
            </Link>
            <div className="text-sm text-muted-foreground">
              <time>{post.date}</time>
            </div>
            <p className="line-clamp-2">
              {post.description ? (
                <div
                  className="inline-flex"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />
              ) : post.content.length > 1000 ? (
                post.content.substring(0, 1000) + '...'
              ) : (
                post.content
              )}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
