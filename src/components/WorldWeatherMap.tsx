import { MapPin } from "lucide-react";

export const WorldWeatherMap = () => {
  return (
    <div className="weather-card rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">World Weather Reader</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          See Interactive Map
        </button>
      </div>
      
      <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-br from-weather-rain/20 to-weather-rainLight/10">
        {/* Simple world map representation */}
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-40">
          {/* Simplified continent shapes */}
          <ellipse cx="200" cy="180" rx="80" ry="60" fill="hsl(120, 40%, 50%)" opacity="0.6" />
          <ellipse cx="280" cy="200" rx="60" ry="80" fill="hsl(120, 40%, 50%)" opacity="0.6" />
          <ellipse cx="420" cy="160" rx="100" ry="70" fill="hsl(120, 40%, 50%)" opacity="0.6" />
          <ellipse cx="520" cy="200" rx="70" ry="50" fill="hsl(120, 40%, 50%)" opacity="0.6" />
          <ellipse cx="650" cy="280" rx="60" ry="50" fill="hsl(120, 40%, 50%)" opacity="0.6" />
          <ellipse cx="600" cy="180" rx="50" ry="40" fill="hsl(120, 40%, 50%)" opacity="0.6" />
        </svg>
        
        {/* Weather markers */}
        <div className="absolute top-8 left-1/4">
          <div className="flex items-center gap-1 bg-background/80 rounded-full px-2 py-1">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="text-xs">22°</span>
          </div>
        </div>
        <div className="absolute top-16 right-1/3">
          <div className="flex items-center gap-1 bg-background/80 rounded-full px-2 py-1">
            <MapPin className="w-3 h-3 text-weather-sun" />
            <span className="text-xs">28°</span>
          </div>
        </div>
        <div className="absolute bottom-8 right-1/4">
          <div className="flex items-center gap-1 bg-background/80 rounded-full px-2 py-1">
            <MapPin className="w-3 h-3 text-weather-rain" />
            <span className="text-xs">18°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
