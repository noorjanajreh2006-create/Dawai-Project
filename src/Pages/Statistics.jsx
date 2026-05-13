import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Statistics() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/stats")
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const average = data.length
    ? Math.round(data.reduce((sum, item) => sum + item.adherence, 0) / data.length)
    : 0;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 gap-3 flex-wrap">
        <h2 className="fw-bold m-0 section-title">My Stats</h2>
        <span className="badge app-badge rounded-pill px-3 py-2">Last 7 Days</span>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4 fw-bold">Daily Adherence (%)</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--text-secondary)" opacity={0.1} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card-bg)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      color: "var(--text-primary)",
                    }}
                  />
                  <Area type="monotone" dataKey="adherence" stroke="var(--accent-color)" fillOpacity={1} fill="url(#colorAdherence)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 mb-4">
            <h6 className="text-muted text-uppercase small mb-1">Average Weekly</h6>
            <h3 className="fw-bold mb-0">{average}%</h3>
            <div className="progress mt-3" style={{ height: 8, backgroundColor: "rgba(0,0,0,0.05)" }}>
              <div className="progress-bar" style={{ width: `${average}%`, backgroundColor: "var(--accent-color)" }} />
            </div>
          </div>

          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Weekly Performance</h5>
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <Bar dataKey="adherence">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.adherence > 80 ? "var(--accent-color)" : "#94a3b8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
