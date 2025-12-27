// Blog posts data
export const blogs = [
  {
    slug: '72-hours-amazon-ml-challenge',
    title: 'Mistakes I Made in Two Amazon ML Challenges',
    subtitle: "What I learned so you don't make the same mistakes",
    date: '2025-12-20',
    excerpt: "Hour 68. My hands were shaking from caffeine. The leaderboard kept shifting, ranks slipping by the minute. One submission left. Here are the mistakes I made during those 144 hours and what I learned from them.",
    content: `
      <p>
        Hour 68. My hands were shaking from caffeine. The leaderboard kept shifting, ranks slipping by the minute. One submission left. The model was still training.
      </p>

      <p>
        Wait for it to finish, or play it safe?
      </p>

      <p>
        I've done this twice now. I didn't sleep for three days either time. I made a lot of mistakes along the way, and somehow things worked out. I finished at rank 48 in one competition and rank 10 in the other. I'm saying this because despite all the mistakes I made, things still worked out, which means there's hope even when you mess up.
      </p>

      <p>
        I'm not eligible to compete next year, so I'm writing this for those of you who will. Here are the mistakes I made, hoping you can learn from them.
      </p>

      <p>
        One thing I want to emphasize: The problems Amazon gives are real-world problems that scientists themselves are solving at Amazon. They're actual challenges that matter. That's part of what makes this competition so valuable and so difficult.
      </p>

      <h2>What I Wish I Knew Before Starting</h2>

      <p>
        Before diving into the mistakes, here's what I wish someone had told me:
      </p>

      <ul>
        <li>The competition gets 10,000 to 20,000 teams. Most of them are incredibly talented.</li>
        <li>You're competing against PhD researchers, Master's students with thesis work in the exact domain, and professionals with resources you can't imagine.</li>
        <li>The problems Amazon gives are real-world problems that scientists themselves are solving at Amazon.</li>
        <li>Amazon likes computationally cheap solutions, but that only matters when you finish in top 10. If you're aiming for top 50, use whatever you can to get there.</li>
        <li>Everyone works hard. That's just the baseline.</li>
        <li>Preparation matters more than I thought.</li>
      </ul>

      <p>
        I went in thinking I could just figure it out as I went. That was my first mistake.
      </p>

      <h2>Mistake #1: Not Preparing Resources Beforehand</h2>

      <p>
        During the 2024 ML Challenge, it started with pure chaos. Problem statement drops, we're excited, we start coding right away.
      </p>

      <p>
        Three hours in, we realize we have no GPU access. College lab is fully booked. Our cloud credits are barely enough for testing. We hadn't prepared at all.
      </p>

      <p>
        We spent the next six hours, a quarter of the entire competition, desperately scrambling for compute. Calling professors, begging for access, pooling whatever we could find. It was embarrassing and completely avoidable.
      </p>

      <p>
        By the time we had proper setup, better-prepared teams were already iterations ahead. We were running a marathon that started twenty minutes late, and it was entirely our fault.
      </p>

      <p>
        <strong>What I learned:</strong>
      </p>

      <ul>
        <li>Get your resources before the timer starts</li>
        <li>Talk to professors early</li>
        <li>Use GPUs from Lightning.ai or similar services</li>
        <li>Borrow from labs if possible</li>
        <li>Pool with teammates</li>
        <li>Have everything ready and tested beforehand</li>
      </ul>

      <p>
        When the competition starts, you should be running experiments, not scrambling to set up infrastructure.
      </p>

      <h2>Mistake #2: Thinking Pre-Trained Models Were Cheating</h2>

      <p>
        I used to think using pre-trained models was somehow not "real" machine learning. Like the competition was testing whether I could build transformers from scratch. I was wrong, and it cost me valuable time.
      </p>

      <p>
        You have 72 hours. The problems are intentionally hard. I learned the hard way that you physically can't train large models from zero. You can't code complex architectures, debug them, and make them work in three days. It's just impossible.
      </p>

      <p>
        <strong>What I learned:</strong>
      </p>

      <ul>
        <li>Use Hugging Face and pre-trained models</li>
        <li>Use Vision-Language Models like Qwen</li>
        <li>Use pre-trained embeddings</li>
        <li>Use state-of-the-art tools that already exist</li>
        <li>The top teams all do this</li>
        <li>Your job isn't to prove you can reinvent the wheel</li>
        <li>Your job is to solve the problem using whatever actually works</li>
        <li>Amazon likes computationally cheap solutions, but that only matters if you're aiming for top 10</li>
        <li>If you're trying to finish in top 50, use whatever you can to get there</li>
      </ul>

      <p>
        I wasted time trying to build things from scratch when I should have been understanding the problem deeply and adapting powerful tools to solve it. I also worried too much about computational efficiency when I should have just focused on getting a working solution first.
      </p>

      <h2>Mistake #3: Not Validating Data First</h2>

      <p>
        The 2024 ML Challenge asked for depth predictions from product images. We built a solid pipeline, used good models, validated locally. Everything looked really promising.
      </p>

      <p>
        We submitted. The scores were terrible.
      </p>

      <p>
        We spent twelve hours in panic mode, convinced something was wrong with our models, our training, our architecture. We checked everything. Rebuilt our entire pipeline. Nothing helped. We were looking in the wrong place.
      </p>

      <p>
        Finally, someone actually looked at the data. I mean really looked at it. We should have done this first.
      </p>

      <p>
        Most of the dataset was 2D images. Flat product photos. We were trying to predict depth, which is 3D information, from fundamentally 2D data. The information we needed literally didn't exist. We'd wasted half the competition because we didn't validate the data first.
      </p>

      <p>
        No amount of model sophistication could extract what wasn't there. My mistake was assuming the data could support what we were trying to do.
      </p>

      <p>
        <strong>What I learned:</strong>
      </p>

      <ul>
        <li>Always start with data validation</li>
        <li>Not just checking shapes, but really understanding what information actually exists</li>
        <li>Does this data even support what you're trying to predict?</li>
        <li>Are there fundamental problems?</li>
        <li>Sometimes the data itself is just broken, and no model will fix it</li>
        <li>Catch this early or you'll waste 72 hours learning it the hard way</li>
      </ul>

      <h2>Mistake #4: Almost Quitting When Things Got Hard</h2>

      <p>
        Twenty hours in. You're staring at a massive 5GB dataset. Nothing is working. You're not even in the top 200. Every approach fails. You're completely exhausted.
      </p>

      <p>
        It's so easy to just give up. To submit whatever you have and call it done. I almost did this.
      </p>

      <p>
        But I learned that ranks can jump from 150 to top 50 in the final hours. One insight, one different approach, one breakthrough can change everything. I've seen it happen.
      </p>

      <p>
        In one of my runs, we weren't even in the top 50 until past the halfway point. We kept pushing when others stopped. That run ended up at rank 10, despite how badly things started.
      </p>

      <p>
        In the last hours of the 2024 ML Challenge, we even did some manual fillups that pushed our score a little. It wasn't elegant, but it helped. Sometimes you have to do whatever works.
      </p>

      <p>
        <strong>What I learned:</strong>
      </p>

      <ul>
        <li>When it feels impossible, that's exactly when most teams quit</li>
        <li>That's when you have an opportunity</li>
        <li>Push harder when everyone else stops, even when it feels pointless</li>
        <li>The difference often comes down to who kept pushing</li>
        <li>One insight, one different approach, one breakthrough can change everything</li>
        <li>Don't be afraid to try manual approaches or fillups if they help your score</li>
      </ul>

      <h2>Mistake #5: Wasting Submissions Early</h2>

      <p>
        Early on, I was really careless with submissions. Every small change, every minor tweak, I'd submit it and see what happens. Big mistake.
      </p>

      <p>
        By hour 60, I had almost none left. When I finally had something genuinely good, I couldn't even test variations. I'd burned through my submissions on things that didn't matter.
      </p>

      <p>
        <strong>What I learned:</strong>
      </p>

      <ul>
        <li>Always save at least five submissions for the final hours</li>
        <li>Only submit after significant improvements or completely different strategies</li>
        <li>Validate everything locally first, really extensively</li>
        <li>The leaderboard shifts dramatically in those closing hours</li>
        <li>Ranks slip faster than you think</li>
        <li>You can drop ten places in minutes as everyone brings their best work</li>
        <li>Those final submissions are your flexibility to respond, to iterate one more time, to try that last idea</li>
        <li>Protect them, even when you're curious about a small change</li>
      </ul>

      <h2>Quick Summary</h2>

      <p>
        Here's a quick checklist of things to remember:
      </p>

      <ul>
        <li><strong>Before the competition:</strong> Get your compute resources ready. Talk to professors, set up GPU access, test everything.</li>
        <li><strong>During the competition:</strong> Use pre-trained models. Don't try to build from scratch. Validate your data first. Save submissions for the final hours. Don't worry about computational efficiency unless you're aiming for top 10.</li>
        <li><strong>When things get hard:</strong> Don't quit. Keep pushing. One insight can change everything. Try manual approaches if they help.</li>
      </ul>

      <p>
        It's not one thing. It's everything together. I made mistakes in all of these areas.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        The PPI opportunities are real. The learning is intense. Those 72 hours taught me more about working under pressure, solving hard problems, and pushing past exhaustion than a whole semester of classes.
      </p>

      <p>
        You'll make mistakes. Things will go wrong. Your first attempt might not go how you hope. Mine definitely didn't.
      </p>

      <p>
        That's totally fine. That's how you learn. Every competition teaches you something. I made fewer mistakes the second time, but I still made plenty.
      </p>

      <p>
        When you're at hour 60 with no sleep, when everything feels impossible, when you want to quit, remember that's when most people stop. I almost did too.
      </p>

      <p>
        Use the mistakes I made as a guide. Learn from them so you don't repeat them.
      </p>

      <p>
        Good luck. You've got this.
      </p>

      <p>
        <em>If you want to know the detailed techniques and methodologies we used in both years (though problem statements change a lot between years), I've written about our complete approach in <a href="/blogs/amazon-ml-challenge-methodology">this follow-up post</a>.</em>
      </p>
    `
  },
  {
    slug: 'making-ai-code-agents-more-predictable',
    title: 'Making AI Code Agents More Predictable',
    subtitle: 'A Detailed Architectural View',
    date: '2025-12-13',
    excerpt: 'How VeriGuard and GRASP change the way we think about AI agent safety, not by making agents smarter, but by structuring how they reason.',
    content: `
      <p>
        AI code agents can generate backend services, modify repositories, interact with databases, and orchestrate workflows. 
        But most teams are cautious about giving them real autonomy in production. The question isn't whether the agent can 
        write correct code. It's whether we can control and reason about its behavior at a system level.
      </p>

      <p>
        Two research directions, VeriGuard and GRASP, address this through architectural changes. They don't try to make agents 
        smarter. Instead, they constrain possible behaviors and structure how reasoning happens.
      </p>

      <h2>VeriGuard: Pre-Deployment Policy Validation</h2>

      <p>
        VeriGuard fixes runtime guardrails by adding a policy layer that validates actions before execution. Instead of catching problems 
        after code generation, VeriGuard moves safety checks earlier where they can be verified.
      </p>

      <h3>The Problem: Runtime Guardrails Are Structurally Limited</h3>

      <p>
        Most AI agent systems follow this pattern: user provides a task, LLM plans steps, LLM generates code, runtime guardrails 
        inspect output, and if approved, execute against real systems. The LLM sits at the center making decisions. Guardrails sit 
        at the edges, trying to catch problems after the fact.
      </p>

      <p>
        This creates two problems: <strong>unbounded action space</strong> (the agent can express operations in countless ways. You 
        can't validate all possible behaviors) and <strong>late-stage enforcement</strong> (safety checks happen after generation, 
        trying to veto decisions already made).
      </p>

      <h3>What Runtime Guardrails Can't Do</h3>

      <p>
        Runtime guardrails inspect generated code for forbidden patterns: dangerous function calls like <code>rm -rf</code> or database 
        drops, known vulnerability patterns like SQL injection, or forbidden keywords. This has two limitations:
      </p>

      <p>
        <strong>Surface-Level Inspection:</strong> Guardrails operate on text, not semantics. They can detect obvious violations but 
        miss subtle issues. A guardrail might block <code>os.system()</code> but miss equivalent functionality. Consider:
      </p>

      <pre class="code-block"># This might be blocked
os.system("rm -rf /tmp/data")

# But this equivalent might slip through
subprocess.run(["rm", "-rf", "/tmp/data"])

# Or this indirect approach
import shutil
shutil.rmtree("/tmp/data")</pre>

      <p>
        <strong>Reactive Enforcement:</strong> By the time guardrails inspect output, the agent has already made all decisions. Every 
        possible way of expressing a dangerous operation must be explicitly blocked. Novel attack vectors can bypass detection.
      </p>

      <h3>How VeriGuard Works</h3>

      <p>
        VeriGuard inserts a policy layer between the agent and environment. Instead of executing actions directly, the agent 
        <em>proposes</em> actions. A policy decides if they can proceed. The shift: <strong>Agent → Policy → Environment</strong> 
        instead of <strong>Agent → Environment</strong>.
      </p>

      <p>
        In VeriGuard, the policy is executable code (not a prompt or classifier), parameterized by action arguments, and deterministic. 
        Example:
      </p>

      <pre class="code-block">def policy_check(action_type, action_args):
  if action_type == "database_delete":
    if action_args["database"] == "production":
      return "deny"
  return "allow"</pre>

      <p>
        The policy produces a binary decision: allow or deny.
      </p>

      <h3>The Problem with Policies Before VeriGuard</h3>

      <p>
        Policies existed before VeriGuard. But they were written manually, loosely aligned with agent behavior, enforced at runtime, 
        and assumed to be correct. There was no systematic way to check if a policy actually enforced what you intended across all 
        possible inputs. Policy bugs were common. A policy might block 99% of dangerous operations but miss edge cases.
      </p>

      <h3>What VeriGuard Adds: Pre-Deployment Validation</h3>

      <p>
        VeriGuard's innovation is a <strong>pre-deployment validation phase</strong>. This happens offline, before the agent operates 
        in production. The process: takes high-level safety requirements (e.g., "never delete production databases"), takes the 
        generated policy code, translates requirements into formal constraints, verifies the policy satisfies those constraints for all 
        relevant inputs, and rejects the policy if any violation exists.
      </p>

      <p>
        This answers: <em>Does the policy actually enforce what we think it does?</em> The verification uses formal methods (model 
        checking, theorem proving) that would be too slow for runtime, but since it happens offline, it doesn't affect performance.
      </p>

      <p>
        At runtime, VeriGuard is simple: agent proposes action, extract arguments, execute validated policy function, allow or block. 
        No reasoning, no interpretation. The runtime assumes the policy has already been validated.
      </p>

      <p>
        VeriGuard guarantees the deployed policy satisfies specified constraints and violations are caught before deployment. It assumes 
        arguments are extracted correctly, constraints reflect intent, and the environment behaves as expected.
      </p>

      <h2>GRASP: Structured Security Reasoning</h2>

      <p>
        GRASP tackles a different problem: security practices must be applied in the correct order. Many security failures come from 
        misordered logic, not missing knowledge. GRASP structures security reasoning by externalizing practices into a dependency graph.
      </p>

      <h3>The Problem: Security Depends on Order</h3>

      <p>
        Preventing unsafe actions doesn't automatically produce secure code. Many security failures come from <strong>misordered 
        logic</strong>, not missing knowledge. For example, accessing data before checking authorization:
      </p>

      <pre class="code-block"># Wrong order - security vulnerability
user_data = database.get_user(user_id)  # Data accessed first
if not check_permission(user_id, current_user):  # Check happens after
    raise PermissionError()
return user_data</pre>

      <p>
        Other examples: processing input before validating it, or logging errors before sanitizing them. These failures occur even when 
        the model knows the correct security rules. The problem is ordering, not knowledge.
      </p>

      <h3>Why Ordering Is Hard for LLMs</h3>

      <p>
        LLMs generate code token by token, making local decisions. They don't have a built-in way to enforce long-range ordering 
        constraints. When generating a function, they might create the signature first, then variables, then business logic, then error 
        handling, then security checks. The generation order doesn't reflect execution order. Simply prompting the model to "remember 
        to check authorization before accessing data" doesn't guarantee consistent application.
      </p>

      <h3>How GRASP Works</h3>

      <p>
        GRASP (Guided Refinement of Agent Security Practices) addresses this by restructuring how security practices are applied. Instead 
        of embedding security rules in prompts, GRASP externalizes them into a structured dependency graph.
      </p>

      <p>
        The key insight: security practices have dependencies. Input validation must happen before processing, authorization must happen 
        before data access, sanitization must happen before logging. GRASP captures these dependencies explicitly.
      </p>

      <h3>The Secure Coding Practice Graph</h3>

      <p>
        The SCP graph is a directed acyclic graph (DAG) with nodes representing individual practices (like "validate user input" or 
        "check authorization") and edges representing prerequisites. If practice A has an edge to practice B, practice A must be applied 
        before practice B. The graph is curated from established guidelines (OWASP Top 10, CERT Secure Coding Standards) and reviewed 
        by security experts.
      </p>

      <h3>The GRASP Refinement Process</h3>

      <p>
        <strong>Step 1: Initial Generation</strong>. The LLM generates a functional solution without security refinements. This separates 
        functional correctness from security.
      </p>

      <p>
        <strong>Step 2: Dependency-Guided Refinement</strong>. The system traverses the SCP graph in topological order. For each practice, 
        it assesses relevance, applies it as a surgical code edit if relevant (inserting validation before processing, adding authorization 
        before data access), or skips if irrelevant. The traversal order ensures prerequisites are handled first.
      </p>

      <p>
        <strong>Step 3: Functional Re-Validation</strong>. After applying security refinements, check that the code still functions correctly. 
        This might involve running unit tests or static analysis. If validation fails, the system can roll back changes or try alternatives.
      </p>

      <h3>What GRASP Improves</h3>

      <p>
        GRASP provides consistency in security application (same practices in same order across tasks), robustness across longer tasks 
        (maintains consistency across multiple functions), and generalization to unseen patterns (can handle novel vulnerability types). 
        GRASP doesn't guarantee vulnerability-free code, enforce security at runtime, or replace static analysis. Its contribution is 
        structuring the reasoning process.
      </p>

      <h2>How They Work Together</h2>

      <p>
        VeriGuard and GRASP address different concerns at different layers of the system. VeriGuard controls what actions the agent 
        can take, while GRASP ensures the code implementing those actions follows security best practices. When combined, they provide 
        defense in depth: multiple layers of protection that address different failure modes.
      </p>

      <h3>Combined Architecture</h3>

      <p>
        A system using both VeriGuard and GRASP would flow through these stages:
      </p>

      <div class="architecture-flow">
        <div class="flow-step">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <strong>User Task Input</strong>
            <p>The user provides a high-level task description</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <strong>Planning Phase</strong>
            <p>LLM breaks down the task into concrete steps</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <strong>Initial Code Generation</strong>
            <p>LLM generates a functional solution without security refinements</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">4</div>
          <div class="flow-content">
            <strong>GRASP Refinement</strong>
            <p>Security practices are applied in dependency order</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">5</div>
          <div class="flow-content">
            <strong>Functional Re-Validation</strong>
            <p>System ensures the code still works correctly after security changes</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">6</div>
          <div class="flow-content">
            <strong>Action Proposal</strong>
            <p>Agent proposes to execute the refined code</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">7</div>
          <div class="flow-content">
            <strong>VeriGuard Policy Check</strong>
            <p>Policy validates the proposed action against safety constraints</p>
          </div>
        </div>
        <div class="flow-step">
          <div class="flow-number">8</div>
          <div class="flow-content">
            <strong>Execution</strong>
            <p>If approved, execute against external systems</p>
          </div>
        </div>
      </div>

      <p>
        VeriGuard ensures only safe actions can be proposed. GRASP ensures the code implementing those actions follows security best 
        practices. Together, they provide defense in depth: multiple layers of protection that address different failure modes.
      </p>

      <h3>Why This Architectural Shift Matters</h3>

      <p>
        The fundamental change is a shift from <strong>runtime decision-making</strong> to <strong>pre-deployment validation</strong>. 
        This matters because runtime failures are expensive (consequences are immediate and costly), pre-deployment failures are manageable 
        (can be analyzed and fixed methodically), verification is possible (can use expensive techniques like model checking), and 
        predictability improves (you can reason about what the agent will and won't do).
      </p>

      <h3>What Remains Unsolved</h3>

      <p>
        Challenges remain: incomplete policies (can only enforce explicitly specified restrictions), incomplete dependency graphs 
        (GRASP's effectiveness depends on graph quality), model limitations (models can still generate flawed logic), and specification 
        challenges (both systems require humans to specify what should be enforced). These approaches reduce risk significantly, but 
        they don't eliminate it.
      </p>

      <h3>Closing Thoughts</h3>

      <p>
        VeriGuard and GRASP improve structure in how AI agents are architected. By defining clear boundaries and moving complex reasoning 
        to phases where it can be verified, these systems transform AI code agents from experimental tools into production-ready systems. 
        Making agents predictable, controllable, and verifiable is what enables real-world deployment.
      </p>

      <h3>References</h3>

      <p>
        <strong>VeriGuard:</strong> Miculicich, L., Parmar, M., Palangi, H., Dvijotham, K. D., Montanari, M., Pfister, T., & Le, L. T. (2025). 
        VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation. <em>arXiv preprint arXiv:2510.05156</em>.
        <a href="https://arxiv.org/abs/2510.05156" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2510.05156</a>
      </p>

      <p>
        <strong>GRASP:</strong> Patir, R., Guo, K., Cai, H., & Hu, H. (2025). Fortifying LLM-Based Code Generation with Graph-Based Reasoning 
        on Secure Coding Practices. <em>arXiv preprint arXiv:2510.09682</em>.
        <a href="https://arxiv.org/abs/2510.09682" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2510.09682</a>
      </p>
    `
  },
  {
    slug: 'amazon-ml-challenge-methodology',
    title: 'How We Built Our Solutions: Amazon ML Challenge 2024 & 2025',
    subtitle: 'Detailed methodology and why we made each choice',
    date: '2025-12-20',
    excerpt: 'A deep dive into the technical approaches we used in both competitions, from image preprocessing to multimodal embeddings to ensemble methods. Here\'s what worked and why.',
    content: `
      <p>
        Problem statements change a lot between years, but the underlying techniques and thought processes can still be useful. I'm sharing our detailed methodology for both the 2024 and 2025 Amazon ML Challenges, including why we made each choice.
      </p>

      <p>
        This isn't a recipe you can copy directly. Next year's problem will be different. But understanding the reasoning behind each step might help you think through your own approach.
      </p>

      <h2>2024 Challenge: Attribute Extraction from Images</h2>

      <p>
        <strong>The problem in one line:</strong> Extract structured numeric attributes (weight, height, depth, width, volume, wattage) from messy product images containing text.
      </p>

      <h3>1. Downloading and Organizing Images</h3>

      <p>
        <strong>What we did:</strong> Downloaded all product images from provided URLs using Python scripts, then partitioned them into batches of 2,500 images grouped by entity_name (weight, volume, etc.).
      </p>

      <p>
        <strong>Why:</strong> This ensures offline, repeatable experiments instead of repeatedly relying on network calls, which reduces latency variance and API failures during a tight 3-day hackathon. Grouping by entity_name lets you specialize debugging and error analysis per attribute, instead of mixing everything and losing signal about where the model is failing.
      </p>

      <h3>2. Splitting into Batches of 2,500</h3>

      <p>
        <strong>What we did:</strong> Divided the dataset into fixed-size chunks using PowerShell.
      </p>

      <p>
        <strong>Why:</strong> Prevents GPU OOM errors by putting a hard upper bound on memory usage per run, which is critical on shared 48 GB GPUs. Smaller batches make failures localized and recoverable. If one batch crashes, only that segment needs reprocessing instead of the entire dataset.
      </p>

      <h3>3. Converting Images to Grayscale</h3>

      <p>
        <strong>What we did:</strong> Converted all images to grayscale before OCR.
      </p>

      <p>
        <strong>Why:</strong> OCR models primarily rely on intensity contrast, not color. Removing color channels strips away irrelevant variation and boosts text legibility, especially for noisy or colored backgrounds. It also reduces each image from 3 channels to 1, cutting memory and bandwidth for every forward pass while slightly regularizing the input space, which is ideal under constrained compute.
      </p>

      <h3>4. Compressing Images Below 50 KB</h3>

      <p>
        <strong>What we did:</strong> Aggressive image compression to stay under size limits.
      </p>

      <p>
        <strong>Why:</strong> Direct linear impact on VRAM usage and I/O speed. Smaller images mean faster disk reads, quicker uploads to the GPU, and more samples per batch. This allows using a relatively capable vision-language model within the fixed GPU budget, instead of being forced to downgrade the model due to bloated input size.
      </p>

      <h3>5. Choosing Qwen2-VL-2B-Instruct</h3>

      <p>
        <strong>What we did:</strong> Used a 2B-parameter vision-language model for OCR-like attribute extraction.
      </p>

      <p>
        <strong>Why:</strong> Hits the sweet spot between accuracy and memory footprint. It's small enough to fit with large batches, but powerful enough to read and interpret text in product images. Vision-language models natively understand layout + text, which is exactly what you need when attributes are embedded in labels, spec tables, and packaging rather than plain text.
      </p>

      <h3>6. Batch-Wise Scripts and Parallel Processing</h3>

      <p>
        <strong>What we did:</strong> Scripts to process each batch of 2,500, using parallelism where safe.
      </p>

      <p>
        <strong>Why:</strong> Enforces a clean "unit of work" abstraction, making it easier to resume, log, and debug specific subsets when issues occur. Parallel processing inside each batch maximizes GPU utilization without crossing memory thresholds, improving overall throughput during the short hackathon window.
      </p>

      <h3>7. Cleaning and Standardizing Outputs</h3>

      <p>
        <strong>What we did:</strong> Normalized units, fixed grammar, removed extraneous characters, matched constants.py formats.
      </p>

      <p>
        <strong>Why:</strong> Automatic evaluators are strict. A numerically correct value in the wrong unit or with noisy suffixes ("kg.", "kgs", "approx") will be graded as wrong. Standardization to canonical forms (e.g., "5 centimetre") converts a fuzzy generative output into a consistent, machine-readable submission format and reduces post-processing bugs.
      </p>

      <h3>8. Sanity Checks and Multi-Submission Strategy</h3>

      <p>
        <strong>What we did:</strong> Ran sanity checks and used up to 15 submissions to validate behavior on the leaderboard.
      </p>

      <p>
        <strong>Why:</strong> Leaderboard feedback becomes an external validation signal, catching hidden edge cases that are missing from a small local validation set. Systematically probing with multiple submissions helps understand which entity_values are inherently easier (weight, wattage) versus harder (depth), guiding where to invest further engineering and feature design effort.
      </p>

      <h2>2025 Challenge: Product Price Prediction</h2>

      <p>
        <strong>The problem in one line:</strong> Predict product prices accurately from images + catalog text under skewed price distributions and multimodal noise.
      </p>

      <p>
        Our solution employed a three-stage pipeline: Hybrid Feature Architecture, Optimized Deep Learning Model, and Robust Training & Ensembling.
      </p>

      <h3>Stage 1: Hybrid Feature Architecture</h3>

      <h4>Stream 1: Deep Contextual Embeddings (VLM)</h4>

      <p>
        <strong>What we did:</strong> Selected Qwen2.5-VL-3B-Instruct model, generating a single, dense 4000+-dimensional embedding vector by analyzing full product images and associated text descriptions.
      </p>

      <p>
        <strong>Why:</strong> Encodes visual quality, aesthetics, and context (e.g., premium packaging) together with textual specs, which directly influence perceived value and therefore price. Instruction-tuned model aligns well with downstream supervised regression tasks and fits within the 8B parameter cap, delivering rich features without violating deployment constraints.
      </p>

      <h4>Stream 2: Explicit Domain Features (Handcrafted)</h4>

      <p>
        <strong>What we did:</strong> Engineered 18-30 high-signal features including brand extraction via regex, quantity & size (IPQ, weight, volume), and text statistics (word count, bullet point count, etc.).
      </p>

      <p>
        <strong>Why:</strong> Some signals are explicit and easily interpretable (brand tier, pack size, units per pack) and often correlate non-linearly with price. Encoding them directly reduces the burden on the VLM to "discover" them from scratch. Handcrafted features act as anchors. When embeddings are noisy or overfit to visual styles, explicit numeric or categorical features stabilize the model and improve generalization on tail products.
      </p>

      <p>
        <strong>Brand extraction via regex:</strong> Brand is one of the strongest price drivers. Two nearly identical products can differ heavily in price solely by brand perception. Regex-based extraction gives a clean, categorical feature that avoids relying on the VLM to always infer brand from low-resolution logos or cluttered titles.
      </p>

      <p>
        <strong>Quantity & size features:</strong> Price is often determined by unit economics. Customers compare price per kg, per litre, or per unit. Modeling these quantities lets the regressor understand bulk discounts and pack-size pricing. It prevents the model from memorizing that "big images" or "busy packaging" mean "expensive". Instead, it grounds predictions in measurable, physical attributes.
      </p>

      <p>
        <strong>Text statistics:</strong> Long, structured, bullet-rich descriptions are more common for premium or carefully marketed products, so description complexity becomes a useful proxy for price tier. These features offer a simple, robust signal that complements semantic embeddings. Even if embeddings slightly misinterpret content, the structural statistics still carry predictive power.
      </p>

      <h3>Stage 2: Optimized Deep Learning Model</h3>

      <h4>MLP Regressor Architecture</h4>

      <p>
        <strong>What we did:</strong> Implemented Multi-Layer Perceptron with hidden layers, residual connections, LayerNorm, and Huber loss.
      </p>

      <p>
        <strong>Why MLP instead of Transformer:</strong> Inputs are already rich, fixed-size embeddings. Adding another heavy Transformer would be over-parameterized and more prone to overfitting under limited data. An MLP is parameter-efficient and ideal for tabular + embedding fusion. Residuals and LayerNorm stabilize gradients across large hidden sizes, enabling deeper networks without training collapse.
      </p>

      <p>
        <strong>Why Huber loss on log-transformed prices:</strong> Price distributions are heavily skewed with extreme outliers. Log transform compresses the range so very expensive products do not dominate the loss. Huber is robust to errors on outliers compared to MSE, so the model learns a more balanced fit across low-, mid-, and high-priced products instead of chasing a few extreme values.
      </p>

      <h4>Regularization Techniques</h4>

      <p>
        <strong>What we did:</strong> Employed Dropout, Weight Decay, Gradient Clipping, and Early Stopping.
      </p>

      <p>
        <strong>Why:</strong> Dropout and weight decay combat overfitting on a finite dataset with very high-dimensional inputs, particularly the 4000+-dim embeddings. Gradient clipping prevents rare but harmful gradient spikes, stabilizing training with AdamW. Early stopping stops training as soon as validation improvements plateau, improving generalization and saving compute.
      </p>

      <h4>AdamW + Cosine Warmup Scheduler</h4>

      <p>
        <strong>What we did:</strong> Used AdamW optimizer and cosine learning-rate schedule with warmup.
      </p>

      <p>
        <strong>Why:</strong> AdamW decouples weight decay from gradient updates, giving more reliable convergence in deep nets with embeddings. Warmup reduces the risk of destroying good pre-trained representation in the first few steps. Cosine decay then allows fine-grained late-stage refinement instead of oscillating around minima.
      </p>

      <h3>Stage 3: Robust Training & Ensembling</h3>

      <h4>5-Fold Cross-Validation</h4>

      <p>
        <strong>What we did:</strong> Trained models on 5 folds and validated on held-out splits.
      </p>

      <p>
        <strong>Why:</strong> Provides a more stable estimate of true performance than a single train/val split, especially when product categories and price ranges are diverse. Ensures each product appears in validation exactly once, reducing the chance that a lucky or unlucky split misleads model selection.
      </p>

      <h4>Ensembling + Mean Averaging + EMA</h4>

      <p>
        <strong>What we did:</strong> Averaged predictions from folds and used EMA for parameter smoothing.
      </p>

      <p>
        <strong>Why:</strong> Different folds learn slightly different decision boundaries. Averaging them reduces variance and improves robustness to overfitting on any particular data slice. EMA effectively acts like a temporal ensemble of the last few checkpoints, smoothing over noisy late-training updates and giving more stable predictions.
      </p>

      <h3>Performance Progression</h3>

      <p>
        We achieved progressive improvements measured by SMAPE (Symmetric Mean Absolute Percentage Error):
      </p>

      <ul>
        <li>Baseline Model + Dropout: Simple MLP Regressor with handcrafted features achieved 58-50 score</li>
        <li>Adding VLM Embeddings: Improved to ~45.4 SMAPE</li>
        <li>Training Together (Handcrafted + VLM): Further improved to ~43.1% SMAPE</li>
        <li>Advanced Training (Ensembling + EMA): Reached ~42.3% SMAPE</li>
        <li>Further Training (AdamW + Cosine Warmup + Huber Loss): Final score of ~40.9% SMAPE</li>
      </ul>

      <p>
        Each step targeted a specific weakness: adding VLM embeddings tackled missing visual/text context, hybrid training combined implicit and explicit signals, and ensembling, EMA, and better optimization reduced variance and improved generalization.
      </p>

      <h3>Key Learnings</h3>

      <ul>
        <li><strong>VLM Embeddings Impact:</strong> Multimodal embeddings captured both visual product quality cues and textual specifications, enabling understanding of complex product-pricing relationships that text-only approaches miss.</li>
        <li><strong>Synergistic Features:</strong> Handcrafted features provided significant SMAPE improvement over using VLM embeddings alone, proving explicit domain knowledge is a powerful complement to deep learning.</li>
        <li><strong>Compound Robustness:</strong> Advanced training methods like EMA and Ensembling provided consistent, additive gains crucial for achieving top-tier scores.</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
        Both challenges taught us that solving real-world ML problems isn't just about picking the right model. It's about understanding constraints, making trade-offs, and iterating quickly. The 2024 challenge showed us the importance of data validation and efficient preprocessing. The 2025 challenge showed us how combining different types of features can unlock performance that neither approach achieves alone.
      </p>

      <p>
        The progression from baseline to final score wasn't linear. Each improvement came from identifying a specific weakness and addressing it systematically. Sometimes that meant adding new features. Sometimes it meant changing how we trained. Sometimes it meant combining multiple approaches.
      </p>

      <p>
        Most importantly, these competitions reinforced that there's no single "right" way to solve these problems. What matters is understanding why you're making each choice and being willing to iterate when something doesn't work.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        These approaches worked for us, but next year's problem will be different. The key isn't memorizing these exact steps. It's understanding the reasoning behind each choice. When you face a new problem, ask yourself: What are the constraints? What signals matter? How can you combine different approaches? What can you validate early?
      </p>

      <p>
        The techniques will change, but the thought process of breaking down problems, understanding constraints, and iteratively improving remains the same.
      </p>
    `
  }
]

// Helper to get blog by slug
export function getBlogBySlug(slug) {
  return blogs.find(blog => blog.slug === slug)
}

// Helper to get all blogs (sorted by date, newest first)
export function getAllBlogs() {
  return [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))
}






