import { useEffect } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import { initLenis } from "@/lib/lenis";
import { LeadProvider } from "@/components/landing/LeadDialog";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import RootCause from "@/components/landing/RootCause";
import Solution from "@/components/landing/Solution";
import HowItWorks from "@/components/landing/HowItWorks";
import DataInputs from "@/components/landing/DataInputs";
import Confidence from "@/components/landing/Confidence";
import UseCases from "@/components/landing/UseCases";
import ProductExperience from "@/components/landing/ProductExperience";
import Outcomes from "@/components/landing/Outcomes";
import Proof from "@/components/landing/Proof";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

function App() {
  useEffect(() => initLenis(), []);

  return (
    <LeadProvider>
      <div className="App bg-paper font-body text-ink antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <Nav />
        <main className="mx-auto max-w-[1440px] border-x border-line">
          <Hero />
          <Problem />
          <RootCause />
          <Solution />
          <HowItWorks />
          <DataInputs />
          <Confidence />
          <UseCases />
          <ProductExperience />
          <Outcomes />
          <Proof />
          <FinalCTA />
          <Footer />
        </main>
        <Toaster position="top-center" toastOptions={{ style: { borderRadius: 0 } }} />
      </div>
    </LeadProvider>
  );
}

export default App;
