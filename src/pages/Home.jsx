export default function Home() {
  const projects = [
    {
      title: "Amazon ML Challenge",
      year: "2025",
      description: "Built a system that predicts product prices using both text and images. Top 10 finish, which came with an interview offer for their Applied Scientist role. The interesting part was treating it as a multimodal fusion problem—how do you actually combine text descriptions and images in a way that improves predictions?"
    },
    {
      title: "Viral Reel Generator",
      year: "2024",
      description: "Won Best Use of Technology at the Voice AI hackathon. Generates Instagram reels in 40 seconds using ElevenLabs and OpenAI. The challenge wasn't just video generation—it was making voices sound natural and creating dialogue between characters that feels engaging. Built in 36 hours."
    },
    {
      title: "Forest Fire Detector",
      year: "2024",
      description: "Using satellite imagery to detect forest fires early. Combined Conv2D layers for spatial features and RNNs for temporal patterns—fires develop over time, not just in space. PostgreSQL handles the imagery data. Still working on improving detection speed."
    },
    {
      title: "EdTech Content Generator",
      year: "2024",
      description: "Pitched to Ronnie Screwvala at CodeEd finals. Generates flashcards, quizzes, and video content for education. The real constraint? Cost optimization—making it cheap enough that platforms like Unacademy could actually use it at scale."
    }
  ]

  return (
    <main className="container">
      <section className="intro">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQFg_YG70ABw0w/profile-displayphoto-scale_400_400/B4DZknsBcpJEAg-/0/1757307478006?e=1766016000&v=beta&t=kgt5QEeTBL3_NXSv9fw6CujizJt5IrJy6RRZG_IHUkY"
          alt="Vaibhav"
          className="intro-image"
        />
        <h1>I build ML systems and write poetry.</h1>
        <p className="intro-text">
          I'm a dual degree student at <strong>BITS Pilani</strong> (Chemical Engineering + Math) currently working at{' '}
          <strong>Rupeeflo</strong> on NRI investment platforms. Before this, I was part of the founding team at{' '}
          <strong>Bachatt</strong> and worked on voice cloning at <strong>Dübverse</strong>.
        </p>
        <p className="intro-text">
          I love hackathons—building working systems in 36 hours, testing ideas under pressure. This year I won a Voice AI
          hackathon and placed in the top 10 of Amazon's ML Challenge (out of 85,000+ people). Last year, Energy Quest AIR-4.
        </p>
        <p className="intro-text">
          I'm drawn to problems where AI meets real constraints: cost, latency, scale. How do you make a model work in production
          when you have actual limits? That's where it gets interesting.
        </p>
        <p className="intro-text">
          Beyond code, I write for the <strong>Hindi Press Club</strong> and Poetry Club at BITS Pilani.
          Poetry teaches you to see patterns, compress meaning, iterate on expression. Different lens on problem-solving.
        </p>
      </section>

      <div className="divider" />

      <section className="work">
        <h2>Work</h2>
        {projects.map((project, index) => (
          <div key={index} className="work-item">
            <div className="work-header">
              <h3>{project.title}</h3>
              <span className="work-year">{project.year}</span>
            </div>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <div className="divider" />

      <section className="experience">
        <h2>Experience</h2>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Rupeeflo</strong>
            <span>Jun 2025 - Present</span>
          </div>
          <p>Working with Kotak, ICICI, HSBC on notarization services and deep link architecture. Building the new stocks product for NRI investments. Integrating VideoSDK, BranchIO, PandaDOC.</p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Bachatt</strong>
            <span>Feb 2025 - Jun 2025</span>
          </div>
          <p>Founding team. Built three services end-to-end: User Profile, Auth, and Mandate. Worked on API flows for mandates and transactions. Spring Boot, fintech integrations.</p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Dübverse</strong>
            <span>Jan 2023 - Nov 2023</span>
          </div>
          <p>Retrieval-based voice cloning. Speaker recommendation for multi-speaker video dubbing, cross-lingual voice cloning. Scaled to 4 new languages training on 200+ hours on GCP.</p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Indian Red Cross Society</strong>
            <span>Jun 2023 - Jul 2023</span>
          </div>
          <p>Built registration portal with Django and Python. Created website with JavaScript and MongoDB.</p>
        </div>
      </section>

      <div className="divider" />

      <section className="contact">
        <h2>Get in Touch</h2>
        <p className="intro-text">
          <a href="mailto:f20212328@pilani.bits-pilani.ac.in">Email</a> •{' '}
          <a href="https://www.linkedin.com/in/vaibhav-sharma-9305b7232" target="_blank" rel="noopener noreferrer">LinkedIn</a> •{' '}
          <a href="https://github.com/web1havv" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>
    </main>
  )
}
