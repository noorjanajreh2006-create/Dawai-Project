import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics from backend
    fetch('http://localhost:5000/api/stats')
      .then((res) => res.json())
      .then((stats) => {
        setData(stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
        // Fallback dummy data if backend is not running
        setData([
          { name: 'Sat', adherence: 80 },
          { name: 'Sun', adherence: 95 },
          { name: 'Mon', adherence: 70 },
          { name: 'Tue', adherence: 85 },
          { name: 'Wed', adherence: 90 },
          { name: 'Thu', adherence: 60 },
          { name: 'Fri', adherence: 100 },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold m-0" style={{ color: 'var(--accent-color)' }}>
          📊 احصائياتي | My Stats
        </h2>
        <span className="badge bg-primary rounded-pill px-3 py-2">Last 7 Days</span>
      </div>

      <div className="row g-4">
        {/* Adherence Trend Chart */}
        <div className="col-12 col-lg-8">
          <div className="glass-card p-4 h-100">
            <h5 className="mb-4 fw-bold">الالتزام اليومي | Daily Adherence (%)</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAdh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--text-secondary)" opacity={0.1} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card-bg)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="adherence"
                    stroke="var(--accent-color)"
                    fillOpacity={1}
                    fill="url(#colorAdh)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="col-12 col-lg-4">
          <div className="glass-card p-4 mb-4">
            <h6 className="text-muted text-uppercase small ls-wide mb-1">Average Weekly</h6>
            <h3 className="fw-bold mb-0">83%</h3>
            <div className="progress mt-3" style={{ height: 8, backgroundColor: 'rgba(0,0,0,0.05)' }}>
              <div className="progress-bar" style={{ width: '83%', backgroundColor: 'var(--accent-color)' }}></div>
            </div>
          </div>

          <div className="glass-card p-4">
            <h5 className="fw-bold mb-3">Weekly Performance</h5>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <Bar dataKey="adherence">
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.adherence > 80 ? 'var(--accent-color)' : '#94a3b8'}
                      />
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
};

export default Statistics;
