"use client"

import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

export type Series = {
  key: string
  label: string
  color: string
  strokeDasharray?: string
}

export function LineChart({
  data,
  series,
  xKey = "date",
  height = 240,
  yLabel,
  yDomain,
  refLines,
  emptyHint,
}: {
  data: Array<Record<string, string | number | undefined>>
  series: Series[]
  xKey?: string
  height?: number
  yLabel?: string
  yDomain?: [number | "auto", number | "auto"]
  refLines?: { value: number; label?: string; color?: string }[]
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
        <RechartsLineChart data={data} margin={{ top: 12, right: 18, left: -8, bottom: 4 }}>
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
            tickMargin={4}
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
            cursor={{ stroke: "rgba(255,255,255,0.18)", strokeDasharray: "3 3" }}
          />
          {(refLines ?? []).map((r, i) => (
            <ReferenceLine
              key={i}
              y={r.value}
              stroke={r.color ?? "var(--brand-green)"}
              strokeDasharray="4 4"
              strokeOpacity={0.6}
              label={
                r.label
                  ? {
                      value: r.label,
                      position: "right",
                      fill: r.color ?? "var(--brand-green)",
                      fontSize: 10,
                      fontFamily: "var(--font-dm-mono)",
                    }
                  : undefined
              }
            />
          ))}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={1.75}
              strokeDasharray={s.strokeDasharray}
              dot={{ r: 2.5, fill: s.color, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
