import { Post } from '@/types/post'
import { createContext, useContext, useState } from 'react'

interface AppContextType {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  getPostById: (id: string) => Post | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: '示例文章',
      content: `
# 标题1

这是一篇示例文章的内容...

## 标题2

- 列表项1
- 列表项2
- 列表项3

### 代码示例

\`\`\`typescript
function hello() {
  console.log('Hello, World!')
}
\`\`\`
    `,
      date: '2024-03-21',
    },
  ])

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id)
  }

  return (
    <AppContext.Provider
      value={{
        posts,
        setPosts,
        getPostById,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
