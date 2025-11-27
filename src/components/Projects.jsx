export default function Projects() {
  const projects = [
    {
      title: "Amazon ML Challenge 2025",
      tag: "Top 10",
      meta: "Multimodal Pricing Prediction System",
      description: `Built a Vision Language Model-based system to predict product pricing using text and image data.
        Achieved 40.8 SMAPE score through VLM embeddings, custom MLP regressor with cosine warmup scheduler
        and AdamW optimizer. Ranked #12 on live leaderboard, secured Top 10 in finals out of 84,000+ participants.
        Received PPI offer for Applied Scientist role at Amazon. The breakthrough came from treating it as a
        multimodal fusion problem rather than separate text/image streams.`
    },
    {
      title: "ReelsFast",
      tag: "Winner",
      meta: "AI-Powered Instagram Reel Producer",
      description: `Won "Best Use of Technology" at Voice AI Hackathon. Built end-to-end system that transforms articles
        into production-quality video content in 60 seconds. Developed fine-tuned voice models with perfect
        speaker matching and optimized video generation pipeline. Achieved quality comparable to top creators
        like FullstackRaju. The challenge was building this in 36 hours while competing against startups with
        near-production products.`
    },
    {
      title: "EdTech Content Pipeline",
      tag: "Finalist",
      meta: "Short-Form Educational Content Generator",
      description: `Finalist at CodeEd Hackathon, pitched to Ronnie Screwvala and Mayank Kumar. Built pipeline that
        generates 50-second educational videos in under 1 minute at ₹8/clip. The real problem was cost
        optimization—making it economically viable for platforms like Unacademy and PhysicsWallah. Currently
        working on reducing cost to ₹5/clip through computational efficiency improvements and better
        resource allocation.`
    },
    {
      title: "AmEx Decision Science Track",
      tag: "Rank 38 All-India",
      meta: "Offer Click Prediction System",
      description: `Predicted customer offer clicks using behavioral data. Engineered 486+ features including rolling
        engagement windows, k-means clustering, and advanced target encoding via GroupKFold. Built ensemble
        of LightGBM, CatBoost, XGBoost with stacked logistic regression, achieving 0.538 MAP@7 score.
        The breakthrough came after being stuck at 0.431 for two weeks—shifted focus from model tuning to
        deep feature engineering.`
    }
  ]

  return (
    <section id="projects">
      <h2>Selected Work</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-tag">{project.tag}</span>
          </div>
          <p className="project-meta">{project.meta}</p>
          <p className="project-description">{project.description}</p>
        </div>
      ))}
    </section>
  )
}
