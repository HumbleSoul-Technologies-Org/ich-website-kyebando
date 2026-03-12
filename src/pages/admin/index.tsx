import { useEffect, useState } from "react";
import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, BookOpen, TrendingUp, Eye, MessageCircle, Plus, FileText, MapPin, Calendar, Users2, Locate, UserPlus2 } from "lucide-react";
import { getDashboardStats, getGrowthStats } from "@/lib/adminApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function AdminDashboard() {
  // const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [growthData, setGrowthData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from APIs
  const { data: visitsData, isLoading: visitsLoading } = useQuery<any>({
    queryKey: ["visits", "all"],
  });

  const { data: blogsData, isLoading: blogsLoading } = useQuery<any>({
    queryKey: ["blogs", "all"],
  });

  const { data: messagesData, isLoading: messagesLoading } = useQuery<any>({
    queryKey: ["messages", "all"],
  });

  // Process data when loaded
  useEffect(() => {
    if (!visitsLoading && !blogsLoading && !messagesLoading) {
      // Calculate totals
      const totalVisits = visitsData?.length || 0;
      const totalBlogs = blogsData?.length || 0;
      const totalViews = (visitsData?.reduce((sum: number, visit: any) => sum + (visit.views?.length || 0), 0) || 0) +
                        (blogsData?.reduce((sum: number, blog: any) => sum + (blog.views?.length || 0), 0) || 0);
      const totalMessages = messagesData?.length || 0;

      setStats({
        totalVisits,
        totalBlogs,
        totalViews,
        totalMessages,
      });

      // Process chart data
      const visitViewsData = (visitsData || [])
        .map((visit: any) => ({
          name: visit.community?.substring(0, 15) + (visit.community?.length > 15 ? '...' : ''),
          views: visit.views?.length || 0,
          fullName: visit.community,
        }))
        .sort((a: any, b: any) => b.views - a.views)
        .slice(0, 10);

      const blogViewsData = (blogsData || [])
        .map((blog: any) => ({
          name: blog.title?.substring(0, 15) + (blog.title?.length > 15 ? '...' : ''),
          views: blog.views?.length || 0,
          fullName: blog.title,
        }))
        .sort((a: any, b: any) => b.views - a.views)
        .slice(0, 10);

      const contentTypeData = [
        { name: 'Visits', value: totalVisits, color: '#10b981' },
        { name: 'Blogs', value: totalBlogs, color: '#06b6d4' },
        { name: 'Messages', value: totalMessages, color: '#8b5cf6' },
      ];

      const mostViewedVisit = (visitsData || []).reduce((max: any, visit: any) =>
        (visit.views?.length || 0) > (max?.views?.length || 0) ? visit : max, null);

      const mostViewedBlog = (blogsData || []).reduce((max: any, blog: any) =>
        (blog.views?.length || 0) > (max?.views?.length || 0) ? blog : max, null);

      setChartData({
        visitViewsData,
        blogViewsData,
        contentTypeData,
        mostViewedVisit,
        mostViewedBlog,
      });

      setIsLoading(false);
    }
  }, [visitsData, blogsData, messagesData, visitsLoading, blogsLoading, messagesLoading]);

  const [chartData, setChartData] = useState<any>({
    visitViewsData: [],
    blogViewsData: [],
    contentTypeData: [],
    mostViewedVisit: null,
    mostViewedBlog: null,
  });

  // Extract data for easier access
  const { totalVisits, totalBlogs, totalViews, totalMessages } = stats || {};
  const { visitViewsData, blogViewsData, contentTypeData, mostViewedVisit, mostViewedBlog } = chartData;

  if (isLoading) {
    return (
      <AdminLayout showNavbar={false}>
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
    <AdminLayout showNavbar={false}>
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
            label="Total Visits"
            value={totalVisits}
            change={5}
            icon={<MapPin className="h-5 w-5" />}
          />
          <StatCard
            label="Total Blogs"
            value={totalBlogs}
            change={12}
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard
            label="Total Views"
            value={totalViews}
            change={8}
            icon={<Eye className="h-5 w-5" />}
          />
          <StatCard
            label="Total Messages"
            value={totalMessages}
            change={3}
            icon={<MessageCircle className="h-5 w-5" />}
          />
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Create new content and manage resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/visits">
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm">New Visit</span>
                </Button>
              </Link>
              <Link href="/admin/blogs">
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">New Blog Post</span>
                </Button>
              </Link>
              <Link href="/admin/staff">
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <UserPlus2 className="h-6 w-6" />
                  <span className="text-sm">Add Staff</span>
                </Button>
              </Link>
               
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Most Viewed Visits */}
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Visits</CardTitle>
              <CardDescription>
                Top 10 visits by view count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={visitViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#10b981" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Most Viewed Blogs */}
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Blogs</CardTitle>
              <CardDescription>
                Top 10 blog posts by view count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={blogViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#06b6d4" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Content Distribution */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
              <CardDescription>
                Breakdown of content types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentTypeData.map((entry:any, index:number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                Most engaging content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mostViewedVisit && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Most Viewed Visit</p>
                      <p className="text-xs text-muted-foreground">{mostViewedVisit.community}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{mostViewedVisit.views?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              )}

              {mostViewedBlog && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Most Viewed Blog</p>
                      <p className="text-xs text-muted-foreground">{mostViewedBlog.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{mostViewedBlog.views?.length || 0}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Total Messages</p>
                    <p className="text-xs text-muted-foreground">Contact forms</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{totalMessages}</p>
                  <p className="text-xs text-muted-foreground">messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
