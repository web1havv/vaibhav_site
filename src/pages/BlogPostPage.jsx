import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getBlogBySlug, getAllBlogs } from '../data/blogs'

export default function BlogPostPage() {
  const { slug } = useParams()
  const blog = getBlogBySlug(slug)
  const allBlogs = getAllBlogs()

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Vaibhav Sharma`
    } else {
      document.title = 'Blog Not Found | Vaibhav Sharma'
    }
  }, [blog])

  if (!blog) {
    return (
      <main className="container">
        <h1>Blog post not found</h1>
        <p><Link to="/blogs">← Back to blogs</Link></p>
      </main>
    )
  }

  const currentIndex = allBlogs.findIndex(b => b.slug === slug)
  const nextBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
  const prevBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null

  return (
    <main className="container">
      <div className="blog-post-nav">
        <Link to="/blogs" className="blog-back-link">← Back to blogs</Link>
      </div>

      <article className="blog-article">
        <h1>{blog.title}</h1>
        <p className="blog-subtitle">{blog.subtitle}</p>
        <p className="blog-date">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>

      <div className="divider" />

      <nav className="blog-post-navigation">
        {prevBlog && (
          <Link to={`/blogs/${prevBlog.slug}`} className="blog-nav-link blog-nav-prev">
            <span className="blog-nav-label">Previous</span>
            <span className="blog-nav-title">{prevBlog.title}</span>
          </Link>
        )}
        {nextBlog && (
          <Link to={`/blogs/${nextBlog.slug}`} className="blog-nav-link blog-nav-next">
            <span className="blog-nav-label">Next</span>
            <span className="blog-nav-title">{nextBlog.title}</span>
          </Link>
        )}
      </nav>
    </main>
  )
}







