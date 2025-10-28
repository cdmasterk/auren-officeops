import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "./Button";
import { OpsAgent } from "../ai/AgentHub";

export default function PredictModal({ open, onClose }) {
  const [forecast, setForecast] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!open) return;
    const insight = OpsAgent.predictTrend({ pastWeeks: 6, forecastWeeks: 4 });
    setForecast(insight);
    setData(buildSeries(insight));
  }, [open]);

  if (!open) return null;

  // Build two aligned series over the same x-axis:
  // hist: W1..Wp values then nulls
  // pred: nulls until Wp-1, then duplicate Wp once, then predictions
  function buildSeries(insight) {
    const { chartData, pastWeeks, forecastWeeks } = insight;
    const history = chartData.slice(0, pastWeeks);
    const future = chartData.slice(pastWeeks);

    const rows = [];
    const total = pastWeeks + forecastWeeks;

    for (let i = 0; i < total; i++) {
      const weekLabel = `W${i + 1}`;
      const row = { week: weekLabel, hist: null, pred: null };

      // historical series renders up to Wp (no more)
      if (i < pastWeeks) row.hist = history[i];

      // prediction series: null until Wp-1; at Wp duplicate last hist to anchor;
      // after that use future values (i - pastWeeks maps to 0..forecastWeeks-1)
      if (i === pastWeeks - 1) {
        row.pred = history[history.length - 1]; // anchor point at last hist week
      } else if (i >= pastWeeks) {
        row.pred = future[i - pastWeeks];
      }

      rows.push(row);
    }
    return rows;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[760px] max-w-[95vw] bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-auren-navy flex items-center gap-2">
            🔮 Operational Prediction
          </h2>
          <Button onClick={onClose}>✕ Close</Button>
        </div>

        {forecast ? (
          <>
            <p className="text-sm text-muted mb-4 leading-relaxed">{forecast.statement}</p>

            <div className="h-[260px] bg-auren-bg border rounded-xl p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      fontSize: "12px",
                      borderRadius: "8px",
                      background: "#fff",
                    }}
                  />

                  {/* Historical (solid blue) */}
                  <Line
                    type="monotone"
                    dataKey="hist"
                    stroke="#0090e5"
                    strokeWidth={2.4}
                    dot={{ r: 3 }}
                    connectNulls={false}
                    isAnimationActive
                    name="Historical"
                  />

                  {/* Forecast (dashed orange) – starts exactly at last historical point */}
                  <Line
                    type="monotone"
                    dataKey="pred"
                    stroke="#ff9f43"
                    strokeWidth={2.4}
                    strokeDasharray="6 4"
                    dot={{ r: 3 }}
                    connectNulls={false}
                    isAnimationActive
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 text-sm text-gray-600 leading-relaxed bg-auren-bg border rounded-xl p-4">
              <p className="font-semibold text-auren-blue mb-1">AI Insight:</p>
              <p>
                Forecast is computed from a linear trend on the last {forecast.pastWeeks} weeks.
                The dashed line begins exactly at the final historical week and extends {forecast.forecastWeeks} weeks ahead.
                Accuracy will improve as more weekly data accumulates.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">Generating AI prediction...</div>
        )}
      </div>
    </div>
  );
}
