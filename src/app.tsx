import { Header } from '@/components/layout/header'
import About from '@/pages/about'
import PostDetail from '@/pages/post-detail'
import Posts from '@/pages/posts'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
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
  )
}

export default App