export function SectionHead({
  index,
  label,
  title,
  lede,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <header className="sec-head rise">
      <p className="sec-index">
        <span>{index}</span>
        <span>{label}</span>
      </p>
      <h2 className="sec-title">{title}</h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </header>
  );
}
