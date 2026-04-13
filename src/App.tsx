import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// #76: Lazy-load all page components so each route is code-split into its own chunk.
// Only the chunk for the current route is downloaded; others load on navigation.
const Home = lazy(() => import("./pages-react/Home"));
const Pricing = lazy(() => import("./pages-react/Pricing"));
const MeetingRooms = lazy(() => import("./pages-react/MeetingRooms"));
const MeetingRoomBooking = lazy(() => import("./pages-react/MeetingRoomBooking"));
const VirtualOffice = lazy(() => import("./pages-react/VirtualOffice"));
const About = lazy(() => import("./pages-react/About"));
const Contact = lazy(() => import("./pages-react/Contact"));
const FAQ = lazy(() => import("./pages-react/FAQ"));
const Blog = lazy(() => import("./pages-react/Blog"));
const BlogDetail = lazy(() => import("./pages-react/BlogDetail"));
const PrivacyPolicy = lazy(() => import("./pages-react/PrivacyPolicy"));
const Terms = lazy(() => import("./pages-react/Terms"));
const Dashboard = lazy(() => import("./pages-react/Dashboard"));
const Auth = lazy(() => import("./pages-react/Auth"));
const ResetPassword = lazy(() => import("./pages-react/ResetPassword"));
const NotFound = lazy(() => import("./pages-react/NotFound"));

const queryClient = createQueryClient();

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

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageSpinner />}>
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
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard/*" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
