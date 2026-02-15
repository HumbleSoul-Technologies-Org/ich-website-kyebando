import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, BookOpen, TrendingUp } from "lucide-react";
import { getDashboardStats, getGrowthStats } from "@/lib/adminApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [statsData, growthStatsData] = await Promise.all([
        getDashboardStats(),
        getGrowthStats(),
      ]);
      setStats(statsData);
      setGrowthData(growthStatsData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  const StatCard = ({ label, value, change, icon }: any) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg text-primary">
            {icon}
          </div>
        </div>
        {change && (
          <p className="text-xs text-green-600 mt-2">+{change}% from last month</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Communities"
            value={stats?.totalCommunities}
            change={5}
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatCard
            label="Total Students"
            value={stats?.totalStudents}
            change={12}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            label="Graduates"
            value={stats?.totalGraduates}
            change={8}
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            label="Partnerships"
            value={stats?.totalPartnerships}
            change={3}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>
                Student and graduate growth over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#10b981" name="Students" />
                  <Line type="monotone" dataKey="graduates" stroke="#06b6d4" name="Graduates" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Community Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Community Expansion</CardTitle>
              <CardDescription>
                New communities added each month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="communities" fill="#8b5cf6" name="New Communities" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats?.totalEnrollments}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {stats && ((stats.totalGraduates / stats.totalStudents) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {stats?.totalGraduates} out of {stats?.totalStudents} students
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
