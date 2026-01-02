import { Cloud, CloudRain, CloudSun, Sun, CloudLightning, CloudSnow } from "lucide-react";

type WeatherCondition = "sunny" | "partly-cloudy" | "cloudy" | "rain" | "thunderstorm" | "snow";

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

export const WeatherIcon = ({ condition, size = "md", className = "" }: WeatherIconProps) => {
  const sizeClass = sizeMap[size];

  switch (condition) {
    case "sunny":
      return <Sun className={`${sizeClass} text-weather-sun ${className}`} />;
    case "partly-cloudy":
      return <CloudSun className={`${sizeClass} text-weather-sunYellow ${className}`} />;
    case "cloudy":
      return <Cloud className={`${sizeClass} text-weather-cloud ${className}`} />;
    case "rain":
      return <CloudRain className={`${sizeClass} text-weather-rain ${className}`} />;
    case "thunderstorm":
      return <CloudLightning className={`${sizeClass} text-weather-rain ${className}`} />;
    case "snow":
      return <CloudSnow className={`${sizeClass} text-weather-cloud ${className}`} />;
    default:
      return <CloudSun className={`${sizeClass} text-weather-sunYellow ${className}`} />;
  }
};
