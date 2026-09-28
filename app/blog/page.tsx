export default function Blog() {
  return (
    <main className="flex flex-col px-8 py-24">
      <section className="max-w-xl mb-16">
        <h1>Blog</h1>
      </section>

      <section className="flex flex-col gap-12">
        <article className="flex flex-col gap-2">
          <span>27 Sep 2026</span>
          <h2>Post Title</h2>
          <p>A short excerpt from the blog post goes here.</p>
        </article>
        <article className="flex flex-col gap-2">
          <span>10 Sep 2026</span>
          <h2>Post Title</h2>
          <p>A short excerpt from the blog post goes here.</p>
        </article>
      </section>
    </main>
  );
}