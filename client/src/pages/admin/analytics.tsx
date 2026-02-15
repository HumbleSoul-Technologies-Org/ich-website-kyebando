import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGrowthStats, getTopSkills } from "@/lib/adminApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function AdminAnalyticsPage() {
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [growthStatsData, topSkillsData] = await Promise.all([
        getGrowthStats(),
        getTopSkills(),
      ]);
      setGrowthData(growthStatsData);
      setSkillsData(topSkillsData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed performance metrics and insights
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
              <CardDescription>
                Communities and student growth over time
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
                  <Line type="monotone" dataKey="communities" stroke="#f59e0b" name="Communities" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Graduates Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Graduate Output</CardTitle>
              <CardDescription>
                Monthly graduation rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="graduates" fill="#06b6d4" name="Graduates" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Top Requested Skills</CardTitle>
            <CardDescription>
              Most in-demand skills among students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" name="Students Interested" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
