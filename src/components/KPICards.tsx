import React from 'react';
import { formatCurrency, formatNumber } from '../lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Users, MousePointerClick, ShieldCheck } from 'lucide-react';

interface KPICardsProps {
  stats: {
    spend: number;
    revenue: number;
    clicks: number;
    leads: number;
    ftds: number;
    deposits: number;
  };
}

export function KPICards({ stats }: KPICardsProps) {
  const profit = stats.revenue - stats.spend;
  const roi = stats.spend > 0 ? (profit / stats.spend) * 100 : 0;
  const cpa = stats.ftds > 0 ? stats.spend / stats.ftds : 0;
  const cr = stats.clicks > 0 ? (stats.leads / stats.clicks) * 100 : 0;

  const kpis = [
    {
      title: 'Spend',
      value: formatCurrency(stats.spend),
      subtext: '+4.2% vs prev',
      icon: <DollarSign className="w-5 h-5 text-gray-400" />,
      colorClass: 'border-l-gray-500'
    },
    {
      title: 'Revenue',
      value: formatCurrency(stats.revenue),
      subtext: 'Est. payout',
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      colorClass: 'border-l-green-500'
    },
    {
      title: 'Profit',
      value: formatCurrency(profit),
      subtext: 'Net gain',
      icon: <DollarSign className="w-5 h-5 text-blue-400" />,
      colorClass: 'border-l-blue-500',
      gradient: true
    },
    {
      title: 'ROI',
      value: `${roi.toFixed(2)}%`,
      subtext: roi > 0 ? '+12% vs last' : '-2% vs last',
      icon: roi >= 0 ? <TrendingUp className="w-5 h-5 text-purple-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />,
      colorClass: 'border-l-purple-500'
    },
    {
      title: 'Clicks',
      value: formatNumber(stats.clicks),
      subtext: `CPC: ${formatCurrency(stats.clicks > 0 ? stats.spend / stats.clicks : 0)}`,
      icon: <MousePointerClick className="w-5 h-5 text-gray-400" />,
      colorClass: 'border-l-gray-600'
    },
    {
      title: 'Leads',
      value: formatNumber(stats.leads),
      subtext: `CR: ${cr.toFixed(2)}%`,
      icon: <Users className="w-5 h-5 text-gray-400" />,
      colorClass: 'border-l-gray-600'
    },
    {
      title: 'FTDs',
      value: formatNumber(stats.ftds),
      subtext: `CPA: ${formatCurrency(cpa)}`,
      icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />,
      colorClass: 'border-l-yellow-500'
    },
    {
      title: 'Deposits',
      value: formatCurrency(stats.deposits),
      subtext: `Avg: ${formatCurrency(stats.ftds > 0 ? stats.deposits / stats.ftds : 0)}`,
      icon: <DollarSign className="w-5 h-5 text-yellow-400" />,
      colorClass: 'border-l-yellow-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, i) => (
        <div key={i} className={`glass-card p-5 border-l-4 ${kpi.colorClass} relative overflow-hidden group`}>
          {kpi.gradient && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity" />
          )}
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{kpi.title}</span>
              {kpi.icon}
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-1">{kpi.value}</div>
            <div className="text-xs text-gray-500">{kpi.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
