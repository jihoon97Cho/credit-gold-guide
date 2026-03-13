import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
  LogOut, Users, TrendingUp, Activity, ExternalLink,
  ArrowUpRight, ArrowDownRight, Clock, Target, DollarSign,
  Phone, UserCheck, Percent, Filter, Trash2, CalendarIcon,
  Plus, ChevronRight, Eye, GripVertical, X, Edit2, Save,
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
  "New Lead",
  "Call Scheduled",
  "Call Completed",
  "Closed",
  "Active Client",
  "Completed",
];

const STAGE_COLORS: Record<string, string> = {
  "New Lead": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Call Scheduled": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Call Completed": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Closed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Active Client": "bg-primary/20 text-primary border-primary/30",
  "Completed": "bg-green-500/20 text-green-400 border-green-500/30",
};

const MONTHLY_GOAL = 20000;

// ─── Helpers ────────────────────────────────────────────
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const getStatusColor = (value: number, greenThreshold: number, yellowThreshold: number, inverse = false) => {
  if (inverse) {
    if (value <= greenThreshold) return "border-emerald-500/40 shadow-emerald-500/10";
    if (value <= yellowThreshold) return "border-yellow-500/40 shadow-yellow-500/10";
    return "border-red-500/40 shadow-red-500/10";
  }
  if (value >= greenThreshold) return "border-emerald-500/40 shadow-emerald-500/10";
  if (value >= yellowThreshold) return "border-yellow-500/40 shadow-yellow-500/10";
  return "border-red-500/40 shadow-red-500/10";
};

const getStatusDot = (value: number, greenThreshold: number, yellowThreshold: number, inverse = false) => {
  if (inverse) {
    if (value <= greenThreshold) return "bg-emerald-500";
    if (value <= yellowThreshold) return "bg-yellow-500";
    return "bg-red-500";
  }
  if (value >= greenThreshold) return "bg-emerald-500";
  if (value >= yellowThreshold) return "bg-yellow-500";
  return "bg-red-500";
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-primary/20 bg-[hsl(222,33%,10%)] px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-primary/70">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────
const AdminDashboard = () => {
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [pipeline, setPipeline] = useState<PipelineClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [funnelRange, setFunnelRange] = useState<string>("all");
  const [funnelCustomDate, setFunnelCustomDate] = useState<Date | undefined>();
  const [heatmapRange, setHeatmapRange] = useState<string>("all");
  const [heatmapCustomDate, setHeatmapCustomDate] = useState<Date | undefined>();

  // Manual input state
  const [showedUpInput, setShowedUpInput] = useState("");
  const [becameClientInput, setBecameClientInput] = useState("");
  const [revenueInput, setRevenueInput] = useState("");
  const [adSpendInput, setAdSpendInput] = useState("");
  const [savingMetrics, setSavingMetrics] = useState(false);

  // Pipeline add form
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

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [checkAuth, fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  // ─── Save manual metrics ──────────────────────────────
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
    toast({ title: "Metrics saved!", description: "Dashboard updated with your latest numbers." });
    await fetchData();
    setSavingMetrics(false);
  };

  // ─── Pipeline operations ──────────────────────────────
  const addClient = async () => {
    if (!newClientName.trim()) return;
    await supabase.from("client_pipeline").insert({
      name: newClientName.trim(),
      phone: newClientPhone.trim() || null,
      email: newClientEmail.trim() || null,
      stage: "New Lead",
    });
    setNewClientName("");
    setNewClientPhone("");
    setNewClientEmail("");
    setShowAddClient(false);
    fetchData();
  };

  const moveClient = async (clientId: string, newStage: string) => {
    await supabase.from("client_pipeline").update({ stage: newStage, updated_at: new Date().toISOString() }).eq("id", clientId);
    fetchData();
  };

  const deleteClient = async (clientId: string) => {
    await supabase.from("client_pipeline").delete().eq("id", clientId);
    fetchData();
  };

  // ─── Funnel computations ──────────────────────────────
  const filterByRange = (items: SiteEvent[], range: string, customDate?: Date) => {
    if (range === "all") return items;
    const now = new Date();
    let start: Date;
    if (range === "today") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (range === "week") {
      start = new Date(Date.now() - 7 * 86400000);
    } else if (range === "month") {
      start = new Date(Date.now() - 30 * 86400000);
    } else if (range === "custom" && customDate) {
      start = new Date(customDate.getFullYear(), customDate.getMonth(), customDate.getDate());
      const end = new Date(start.getTime() + 86400000);
      return items.filter((e) => { const d = new Date(e.created_at); return d >= start && d < end; });
    } else {
      return items;
    }
    return items.filter((e) => new Date(e.created_at) >= start);
  };

  const funnelEvents = filterByRange(events, funnelRange, funnelCustomDate);
  const heatmapEvents = filterByRange(events, heatmapRange, heatmapCustomDate);

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

  // Computed metrics
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

  // Leads trend (booked calls per day over last 30 days)
  const last30Days = new Date(Date.now() - 30 * 86400000).toISOString();
  const dayMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    dayMap[d] = 0;
  }
  events
    .filter((e) => e.event_type === "page_view" && e.page === "/thank-you" && e.created_at >= last30Days)
    .forEach((e) => {
      const day = e.created_at.split("T")[0];
      if (dayMap[day] !== undefined) dayMap[day]++;
    });
  const bookedTrend = Object.entries(dayMap).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count,
  }));

  // Heatmap
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const heatmapGrid: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0));
  heatmapEvents
    .filter((e) => e.event_type === "page_view")
    .forEach((e) => {
      const d = new Date(e.created_at);
      const estStr = d.toLocaleString("en-US", { timeZone: "America/New_York", weekday: "short", hour: "2-digit", hour12: false });
      const parts = estStr.split(", ");
      const dayIdx = DAYS.indexOf(parts[0]);
      const hr = parseInt(parts[1]);
      if (dayIdx >= 0 && !isNaN(hr)) heatmapGrid[dayIdx][hr]++;
    });
  const heatmapMax = Math.max(1, ...heatmapGrid.flat());

  // Reset helpers
  const resetEvents = async (filter?: { event_type?: string }) => {
    let query = supabase.from("site_events").delete();
    if (filter?.event_type) {
      query = query.eq("event_type", filter.event_type);
    } else {
      query = query.neq("id", "00000000-0000-0000-0000-000000000000");
    }
    await query;
    fetchData();
  };

  const DateRangeFilter = ({ value, onChange, customDate, onCustomDateChange }: {
    value: string; onChange: (v: string) => void;
    customDate?: Date; onCustomDateChange: (d: Date | undefined) => void;
  }) => (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 w-[130px] text-xs bg-[hsl(222,30%,14%)] border-primary/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 7 Days</SelectItem>
          <SelectItem value="month">Last 30 Days</SelectItem>
          <SelectItem value="custom">Specific Date</SelectItem>
        </SelectContent>
      </Select>
      {value === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <CalendarIcon className="h-3 w-3" />
              {customDate ? format(customDate, "MMM d, yyyy") : "Pick date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[9999]" align="start" side="bottom" sideOffset={8} avoidCollisions>
            <Calendar mode="single" selected={customDate} onSelect={onCustomDateChange} initialFocus className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );

  const ResetButton = ({ onConfirm, label }: { onConfirm: () => void; label: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <Trash2 className="h-3 w-3" /> Reset
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[hsl(222,30%,11%)] border-primary/20">
        <AlertDialogHeader>
          <AlertDialogTitle>Reset {label}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all {label.toLowerCase()} data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
            Delete All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(222,33%,8%)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-primary/60">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(222,33%,8%)] text-[hsl(210,20%,92%)]">
      {/* ── Header ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-[hsl(222,30%,10%)]/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div>
              <span className="text-sm font-bold">Command Center</span>
              <span className="ml-2 text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} className="gap-1.5 text-xs border-primary/20 hover:bg-primary/10">
              <Activity className="h-3 w-3" /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-primary/60 hover:text-primary">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* ══════════════ MONTHLY GOAL PROGRESS ══════════════ */}
        <Card className="bg-[hsl(222,30%,11%)] border-primary/20 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Monthly Revenue Goal</h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-primary font-bold text-xl">${revenueCollected.toLocaleString()}</span>
                <span className="text-primary/40">/</span>
                <span className="text-primary/60">${MONTHLY_GOAL.toLocaleString()}</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={goalProgress} className="h-4 bg-[hsl(222,25%,16%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-bold text-white drop-shadow">{goalProgress.toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-primary/50">{format(new Date(), "MMMM yyyy")}</span>
              <span className="text-xs text-primary/50">${goalRemaining.toLocaleString()} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* ══════════════ KPI CARDS ══════════════ */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Booked Calls */}
          <Card className={`bg-[hsl(222,30%,11%)] border ${getStatusColor(bookedCallCount, 10, 5)} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-primary/60">Booked Calls</CardTitle>
              <div className={`h-2 w-2 rounded-full ${getStatusDot(bookedCallCount, 10, 5)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{bookedCallCount}</div>
              <p className="text-[11px] text-primary/40 mt-1">Thank You page visits</p>
            </CardContent>
          </Card>

          {/* Show Rate */}
          <Card className={`bg-[hsl(222,30%,11%)] border ${getStatusColor(showRate, 70, 50)} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-primary/60">Show Rate</CardTitle>
              <div className={`h-2 w-2 rounded-full ${getStatusDot(showRate, 70, 50)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{showRate.toFixed(1)}%</div>
              <p className="text-[11px] text-primary/40 mt-1">{showedUp} of {bookedCallCount} showed</p>
            </CardContent>
          </Card>

          {/* Close Rate */}
          <Card className={`bg-[hsl(222,30%,11%)] border ${getStatusColor(closeRate, 30, 15)} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-primary/60">Close Rate</CardTitle>
              <div className={`h-2 w-2 rounded-full ${getStatusDot(closeRate, 30, 15)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{closeRate.toFixed(1)}%</div>
              <p className="text-[11px] text-primary/40 mt-1">{becameClient} of {showedUp} closed</p>
            </CardContent>
          </Card>

          {/* Revenue vs Ad Spend */}
          <Card className={`bg-[hsl(222,30%,11%)] border ${getStatusColor(profit, 1, 0)} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-primary/60">Revenue / Ad Spend</CardTitle>
              <div className={`h-2 w-2 rounded-full ${profit > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-emerald-400">${revenueCollected.toLocaleString()}</span>
                <span className="text-primary/30">/</span>
                <span className="text-lg font-semibold text-red-400">${adSpend.toLocaleString()}</span>
              </div>
              <p className={`text-[11px] mt-1 font-medium ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {profit >= 0 ? '+' : '-'}${Math.abs(profit).toLocaleString()} profit
              </p>
            </CardContent>
          </Card>

          {/* Cost Per Booked Call */}
          <Card className={`bg-[hsl(222,30%,11%)] border ${getStatusColor(costPerBookedCall, 50, 100, true)} shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-primary/60">Cost / Booked Call</CardTitle>
              <div className={`h-2 w-2 rounded-full ${getStatusDot(costPerBookedCall, 50, 100, true)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">${costPerBookedCall.toFixed(2)}</div>
              <p className="text-[11px] text-primary/40 mt-1">Ad spend ÷ booked calls</p>
            </CardContent>
          </Card>
        </div>

        {/* ══════════════ FUNNEL + MANUAL INPUTS ══════════════ */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Visitor Funnel */}
          <Card className="bg-[hsl(222,30%,11%)] border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Filter className="h-4 w-4 text-primary" /> Visitor Funnel
                </CardTitle>
                <CardDescription className="text-primary/40">Auto-tracked conversion stages</CardDescription>
              </div>
              <DateRangeFilter value={funnelRange} onChange={setFunnelRange} customDate={funnelCustomDate} onCustomDateChange={setFunnelCustomDate} />
            </CardHeader>
            <CardContent className="space-y-3">
              {funnelSteps.map((step, i) => {
                const prev = i === 0 ? step.value : funnelSteps[i - 1].value;
                const dropoff = i === 0 ? 0 : prev > 0 ? ((prev - step.value) / prev * 100) : 0;
                const barWidth = funnelSteps[0].value > 0 ? (step.value / funnelSteps[0].value * 100) : 0;

                return (
                  <div key={step.name}>
                    {i > 0 && (
                      <div className="flex items-center gap-2 py-1 pl-4">
                        <ChevronRight className="h-3 w-3 text-primary/30" />
                        <span className="text-[11px] text-red-400/70">{dropoff.toFixed(1)}% drop-off</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="text-sm font-bold text-primary">{step.value}</span>
                    </div>
                    <div className="h-2 bg-[hsl(222,25%,16%)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(barWidth, 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {funnelSteps[0].value === 0 && (
                <p className="text-center text-sm text-primary/40 py-4">No funnel data yet</p>
              )}
            </CardContent>
          </Card>

          {/* Manual Update Panel */}
          <Card className="bg-[hsl(222,30%,11%)] border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Edit2 className="h-4 w-4 text-primary" /> Manual Update Panel
              </CardTitle>
              <CardDescription className="text-primary/40">Update after each call or payment — {format(new Date(), "MMMM yyyy")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-primary/50 mb-1 block">Showed Up</label>
                  <Input
                    type="number"
                    value={showedUpInput}
                    onChange={(e) => setShowedUpInput(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-primary/50 mb-1 block">Became Client</label>
                  <Input
                    type="number"
                    value={becameClientInput}
                    onChange={(e) => setBecameClientInput(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-primary/50 mb-1 block">Revenue Collected ($)</label>
                  <Input
                    type="number"
                    value={revenueInput}
                    onChange={(e) => setRevenueInput(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="text-xs text-primary/50 mb-1 block">Ad Spend ($)</label>
                  <Input
                    type="number"
                    value={adSpendInput}
                    onChange={(e) => setAdSpendInput(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <Button
                onClick={saveMetrics}
                disabled={savingMetrics}
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-[hsl(222,33%,8%)] font-bold"
              >
                <Save className="h-4 w-4" />
                {savingMetrics ? "Saving..." : "Save & Update Dashboard"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* ══════════════ BOOKED CALLS TREND ══════════════ */}
        <Card className="bg-[hsl(222,30%,11%)] border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Booked Calls — Last 30 Days</CardTitle>
              <CardDescription className="text-primary/40">Daily Thank You page visits</CardDescription>
            </div>
            <ResetButton onConfirm={() => resetEvents({ event_type: "page_view" })} label="Page Views" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={bookedTrend}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(42, 52%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(42, 52%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 20%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(42, 52%, 53%, 0.5)" }} tickLine={false} axisLine={false} interval={Math.floor(bookedTrend.length / 7)} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(42, 52%, 53%, 0.5)" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" name="Booked Calls" stroke="hsl(42, 52%, 53%)" strokeWidth={2.5} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ══════════════ TRAFFIC HEATMAP ══════════════ */}
        <Card className="bg-[hsl(222,30%,11%)] border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" /> Traffic Heatmap (EST)
              </CardTitle>
              <CardDescription className="text-primary/40">Page views by day &amp; hour</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DateRangeFilter value={heatmapRange} onChange={setHeatmapRange} customDate={heatmapCustomDate} onCustomDateChange={setHeatmapCustomDate} />
              <ResetButton onConfirm={() => resetEvents({ event_type: "page_view" })} label="Page Views" />
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="mb-1 flex">
                <div className="w-12 shrink-0" />
                {Array.from({ length: 24 }, (_, h) => {
                  const isPM = h >= 12;
                  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
                  return (
                    <div key={h} className="flex-1 text-center text-[9px] text-primary/30">
                      {displayHour}{isPM ? 'p' : 'a'}
                    </div>
                  );
                })}
              </div>
              {DAYS.map((day, di) => (
                <div key={day} className="flex items-center gap-0">
                  <div className="w-12 shrink-0 text-right pr-2 text-xs font-medium text-primary/40">{day}</div>
                  {heatmapGrid[di].map((val, hi) => {
                    const intensity = val / heatmapMax;
                    const hue = 120 * (1 - intensity);
                    return (
                      <div
                        key={hi}
                        className="flex-1 aspect-square rounded-sm border border-primary/5 transition-colors"
                        style={{
                          backgroundColor: intensity > 0
                            ? `hsl(${hue}, 70%, 45%, ${0.2 + intensity * 0.8})`
                            : "hsl(222, 25%, 14%)",
                        }}
                        title={`${day} ${(() => { const isPM = hi >= 12; const dh = hi === 0 ? 12 : hi > 12 ? hi - 12 : hi; return `${dh}:00 ${isPM ? "PM" : "AM"}`; })()} EST — ${val} view${val !== 1 ? "s" : ""}`}
                      />
                    );
                  })}
                </div>
              ))}
              <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-primary/30">
                <span>Less</span>
                {[0, 0.25, 0.5, 0.75, 1].map((v) => {
                  const hue = 120 * (1 - v);
                  return (
                    <div key={v} className="h-3 w-3 rounded-sm border border-primary/10" style={{ backgroundColor: v > 0 ? `hsl(${hue}, 70%, 45%, ${0.2 + v * 0.8})` : "hsl(222, 25%, 14%)" }} />
                  );
                })}
                <span>More</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ══════════════ CLIENT PIPELINE ══════════════ */}
        <Card className="bg-[hsl(222,30%,11%)] border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" /> Client Pipeline
              </CardTitle>
              <CardDescription className="text-primary/40">{pipeline.length} clients tracked</CardDescription>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddClient(!showAddClient)}
              className="gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              <Plus className="h-3.5 w-3.5" /> Add Client
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add client form */}
            {showAddClient && (
              <div className="p-4 rounded-lg bg-[hsl(222,25%,14%)] border border-primary/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    placeholder="Client name *"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                  />
                  <Input
                    placeholder="Phone"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                  />
                  <Input
                    placeholder="Email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="bg-[hsl(222,25%,16%)] border-primary/20 text-primary placeholder:text-primary/30"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addClient} disabled={!newClientName.trim()} size="sm" className="gap-1 bg-primary text-[hsl(222,33%,8%)] font-bold">
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                  <Button onClick={() => setShowAddClient(false)} variant="ghost" size="sm" className="text-primary/50">Cancel</Button>
                </div>
              </div>
            )}

            {/* Pipeline stages */}
            {PIPELINE_STAGES.map((stage) => {
              const clients = pipeline.filter((c) => c.stage === stage);
              if (clients.length === 0) return (
                <div key={stage} className="py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-[11px] ${STAGE_COLORS[stage] || "bg-primary/20 text-primary"} border`}>
                      {stage}
                    </Badge>
                    <span className="text-[11px] text-primary/30">0</span>
                  </div>
                </div>
              );
              return (
                <div key={stage} className="py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-[11px] ${STAGE_COLORS[stage] || "bg-primary/20 text-primary"} border`}>
                      {stage}
                    </Badge>
                    <span className="text-[11px] text-primary/30">{clients.length}</span>
                  </div>
                  <div className="space-y-2">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(222,25%,14%)] border border-primary/10 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{client.name}</p>
                          <p className="text-[11px] text-primary/40 truncate">
                            {[client.phone, client.email].filter(Boolean).join(" · ") || "No contact info"}
                          </p>
                        </div>
                        <Select value={client.stage} onValueChange={(v) => moveClient(client.id, v)}>
                          <SelectTrigger className="h-7 w-[140px] text-[11px] bg-transparent border-primary/20">
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
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[hsl(222,30%,11%)] border-primary/20">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove {client.name}?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently remove this client from your pipeline.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteClient(client.id)} className="bg-red-600 hover:bg-red-700 text-white">Remove</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
