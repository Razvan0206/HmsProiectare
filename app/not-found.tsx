import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-3xl">
        <span className="rule" aria-hidden />
        <h1 className="display mt-6 text-5xl">Pagina nu există</h1>
        <p className="mt-6 text-muted">Linkul este greșit sau pagina a fost mutată.</p>
        <Link href="/" className="btn btn-ink mt-8">
          Înapoi la prima pagină
        </Link>
      </div>
    </section>
  );
}
