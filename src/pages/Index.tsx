import { MainDashboard } from "@/components/MainDashboard";
import { ForecastSidebar } from "@/components/ForecastSidebar";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Dashboard - Left Side */}
      <MainDashboard />
      
      {/* Sidebar - Right Side */}
      <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
        <ForecastSidebar />
      </div>
    </div>
  );
};

export default Index;
