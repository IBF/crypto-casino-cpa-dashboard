import React, { useState } from 'react';
import { Campaign } from '../data/mockData';
import { formatCurrency, formatNumber } from '../lib/utils';
import { ArrowUpDown, Search } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: Campaign[];
}

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Campaign | 'profit' | 'roi' | 'cpa'; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof Campaign | 'profit' | 'roi' | 'cpa') => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const filtered = campaigns.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.trafficSource.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aValue: any = a[key as keyof Campaign];
    let bValue: any = b[key as keyof Campaign];

    if (key === 'profit') {
      aValue = a.revenue - a.spend;
      bValue = b.revenue - b.spend;
    } else if (key === 'roi') {
      aValue = a.spend > 0 ? (a.revenue - a.spend) / a.spend : 0;
      bValue = b.spend > 0 ? (b.revenue - b.spend) / b.spend : 0;
    } else if (key === 'cpa') {
      aValue = a.ftds > 0 ? a.spend / a.ftds : 0;
      bValue = b.ftds > 0 ? b.spend / b.ftds : 0;
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key: string) => {
    return <ArrowUpDown className={`inline w-3 h-3 ml-1 ${sortConfig?.key === key ? 'text-white' : 'text-gray-600'}`} />;
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-panel overflow-hidden flex flex-col mt-8">
      <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-lg font-semibold text-white">Active Campaigns</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-crypto-primary focus:ring-1 focus:ring-crypto-primary text-white w-full sm:w-64 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-sm">
          <thead className="bg-surface/50 text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('name')}>Campaign {getSortIcon('name')}</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('clicks')}>Clicks {getSortIcon('clicks')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('leads')}>Leads {getSortIcon('leads')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('ftds')}>FTDs {getSortIcon('ftds')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('deposits')}>Deposits {getSortIcon('deposits')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('spend')}>Spend {getSortIcon('spend')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('revenue')}>Revenue {getSortIcon('revenue')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('cpa')}>CPA {getSortIcon('cpa')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('profit')}>Profit {getSortIcon('profit')}</th>
              <th className="px-4 py-4 cursor-pointer hover:text-gray-200" onClick={() => handleSort('roi')}>ROI {getSortIcon('roi')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sorted.map(campaign => {
              const profit = campaign.revenue - campaign.spend;
              const roi = campaign.spend > 0 ? (profit / campaign.spend) * 100 : 0;
              const cpa = campaign.ftds > 0 ? campaign.spend / campaign.ftds : 0;
              const isCrypto = campaign.type === 'Crypto';

              return (
                <tr key={campaign.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center p-1 bg-white ${isCrypto ? 'neon-border-crypto' : 'neon-border-casino'}`}>
                        <img 
                          src={campaign.logo} 
                          alt={campaign.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white font-sans truncate max-w-[150px]">{campaign.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${isCrypto ? 'bg-crypto-primary/20 text-crypto-primary' : 'bg-casino-primary/20 text-casino-primary'}`}>
                            {campaign.type}
                          </span>
                          <span className="text-gray-500 font-sans text-xs flex gap-1">
                            {campaign.geo.slice(0, 2).map(g => <span key={g}>{g}</span>)}
                            {campaign.geo.length > 2 && <span>+{campaign.geo.length - 2}</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{currentDate}</td>
                  <td className="px-4 py-3 text-gray-300">{formatNumber(campaign.clicks)}</td>
                  <td className="px-4 py-3 text-gray-300">{formatNumber(campaign.leads)}</td>
                  <td className="px-4 py-3 font-semibold text-white">{formatNumber(campaign.ftds)}</td>
                  <td className="px-4 py-3 text-gray-300">{formatCurrency(campaign.deposits)}</td>
                  <td className="px-4 py-3 text-gray-400">{formatCurrency(campaign.spend)}</td>
                  <td className="px-4 py-3 font-semibold text-white">{formatCurrency(campaign.revenue)}</td>
                  <td className="px-4 py-3 text-gray-300">{formatCurrency(cpa)}</td>
                  <td className={`px-4 py-3 font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {profit > 0 ? '+' : ''}{formatCurrency(profit)}
                  </td>
                  <td className={`px-4 py-3 font-bold ${roi >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
                    {roi > 0 ? '+' : ''}{roi.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No campaigns found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
