export function MapEmbed() {
  const query = encodeURIComponent("Rue Leschot 2, 1205 Genève, Switzerland");
  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink/10">
      <iframe
        title="Waylee Hair & Beauty location"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
