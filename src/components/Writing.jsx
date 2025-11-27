export default function Writing() {
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
    <section id="writing">
      <h2>Writing</h2>
      <p className="about-text">
        I write poetry and essays about technology, philosophy, and the human experience.
        Member of Poetry Club at BITS Pilani and contributing writer at Hindi Press Club.
      </p>

      <div className="writing-sample">
        <h3>Shaped By You</h3>
        <div className="poem">{poem}</div>
      </div>

      <p className="about-text">
        This exploration of influence and legacy reflects how I think about building software too—creating
        systems that quietly shape how people work, think, and solve problems long after we've moved on.
      </p>
    </section>
  )
}
