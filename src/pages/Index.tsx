import { useState } from "react";
import { MainDashboard } from "@/components/MainDashboard";
import { ForecastSidebar } from "@/components/ForecastSidebar";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light', !isDarkMode);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? '' : 'light'}`}>
      {/* Main Dashboard - Left Side */}
      <MainDashboard />
      
      {/* Sidebar - Right Side */}
      <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
        <ForecastSidebar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Index;
