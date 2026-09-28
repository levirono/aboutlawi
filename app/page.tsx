import Image from "next/image";

const fadeMask =
  "linear-gradient(to right, transparent, black 20%, black 80%, transparent), " +
  "linear-gradient(to bottom, transparent, black 15%, black 45%, transparent 95%)";

const projects = [
  {
    name: "Project One",
    description: "Short description of the project and what it does.",
    image: "/projects/sw1.jpg",
    logo: "/logos/company-one.png", // optional
    href: "#",
  },
  {
    name: "Project Two",
    description: "Short description of the project and what it does.",
    image: "/projects/sw2.jpg",
    // no logo: the top-left simply stays empty
    href: "#",
  },
];


export default function Home() {
  return (
    <main className="flex flex-col bg-white text-black dark:bg-black dark:text-white">
      {/* Hero */}
      <section className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden px-8 pb-16 sm:pb-24">
        {/* Background image, faded on all sides */}
        <div
          className="absolute inset-0 -z-10 mx-auto max-w-6xl"
          style={{
            maskImage: fadeMask,
            WebkitMaskImage: fadeMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="/hero.jpeg"
            alt="Lawi"
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Hero text, bottom aligned */}
        <div className="relative">
          <span className="text-3xl font-semibold uppercase tracking-wider sm:text-5xl md:text-6xl">
            Lawi cheruiyot
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Software Developer</h1>
          <h2 className="mt-2 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            Based in Nairobi
          </h2>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
  <button className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-gray-200 dark:text-black">
    Let's Connect
  </button>
  <button className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-gray-200 dark:text-black">
    View My Work
  </button>
</div>
      </section>

      {/* Welcome */}
      <section className="px-8 py-24">
        <h1 className="text-3xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 max-w-2xl">
          This is a simple portfolio website built with Next.js and Tailwind CSS.
          It showcases my skills, projects, and experience as a software
          developer.
        </p>
        
      </section>

      {/* About */}
      <section className="px-8 py-24">
        <h1 className="mt-4 text-3xl font-bold">About Me</h1>
        <p className="mt-4 max-w-2xl">
          I am a software developer based in Nairobi. I specialize in building
          web applications using modern technologies like React, Next.js, and
          Node.js. I have a passion for creating efficient and scalable
          solutions that solve real-world problems.
        </p>
        
        <button className="mt-6 rounded bg-gray-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-gray-200 dark:text-black">
          Learn More
        </button>
      </section>

      {/* Projects */}
      <section className="px-8 py-24">
        <h1 className="mt-4 text-3xl font-bold">Selected Projects</h1>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
            >
              {/* Layer 1: project image */}
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Layer 2: gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Logo, top left (only if present) */}
              {project.logo && (
                <div className="absolute left-4 top-4 flex h-10 items-center rounded-md bg-white/90 px-2 sm:h-12">
                  <Image
                    src={project.logo}
                    alt=""
                    width={96}
                    height={48}
                    className="h-full w-auto object-contain py-1.5"
                  />
                </div>
              )}

              {/* Name + description, bottom left */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <h3 className="text-xl font-bold sm:text-2xl">{project.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/80 sm:text-base">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
          
      </section>
    </main>
  );
}