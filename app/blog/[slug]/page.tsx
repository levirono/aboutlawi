export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex flex-col px-8 py-24">
      <header className="max-w-2xl mb-16">
        <span>27 Sep 2026</span>
        <h1>Post Title</h1>
      </header>

      <article className="max-w-2xl flex flex-col gap-6">
        <p>First paragraph of the post. Replace this with your content.</p>
        <p>Second paragraph of the post. Replace this with your content.</p>
      </article>
    </main>
  );
}
