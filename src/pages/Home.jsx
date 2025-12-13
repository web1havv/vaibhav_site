export default function Home() {
  const projects = [
    {
      title: "Amazon ML Challenge 2025",
      year: "2025",
      description: "Built a multimodal system that predicts product prices using both text descriptions and images. Finished in the Top 10 out of 85,000+ participants across all backgrounds, earning a PPI (Pre-Placement Interview) offer for Amazon's Applied Scientist Intern role. The core challenge was treating it as a multimodal fusion problem—effectively combining text descriptions and images in a way that improves prediction accuracy. Explored various fusion architectures and feature extraction techniques to handle the heterogeneous nature of product data."
    },
    {
      title: "Viral Reel Generator in 40 Seconds",
      year: "2024 - Present",
      description: "Built an end-to-end pipeline that converts any article or topic into short, engaging infotainment reels in under a minute. Won Best Use of Technology at the Voice AI Hackathon (Together Fund). Used ElevenLabs and OpenAI models to generate dialogue-style scripts between popular characters and create high-quality voiceovers. Implemented the complete workflow in Django including text ingestion, script generation, audio rendering, and video compilation. The challenge was making voices sound natural and creating dialogue between characters that feels engaging while maintaining production speed."
    },
    {
      title: "Forest Fire Detector",
      year: "2024 - Present",
      description: "Developed an early forest fire detection system using satellite imagery to identify high-risk regions before fires spread. Employed Conv2D layers for spatial feature extraction and RNNs for temporal pattern recognition in satellite image sequences—fires develop over time, not just in space. Used PostgreSQL for efficient storage and retrieval of processed imagery and prediction outputs. The system processes multi-temporal satellite data to detect fire signatures early, enabling faster response times for fire management teams."
    },
    {
      title: "EdTech Content Generator",
      year: "2024",
      description: "Built flashcard, quiz and video content generation tools for educational use cases. Selected as a finalist at the CodeEd Hackathon (UpGrad), where I pitched the solution to Ronnie Screwvala. The system generates educational content at scale, including interactive flashcards, multiple-choice quizzes, and video scripts. The real constraint was cost optimization—making it cheap enough that platforms like Unacademy could actually use it at scale while maintaining quality. Implemented efficient prompt engineering and content structuring to reduce API costs."
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
          I'm a final-year Dual Degree student at <strong>BITS Pilani</strong> (BE Chemical Engineering, MSc Mathematics), 
          currently working as an SDE Intern at <strong>Rupeeflo</strong> building NRI wealth management and investment platforms. 
          Before this, I was part of the founding technical team at <strong>Bachatt</strong>, where I built fintech services 
          end-to-end, and worked on voice-AI products at <strong>Dübverse</strong>, scaling multilingual voice cloning models.
        </p>
        <p className="intro-text">
          I'm strong in Python, Java, Django, SQL and machine learning workflows, with hands-on experience in RESTful APIs, 
          backend services, and production-ready integrations with third-party platforms. I love hackathons—building working 
          systems under pressure, testing ideas quickly. This year I placed <strong>Top 10 in Amazon ML Challenge</strong> 
          (out of 85,000+ participants) and won Best Use of Technology at the Voice AI Hackathon. Last year, I achieved 
          <strong> AIR-4 in Energy Quest</strong> (AIR-1 in Chemical specialisation).
        </p>
        <p className="intro-text">
          I'm drawn to problems where software engineering meets real-world constraints: fintech systems, educational technology, 
          content generation. Taking complex models and making them work in production with real limits—cost, latency, scale, 
          reliability. That's where it gets interesting.
        </p>
        <p className="intro-text">
          Beyond code, I write poetry and essays for the <strong>Hindi Press Club</strong> and Poetry Club at BITS Pilani. 
          Poetry teaches you to see patterns in unexpected places, to compress meaning, to iterate on expression. It's not 
          separate from engineering—it's another way of solving problems.
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
            <strong>Rupeeflo – NRI Wealth Management App</strong>
            <span>Jun 2025 - Present</span>
          </div>
          <p>
            <strong>SDE Intern</strong> | Bengaluru, India<br/>
            • Designed and implemented end-to-end deep-link architecture for notarization journeys with Kotak, ICICI and HSBC, 
            enabling secure document workflows for NRI customers.<br/>
            • Contributed to a new stocks buy/sell product for NRI investments by implementing backend flows, input validation 
            and error handling around trading journeys.<br/>
            • Integrated third-party services such as VideoSDK, Branch.io and PandaDoc into the core app to support video KYC, 
            deep links and e-signature workflows.
          </p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Bachatt</strong>
            <span>Feb 2025 - Jun 2025</span>
          </div>
          <p>
            <strong>SDE Intern (Founding Team)</strong> | New Delhi, India<br/>
            • Developed and maintained RESTful API flows for mandates and transactions, improving reliability of payment and 
            collection flows.<br/>
            • Built three backend services end-to-end (User Profile, Auth and Mandate), including routing, request validation, 
            logging and basic access control using Spring Boot.<br/>
            • Created the product website and collaborated with stakeholders to ensure a responsive and production-ready user 
            interface.
          </p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Dubverse</strong>
            <span>Jan 2023 - Nov 2023</span>
          </div>
          <p>
            <strong>Research Intern</strong> | Remote / Gurugram, India<br/>
            • Worked on retrieval-based voice cloning models for multilingual video dubbing and personalized voice generation.<br/>
            • Implemented components for speaker recommendation in multi-speaker video dubbing, cross-lingual voice cloning and 
            pipeline experimentation.<br/>
            • Scaled and optimized models to 4 new languages by training on 200+ hours of speech data on Google Cloud Platform (GCP).<br/>
            • Contributed to engineering and validation around OpenAI Whisper-based pipelines for robust speech-to-text and alignment.
          </p>
        </div>
        <div className="exp-item">
          <div className="exp-header">
            <strong>Indian Red Cross Society</strong>
            <span>Jun 2023 - Jul 2023</span>
          </div>
          <p>
            <strong>Software Developer Intern</strong> | Bhopal, India<br/>
            • Developed a registration portal using Python and Django to streamline volunteer and participant onboarding.<br/>
            • Created the organization website using JavaScript and MongoDB to present information and initiatives.<br/>
            • Built an internal API for organizational use, enabling structured access to internal records and forms.
          </p>
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
