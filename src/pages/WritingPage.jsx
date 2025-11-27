export default function WritingPage() {
  const poem = `Someone still laughs in the language you gave,
a phrase, a pun, a moment you saved.
Your voice, though silent, is stitched in their smile,
like a secret sunrise that stays for a while.

You're the hand in their habit, the light in their lens,
the calm in the chaos, the softest of bends.
They quote you in choices, not knowing it's so—
your wisdom now waters the places they grow.

A melody lingers you once let them hear,
still played when the night is too quiet to bear.
You showed them a love that required no claim,
yet warmed them so deeply, they're never the same.

Though time tries to tuck all the moments away,
you rise in the small things they do every day.
Like a whisper that weaves through the threads of their soul,
you've become part of them—gentle and whole.

Not every thank you arrives in a word,
but in changed hearts and courage once stirred.
You may feel forgotten, a shadow passed through,
but someone, somewhere, is still shaped by you.`

  return (
    <main className="container">
      <section className="writing-intro">
        <h1>Writing</h1>
        <p className="intro-text">
          I write poetry and essays for the Hindi Press Club and Poetry Club at BITS Pilani.
          Writing about technology, philosophy, the human experience. How we influence each other,
          how systems shape behavior, how meaning compresses.
        </p>
      </section>

      <div className="divider" />

      <article className="poem-article">
        <h2>Shaped By You</h2>
        <div className="poem-content">{poem}</div>
        <div className="poem-reflection">
          <p>
            This is about influence and legacy. How we shape people without knowing it. The systems we build,
            the words we write, the way we solve problems—they all become part of how other people think and work,
            long after we've moved on.
          </p>
          <p>
            It's the same with software. You build something, ship it, forget about it. But somewhere,
            someone's workflow changed because of what you made. That's the interesting part.
          </p>
        </div>
      </article>
    </main>
  )
}
