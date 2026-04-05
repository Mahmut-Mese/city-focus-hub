import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Home from "./pages-react/Home";
import Pricing from "./pages-react/Pricing";
import MeetingRooms from "./pages-react/MeetingRooms";
import MeetingRoomBooking from "./pages-react/MeetingRoomBooking";
import VirtualOffice from "./pages-react/VirtualOffice";
import About from "./pages-react/About";
import Contact from "./pages-react/Contact";
import FAQ from "./pages-react/FAQ";
import Blog from "./pages-react/Blog";
import BlogDetail from "./pages-react/BlogDetail";
import PrivacyPolicy from "./pages-react/PrivacyPolicy";
import Terms from "./pages-react/Terms";
import Dashboard from "./pages-react/Dashboard";
import Auth from "./pages-react/Auth";
import NotFound from "./pages-react/NotFound";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/meeting-rooms" element={<MeetingRooms />} />
            <Route path="/meeting-rooms/:roomSlug/book" element={<MeetingRoomBooking />} />
            <Route path="/virtual-office" element={<VirtualOffice />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard/*" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
