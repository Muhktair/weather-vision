import { useState } from "react";
import { WeatherIcon } from "./WeatherIcon";
import { Wind, Droplets, Home, Users, Settings } from "lucide-react";

type TemperatureUnit = "celsius" | "fahrenheit";
type ForecastRange = "4 Days" | "15 Days" | "30 Days";

const forecastData = [
  { day: "Wednesday, July 12", condition: "partly-cloudy" as const, temp: 19 },
  { day: "Thursday, July 13", condition: "rain" as const, temp: 17 },
  { day: "Friday, July 14", condition: "rain" as const, temp: 17 },
  { day: "Saturday, July 15", condition: "sunny" as const, temp: 22 },
  { day: "Sunday, July 16", condition: "sunny" as const, temp: 24 },
];

export const ForecastSidebar = () => {
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [range, setRange] = useState<ForecastRange>("4 Days");

  const convertTemp = (temp: number) => {
    if (unit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <div className="sidebar-light h-full flex flex-col rounded-l-3xl shadow-2xl">
      {/* User avatar */}
      <div className="flex justify-end p-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">J</span>
          </div>
        </div>
      </div>

      {/* Current weather display */}
      <div className="px-6 pb-6 text-center">
        <div className="flex justify-center mb-2">
          <WeatherIcon condition="partly-cloudy" size="xl" />
        </div>
        <div className="text-5xl font-bold text-sidebar-foreground mb-1">
          {convertTemp(20)}{unitSymbol}
        </div>
        <div className="text-muted-foreground text-sm mb-4">Partly Cloudy</div>
        
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">20 Km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-weather-rain" />
            <span className="text-muted-foreground">15%</span>
          </div>
        </div>
      </div>

      {/* Forecast section */}
      <div className="flex-1 px-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sidebar-foreground">Weather Forecast</h3>
          <select 
            value={unit}
            onChange={(e) => setUnit(e.target.value as TemperatureUnit)}
            className="text-xs bg-muted/30 border border-border/30 rounded-md px-2 py-1 text-sidebar-foreground"
          >
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
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
                  : "forecast-tab hover:bg-muted/50"
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
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                index === 0 ? "bg-primary text-primary-foreground" : "hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <WeatherIcon 
                  condition={item.condition} 
                  size="sm" 
                  className={index === 0 ? "text-primary-foreground" : ""}
                />
                <div>
                  <div className={`text-sm font-medium ${index === 0 ? "" : "text-sidebar-foreground"}`}>
                    {item.day.split(",")[0]}
                  </div>
                  <div className={`text-xs ${index === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {item.day.split(",")[1]}
                  </div>
                </div>
              </div>
              <div className={`text-lg font-semibold ${index === 0 ? "" : "text-sidebar-foreground"}`}>
                {convertTemp(item.temp)}{unitSymbol}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="p-4">
        <div className="flex justify-center gap-3 bg-sidebar-foreground rounded-full p-2">
          <button className="p-3 rounded-full bg-primary text-primary-foreground">
            <Home className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
