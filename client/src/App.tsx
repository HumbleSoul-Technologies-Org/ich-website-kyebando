import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Communities from "@/pages/Communities";
import TalentDiscovery from "@/pages/TalentDiscovery";
import GetInvolved from "@/pages/GetInvolved";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

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
      
      {/* Placeholder Pages */}
      <Route path="/about" component={About} /> 
      <Route path="/blog" component={Home} />
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
