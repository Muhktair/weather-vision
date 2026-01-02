import { useState } from "react";
import { MainDashboard } from "@/components/MainDashboard";
import { ForecastSidebar } from "@/components/ForecastSidebar";
import { MobileSidebar } from "@/components/MobileSidebar";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? '' : 'light'}`}>
      {/* Main Dashboard - Left Side */}
      <MainDashboard onMenuClick={() => setIsMobileSidebarOpen(true)} />
      
      {/* Sidebar - Right Side (Desktop) */}
      <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
        <ForecastSidebar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
};

export default Index;
