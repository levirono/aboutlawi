export default function About() {
  return (
    <main className="flex flex-col px-8 py-24">
      <section className="max-w-2xl">
        <h1>About Me</h1>
        <p>I am a software developer based in Nairobi.</p>
      </section>

      <section className="mt-16">
        <h2>Skills</h2>
        <ul className="flex flex-wrap gap-4 mt-4">
          <li>TypeScript</li>
          <li>React</li>
          <li>Next.js</li>
          <li>Node.js</li>
        </ul>
      </section>

      <section className="mt-16 flex flex-col gap-8">
        <h2>Experience</h2>
        <div>
          <h3>Company Name — Role</h3>
          <span>2022 – Present</span>
        </div>
        <div>
          <h3>Company Name — Role</h3>
          <span>2020 – 2022</span>
        </div>
      </section>
    </main>
  );
}