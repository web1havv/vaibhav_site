import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import WritingPage from './pages/WritingPage'
import BlogsListPage from './pages/BlogsListPage'
import BlogPostPage from './pages/BlogPostPage'

// Handle GitHub Pages 404 redirect and page titles
function RedirectHandler() {
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (location.search) {
      // Handle GitHub Pages 404 redirect format: ?/blogs/slug
      let redirectPath = null
      
      // Check if search starts with ?/
      if (location.search.startsWith('?/')) {
        redirectPath = location.search.slice(2) // Remove ?/
      } else {
        // Try getting from URLSearchParams
        const params = new URLSearchParams(location.search)
        redirectPath = params.get('/')
      }
      
      if (redirectPath) {
        const path = '/' + redirectPath.replace(/~and~/g, '&')
        // Use React Router's navigate to update the URL without reload
        navigate(path + location.hash, { replace: true })
      }
    }
  }, [location, navigate])
  
  // Update page title based on route
  useEffect(() => {
    const path = location.pathname
    
    if (path === '/') {
      document.title = 'Vaibhav Sharma'
    } else if (path === '/writing') {
      document.title = 'Writing | Vaibhav Sharma'
    } else if (path === '/blogs') {
      document.title = 'Blogs | Vaibhav Sharma'
    } else if (path.startsWith('/blogs/')) {
      // For individual blog posts, we'll set the title in BlogPostPage
      document.title = 'Blog | Vaibhav Sharma'
    } else {
      document.title = 'Vaibhav Sharma'
    }
  }, [location])
  
  return null
}

function App() {
  return (
    <Router>
      <RedirectHandler />
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/blogs" element={<BlogsListPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
        </Routes>
        <footer>
          <p>Exploring. Building.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
