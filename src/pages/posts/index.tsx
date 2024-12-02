import { useApp } from '@/contexts/app-context'
import { Link } from 'react-router-dom'

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
            <p className="text-muted-foreground line-clamp-2">
              {post.content.length > 1000 ? post.content.substring(0, 1000) + '...' : post.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
