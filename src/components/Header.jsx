export default function Header() {
  return (
    <header className="hero">
      <div className="hero-image-wrapper">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQFg_YG70ABw0w/profile-displayphoto-scale_400_400/B4DZknsBcpJEAg-/0/1757307478006?e=1766016000&v=beta&t=kgt5QEeTBL3_NXSv9fw6CujizJt5IrJy6RRZG_IHUkY"
          alt="Vaibhav Sharma"
          className="hero-image"
        />
      </div>
      <h1>Vaibhav Sharma</h1>
      <p className="hero-subtitle">
        Machine Learning Engineer, Writer, Builder
      </p>
      <div className="hero-links">
        <a href="https://www.linkedin.com/in/vaibhav-sharma-9305b7232" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="mailto:vaibhav@example.com">Email</a>
        <a href="#writing">Writing</a>
      </div>
    </header>
  )
}
