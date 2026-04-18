import React from 'react';
import { ResponsiveContainer, ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const BiometricChart = ({ data = [] }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="name" stroke="#666" fontSize={11} tickLine={false} axisLine={false} dy={10} />
          <YAxis yAxisId="left" orientation="left" stroke="#999" />
          <YAxis yAxisId="right" orientation="right" stroke="#999" />
          <Tooltip wrapperStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }} />
          <Legend wrapperStyle={{ color: '#aaa', fontSize: 12 }} />

          <Area yAxisId="right" type="monotone" dataKey="calories" stroke="#D4AF37" fill="url(#goldGrad)" strokeWidth={3} />
          <Bar yAxisId="left" dataKey="weight" barSize={18} fill="#4ade80" radius={[8,8,0,0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiometricChart;
