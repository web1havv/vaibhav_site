import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/Home'
import WritingPage from './pages/WritingPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<WritingPage />} />
        </Routes>
        <footer>
          <p>Exploring. Building.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
