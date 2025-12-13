export default function Home() {
  const projects = [
    {
      title: "Amazon ML Challenge 2025",
      year: "2025",
      description: "Top 10 finish out of 85,000+ participants. Built a production-grade multimodal price prediction system that fuses text descriptions and product images—a problem that most teams treated as separate tasks. The breakthrough was designing a fusion architecture that learns complementary features: text captures semantic details (brand, specifications) while images capture visual cues (condition, style). This approach achieved a 40.8 SMAPE score and earned a Pre-Placement Interview offer for Amazon's Applied Scientist role. The system handles heterogeneous product data at scale, processing thousands of listings with varying image quality and text completeness."
    },
    {
      title: "Viral Reel Generator in 40 Seconds",
      year: "2024 - Present",
      description: "Won Best Use of Technology at the Voice AI Hackathon. Built a complete content creation pipeline that transforms any article into engaging infotainment reels in under a minute—addressing the massive demand for short-form video content. The system uses ElevenLabs for natural voice synthesis and OpenAI for generating dialogue scripts between popular characters, creating content that feels authentic and engaging. Implemented end-to-end in Django with optimized workflows for text ingestion, script generation, audio rendering, and video compilation. The real innovation was making AI-generated voices sound natural and creating character dialogues that maintain narrative coherence while staying under production time constraints."
    },
    {
      title: "Forest Fire Detector",
      year: "2024 - Present",
      description: "Early detection system that could save thousands of acres and lives. Built a production-ready ML pipeline that processes satellite imagery to identify fire risk regions before fires become uncontrollable. The architecture combines Conv2D layers for spatial feature extraction (detecting smoke patterns, heat signatures) with RNNs for temporal pattern recognition—fires develop over time, and the system tracks these sequences to predict escalation. Uses PostgreSQL for efficient storage and retrieval of multi-temporal satellite data. The system processes terabytes of imagery data, enabling fire management teams to respond faster and allocate resources more effectively."
    },
    {
      title: "EdTech Content Generator",
      year: "2024",
      description: "Finalist at CodeEd Hackathon, pitched to Ronnie Screwvala. Built a scalable content generation system that produces educational materials at a fraction of the cost of traditional methods—addressing the critical constraint in EdTech: making quality content affordable at scale. The system generates interactive flashcards, multiple-choice quizzes, and video scripts that platforms like Unacademy can deploy across thousands of courses. The breakthrough was cost optimization through efficient prompt engineering and content structuring, reducing API costs by 70% while maintaining educational quality. This makes personalized, AI-generated content economically viable for mass-market education platforms."
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
          I'm a final-year Dual Degree student at <strong>BITS Pilani</strong>, currently working as an SDE Intern at{' '}
          <strong>Rupeeflo</strong> building NRI wealth management and investment platforms. 
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
