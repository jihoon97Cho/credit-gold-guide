import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  LogOut, Users, Activity, Target, DollarSign,
  Phone, Percent, Filter, Trash2, CalendarIcon,
  Plus, ChevronRight, Clock, Edit2, Save, X, TrendingUp,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import logo from "@/assets/logo.png";
import { useToast } from "@/hooks/use-toast";

// ─── Types ──────────────────────────────────────────────
interface SiteEvent {
  id: string;
  event_type: string;
  page: string | null;
  metadata: any;
  created_at: string;
}

interface DashboardMetrics {
  id: string;
  month_key: string;
  showed_up: number;
  became_client: number;
  revenue_collected: number;
  ad_spend: number;
}

interface PipelineClient {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  stage: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const PIPELINE_STAGES = [
  "New Lead", "Call Scheduled", "Call Completed", "Closed", "Active Client", "Completed",
];

const STAGE_COLORS: Record<string, string> = {
  "New Lead": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Call Scheduled": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Call Completed": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Closed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Active Client": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Completed": "bg-green-500/10 text-green-400 border-green-500/20",
};

const MONTHLY_GOAL = 20000;

const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const statusColor = (val: number, good: number, mid: number, inverse = false) => {
  const check = inverse ? (val <= good ? "green" : val <= mid ? "yellow" : "red") :
    (val >= good ? "green" : val >= mid ? "yellow" : "red");
  return {
    green: { border: "border-emerald-500/30", dot: "bg-emerald-500", text: "text-emerald-400" },
    yellow: { border: "border-amber-500/30", dot: "bg-amber-500", text: "text-amber-400" },
    red: { border: "border-red-500/30", dot: "bg-red-500", text: "text-red-400" },
  }[check];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-xl">
      <p className="text-xs text-zinc-400 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// ─── KPI Card ───────────────────────────────────────────
const KPICard = ({ title, value, subtitle, status }: {
  title: string; value: string; subtitle: string;
  status: { border: string; dot: string; text: string };
}) => (
  <div className={`rounded-xl border ${status.border} bg-zinc-900/80 p-5`}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{title}</span>
      <div className={`h-2 w-2 rounded-full ${status.dot}`} />
    </div>
    <p className="text-2xl font-bold text-zinc-100">{value}</p>
    <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
  </div>
);

// ─── Main Component ─────────────────────────────────────
const AdminDashboard = () => {
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [pipeline, setPipeline] = useState<PipelineClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [funnelRange, setFunnelRange] = useState<string>("all");
  const [funnelDateFrom, setFunnelDateFrom] = useState<Date | undefined>();
  const [funnelDateTo, setFunnelDateTo] = useState<Date | undefined>();
  const [heatmapRange, setHeatmapRange] = useState<string>("all");
  const [heatmapDateFrom, setHeatmapDateFrom] = useState<Date | undefined>();
  const [heatmapDateTo, setHeatmapDateTo] = useState<Date | undefined>();

  const [showedUpInput, setShowedUpInput] = useState("");
  const [becameClientInput, setBecameClientInput] = useState("");
  const [revenueInput, setRevenueInput] = useState("");
  const [adSpendInput, setAdSpendInput] = useState("");
  const [savingMetrics, setSavingMetrics] = useState(false);

  const [showAddClient, setShowAddClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();
  const monthKey = getCurrentMonthKey();

  const checkAuth = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin"); return; }
    const { data: roles } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  }, [navigate]);

  const fetchData = useCallback(async () => {
    const [eventsRes, metricsRes, pipelineRes] = await Promise.all([
      supabase.from("site_events").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("dashboard_metrics").select("*").eq("month_key", monthKey).maybeSingle(),
      supabase.from("client_pipeline").select("*").order("updated_at", { ascending: false }),
    ]);
    setEvents(eventsRes.data || []);
    if (metricsRes.data) {
      setMetrics(metricsRes.data as any);
      setShowedUpInput(String(metricsRes.data.showed_up || 0));
      setBecameClientInput(String(metricsRes.data.became_client || 0));
      setRevenueInput(String(metricsRes.data.revenue_collected || 0));
      setAdSpendInput(String(metricsRes.data.ad_spend || 0));
    } else {
      setMetrics(null);
      setShowedUpInput("0");
      setBecameClientInput("0");
      setRevenueInput("0");
      setAdSpendInput("0");
    }
    setPipeline((pipelineRes.data as any) || []);
    setLoading(false);
  }, [monthKey]);

  useEffect(() => { checkAuth(); fetchData(); }, [checkAuth, fetchData]);

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/admin"); };

  const saveMetrics = async () => {
    setSavingMetrics(true);
    const data = {
      month_key: monthKey,
      showed_up: parseInt(showedUpInput) || 0,
      became_client: parseInt(becameClientInput) || 0,
      revenue_collected: parseFloat(revenueInput) || 0,
      ad_spend: parseFloat(adSpendInput) || 0,
      updated_at: new Date().toISOString(),
    };
    if (metrics) {
      await supabase.from("dashboard_metrics").update(data).eq("id", metrics.id);
    } else {
      await supabase.from("dashboard_metrics").insert(data);
    }
    toast({ title: "Saved", description: "Dashboard metrics updated." });
    await fetchData();
    setSavingMetrics(false);
  };

  const addClient = async () => {
    if (!newClientName.trim()) return;
    await supabase.from("client_pipeline").insert({
      name: newClientName.trim(),
      phone: newClientPhone.trim() || null,
      email: newClientEmail.trim() || null,
      stage: "New Lead",
    });
    setNewClientName(""); setNewClientPhone(""); setNewClientEmail("");
    setShowAddClient(false);
    fetchData();
  };

  const moveClient = async (id: string, stage: string) => {
    await supabase.from("client_pipeline").update({ stage, updated_at: new Date().toISOString() }).eq("id", id);
    fetchData();
  };

  const deleteClient = async (id: string) => {
    await supabase.from("client_pipeline").delete().eq("id", id);
    fetchData();
  };

  // ─── Funnel ───────────────────────────────────────────
  const filterByRange = (items: SiteEvent[], range: string, dateFrom?: Date, dateTo?: Date) => {
    if (range === "all") return items;
    const now = new Date();
    let start: Date;
    let end: Date | undefined;
    if (range === "today") start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    else if (range === "week") start = new Date(Date.now() - 7 * 86400000);
    else if (range === "month") start = new Date(Date.now() - 30 * 86400000);
    else if (range === "custom" && dateFrom) {
      start = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
      const to = dateTo || dateFrom;
      end = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1);
      return items.filter((e) => { const d = new Date(e.created_at); return d >= start && d < end; });
    } else return items;
    return items.filter((e) => new Date(e.created_at) >= start);
  };

  const funnelEvents = filterByRange(events, funnelRange, funnelDateFrom, funnelDateTo);
  const heatmapEvents = filterByRange(events, heatmapRange, heatmapDateFrom, heatmapDateTo);

  const funnelSessionMap = funnelEvents
    .filter((e) => e.event_type === "page_view")
    .reduce<Record<string, Set<string>>>((acc, e) => {
      const page = e.page || "/";
      const sessionId = (e.metadata as any)?.session_id || e.id;
      if (!acc[page]) acc[page] = new Set();
      acc[page].add(sessionId);
      return acc;
    }, {});

  const visitedCount = funnelSessionMap["/"]?.size || 0;
  const bookPageCount = funnelSessionMap["/book"]?.size || 0;
  const bookedCallCount = funnelSessionMap["/thank-you"]?.size || 0;

  const funnelSteps = [
    { name: "Visited", value: visitedCount },
    { name: "Book a Call Page", value: bookPageCount },
    { name: "Booked Call", value: bookedCallCount },
  ];

  const showedUp = metrics?.showed_up || 0;
  const becameClient = metrics?.became_client || 0;
  const revenueCollected = metrics?.revenue_collected || 0;
  const adSpend = metrics?.ad_spend || 0;

  const showRate = bookedCallCount > 0 ? (showedUp / bookedCallCount) * 100 : 0;
  const closeRate = showedUp > 0 ? (becameClient / showedUp) * 100 : 0;
  const profit = revenueCollected - adSpend;
  const costPerBookedCall = bookedCallCount > 0 ? adSpend / bookedCallCount : 0;
  const goalProgress = Math.min((revenueCollected / MONTHLY_GOAL) * 100, 100);
  const goalRemaining = Math.max(MONTHLY_GOAL - revenueCollected, 0);

  // Trend data
  const last30Days = new Date(Date.now() - 30 * 86400000).toISOString();
  const dayMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    dayMap[d] = 0;
  }
  events
    .filter((e) => e.event_type === "page_view" && e.page === "/thank-you" && e.created_at >= last30Days)
    .forEach((e) => { const day = e.created_at.split("T")[0]; if (dayMap[day] !== undefined) dayMap[day]++; });
  const bookedTrend = Object.entries(dayMap).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count,
  }));

  // Heatmap
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const heatmapGrid: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0));
  heatmapEvents.filter((e) => e.event_type === "page_view").forEach((e) => {
    const d = new Date(e.created_at);
    const estStr = d.toLocaleString("en-US", { timeZone: "America/New_York", weekday: "short", hour: "2-digit", hour12: false });
    const parts = estStr.split(", ");
    const dayIdx = DAYS.indexOf(parts[0]);
    const hr = parseInt(parts[1]);
    if (dayIdx >= 0 && !isNaN(hr)) heatmapGrid[dayIdx][hr]++;
  });
  const heatmapMax = Math.max(1, ...heatmapGrid.flat());

  const resetEvents = async (filter?: { event_type?: string }) => {
    let query = supabase.from("site_events").delete();
    if (filter?.event_type) query = query.eq("event_type", filter.event_type);
    else query = query.neq("id", "00000000-0000-0000-0000-000000000000");
    await query;
    fetchData();
  };

  // ─── Shared components ────────────────────────────────
  const DateFilter = ({ value, onChange, dateFrom, dateTo, onDateFrom, onDateTo }: {
    value: string; onChange: (v: string) => void;
    dateFrom?: Date; dateTo?: Date;
    onDateFrom: (d: Date | undefined) => void;
    onDateTo: (d: Date | undefined) => void;
  }) => (
    <div className="flex items-center gap-2 flex-wrap">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 w-[120px] text-xs bg-zinc-800 border-zinc-700 text-zinc-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">7 Days</SelectItem>
          <SelectItem value="month">30 Days</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {value === "custom" && (
        <div className="flex items-center gap-1.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-zinc-700 bg-zinc-800 text-zinc-300">
                <CalendarIcon className="h-3 w-3" />
                {dateFrom ? format(dateFrom, "MMM d") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999]" align="start">
              <Calendar mode="single" selected={dateFrom} onSelect={onDateFrom} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <span className="text-xs text-zinc-600">→</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-zinc-700 bg-zinc-800 text-zinc-300">
                <CalendarIcon className="h-3 w-3" />
                {dateTo ? format(dateTo, "MMM d") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999]" align="start">
              <Calendar mode="single" selected={dateTo} onSelect={onDateTo} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );

  const ResetBtn = ({ onConfirm, label }: { onConfirm: () => void; label: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-500 hover:text-red-400 hover:bg-red-500/10 gap-1">
          <Trash2 className="h-3 w-3" /> Reset
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-zinc-100">Reset {label}?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete all {label.toLowerCase()} data.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">Delete All</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-7 w-auto" />
            <span className="text-sm font-semibold text-zinc-200">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={fetchData} className="h-8 gap-1.5 text-xs text-zinc-400 hover:text-zinc-200">
              <Activity className="h-3.5 w-3.5" /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 text-zinc-500 hover:text-zinc-300">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ═══ REVENUE GOAL ═══ */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-semibold text-zinc-200">Monthly Revenue Goal</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
              <span className="font-bold text-xl text-zinc-100">${revenueCollected.toLocaleString()}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">${MONTHLY_GOAL.toLocaleString()}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-zinc-500">{format(new Date(), "MMMM yyyy")}</span>
            <span className="text-xs text-zinc-500">{goalProgress.toFixed(0)}% · ${goalRemaining.toLocaleString()} left</span>
          </div>
        </div>

        {/* ═══ KPI CARDS ═══ */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
          <KPICard
            title="Booked Calls"
            value={String(bookedCallCount)}
            subtitle="Thank You page visits"
            status={statusColor(bookedCallCount, 10, 5)}
          />
          <KPICard
            title="Show Rate"
            value={`${showRate.toFixed(1)}%`}
            subtitle={`${showedUp} of ${bookedCallCount} showed`}
            status={statusColor(showRate, 70, 50)}
          />
          <KPICard
            title="Close Rate"
            value={`${closeRate.toFixed(1)}%`}
            subtitle={`${becameClient} of ${showedUp} closed`}
            status={statusColor(closeRate, 30, 15)}
          />
          <div className={`rounded-xl border ${profit >= 0 ? 'border-emerald-500/30' : 'border-red-500/30'} bg-zinc-900/80 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Revenue / Spend</span>
              <DollarSign className="h-3.5 w-3.5 text-zinc-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-emerald-400">${revenueCollected.toLocaleString()}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-sm font-semibold text-red-400">${adSpend.toLocaleString()}</span>
            </div>
            <p className={`text-xs mt-1 font-medium ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {profit >= 0 ? '+' : '-'}${Math.abs(profit).toLocaleString()} profit
            </p>
          </div>
          <KPICard
            title="Cost / Call"
            value={`$${costPerBookedCall.toFixed(2)}`}
            subtitle="Ad spend ÷ booked"
            status={statusColor(costPerBookedCall, 50, 100, true)}
          />
        </div>

        {/* ═══ FUNNEL + MANUAL INPUTS ═══ */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Funnel */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-zinc-500" /> Visitor Funnel
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">Auto-tracked stages</p>
              </div>
              <DateFilter value={funnelRange} onChange={setFunnelRange} dateFrom={funnelDateFrom} dateTo={funnelDateTo} onDateFrom={setFunnelDateFrom} onDateTo={setFunnelDateTo} />
            </div>
            <div className="flex gap-6">
              {/* Visual inverted triangle funnel */}
              <div className="flex-shrink-0 py-2" style={{ width: '45%' }}>
                <svg viewBox="0 0 300 220" className="w-full h-auto">
                  {(() => {
                    const colors = ["#CA8A04", "#3B82F6", "#10B981"];
                    const totalSteps = funnelSteps.length;
                    const totalHeight = 200;
                    const topY = 10;
                    const fullWidth = 280;
                    const centerX = 150;
                    const gapY = 4;

                    let segments: { topLeft: number; topRight: number; botLeft: number; botRight: number; y: number; h: number; color: string; value: number }[] = [];

                    for (let i = 0; i < totalSteps; i++) {
                      const ratio = funnelSteps[0].value > 0
                        ? Math.max(funnelSteps[i].value / funnelSteps[0].value, 0.15)
                        : (1 - i * 0.3);
                      const nextRatio = i < totalSteps - 1
                        ? (funnelSteps[0].value > 0 ? Math.max(funnelSteps[i + 1].value / funnelSteps[0].value, 0.15) : (1 - (i + 1) * 0.3))
                        : ratio * 0.6;

                      const segH = (totalHeight - gapY * (totalSteps - 1)) / totalSteps;
                      const y = topY + i * (segH + gapY);

                      const topW = i === 0 ? fullWidth : segments[i - 1].botRight - segments[i - 1].botLeft;
                      const botW = i === totalSteps - 1 ? fullWidth * nextRatio : fullWidth * nextRatio;

                      const topLeft = centerX - topW / 2;
                      const topRight = centerX + topW / 2;
                      const botLeft = centerX - botW / 2;
                      const botRight = centerX + botW / 2;

                      segments.push({ topLeft, topRight, botLeft, botRight, y, h: segH, color: colors[i], value: funnelSteps[i].value });
                    }

                    return segments.map((seg, i) => (
                      <g key={i}>
                        <polygon
                          points={`${seg.topLeft},${seg.y} ${seg.topRight},${seg.y} ${seg.botRight},${seg.y + seg.h} ${seg.botLeft},${seg.y + seg.h}`}
                          fill={seg.color}
                          opacity={0.9}
                        />
                        <text
                          x={centerX}
                          y={seg.y + seg.h / 2 + 5}
                          textAnchor="middle"
                          className="fill-white font-bold"
                          style={{ fontSize: '18px' }}
                        >
                          {seg.value}
                        </text>
                      </g>
                    ));
                  })()}
                </svg>
              </div>

              {/* Stats breakdown */}
              <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
                {funnelSteps.map((step, i) => {
                  const prev = i === 0 ? step.value : funnelSteps[i - 1].value;
                  const dropoff = i === 0 ? 0 : prev > 0 ? ((prev - step.value) / prev * 100) : 0;
                  const convRate = i === 0 ? 100 : funnelSteps[0].value > 0 ? (step.value / funnelSteps[0].value * 100) : 0;
                  const dotColors = ["bg-yellow-600", "bg-blue-500", "bg-emerald-500"];
                  return (
                    <div key={step.name}>
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-sm ${dotColors[i]}`} />
                        <span className="text-sm font-medium text-zinc-200">{step.name}</span>
                        <span className="text-sm font-bold text-zinc-100 ml-auto">{step.value}</span>
                      </div>
                      {i > 0 && (
                        <div className="flex items-center gap-3 mt-0.5 ml-5">
                          <span className="text-[11px] text-red-400">↓ {dropoff.toFixed(1)}% drop-off</span>
                          <span className="text-[11px] text-zinc-500">{convRate.toFixed(0)}% of total</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {funnelSteps[0].value === 0 && (
              <p className="text-center text-sm text-zinc-500 py-4">No data yet</p>
            )}
          </div>

          {/* Manual Inputs */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Edit2 className="h-4 w-4 text-zinc-500" /> Manual Update
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{format(new Date(), "MMMM yyyy")} — update after calls</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Showed Up", value: showedUpInput, set: setShowedUpInput, type: "number" },
                { label: "Became Client", value: becameClientInput, set: setBecameClientInput, type: "number" },
                { label: "Revenue ($)", value: revenueInput, set: setRevenueInput, type: "number" },
                { label: "Ad Spend ($)", value: adSpendInput, set: setAdSpendInput, type: "number" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs text-zinc-500 mb-1 block">{field.label}</label>
                  <Input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 h-9"
                    min="0"
                    step={field.label.includes("$") ? "0.01" : "1"}
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={saveMetrics}
              disabled={savingMetrics}
              className="w-full gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold h-10"
            >
              <Save className="h-4 w-4" />
              {savingMetrics ? "Saving..." : "Save & Update"}
            </Button>
          </div>
        </div>

        {/* ═══ BOOKED CALLS TREND ═══ */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-zinc-500" /> Booked Calls — 30 Days
              </h3>
            </div>
            <ResetBtn onConfirm={() => resetEvents({ event_type: "page_view" })} label="Page Views" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={bookedTrend}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} axisLine={false} interval={Math.floor(bookedTrend.length / 7)} />
              <YAxis tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} axisLine={false} allowDecimals={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="Booked Calls" stroke="#3b82f6" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ═══ TRAFFIC HEATMAP ═══ */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-500" /> Traffic Heatmap (EST)
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">Page views by day & hour</p>
            </div>
            <div className="flex items-center gap-2">
              <DateFilter value={heatmapRange} onChange={setHeatmapRange} dateFrom={heatmapDateFrom} dateTo={heatmapDateTo} onDateFrom={setHeatmapDateFrom} onDateTo={setHeatmapDateTo} />
              <ResetBtn onConfirm={() => resetEvents({ event_type: "page_view" })} label="Page Views" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="mb-1 flex">
                <div className="w-10 shrink-0" />
                {Array.from({ length: 24 }, (_, h) => (
                  <div key={h} className="flex-1 text-center text-[9px] text-zinc-600">
                    {h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`}
                  </div>
                ))}
              </div>
              {DAYS.map((day, di) => (
                <div key={day} className="flex items-center">
                  <div className="w-10 shrink-0 text-right pr-2 text-[11px] text-zinc-500">{day}</div>
                  {heatmapGrid[di].map((val, hi) => {
                    const intensity = val / heatmapMax;
                    return (
                      <div
                        key={hi}
                        className="flex-1 aspect-square rounded-[3px] border border-zinc-800/50 m-[1px]"
                        style={{
                          backgroundColor: intensity > 0
                            ? `rgba(59, 130, 246, ${0.15 + intensity * 0.75})`
                            : "rgb(24, 24, 27)",
                        }}
                        title={`${day} ${h12(hi)} — ${val} view${val !== 1 ? 's' : ''}`}
                      />
                    );
                  })}
                </div>
              ))}
              <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-zinc-500">
                <span>Less</span>
                {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                  <div key={v} className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: v > 0 ? `rgba(59, 130, 246, ${0.15 + v * 0.75})` : "rgb(24, 24, 27)" }} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ CLIENT PIPELINE ═══ */}
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <Users className="h-4 w-4 text-zinc-500" /> Client Pipeline
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{pipeline.length} clients</p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddClient(!showAddClient)}
              className="h-8 gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
            >
              <Plus className="h-3.5 w-3.5" /> Add Client
            </Button>
          </div>

          {showAddClient && (
            <div className="mb-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input placeholder="Name *" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} className="bg-zinc-800 border-zinc-700 text-zinc-200 h-9" />
                <Input placeholder="Phone" value={newClientPhone} onChange={(e) => setNewClientPhone(e.target.value)} className="bg-zinc-800 border-zinc-700 text-zinc-200 h-9" />
                <Input placeholder="Email" value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} className="bg-zinc-800 border-zinc-700 text-zinc-200 h-9" />
              </div>
              <div className="flex gap-2">
                <Button onClick={addClient} disabled={!newClientName.trim()} size="sm" className="bg-zinc-100 text-zinc-900 font-semibold gap-1">
                  <Plus className="h-3 w-3" /> Add
                </Button>
                <Button onClick={() => setShowAddClient(false)} variant="ghost" size="sm" className="text-zinc-500">Cancel</Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {PIPELINE_STAGES.map((stage) => {
              const clients = pipeline.filter((c) => c.stage === stage);
              return (
                <div key={stage}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${STAGE_COLORS[stage]}`}>
                      {stage}
                    </span>
                    <span className="text-[11px] text-zinc-600">{clients.length}</span>
                  </div>
                  {clients.length > 0 && (
                    <div className="space-y-1.5 ml-1">
                      {clients.map((client) => (
                        <div key={client.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-800 group hover:border-zinc-700 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-200 truncate">{client.name}</p>
                            <p className="text-[11px] text-zinc-500 truncate">
                              {[client.phone, client.email].filter(Boolean).join(" · ") || "No contact info"}
                            </p>
                          </div>
                          <Select value={client.stage} onValueChange={(v) => moveClient(client.id, v)}>
                            <SelectTrigger className="h-7 w-[130px] text-[11px] bg-zinc-800 border-zinc-700 text-zinc-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PIPELINE_STAGES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-zinc-100">Remove {client.name}?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently remove this client.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteClient(client.id)} className="bg-red-600 hover:bg-red-700 text-white">Remove</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper for heatmap tooltip
const h12 = (h: number) => {
  const isPM = h >= 12;
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${dh}:00 ${isPM ? "PM" : "AM"}`;
};

export default AdminDashboard;
