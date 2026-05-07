import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Campaign } from '../data/mockData';
import { formatNumber, formatCurrency } from '../lib/utils';

interface DashboardChartsProps {
  campaigns: Campaign[];
}

export function DashboardCharts({ campaigns }: DashboardChartsProps) {
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  
  const trendData = [
    { name: 'Mon', revenue: totalRevenue * 0.1, spend: totalSpend * 0.12 },
    { name: 'Tue', revenue: totalRevenue * 0.15, spend: totalSpend * 0.14 },
    { name: 'Wed', revenue: totalRevenue * 0.12, spend: totalSpend * 0.11 },
    { name: 'Thu', revenue: totalRevenue * 0.18, spend: totalSpend * 0.16 },
    { name: 'Fri', revenue: totalRevenue * 0.22, spend: totalSpend * 0.18 },
    { name: 'Sat', revenue: totalRevenue * 0.13, spend: totalSpend * 0.15 },
    { name: 'Sun', revenue: totalRevenue * 0.1, spend: totalSpend * 0.14 },
  ];

  const cryptoRev = campaigns.filter(c => c.type === 'Crypto').reduce((acc, c) => acc + c.revenue, 0);
  const casinoRev = campaigns.filter(c => c.type === 'Casino').reduce((acc, c) => acc + c.revenue, 0);

  const pieData = [
    { name: 'Crypto', value: cryptoRev },
    { name: 'Casino', value: casinoRev }
  ];

  const COLORS = ['#4facfe', '#ff4e50'];

  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalFtds = campaigns.reduce((acc, c) => acc + c.ftds, 0);
  
  const funnelSteps = [
    { label: 'Clicks', value: totalClicks, color: 'bg-blue-500' },
    { label: 'Leads', value: totalLeads, color: 'bg-purple-500' },
    { label: 'FTDs', value: totalFtds, color: 'bg-green-500' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/10 p-3 rounded-lg shadow-xl font-mono text-xs z-50">
          <p className="text-gray-400 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-bold">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/10 p-3 rounded-lg shadow-xl font-mono text-xs z-50">
          <p style={{ color: payload[0].payload.fill }} className="font-bold">
            {payload[0].name}: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {/* Line Chart */}
      <div className="md:col-span-2 lg:col-span-2 glass-panel p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Financial Trajectory</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Spend vs Revenue</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8c8c8c" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8c8c8c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="spend" name="Spend" stroke="#8c8c8c" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={2} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4facfe" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel Chart */}
      <div className="glass-panel p-5 flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">Conversion Funnel</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Overall Performance</p>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3 w-full max-w-[240px] mx-auto">
          {funnelSteps.map((step, idx) => {
            const width = Math.max(30, 100 - (idx * 25)); // Visual width scaling: 100%, 75%, 50%
            const prevValue = idx === 0 ? step.value : funnelSteps[idx - 1].value;
            const dropoff = prevValue > 0 ? (step.value / prevValue * 100).toFixed(1) : 0;
            
            return (
              <div key={idx} className="flex flex-col items-center group relative">
                <div 
                  className={`flex justify-between items-center ${step.color} bg-opacity-20 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 w-full transition-all duration-300 group-hover:scale-105`}
                  style={{ width: `${width}%` }}
                >
                  <span className="text-xs font-semibold text-gray-300">{step.label}</span>
                  <span className="font-mono font-bold text-white text-sm">{formatNumber(step.value)}</span>
                </div>
                {idx < funnelSteps.length - 1 && (
                  <div className="h-6 w-full flex justify-center items-center relative">
                    <div className="h-full w-px bg-white/20"></div>
                    <span className="absolute right-0 text-[10px] text-gray-500 font-mono bg-background px-1 rounded">
                      {dropoff}% CR
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-panel p-5 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Offer Mix</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Revenue by Vertical</p>
        </div>
        <div className="flex-grow flex items-center justify-center -mt-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-auto space-y-2">
          <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crypto-primary"></div>
              <span className="font-semibold text-sm">Crypto</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-400">{formatCurrency(cryptoRev)}</span>
              <span className="font-mono text-crypto-primary font-bold">{((cryptoRev / (totalRevenue || 1)) * 100).toFixed(1)}%</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-casino-primary"></div>
              <span className="font-semibold text-sm">Casino</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-400">{formatCurrency(casinoRev)}</span>
              <span className="font-mono text-casino-primary font-bold">{((casinoRev / (totalRevenue || 1)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
