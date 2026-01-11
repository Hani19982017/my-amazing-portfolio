import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Redirect to the static HTML portfolio
    window.location.href = "/portfolio/index.html";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0e17]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2dd4bf] mx-auto mb-4"></div>
        <p className="text-[#94a3b8]">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default Index;
