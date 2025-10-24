import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <div className="card mx-auto mt-32 max-w-xl">
        <header>
          <h2>Advanced Studies in Pre-Modern Bureaucratic Filing Systems</h2>
          <p>
            A comprehensive examination of organizational methodologies in 14th-century Flemish
            municipal record-keeping
          </p>
        </header>
        <section className="text-sm">
          <p>
            This interdisciplinary course explores the taxonomical frameworks and archival protocols
            employed by minor administrative offices in the Low Countries during the late medieval
            period, with particular emphasis on the standardization of document marginalia and the
            chronological sequencing of trivial correspondence.
          </p>
          <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
            <li>Typological analysis of ink deterioration patterns in triplicate ledger entries</li>
            <li>
              Comparative methodologies for dating unstamped memoranda through watermark analysis
            </li>
            <li>
              The socio-economic implications of alphabetical versus chronological filing
              conventions in provincial tax records
            </li>
          </ol>
        </section>
        <footer className="flex items-center">
          <Link href="/login" className="text-blue-800 hover:underline">
            Log in to read more
          </Link>
        </footer>
      </div>
    </>
  )
}
