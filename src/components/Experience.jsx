export default function Experience() {
  const experiences = [
    {
      date: "Jun 2025 - Present",
      title: "SDE Intern",
      company: "Rupeeflo - NRI Banking & Wealth Platform",
      description: "Building scalable backend solutions for NRI investment in Indian stocks. Working on wealth management systems and banking services architecture."
    },
    {
      date: "Nov 2024 - Jun 2025",
      title: "Research Intern",
      company: "UNSW Sydney",
      description: "Conducting research in machine learning, focusing on advanced model architectures and optimization techniques."
    },
    {
      date: "Feb 2025 - Jun 2025",
      title: "SDE Intern (Founding Team)",
      company: "Bachatt",
      description: "Part of founding technical team. Built fintech API integrations, identity frameworks, and webhook implementations using Spring Boot. Learned how different financial institutions operate and various identity frameworks work in practice."
    },
    {
      date: "Jan 2023 - Dec 2023",
      title: "Research Intern",
      company: "Dübverse",
      description: "Worked on AI-powered dubbing solutions, exploring voice synthesis and language models for multilingual content creation."
    },
    {
      date: "Dec 2021 - Present",
      title: "Writer",
      company: "Hindi Press Club",
      description: "Contributing writer covering technology, innovation, and current affairs in Hindi. Member of Poetry Club at BITS Pilani."
    }
  ]

  return (
    <section id="experience">
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-date">{exp.date}</div>
          <div className="timeline-title">{exp.title}</div>
          <div className="timeline-company">{exp.company}</div>
          <p className="timeline-desc">{exp.description}</p>
        </div>
      ))}
    </section>
  )
}
