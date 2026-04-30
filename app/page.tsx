import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white tracking-tight">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">

        <h1 className="text-5xl font-bold tracking-tight">
          Connect Brands with Top Creators
        </h1>

        <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
          A modern creator marketplace where brands discover talent and
          creators grow their audience, all in one place.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/browse"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Explore Creators
          </Link>

          <Link
            href="/join"
            className="px-6 py-3 border rounded-xl hover:bg-gray-50 transition"
          >
            Join as Creator
          </Link>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-2">Discover Talent</h3>
          <p className="text-gray-500 text-sm">
            Browse curated creators across music, tech, fitness, comedy and more.
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-2">Follow & Track</h3>
          <p className="text-gray-500 text-sm">
            Save creators you like and track their activity in one place.
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-2">Grow Together</h3>
          <p className="text-gray-500 text-sm">
            Build partnerships between brands and creators effortlessly.
          </p>
        </div>

      </section>

    </main>
  );
}