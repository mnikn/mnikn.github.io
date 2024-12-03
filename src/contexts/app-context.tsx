import { createContext, useContext, useEffect, useState } from 'react'

import { Post } from '@/types/post'
import { loadMarkdownFiles } from '@/utils/load-data'

interface AppContextType {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  getPostById: (id: string) => Post | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id)
  }

  useEffect(() => {
    const loadPosts = async () => {
      const data = await loadMarkdownFiles()
      setPosts(
        data.map(({ fileName, content }) => {
          console.log(content)
          return {
            id: fileName,
            title: content.attributes.title || '',
            description: content.attributes.description || '',
            content: content.content,
            date: content.attributes.date || '',
          }
        })
      )
    }
    loadPosts()
  }, [])

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
