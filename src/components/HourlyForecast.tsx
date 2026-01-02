import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const hourlyData = [
  { time: "7:00 AM", temp: 23 },
  { time: "8:00 AM", temp: 25 },
  { time: "9:00 AM", temp: 28 },
  { time: "10:00 AM", temp: 32 },
  { time: "11:00 AM", temp: 35 },
  { time: "12:00 PM", temp: 38 },
  { time: "1:00 PM", temp: 40 },
  { time: "2:00 PM", temp: 42 },
  { time: "3:00 PM", temp: 40 },
  { time: "4:00 PM", temp: 38 },
];

interface HourlyForecastProps {
  location: string;
}

export const HourlyForecast = ({ location }: HourlyForecastProps) => {
  return (
    <div className="weather-card rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Hourly Forecast</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing:</span>
          <span className="text-primary font-medium">{location}</span>
          <span className="text-primary">▼</span>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 10 }}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(222, 47%, 14%)', 
                border: '1px solid hsl(217, 33%, 25%)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [`${value}°C`, 'Temperature']}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="hsl(217, 91%, 60%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: 'hsl(217, 91%, 60%)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
