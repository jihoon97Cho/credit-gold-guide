import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { LogOut, Users, TrendingUp, FileText, Activity, ExternalLink } from "lucide-react";
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
  "hsl(220, 14%, 46%)",
  "hsl(0, 84%, 60%)",
  "hsl(142, 52%, 43%)",
  "hsl(262, 52%, 53%)",
  "hsl(190, 52%, 53%)",
];

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin"); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

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

  // Analytics computations
  const today = new Date().toISOString().split("T")[0];
  const last7Days = new Date(Date.now() - 7 * 86400000).toISOString();
  const last30Days = new Date(Date.now() - 30 * 86400000).toISOString();

  const leadsToday = leads.filter((l) => l.created_at.startsWith(today)).length;
  const leads7d = leads.filter((l) => l.created_at >= last7Days).length;
  const leads30d = leads.filter((l) => l.created_at >= last30Days).length;

  // Leads by day (last 30 days)
  const leadsByDay = leads
    .filter((l) => l.created_at >= last30Days)
    .reduce<Record<string, number>>((acc, l) => {
      const day = l.created_at.split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});
  const leadsTrend = Object.entries(leadsByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date: date.slice(5), count }));

  // Credit range distribution
  const creditDist = leads.reduce<Record<string, number>>((acc, l) => {
    const range = l.credit_range || "Unknown";
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {});
  const creditPieData = Object.entries(creditDist).map(([name, value]) => ({ name, value }));

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

  // Funding interest
  const fundingInterest = leads.reduce<Record<string, number>>((acc, l) => {
    const v = l.wants_funding || "Unknown";
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {});

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
    .map(([page, views]) => ({ page, views }));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading dashboard…</div>
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
            <span className="text-sm font-bold text-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://analytics.google.com/analytics/web/#/p/G-VF1TN2S1JV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                Open GA4 <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{leads.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leads Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{leadsToday}</div>
              <p className="text-xs text-muted-foreground">{leads7d} this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last 30 Days</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{leads30d}</div>
              <p className="text-xs text-muted-foreground">Lead submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Site Events</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{events.length}</div>
              <p className="text-xs text-muted-foreground">Tracked interactions</p>
            </CardContent>
          </Card>
        </div>

        {/* GA4 Embed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              Google Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border bg-muted/30 p-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                View your full GA4 analytics directly in Google Analytics.
              </p>
              <a
                href="https://analytics.google.com/analytics/web/#/p/G-VF1TN2S1JV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  Open Google Analytics <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <p className="text-xs text-muted-foreground">
                Tip: You can create a Looker Studio report and embed it here for a live dashboard view.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="leads">All Leads</TabsTrigger>
            <TabsTrigger value="events">Site Events</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            {/* Leads Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Leads — Last 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                {leadsTrend.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={leadsTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                      <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="hsl(42, 52%, 53%)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">No lead data yet</p>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Credit Range Pie */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Credit Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {creditPieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie data={creditPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {creditPieData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>

              {/* UTM Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  {utmBarData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={utmBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(42, 52%, 53%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Funding Interest */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Funding Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(fundingInterest).map(([label, count]) => (
                    <div key={label} className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-center">
                      <div className="text-2xl font-bold text-foreground">{count}</div>
                      <div className="text-xs text-muted-foreground capitalize">{label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Pages */}
            {pageViewData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Pages (Custom Events)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={pageViewData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                      <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                      <YAxis dataKey="page" type="category" tick={{ fontSize: 11 }} width={120} stroke="hsl(220, 10%, 46%)" />
                      <Tooltip />
                      <Bar dataKey="views" fill="hsl(42, 52%, 53%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Leads Table */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">All Lead Submissions ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Credit Range</TableHead>
                      <TableHead>Negatives</TableHead>
                      <TableHead>Funding</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="whitespace-nowrap text-xs">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="text-xs">{lead.email || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.phone || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">{lead.credit_range || "—"}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">{lead.has_negatives || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.wants_funding || "—"}</TableCell>
                        <TableCell className="text-xs">{lead.utm_source || lead.source || "Direct"}</TableCell>
                      </TableRow>
                    ))}
                    {leads.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                          No leads yet. They'll appear here as visitors submit forms.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Table */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Site Events ({events.length})</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.slice(0, 100).map((evt) => (
                      <TableRow key={evt.id}>
                        <TableCell className="whitespace-nowrap text-xs">
                          {new Date(evt.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{evt.event_type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs">{evt.page || "—"}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                          {evt.metadata ? JSON.stringify(evt.metadata) : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {events.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
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
