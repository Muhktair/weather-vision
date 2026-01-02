import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Navigation, Menu } from "lucide-react";
import { WeatherIcon } from "./WeatherIcon";
import mountainsBg from "@/assets/mountains-bg.png";
import { HourlyForecast } from "./HourlyForecast";
import { MonthlyRainfall } from "./MonthlyRainfall";
import { WorldWeatherMap } from "./WorldWeatherMap";
import { useGeolocation } from "@/hooks/useGeolocation";

const defaultLocations = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Port Harcourt, Nigeria",
  "Kano, Nigeria",
];

interface MainDashboardProps {
  onMenuClick?: () => void;
}

export const MainDashboard = ({ onMenuClick }: MainDashboardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [manualLocation, setManualLocation] = useState<string | null>(null);
  
  const { city, country, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  // Determine current location display
  const currentLocation = manualLocation || (city && country ? `${city}, ${country}` : "Lagos, Nigeria");
  
  // Build locations list with detected location at top
  const locations = city && country 
    ? [`${city}, ${country}`, ...defaultLocations.filter(loc => loc !== `${city}, ${country}`)]
    : defaultLocations;

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

  const handleUseMyLocation = () => {
    requestLocation();
    setManualLocation(null);
    setShowLocationDropdown(false);
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
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
              {getGreeting()}, <span className="text-primary">John</span>
            </h1>
            
            {/* Mobile menu button */}
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
            >
              <Menu className="w-6 h-6 text-primary" />
            </button>
          </div>
          
          {/* Location selector */}
          <div className="relative inline-block">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 transition-colors rounded-full px-4 py-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>
                {geoLoading ? "Detecting location..." : currentLocation}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showLocationDropdown && (
              <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-xl shadow-xl z-50 min-w-56 overflow-hidden">
                {/* Use my location button */}
                <button
                  onClick={handleUseMyLocation}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors flex items-center gap-2 border-b border-border/50"
                >
                  <Navigation className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">Use my location</span>
                  {geoLoading && <span className="text-xs text-muted-foreground ml-auto">detecting...</span>}
                </button>
                
                {geoError && (
                  <div className="px-4 py-2 text-xs text-destructive bg-destructive/10">
                    {geoError}
                  </div>
                )}
                
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setManualLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors ${
                      loc === currentLocation ? "bg-primary/20 text-primary" : ""
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
          <HourlyForecast location={currentLocation.split(",")[0]} />
        </div>

        {/* Monthly Rainfall */}
        <MonthlyRainfall />

        {/* World Weather Map */}
        <WorldWeatherMap />
      </div>
    </div>
  );
};
