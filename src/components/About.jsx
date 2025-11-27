export default function About() {
  const stats = [
    { value: "Top 10", label: "Amazon ML Challenge '25" },
    { value: "84K+", label: "Participants" },
    { value: "3", label: "Hackathon Wins" },
    { value: "40.8", label: "SMAPE Score" }
  ]

  return (
    <section id="about">
      <h2>Exploring. Building.</h2>
      <div className="about-text">
        <p>
          I'm a machine learning engineer and writer from BITS Pilani, currently working at{' '}
          <span className="highlight">Rupeeflo</span> building NRI investment platforms and
          researching at <span className="highlight">UNSW Sydney</span>.
        </p>
        <p>
          My approach to engineering is rooted in <span className="highlight">rapid experimentation</span>{' '}
          and <span className="highlight">relentless iteration</span>. I love the intensity of
          hackathons—building working systems in 36 hours, testing ideas under pressure, and seeing if
          they hold up. This year, I placed <span className="highlight">Top 10 in Amazon ML Challenge</span>{' '}
          out of 84,000+ participants and won the Voice AI Hackathon for building ReelsFast, an
          AI-powered video generation system.
        </p>
        <p>
          I'm drawn to problems where AI meets real-world constraints—fintech systems, educational
          technology, content generation. Taking complex models and making them work in production with
          real limits: cost, latency, scale. That's where it gets interesting.
        </p>
        <p>
          Beyond code, I write poetry and essays for the <span className="highlight">Hindi Press Club</span>.
          I believe diverse interests make better builders. Poetry teaches you to see patterns in unexpected
          places, to compress meaning, to iterate on expression. It's not separate from engineering—it's
          another way of solving problems.
        </p>
      </div>

      <div className="stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
