export default function Projects() {
  return (
    <main className="flex flex-col px-8 py-24">
      <section className="max-w-xl mb-16">
        <h1>Projects</h1>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article className="flex flex-col gap-4">
          <h2>Project Title</h2>
          <p>Brief description of what this project does.</p>
          <span>TypeScript · Next.js</span>
        </article>
        <article className="flex flex-col gap-4">
          <h2>Project Title</h2>
          <p>Brief description of what this project does.</p>
          <span>React · Node.js</span>
        </article>
        <article className="flex flex-col gap-4">
          <h2>Project Title</h2>
          <p>Brief description of what this project does.</p>
          <span>Python · FastAPI</span>
        </article>
      </section>
    </main>
  );
}