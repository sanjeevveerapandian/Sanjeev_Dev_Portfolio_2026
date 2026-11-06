export type DiagramLayer = {
  label: string;
  title: string;
  items?: string[];
  hot?: boolean;
};

const W = 360;
const PAD = 14;
const INNER = W - PAD * 2 - 8;
const CHAR = 6.5; // approx mono advance at 10.5px
const GAP = 28;
const ROW = 26;

function layoutItems(items: string[]) {
  const rows: { text: string; x: number; w: number; row: number }[] = [];
  let x = 0;
  let row = 0;
  for (const text of items) {
    const w = Math.ceil(text.length * CHAR + 18);
    if (x + w > INNER && x > 0) { x = 0; row += 1; }
    rows.push({ text, x, w, row });
    x += w + 6;
  }
  return { rows, rowCount: items.length ? row + 1 : 0 };
}

/** Small layered architecture diagram. Fixed 360-unit width so it scales cleanly on phones. */
export function ArchDiagram({ caption, layers }: { caption: string; layers: DiagramLayer[] }) {
  let y = 4;
  const blocks = layers.map((l) => {
    const { rows, rowCount } = layoutItems(l.items ?? []);
    const h = 40 + (rowCount ? rowCount * ROW + 4 : 0);
    const block = { ...l, y, h, rows };
    y += h + GAP;
    return block;
  });
  const H = y - GAP + 4;
  const summary = layers.map((l) => `${l.title}${l.items?.length ? ` (${l.items.join(", ")})` : ""}`).join(", then ");

  return (
    <figure className="diagram">
      <figcaption>{caption}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${caption}: ${summary}`}>
        {blocks.map((b, i) => (
          <g key={b.title}>
            <rect className={`dg-layer${b.hot ? " dg-layer--hot" : ""}`} x={4} y={b.y} width={W - 8} height={b.h} rx={10} />
            <text className="dg-label" x={PAD + 4} y={b.y + 16}>{b.label.toUpperCase()}</text>
            <text className="dg-title" x={PAD + 4} y={b.y + 33}>{b.title}</text>
            {b.rows.map((r) => (
              <g key={r.text} transform={`translate(${PAD + 4 + r.x}, ${b.y + 44 + r.row * ROW})`}>
                <rect className="dg-pill" width={r.w} height={20} rx={5} />
                <text className="dg-item" x={9} y={14}>{r.text}</text>
              </g>
            ))}
            {i < blocks.length - 1 && (
              <g>
                <line className="dg-arrow dg-flow" x1={W / 2} y1={b.y + b.h + 3} x2={W / 2} y2={b.y + b.h + GAP - 7} />
                <path className="dg-head" d={`M ${W / 2 - 4} ${b.y + b.h + GAP - 8} L ${W / 2 + 4} ${b.y + b.h + GAP - 8} L ${W / 2} ${b.y + b.h + GAP - 1} Z`} />
              </g>
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}
