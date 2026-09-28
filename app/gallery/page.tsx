import Image from "next/image";

export default function Gallery() {
  return (
    <main className="flex flex-col px-8 py-24">
      <section className="max-w-xl mb-16">
        <h1>Gallery</h1>
      </section>

      <section className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <figure className="break-inside-avoid">
          <Image src="/placeholder.jpg" alt="Image description" width={800} height={600} />
          <figcaption>Caption here</figcaption>
        </figure>
        <figure className="break-inside-avoid">
          <Image src="/placeholder.jpg" alt="Image description" width={800} height={600} />
          <figcaption>Caption here</figcaption>
        </figure>
      </section>
    </main>
  );
}