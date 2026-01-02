import { useState } from "react";
import { WeatherIcon } from "./WeatherIcon";
import { Wind, Droplets, Grid3X3, User, Users, BarChart3, Settings, Moon, Sun, Bell } from "lucide-react";

type TemperatureUnit = "celsius" | "fahrenheit";
type ForecastRange = "4 Days" | "15 Days" | "30 Days";
type NavSection = "dashboard" | "profile" | "community" | "analytics" | "settings";

const forecastData = [
  { day: "Wednesday, July 12", condition: "partly-cloudy" as const, temp: 18, weather: "Cloudy" },
  { day: "Thursday, July 13", condition: "rain" as const, temp: 16, weather: "Rain" },
  { day: "Friday, July 14", condition: "thunderstorm" as const, temp: 17, weather: "Thunderstorm" },
  { day: "Saturday, July 15", condition: "sunny" as const, temp: 22, weather: "Sunny" },
  { day: "Sunday, July 16", condition: "sunny" as const, temp: 24, weather: "Sunny" },
];

interface ForecastSidebarProps {
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const ForecastSidebar = ({ isDarkMode = true, onToggleTheme }: ForecastSidebarProps) => {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [range, setRange] = useState<ForecastRange>("4 Days");
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");

  const convertTemp = (temp: number) => {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  const navItems: { id: NavSection; icon: typeof Grid3X3; label: string }[] = [
    { id: "dashboard", icon: Grid3X3, label: "Dashboard" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "community", icon: Users, label: "Community" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const renderDashboardContent = () => (
    <>
      {/* Current weather display */}
      <div className="px-6 pb-6 text-center">
        <div className="flex justify-center mb-2">
          <WeatherIcon condition="partly-cloudy" size="xl" />
        </div>
        <div className="text-5xl font-bold text-white mb-1">
          {convertTemp(20)}<sup className="text-2xl">o</sup> C
        </div>
        <div className="text-white/70 text-sm mb-4">Partly Cloudy</div>
        
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <Wind className="w-4 h-4 text-white/60 mb-1" />
              <span className="text-white/60 text-xs">Wind</span>
            </div>
            <span className="text-white font-medium">20 Km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <Droplets className="w-4 h-4 text-white/60 mb-1" />
              <span className="text-white/60 text-xs">Hum</span>
            </div>
            <span className="text-white font-medium">15%</span>
          </div>
        </div>
      </div>

      {/* Forecast section */}
      <div className="flex-1 px-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Weather Forecast</h3>
          <select 
            value={unit}
            onChange={(e) => setUnit(e.target.value as TemperatureUnit)}
            className="text-xs bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white appearance-none cursor-pointer"
          >
            <option value="celsius" className="bg-gray-800 text-white">Celsius</option>
            <option value="fahrenheit" className="bg-gray-800 text-white">Fahrenheit</option>
          </select>
        </div>

        {/* Range tabs */}
        <div className="flex gap-2 mb-4">
          {(["4 Days", "15 Days", "30 Days"] as ForecastRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                range === r
                  ? "forecast-tab-active"
                  : "forecast-tab hover:bg-white/20"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Forecast list */}
        <div className="space-y-2 overflow-y-auto max-h-60">
          {forecastData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl transition-all hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <WeatherIcon 
                  condition={item.condition} 
                  size="sm" 
                />
                <div>
                  <div className="text-sm font-medium text-white">
                    {item.day.split(",")[0]}
                  </div>
                  <div className="text-xs text-white/50">
                    {item.weather}
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-white">
                {convertTemp(item.temp)}{unitSymbol}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderProfileContent = () => (
    <div className="px-6 py-4 flex-1">
      <h3 className="text-xl font-bold text-white mb-4">Profile</h3>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 mb-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="text-lg font-semibold text-white">John Doe</h4>
        <p className="text-white/60 text-sm">john.doe@email.com</p>
      </div>
    </div>
  );

  const renderCommunityContent = () => (
    <div className="px-6 py-4 flex-1">
      <h3 className="text-xl font-bold text-white mb-4">Community</h3>
      <p className="text-white/70 text-sm">Connect with other weather enthusiasts in your area.</p>
      <div className="mt-4 space-y-3">
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white text-sm font-medium">Weather Watchers Lagos</p>
          <p className="text-white/50 text-xs">1,234 members</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white text-sm font-medium">Storm Chasers Nigeria</p>
          <p className="text-white/50 text-xs">567 members</p>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className="px-6 py-4 flex-1">
      <h3 className="text-xl font-bold text-white mb-4">Analytics</h3>
      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white/60 text-xs mb-1">Average Temperature</p>
          <p className="text-white text-2xl font-bold">28°C</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white/60 text-xs mb-1">Total Rainfall (Month)</p>
          <p className="text-white text-2xl font-bold">145mm</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-white/60 text-xs mb-1">Sunny Days</p>
          <p className="text-white text-2xl font-bold">18 days</p>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="px-6 py-4 flex-1">
      <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white">Dark Mode</span>
          <button
            onClick={onToggleTheme}
            className="relative w-12 h-6 bg-white/20 rounded-full p-0.5 flex items-center transition-colors"
          >
            <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-0' : 'translate-x-6'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Temperature Unit</span>
          <select 
            value={unit}
            onChange={(e) => setUnit(e.target.value as TemperatureUnit)}
            className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white text-sm"
          >
            <option value="celsius" className="bg-gray-800">Celsius</option>
            <option value="fahrenheit" className="bg-gray-800">Fahrenheit</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white">Notifications</span>
          <button className="relative w-12 h-6 bg-primary rounded-full p-0.5 flex items-center">
            <div className="absolute w-5 h-5 rounded-full bg-white shadow-md translate-x-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNav) {
      case "profile": return renderProfileContent();
      case "community": return renderCommunityContent();
      case "analytics": return renderAnalyticsContent();
      case "settings": return renderSettingsContent();
      default: return renderDashboardContent();
    }
  };

  return (
    <div className="sidebar-blue h-full flex flex-col rounded-l-3xl shadow-2xl">
      {/* Top bar with toggle, notification, and profile */}
      <div className="flex items-center justify-end gap-3 p-4">
        {/* Dark/Light mode toggle */}
        <button
          onClick={onToggleTheme}
          className="relative w-14 h-7 bg-white/20 rounded-full p-1 flex items-center transition-colors"
        >
          <div className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-0' : 'translate-x-7'}`}>
            {isDarkMode ? (
              <Moon className="w-3 h-3 text-blue-900" />
            ) : (
              <Sun className="w-3 h-3 text-yellow-500" />
            )}
          </div>
        </button>

        {/* Notification bell */}
        <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
          <Bell className="w-4 h-4 text-white" />
        </button>

        {/* Profile avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Bottom navigation */}
      <div className="p-4">
        <div className="flex justify-center gap-2 bottom-nav-bar rounded-full p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`p-3 rounded-full transition-all ${
                activeNav === item.id
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
