export default function Contact() {
  return (
    <main className="flex flex-col px-8 py-24">
      <section className="max-w-xl mb-16">
        <h1>Contact</h1>
      </section>

      <form className="flex flex-col gap-6 max-w-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" placeholder="Your name" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="your@email.com" />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} placeholder="Your message" />
        </div>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}