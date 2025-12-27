import { Link } from 'react-router-dom'
import { getAllBlogs } from '../data/blogs'

export default function BlogsListPage() {
  const blogs = getAllBlogs()

  return (
    <main className="container">
      <section className="blogs-intro">
        <h1>Blogs</h1>
        <p className="intro-text">
          Technical essays and architectural deep-dives on AI systems, software engineering, and system design.
          Exploring how we build reliable, predictable systems at scale.
        </p>
      </section>

      <div className="divider" />

      <section className="blogs-list">
        {blogs.map((blog) => (
          <article key={blog.slug} className="blog-preview">
            <Link to={`/blogs/${blog.slug}`} className="blog-preview-link">
              <h2>{blog.title}</h2>
              <p className="blog-preview-subtitle">{blog.subtitle}</p>
              <p className="blog-preview-excerpt">{blog.excerpt}</p>
              <span className="blog-preview-date">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}







