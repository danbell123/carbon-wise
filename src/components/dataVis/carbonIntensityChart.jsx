import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, Area } from 'recharts';
import { isBefore, parseISO, format } from 'date-fns';
import { useViewportWidth } from '../../hooks/useViewportWidth';

const CarbonIntensityChart = ({ data }) => {
    const now = new Date();

    // Assuming your data uses UTC for 'from', format 'now' in a similar style
    // This example formats 'now' to an ISO string without milliseconds and with a 'Z' timezone indicator
    const nowForReferenceLine = format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    // Function to format the XAxis ticks
    const formatXAxis = (tickItem) => {
        return format(parseISO(tickItem), 'HH:mm');
    };

    // Function to determine if a data point is in the past
    const isPast = (date) => isBefore(parseISO(date), now);

    // Customized dot component to differentiate past from future data points
    const CustomizedDot = (props) => {
        const { cx, cy, payload } = props;
        
        if (isPast(payload.from)) {
            return <circle cx={cx} cy={cy} r={3} fill="var(--primary-colour)" />;
        }
        return <circle cx={cx} cy={cy} r={3} fill="var(--forecast-colour)" />;
    };

    // Decide interval based on viewport width
    let interval;
    let fontSize;
    let width = useViewportWidth();
    if (width < 768) { // Example breakpoint for "mobile"
        interval = 14; // Show fewer labels on smaller screens
        fontSize = '0.85rem'; // Adjust font size for smaller screens
    } else if (width < 1024) { // Example breakpoint for "tablet"
        interval = 20; // Show fewer labels on smaller screens
        fontSize = '0.85rem'; 
    } else if (width < 1280) { // Example breakpoint for "laptop"
        interval = 12; // Show more labels on larger screens
        fontSize = '0.9rem'; 
    } else {
        interval = 8; // Default interval
        fontSize = '1rem'; 
    }

    const axisTickStyle = { fontSize: fontSize, fill: 'var(--text-colour-primary)' };

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={data}
                margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
                >
                <XAxis 
                    dataKey="from" 
                    tickFormatter={formatXAxis} 
                    stroke="var(--text-colour-secondary)" 
                    interval={interval}
                    tick={axisTickStyle}
                />
                <YAxis 
                    stroke="var(--text-colour-secondary)" 
                    tick={axisTickStyle}
                /> 
                <Tooltip />
                <Line
                    type="linear"
                    dataKey="forecast"
                    stroke="var(--text-colour-secondary)" // Color for the line
                    dot={<CustomizedDot />}
                />
                <ReferenceLine
                    x={nowForReferenceLine} // Reference line at the current time
                    stroke="var(--text-colour-secondary)" // Color for the current time reference line
                    label={{ value: 'Now', position: 'insideTop', fill: 'var(--primary-colour)' }}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CarbonIntensityChart;
