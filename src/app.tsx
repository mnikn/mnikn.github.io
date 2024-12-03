import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Header } from '@/components/layout/header'
import { AppProvider } from '@/contexts/app-context'
import About from '@/pages/about'
import PostDetail from '@/pages/post-detail'
import Posts from '@/pages/posts'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground overflow-auto">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
