import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-name">Vaibhav Sharma</Link>
        <div className="nav-links">
          <Link to="/">About</Link>
          <Link to="/writing">Writing</Link>
          <a href="https://www.linkedin.com/in/vaibhav-sharma-9305b7232" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  )
}
