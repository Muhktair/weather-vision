import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

const rainfallData = [
  { month: "1", rainfall: 40, isHighlight: false },
  { month: "2", rainfall: 65, isHighlight: false },
  { month: "3", rainfall: 80, isHighlight: false },
  { month: "4", rainfall: 55, isHighlight: false },
  { month: "5", rainfall: 45, isHighlight: false },
  { month: "6", rainfall: 90, isHighlight: true },
  { month: "7", rainfall: 70, isHighlight: false },
  { month: "8", rainfall: 60, isHighlight: false },
];

export const MonthlyRainfall = () => {
  return (
    <div className="weather-card rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Monthly Rainfall</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-weather-rainLight"></div>
            <span className="text-xs text-muted-foreground">Rain</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-weather-rain"></div>
            <span className="text-xs text-muted-foreground">Max</span>
          </div>
        </div>
      </div>
      
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rainfallData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'hsl(222, 47%, 14%)', 
                border: '1px solid hsl(217, 33%, 25%)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [`${value}mm`, 'Rainfall']}
            />
            <Bar 
              dataKey="rainfall" 
              radius={[4, 4, 0, 0]}
              maxBarSize={35}
            >
              {rainfallData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isHighlight ? 'hsl(217, 91%, 50%)' : 'hsl(199, 89%, 70%)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
