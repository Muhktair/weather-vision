import { useState, useEffect } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import mountainsBg from "@/assets/mountains-bg.png";
import { HourlyForecast } from "./HourlyForecast";
import { MonthlyRainfall } from "./MonthlyRainfall";
import { WorldWeatherMap } from "./WorldWeatherMap";

const locations = [
  "Rajshahi, Bangladesh",
  "Dhaka, Bangladesh",
  "Chittagong, Bangladesh",
  "Khulna, Bangladesh",
];

export const MainDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(locations[0]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div 
      className="flex-1 min-h-screen p-6 lg:p-8 overflow-y-auto relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${mountainsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">
            {getGreeting()}, <span className="text-primary">John</span>
          </h1>
          
          {/* Location selector */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 transition-colors rounded-full px-4 py-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>{location}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showLocationDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-xl shadow-xl z-50 min-w-48 overflow-hidden">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors ${
                      loc === location ? "bg-primary/20 text-primary" : ""
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time and Weather */}
      <div className="mb-8">
        <div className="text-5xl lg:text-7xl font-bold text-foreground mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-muted-foreground text-sm lg:text-base mb-6">
          {formatDate(currentTime)} | {formatTime(currentTime)}
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg font-medium">Weather Forecast</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">Partly Cloudy</span>
          <WeatherIcon condition="partly-cloudy" size="md" />
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          Isolated thunderstorms, Precipitation: 30%
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Forecast - Full width on mobile, half on desktop */}
        <div className="lg:col-span-2">
          <HourlyForecast location={location.split(",")[0]} />
        </div>

        {/* Monthly Rainfall */}
        <MonthlyRainfall />

        {/* World Weather Map */}
        <WorldWeatherMap />
      </div>
    </div>
  );
};
