import { MOODS, SPIN_DURATION } from './moodConstants';

type WheelSvgProps = {
  rotation: number;
  spinning: boolean;
};

export function WheelSvg({ rotation, spinning }: WheelSvgProps) {
  const cx = 160;
  const cy = 160;
  const r = 155;
  const sliceAngle = (2 * Math.PI) / MOODS.length;

  return (
    <svg
      viewBox="0 0 320 320"
      className="size-80 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? `transform ${SPIN_DURATION}ms cubic-bezier(0.17,0.67,0.12,0.99)` : 'none',
      }}
    >
      {MOODS.map((mood, i) => {
        const startAngle = i * sliceAngle - Math.PI / 2;
        const endAngle = startAngle + sliceAngle;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const midAngle = startAngle + sliceAngle / 2;
        const tx = cx + r * 0.65 * Math.cos(midAngle);
        const ty = cy + r * 0.65 * Math.sin(midAngle);

        return (
          <g key={mood.id}>
            <path
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={mood.color}
              stroke="white"
              strokeWidth="2"
            />
            <text x={tx} y={ty - 10} textAnchor="middle" fontSize="22" dominantBaseline="middle">
              {mood.emoji}
            </text>
            <text
              x={tx}
              y={ty + 14}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#1C1C1E"
              dominantBaseline="middle"
            >
              {mood.label.split(' ')[0]}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={30} fill="white" stroke="#0D6E75" strokeWidth="3" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="20">
        🦢
      </text>
    </svg>
  );
}
