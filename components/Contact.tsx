import { site } from "@/content/site";

export function Contact() {
  const c = site.contact;
  const row = "row reveal grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6";
  return (
    <section id="contact" className="tone-brand px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <span className="rule bg-ink" aria-hidden />
          <h2 className="display mt-6 text-[clamp(1.875rem,4.2vw,3.5rem)]">{c.title}</h2>
          <p className="mt-6 max-w-[44ch] text-lg">{c.text}</p>
          <a href={site.phoneHref} className="phone display mt-8 inline-block py-2 text-[clamp(2.25rem,7vw,5.5rem)]">
            {site.phone}
          </a>
          <div className="mt-4">
            <a href={`mailto:${site.email}`} className="btn btn-line">
              {site.email}
            </a>
          </div>
        </div>
        <dl className="lg:col-span-5">
          <div className={row}>
            <dt className="label">{c.addressLabel}</dt>
            <dd>
              {site.street}, {site.zip} {site.city}
              <br />
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-block py-3 font-semibold underline underline-offset-4">
                {c.mapsLabel}
              </a>
            </dd>
          </div>
          <div className={row}>
            <dt className="label">{c.hoursLabel}</dt>
            <dd>{site.hours ?? site.hoursPlaceholder}</dd>
          </div>
          <div className={row}>
            <dt className="label">{c.socialLabel}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 underline underline-offset-4">
                {c.whatsappLabel}
              </a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 underline underline-offset-4">
                {c.facebookLabel}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
