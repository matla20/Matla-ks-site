import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SpecialtiesSection } from '@/components/SpecialtiesSection';
import { CatalogSection } from '@/components/CatalogSection';
import { GallerySection } from '@/components/GallerySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

import NotFound from '@/pages/not-found';
import Admin from '@/pages/Admin';
import { ContentProvider } from '@/content/ContentContext';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <SpecialtiesSection />
        <CatalogSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContentProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </ContentProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
