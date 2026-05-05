"use client"

import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts"

export type BarDataPoint = Record<string, string | number | undefined>

export function BarChart({
  data,
  dataKey = "value",
  xKey = "date",
  height = 220,
  yLabel,
  yDomain,
  colorFn,
  defaultColor = "var(--brand-green)",
  refLines,
  emptyHint,
}: {
  data: BarDataPoint[]
  dataKey?: string
  xKey?: string
  height?: number
  yLabel?: string
  yDomain?: [number | "auto", number | "auto"]
  colorFn?: (entry: BarDataPoint) => string
  defaultColor?: string
  refLines?: { value: number; label?: string; color?: string; dash?: string }[]
  emptyHint?: string
}) {
  if (!data.length) {
    return (
      <div
        className="flex items-center justify-center bg-surface-2 border border-border rounded-md"
        style={{ height }}
      >
        <div className="text-center px-6">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            No data yet
          </div>
          {emptyHint && (
            <div className="text-[12px] text-muted-foreground mt-2 leading-relaxed max-w-xs">{emptyHint}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 12, right: 18, left: -8, bottom: 4 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-dm-mono)" }}
            stroke="rgba(255,255,255,0.07)"
            tickMargin={6}
          />
          <YAxis
            domain={yDomain ?? ["auto", "auto"]}
            tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-dm-mono)" }}
            stroke="rgba(255,255,255,0.07)"
            tickMargin={4}
            label={
              yLabel
                ? {
                    value: yLabel,
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "var(--muted-foreground)", fontSize: 10, fontFamily: "var(--font-dm-mono)" },
                  }
                : undefined
            }
          />
          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "var(--font-dm-sans)",
            }}
            labelStyle={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)", fontSize: 11 }}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          {(refLines ?? []).map((r, i) => (
            <ReferenceLine
              key={i}
              y={r.value}
              stroke={r.color ?? "var(--brand-amber)"}
              strokeDasharray={r.dash ?? "4 4"}
              strokeOpacity={0.6}
              label={
                r.label
                  ? {
                      value: r.label,
                      position: "right",
                      fill: r.color ?? "var(--brand-amber)",
                      fontSize: 10,
                      fontFamily: "var(--font-dm-mono)",
                    }
                  : undefined
              }
            />
          ))}
          <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} maxBarSize={28}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colorFn ? colorFn(entry) : defaultColor}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
