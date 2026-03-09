import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell,
  RadialBarChart, RadialBar, Legend, FunnelChart, Funnel, LabelList,
} from "recharts";
import {
  LogOut, Users, TrendingUp, FileText, Activity, ExternalLink,
  ArrowUpRight, ArrowDownRight, Clock, Target, Zap, Eye, Filter, Trash2, CalendarIcon,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import logo from "@/assets/logo.png";

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  credit_range: string | null;
  has_negatives: string | null;
  wants_funding: string | null;
  credit_goal: string | null;
  message: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

interface SiteEvent {
  id: string;
  event_type: string;
  page: string | null;
  metadata: any;
  created_at: string;
}

const COLORS = [
  "hsl(42, 52%, 53%)",
  "hsl(220, 60%, 55%)",
  "hsl(160, 50%, 45%)",
  "hsl(340, 60%, 55%)",
  "hsl(262, 52%, 58%)",
  "hsl(190, 55%, 50%)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const StatCard = ({
  title, value, subtitle, icon: Icon, trend, trendUp,
}: {
  title: string; value: string | number; subtitle: string;
  icon: any; trend?: string; trendUp?: boolean;
}) => (
  <Card className="relative overflow-hidden">
    <div className="absolute right-0 top-0 h-24 w-24 -translate-y-4 translate-x-4 rounded-full bg-primary/5" />
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="rounded-lg bg-primary/10 p-2">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 flex items-center gap-2">
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendUp ? "text-green-500" : "text-destructive"}`}>
            {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </span>
        )}
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [heatmapRange, setHeatmapRange] = useState<string>("all");
  const [heatmapCustomDate, setHeatmapCustomDate] = useState<Date | undefined>();
  const [funnelRange, setFunnelRange] = useState<string>("all");
  const [funnelCustomDate, setFunnelCustomDate] = useState<Date | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin"); return; }
    const { data: roles } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  };

  const fetchData = async () => {
    const [leadsRes, eventsRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("site_events").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    setLeads(leadsRes.data || []);
    setEvents(eventsRes.data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const resetEvents = async (filter?: { event_type?: string }) => {
    let query = supabase.from("site_events").delete();
    if (filter?.event_type) {
      query = query.eq("event_type", filter.event_type);
    } else {
      query = query.neq("id", "00000000-0000-0000-0000-000000000000"); // delete all
    }
    await query;
    fetchData();
  };

  const resetLeads = async () => {
    await supabase.from("leads").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    fetchData();
  };

  const ResetButton = ({ onConfirm, label }: { onConfirm: () => void; label: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="h-3 w-3" /> Reset
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset {label}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all {label.toLowerCase()} data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // --- Analytics computations ---
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const last7Days = new Date(Date.now() - 7 * 86400000).toISOString();
  const last30Days = new Date(Date.now() - 30 * 86400000).toISOString();
  const prev7Days = new Date(Date.now() - 14 * 86400000).toISOString();

  const leadsToday = leads.filter((l) => l.created_at.startsWith(today)).length;
  const leads7d = leads.filter((l) => l.created_at >= last7Days).length;
  const leadsPrev7d = leads.filter((l) => l.created_at >= prev7Days && l.created_at < last7Days).length;
  const leads30d = leads.filter((l) => l.created_at >= last30Days).length;

  const weekTrend = leadsPrev7d > 0
    ? `${(((leads7d - leadsPrev7d) / leadsPrev7d) * 100).toFixed(0)}%`
    : leads7d > 0 ? "+100%" : "—";
  const weekTrendUp = leads7d >= leadsPrev7d;

  // Conversion rate (leads with email / total)
  const leadsWithEmail = leads.filter((l) => l.email).length;
  const convRate = leads.length > 0 ? ((leadsWithEmail / leads.length) * 100).toFixed(1) : "0";

  // Leads by day (last 30 days) — fill empty days
  const dayMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
    dayMap[d] = 0;
  }
  leads.filter((l) => l.created_at >= last30Days).forEach((l) => {
    const day = l.created_at.split("T")[0];
    if (dayMap[day] !== undefined) dayMap[day]++;
  });
  const leadsTrend = Object.entries(dayMap).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count,
  }));

  // Credit range distribution
  const creditDist = leads.reduce<Record<string, number>>((acc, l) => {
    const range = l.credit_range || "Unknown";
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {});
  const creditPieData = Object.entries(creditDist)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  // UTM source distribution
  const utmDist = leads.reduce<Record<string, number>>((acc, l) => {
    const src = l.utm_source || "Direct";
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});
  const utmBarData = Object.entries(utmDist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Funding interest for radial chart
  const fundingInterest = leads.reduce<Record<string, number>>((acc, l) => {
    const v = l.wants_funding || "Unknown";
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});
  const fundingRadialData = Object.entries(fundingInterest).map(([name, value], i) => ({
    name,
    value,
    fill: COLORS[i % COLORS.length],
  }));

  // Negatives breakdown
  const negativesDist = leads.reduce<Record<string, number>>((acc, l) => {
    const v = l.has_negatives || "Unknown";
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

  // Credit goals
  const goalsDist = leads.reduce<Record<string, number>>((acc, l) => {
    const v = l.credit_goal || "Unknown";
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});
  const goalsBarData = Object.entries(goalsDist)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Helper function to format page paths for display
  const formatPageName = (page: string) => {
    if (page === "/") return "Home";
    return page;
  };

  // Date range filter helper
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
      return items.filter((e) => {
        const d = new Date(e.created_at);
        return d >= start && d < end;
      });
    } else {
      return items;
    }
    return items.filter((e) => new Date(e.created_at) >= start);
  };

  const DateRangeFilter = ({ value, onChange, customDate, onCustomDateChange }: {
    value: string; onChange: (v: string) => void;
    customDate?: Date; onCustomDateChange: (d: Date | undefined) => void;
  }) => (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 w-[130px] text-xs">
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
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={onCustomDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );

  // Filtered events for heatmap and funnel
  const heatmapEvents = filterByRange(events, heatmapRange, heatmapCustomDate);
  const funnelEvents = filterByRange(events, funnelRange, funnelCustomDate);

  // Page views from events
  const pageViews = events
    .filter((e) => e.event_type === "page_view")
    .reduce<Record<string, number>>((acc, e) => {
      const page = e.page || "/";
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {});
  const pageViewData = Object.entries(pageViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page: formatPageName(page), views }));

  // Unique visitors per page (by session_id in metadata) — for funnel, use filtered events
  const funnelSessionMap = funnelEvents
    .filter((e) => e.event_type === "page_view")
    .reduce<Record<string, Set<string>>>((acc, e) => {
      const page = e.page || "/";
      const sessionId = (e.metadata as any)?.session_id || e.id;
      if (!acc[page]) acc[page] = new Set();
      acc[page].add(sessionId);
      return acc;
    }, {});

  // Funnel: ordered pages visitors typically flow through
  const funnelPages = [
    { path: "/", label: "Home" },
    { path: "/book", label: "Book a Call" },
    { path: "/thank-you", label: "Thank You Page" },
  ];
  const funnelData = funnelPages
    .map(({ path, label }, i) => ({
      name: label,
      value: funnelSessionMap[path]?.size || 0,
      fill: COLORS[i % COLORS.length],
    }))
    .filter((_, i, arr) => i === 0 || arr.slice(0, i).some((d) => d.value > 0));

  // Leads by hour of day (EST)
  const hourDist = new Array(24).fill(0);
  leads.forEach((l) => {
    const estHour = parseInt(
      new Date(l.created_at).toLocaleString("en-US", { hour: "2-digit", hour12: false, timeZone: "America/New_York" })
    );
    hourDist[estHour]++;
  });
  const hourData = hourDist.map((count, hour) => ({
    hour: `${hour.toString().padStart(2, "0")}:00`,
    count,
  }));

  // Heatmap: day-of-week × hour from page_view events (EST) — use filtered events
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

  // Recent leads (last 5)
  const recentLeads = leads.slice(0, 5);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div>
              <span className="text-sm font-bold text-foreground">Analytics Dashboard</span>
              <span className="ml-2 text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} className="gap-1.5 text-xs">
              <Activity className="h-3 w-3" /> Refresh
            </Button>
            <a
              href="https://analytics.google.com/analytics/web/#/p/G-VF1TN2S1JV"
              target="_blank" rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                GA4 <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Leads" value={leads.length} subtitle="All time"
            icon={Users}
          />
          <StatCard
            title="This Week" value={leads7d} subtitle="vs previous week"
            icon={TrendingUp} trend={weekTrend} trendUp={weekTrendUp}
          />
          <StatCard
            title="Today" value={leadsToday} subtitle={`${leads30d} this month`}
            icon={Zap}
          />
          <StatCard
            title="Email Capture" value={`${convRate}%`} subtitle={`${leadsWithEmail} of ${leads.length} leads`}
            icon={Target}
          />
        </div>

        {/* Recent Activity Strip */}
        {recentLeads.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" /> Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex-shrink-0 rounded-lg border border-border bg-muted/30 px-4 py-3 min-w-[200px]"
                  >
                    <p className="text-sm font-semibold text-foreground truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.credit_range || "No range"}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground/70">
                      {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="leads">Lead Data</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Leads Trend — Area Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Lead Volume — Last 30 Days</CardTitle>
                  <CardDescription>Daily lead submissions with trend line</CardDescription>
                </div>
                <ResetButton onConfirm={resetLeads} label="Leads" />
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={leadsTrend}>
                    <defs>
                      <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(42, 52%, 53%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(42, 52%, 53%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date" tick={{ fontSize: 10 }}
                      stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false}
                      interval={Math.floor(leadsTrend.length / 7)}
                    />
                    <YAxis
                      tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))"
                      tickLine={false} axisLine={false} allowDecimals={false}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone" dataKey="count" name="Leads"
                      stroke="hsl(42, 52%, 53%)" strokeWidth={2.5}
                      fill="url(#leadGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Traffic Sources</CardTitle>
                  <CardDescription>Where your leads come from</CardDescription>
                </CardHeader>
                <CardContent>
                  {utmBarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={utmBarData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Leads" radius={[0, 6, 6, 0]}>
                          {utmBarData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Peak Hours */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Lead Activity by Hour (EST)</CardTitle>
                    <CardDescription>When visitors submit forms (Eastern Time)</CardDescription>
                  </div>
                  <ResetButton onConfirm={resetLeads} label="Leads" />
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={hourData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} interval={2} />
                      <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} allowDecimals={false} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" name="Leads" fill="hsl(220, 60%, 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Traffic Heatmap */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-primary" /> Traffic Heatmap (EST)
                    </CardTitle>
                    <CardDescription>Page views by day of week &amp; hour — darker = more visitors</CardDescription>
                  </div>
                  <ResetButton onConfirm={() => resetEvents({ event_type: "page_view" })} label="Page Views" />
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="min-w-[640px]">
                     {/* Hour labels */}
                     <div className="mb-1 flex">
                       <div className="w-12 shrink-0" />
                       {Array.from({ length: 24 }, (_, h) => {
                         const isPM = h >= 12;
                         const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
                         return (
                           <div key={h} className="flex-1 text-center text-[9px] text-muted-foreground">
                             {displayHour}{isPM ? 'p' : 'a'}
                           </div>
                         );
                       })}
                     </div>
                    {/* Grid rows */}
                    {DAYS.map((day, di) => (
                      <div key={day} className="flex items-center gap-0">
                        <div className="w-12 shrink-0 text-right pr-2 text-xs font-medium text-muted-foreground">{day}</div>
                        {heatmapGrid[di].map((val, hi) => {
                           const intensity = val / heatmapMax;
                           // Green to red gradient: hue interpolation from 120 (green) to 0 (red)
                           const hue = 120 * (1 - intensity);
                           return (
                             <div
                               key={hi}
                               className="flex-1 aspect-square rounded-sm border border-border/30 transition-colors"
                               style={{
                                 backgroundColor: intensity > 0
                                   ? `hsl(${hue}, 70%, 45%, ${0.2 + intensity * 0.8})`
                                   : "hsl(var(--muted) / 0.3)",
                               }}
                                title={`${day} ${(() => {
                                  const isPM = hi >= 12;
                                  const displayHour = hi === 0 ? 12 : hi > 12 ? hi - 12 : hi;
                                  return `${displayHour}:00 ${isPM ? "PM" : "AM"}`;
                                })()} EST — ${val} view${val !== 1 ? "s" : ""}`}
                             />
                           );
                         })}
                      </div>
                    ))}
                    {/* Legend */}
                    <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
                      <span>Less</span>
                       {[0, 0.25, 0.5, 0.75, 1].map((v) => {
                         const hue = 120 * (1 - v);
                         return (
                           <div
                             key={v}
                             className="h-3 w-3 rounded-sm border border-border/30"
                             style={{ backgroundColor: v > 0 ? `hsl(${hue}, 70%, 45%, ${0.2 + v * 0.8})` : "hsl(var(--muted) / 0.3)" }}
                           />
                         );
                       })}
                       <span>More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pages */}
            {pageViewData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Eye className="h-4 w-4 text-primary" /> Page Views
                  </CardTitle>
                  <CardDescription>Most visited pages from tracked events</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={pageViewData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                      <YAxis dataKey="page" type="category" tick={{ fontSize: 10 }} width={120} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar dataKey="views" name="Views" fill="hsl(42, 52%, 53%)" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* FUNNEL TAB */}
          <TabsContent value="funnel" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Funnel Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4 text-primary" /> Visitor Funnel
                  </CardTitle>
                  <CardDescription>Unique visitors at each stage (by session)</CardDescription>
                </CardHeader>
                <CardContent>
                  {funnelData.length > 0 && funnelData[0].value > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <FunnelChart>
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Funnel dataKey="value" data={funnelData} isAnimationActive>
                          <LabelList position="right" fill="hsl(var(--foreground))" fontSize={12} fontWeight={600} dataKey="name" />
                          <LabelList position="center" fill="white" fontSize={14} fontWeight={700} dataKey="value" />
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No page view data yet. Visit your site pages to start tracking the funnel.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Drop-off Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Page Drop-off Analysis</CardTitle>
                  <CardDescription>Where visitors leave your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Page</TableHead>
                        <TableHead className="text-right">Unique Visitors</TableHead>
                        <TableHead className="text-right">Drop-off</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {funnelData.map((step, i) => {
                        const prev = i === 0 ? step.value : funnelData[i - 1].value;
                        const dropoff = prev - step.value;
                        const rate = prev > 0 ? ((dropoff / prev) * 100).toFixed(1) : "0";
                        return (
                          <TableRow key={step.name}>
                            <TableCell className="font-medium text-foreground">{step.name}</TableCell>
                            <TableCell className="text-right text-sm">{step.value}</TableCell>
                            <TableCell className="text-right text-sm">
                              {i === 0 ? "—" : dropoff}
                            </TableCell>
                            <TableCell className="text-right">
                              {i === 0 ? (
                                <Badge variant="secondary" className="text-xs">Entry</Badge>
                              ) : (
                                <Badge
                                  variant={parseFloat(rate) > 50 ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {rate}%
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {funnelData.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                            No funnel data yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* All Pages Unique Visitors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="h-4 w-4 text-primary" /> All Pages — Unique Visitors
                </CardTitle>
                <CardDescription>Unique sessions per page across all tracked pages</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(funnelSessionMap).length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={Object.entries(funnelSessionMap)
                        .map(([page, sessions]) => ({ page, unique: (sessions as Set<string>).size }))
                        .sort((a, b) => b.unique - a.unique)}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} allowDecimals={false} />
                      <YAxis dataKey="page" type="category" tick={{ fontSize: 11 }} width={120} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar dataKey="unique" name="Unique Visitors" fill="hsl(160, 50%, 45%)" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">No page view data yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Credit Range Pie */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Credit Score Distribution</CardTitle>
                  <CardDescription>Breakdown of reported credit ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  {creditPieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={creditPieData} dataKey="value" nameKey="name"
                          cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                          paddingAngle={3} strokeWidth={0}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {creditPieData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Funding Interest Radial */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Funding Interest</CardTitle>
                  <CardDescription>How many leads want business funding</CardDescription>
                </CardHeader>
                <CardContent>
                  {fundingRadialData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RadialBarChart
                        innerRadius="30%" outerRadius="90%"
                        data={fundingRadialData} startAngle={180} endAngle={0}
                      >
                        <RadialBar
                          dataKey="value" cornerRadius={8}
                          label={{ position: "insideStart", fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 600 }}
                        />
                        <Legend
                          iconSize={10} layout="horizontal" verticalAlign="bottom"
                          formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>}
                        />
                        <RechartsTooltip content={<CustomTooltip />} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Negatives Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Negative Items on Report</CardTitle>
                  <CardDescription>Self-reported negative items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(negativesDist).sort((a, b) => b[1] - a[1]).map(([label, count], i) => {
                      const pct = leads.length > 0 ? (count / leads.length) * 100 : 0;
                      return (
                        <div key={label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-foreground capitalize">{label}</span>
                            <span className="text-xs font-semibold text-muted-foreground">{count} ({pct.toFixed(0)}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Credit Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Credit Goals</CardTitle>
                  <CardDescription>What leads want to achieve</CardDescription>
                </CardHeader>
                <CardContent>
                  {goalsBarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={goalsBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} allowDecimals={false} />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Leads" radius={[6, 6, 0, 0]}>
                          {goalsBarData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* LEADS TABLE TAB */}
          <TabsContent value="leads">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">All Lead Submissions</CardTitle>
                  <CardDescription>{leads.length} total leads captured</CardDescription>
                </div>
                <ResetButton onConfirm={resetLeads} label="Leads" />
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Credit Range</TableHead>
                      <TableHead>Negatives</TableHead>
                      <TableHead>Funding</TableHead>
                      <TableHead>Goal</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="group">
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                        <TableCell className="text-xs">{lead.email || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.phone || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs font-normal">{lead.credit_range || "—"}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">{lead.has_negatives || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.wants_funding || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.credit_goal || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">{lead.utm_source || lead.source || "Direct"}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {leads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                          No leads yet. They'll appear here as visitors submit forms.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EVENTS TABLE TAB */}
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Site Events</CardTitle>
                  <CardDescription>{events.length} events tracked</CardDescription>
                </div>
                <ResetButton onConfirm={() => resetEvents()} label="Events" />
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.slice(0, 100).map((evt) => (
                      <TableRow key={evt.id}>
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(evt.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{evt.event_type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">{evt.page || "—"}</TableCell>
                        <TableCell className="max-w-[250px] truncate text-xs text-muted-foreground">
                          {evt.metadata ? JSON.stringify(evt.metadata) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {events.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-12 text-center text-muted-foreground">
                          No events tracked yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
