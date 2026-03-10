import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={Programs} />
      <Route path="/communities" component={Communities} />
      <Route path="/talent" component={TalentDiscovery} />
      <Route path="/get-involved" component={GetInvolved} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/visits/:id" component={VisitDetails} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={Admin} />
      <Route path="/admin/analytics" component={AdminAnalytics} />
      <Route path="/admin/programs" component={AdminPrograms} />
      <Route path="/admin/visits" component={AdminVisits} />
      <Route path="/admin/blogs" component={AdminBlogs} />
      <Route path="/admin/staff" component={AdminStaff} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/notifications" component={AdminNotifications} />
      <Route path="/admin/settings" component={AdminSettings} />
      
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
