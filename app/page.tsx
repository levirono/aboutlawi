export default function Home() {
  return (
    <main className="flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <section className="flex flex-col justify-center min-h-screen px-8">
        <span className="text-6xl font-semibold uppercase tracking-wider">Available for work</span>
        <h1 className="text-4xl font-bold mt-4">John Doe</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mt-2">Software Developer</h2>
      </section>
      <section className="px-8 py-24"></section>
        <h3>About Me</h3>
        <p className="mt-4 max-w-2xl">
          I am a software developer based in Nairobi. I specialize in building web applications using modern technologies like React, Next.js, and Node.js. I have a passion for creating efficient and scalable solutions that solve real-world problems.
        </p>

      <section className="px-8 py-24">
        <h3>Selected Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <article>
            <h4>Project One</h4>
            <p>Short description of the project.</p>
          </article>
          <article>
            <h4>Project Two</h4>
            <p>Short description of the project.</p>
          </article>
        </div>
      </section>
    </main>
  );
}