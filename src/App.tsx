import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Communities from "@/pages/Communities";
import VisitDetails from "@/pages/VisitDetails";
import TalentDiscovery from "@/pages/TalentDiscovery";
import GetInvolved from "@/pages/GetInvolved";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { RequireAuth } from "@/components/auth/RequireAuth"; // route guard

// Admin Pages
import Admin from "@/pages/admin";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminPrograms from "@/pages/admin/programs";
import AdminVisits from "@/pages/admin/visits";
import AdminBlogs from "@/pages/admin/blogs";
import AdminStaff from "@/pages/admin/staff";
import AdminMessages from "@/pages/admin/messages";
import AdminNotifications from "@/pages/admin/notifications";
import AdminSettings from "@/pages/admin/settings";

// wrapper component used only by Router to decide whether to render login or admin UI
function AdminWrapper() {
  const { user, isInitializing } = useAuth();
  if (!isInitializing && !user) {
    return <Login />;
  }
  return (
    <RequireAuth>
      <Admin />
    </RequireAuth>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={Programs} />
      <Route path="/communities" component={Communities} />
      <Route path="/talent" component={TalentDiscovery} />
      <Route path="/get-involved" component={GetInvolved} />
      {/* legacy shortcut redirect */}
      <Route path="/login">
        {() => <Redirect to="/admin" />}
      </Route>

      {/* login is now served at /admin; if user is already authenticated show admin UI */}
      <Route path="/admin" component={AdminWrapper} />

      {/* protected dashboard section */}
      <Route path="/dashboard">
        {() => (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        )}
      </Route>

      <Route path="/visits/:id" component={VisitDetails} />
      <Route path="/admin/analytics">
        {() => (
          <RequireAuth>
            <AdminAnalytics />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/programs">
        {() => (
          <RequireAuth>
            <AdminPrograms />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/visits">
        {() => (
          <RequireAuth>
            <AdminVisits />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/blogs">
        {() => (
          <RequireAuth>
            <AdminBlogs />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/staff">
        {() => (
          <RequireAuth>
            <AdminStaff />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/messages">
        {() => (
          <RequireAuth>
            <AdminMessages />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/notifications">
        {() => (
          <RequireAuth>
            <AdminNotifications />
          </RequireAuth>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <RequireAuth>
            <AdminSettings />
          </RequireAuth>
        )}
      </Route>
      
      {/* Placeholder Pages */}
      <Route path="/about" component={About} /> 
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={GetInvolved} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
