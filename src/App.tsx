/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { KPICards } from './components/KPICards';
import { DashboardCharts } from './components/DashboardCharts';
import { CampaignsTable } from './components/CampaignsTable';
import { CAMPAIGNS, GEO_OPTIONS, TIME_MULTIPLIERS, OfferType } from './data/mockData';
import { LayoutDashboard, Rocket, Activity, Menu, Bell, ChevronDown, MonitorPlay } from 'lucide-react';

export default function App() {
  const [timePeriod, setTimePeriod] = useState<keyof typeof TIME_MULTIPLIERS>('Today');
  const [selectedOfferType, setSelectedOfferType] = useState<OfferType | 'All'>('All');
  const [selectedGeos, setSelectedGeos] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGeoMenuOpen, setIsGeoMenuOpen] = useState(false);

  // Apply filters and time multipliers to create realistic dynamic data
  const filteredCampaigns = useMemo(() => {
    let result = CAMPAIGNS.map(c => {
      const multiplier = TIME_MULTIPLIERS[timePeriod];
      // Randomize slightly for more realism based on campaign id length
      const slightVariance = 1 + (c.id.length % 5) * 0.05; 
      const finalMult = multiplier * slightVariance;
      
      return {
        ...c,
        clicks: Math.floor(c.clicks * finalMult),
        leads: Math.floor(c.leads * finalMult),
        ftds: Math.floor(c.ftds * finalMult),
        deposits: c.deposits * finalMult,
        recDeposits: c.recDeposits * finalMult,
        spend: c.spend * finalMult,
        revenue: c.revenue * finalMult,
      };
    });

    if (selectedOfferType !== 'All') {
      result = result.filter(c => c.type === selectedOfferType);
    }

    if (selectedGeos.length > 0) {
      // Modify the geo array of the campaigns to match the selected geos, 
      // keeping all campaigns visible as requested.
      const geoVariance = 1 + (selectedGeos.join('').length % 10) * 0.1;
      
      result = result.map(c => ({
        ...c,
        geo: selectedGeos,
        clicks: Math.floor(c.clicks * geoVariance),
        leads: Math.floor(c.leads * geoVariance),
        ftds: Math.floor(c.ftds * geoVariance),
        deposits: c.deposits * geoVariance,
        recDeposits: c.recDeposits * geoVariance,
        spend: c.spend * geoVariance,
        revenue: c.revenue * geoVariance,
      }));
    }

    return result;
  }, [timePeriod, selectedOfferType, selectedGeos]);

  const stats = useMemo(() => {
    return filteredCampaigns.reduce((acc, c) => ({
      spend: acc.spend + c.spend,
      revenue: acc.revenue + c.revenue,
      clicks: acc.clicks + c.clicks,
      leads: acc.leads + c.leads,
      ftds: acc.ftds + c.ftds,
      deposits: acc.deposits + c.deposits,
    }), { spend: 0, revenue: 0, clicks: 0, leads: 0, ftds: 0, deposits: 0 });
  }, [filteredCampaigns]);

  const toggleGeo = (geo: string) => {
    setSelectedGeos(prev => prev.includes(geo) ? prev.filter(g => g !== geo) : [...prev, geo]);
  };

  return (
    <div className="min-h-screen flex bg-background text-gray-200 font-sans selection:bg-crypto-primary/30 selection:text-white relative overflow-hidden">
      {/* Background artifacts */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-crypto-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-casino-primary/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 h-screen w-64 bg-surface/80 backdrop-blur-xl border-r border-border flex flex-col transition-transform z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-50`}>
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-crypto-primary to-crypto-neon flex items-center justify-center mr-3 shadow-lg shadow-crypto-primary/20">
            <MonitorPlay className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white">CPA Control</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-crypto-primary/10 text-crypto-neon font-medium border border-crypto-primary/20">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <Rocket className="w-5 h-5" />
            Campaigns
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium">
            <Activity className="w-5 h-5" />
            Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar relative z-10">

        {/* Top Header */}
        <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border flex justify-between items-center px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-heading font-semibold text-white hidden sm:block">Command Center</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 rounded-full bg-crypto-primary animate-pulse shadow-[0_0_8px_#4facfe]"></div>
              <span className="font-mono text-xs text-crypto-primary uppercase font-semibold tracking-wider">Live Performance Tracker</span>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-casino-primary rounded-full border-2 border-surface"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors flex-shrink-0" title="Santaguida Giuseppe F.">
              <span className="text-sm font-semibold text-white">SG</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-white">Santaguida Giuseppe F.</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 max-w-[1600px] w-full mx-auto">
          
          {/* Filters Bar */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 bg-surface/30 p-4 rounded-2xl border border-white/5 relative z-50">
            {/* Time Filter */}
            <div className="flex p-1 bg-black/40 rounded-xl w-full xl:w-auto overflow-x-auto">
              {(Object.keys(TIME_MULTIPLIERS) as Array<keyof typeof TIME_MULTIPLIERS>).map(t => (
                <button
                  key={t}
                  onClick={() => setTimePeriod(t)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs whitespace-nowrap transition-all ${timePeriod === t ? 'bg-crypto-primary/20 text-crypto-neon border border-crypto-primary/30 shadow-[0_0_10px_rgba(79,172,254,0.15)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Vertical Filter */}
            <div className="flex p-1 bg-black/40 rounded-xl w-full xl:w-auto">
              {(['All', 'Crypto', 'Casino'] as const).map(type => {
                let colorClass = 'text-gray-400 hover:text-white hover:bg-white/5';
                if (selectedOfferType === type) {
                  if (type === 'Crypto') colorClass = 'bg-crypto-primary/20 text-crypto-neon border border-crypto-primary/30 shadow-[0_0_10px_rgba(79,172,254,0.15)]';
                  else if (type === 'Casino') colorClass = 'bg-casino-primary/20 text-casino-primary border border-casino-primary/30 shadow-[0_0_10px_rgba(255,78,80,0.15)]';
                  else colorClass = 'bg-white/10 text-white border border-white/20';
                }
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedOfferType(type)}
                    className={`flex-1 xl:flex-none px-6 py-2 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all ${colorClass}`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
            
            {/* GEO Filter */}
            <div className={`w-full xl:w-auto relative ${isGeoMenuOpen ? 'z-50' : 'z-30'}`}>
                 <button 
                   type="button"
                   onClick={() => setIsGeoMenuOpen(!isGeoMenuOpen)}
                   className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-black/40 rounded-xl border border-white/10 text-sm font-mono text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
                 >
                   <span>{selectedGeos.length > 0 ? `GEOs: ${selectedGeos.length} Selected` : 'All Regions (GEO)'}</span>
                   <ChevronDown className="w-4 h-4" />
                 </button>
                 
                 {isGeoMenuOpen && (
                   <>
                     {/* Backdrop */}
                     <div 
                       className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:bg-transparent" 
                       onClick={() => setIsGeoMenuOpen(false)}
                     ></div>
                     
                     {/* Dropdown / Bottom Sheet */}
                     <div className="fixed bottom-0 left-0 right-0 xl:absolute xl:top-[calc(100%+8px)] xl:bottom-auto xl:left-auto xl:right-0 xl:w-[320px] bg-surface pb-8 xl:pb-4 border-t border-x xl:border border-white/10 rounded-t-2xl xl:rounded-xl p-4 xl:p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] xl:shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-[70vh] xl:max-h-[350px] flex flex-col transform transition-transform">
                       <div className="flex justify-between items-center mb-4 xl:hidden">
                          <span className="font-heading font-semibold text-lg text-white">Select Regions</span>
                          <button 
                            type="button"
                            onClick={() => setIsGeoMenuOpen(false)} 
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                          >
                            ✕
                          </button>
                       </div>

                       <div className="overflow-y-auto custom-scrollbar flex-1">
                         <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-4 gap-2 pb-2">
                           {GEO_OPTIONS.map(geo => (
                             <button
                               type="button"
                               key={geo}
                               onClick={(e) => { e.preventDefault(); toggleGeo(geo); }}
                               className={`px-1 py-3 xl:py-2 rounded-lg text-sm xl:text-xs font-mono font-semibold border transition-all flex items-center justify-center cursor-pointer ${selectedGeos.includes(geo) ? 'bg-crypto-primary/20 border-crypto-primary/50 text-crypto-neon shadow-[0_0_8px_rgba(79,172,254,0.15)] focus:ring focus:ring-crypto-primary' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-black/80 focus:ring focus:ring-white/20'}`}
                             >
                               <span>{geo}</span>
                             </button>
                           ))}
                         </div>
                       </div>
                     </div>
                   </>
                 )}
            </div>
          </div>

          <KPICards stats={stats} />
          
          <DashboardCharts campaigns={filteredCampaigns} />
          
          <CampaignsTable campaigns={filteredCampaigns} />

        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
