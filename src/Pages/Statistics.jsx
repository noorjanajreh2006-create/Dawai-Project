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
  const [avgAdherence, setAvgAdherence] = useState(0);

  useEffect(() => {
    const generateStats = () => {
      try {
        const savedMeds = JSON.parse(localStorage.getItem('medications') || '[]');
        const savedLogs = JSON.parse(localStorage.getItem('doseLogs') || '{}');
        const statsData = [];
        let totalAdherence = 0;

        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

          const dayLogs = savedLogs[dateStr] || {};
          const takenCount = Object.keys(dayLogs).filter(id => dayLogs[id]).length;
          const totalMeds = savedMeds.length;

          const adherence = totalMeds > 0 ? Math.round((takenCount / totalMeds) * 100) : 0;
          totalAdherence += adherence;

          statsData.push({
            name: dayName,
            adherence: adherence
          });
        }
        
        setData(statsData);
        setAvgAdherence(Math.round(totalAdherence / 7));
      } catch (err) {
        console.error('Error generating stats:', err);
      }
    };
    
    // Also try fetch in case backend overrides
    fetch('http://localhost:5000/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Network err');
        return res.json();
      })
      .then((stats) => {
        setData(stats);
      })
      .catch(() => {
        // Fallback to local storage calculated stats
        generateStats();
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
            <h3 className="fw-bold mb-0">{avgAdherence}%</h3>
            <div className="progress mt-3" style={{ height: 8, backgroundColor: 'rgba(0,0,0,0.05)' }}>
              <div className="progress-bar" style={{ width: `${avgAdherence}%`, backgroundColor: 'var(--accent-color)' }}></div>
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
