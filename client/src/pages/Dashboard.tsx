import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import { 
  LayoutDashboard, Users, Trophy, BookOpen, LogOut, 
  Settings, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrograms } from "@/hooks/use-programs";
import { useCommunities } from "@/hooks/use-communities";
import { useTalents } from "@/hooks/use-talents";
import { useVolunteers } from "@/hooks/use-volunteers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user, isLoading, logoutMutation } = useAuth();
  const [_, setLocation] = useLocation();

  const { data: programs } = usePrograms();
  const { data: communities } = useCommunities();
  const { data: talents } = useTalents();
  const { data: volunteers } = useVolunteers();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-full hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              IC
            </div>
            <span className="font-display font-bold text-lg">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start font-medium" disabled>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium" disabled>
            <BookOpen className="mr-2 h-4 w-4" /> Programs
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium" disabled>
            <Users className="mr-2 h-4 w-4" /> Communities
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium" disabled>
            <Trophy className="mr-2 h-4 w-4" /> Talent
          </Button>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <div className="font-bold">{user.username}</div>
              <div className="text-muted-foreground text-xs capitalize">{user.role}</div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl font-bold">Dashboard Overview</h1>
          <Button variant="outline" asChild>
            <Link href="/">View Website</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Programs" value={programs?.length} icon={<BookOpen className="h-4 w-4 text-muted-foreground" />} />
          <StatsCard title="Communities" value={communities?.length} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <StatsCard title="Talent Submissions" value={talents?.length} icon={<Trophy className="h-4 w-4 text-muted-foreground" />} />
          <StatsCard title="Volunteers" value={volunteers?.length} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Talent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {talents?.slice(0, 5).map((talent) => (
                  <div key={talent.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{talent.name}</p>
                      <p className="text-sm text-muted-foreground">{talent.category}</p>
                    </div>
                    <div className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full capitalize">
                      {talent.status}
                    </div>
                  </div>
                ))}
                {!talents?.length && <p className="text-muted-foreground text-sm">No submissions yet.</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Volunteers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteers?.slice(0, 5).map((vol) => (
                  <div key={vol.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{vol.name}</p>
                      <p className="text-sm text-muted-foreground">{vol.role}</p>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                      {vol.status}
                    </div>
                  </div>
                ))}
                {!volunteers?.length && <p className="text-muted-foreground text-sm">No volunteers yet.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string, value: number | undefined, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value ?? <Skeleton className="h-8 w-12" />}</div>
      </CardContent>
    </Card>
  );
}
