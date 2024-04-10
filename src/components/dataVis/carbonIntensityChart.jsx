import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, Area } from 'recharts';
import { isBefore, parseISO, format } from 'date-fns';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription'; 

const CarbonIntensityChart = ({ data }) => {
    const now = new Date();

    const minutes = now.getMinutes();

    // Round down to the nearest half-hour by adjusting minutes and seconds
    if (minutes < 30) {
    now.setMinutes(0, 0); // Set to XX:00:00
    } else {
    now.setMinutes(30, 0); // Set to XX:30:00
    }

    // Format the adjusted date
    const nowForReferenceLine = format(now, "yyyy-MM-dd'T'HH:mm'Z'");

    // Function to format the XAxis ticks
    const formatXAxis = (tickItem) => {
        return format(parseISO(tickItem), 'HH:mm');
    };

    // Customized dot component to differentiate past from future data points
    const CustomizedDot = (props) => {
        const { cx, cy, payload } = props;
        
        if (carbonIntensityDescription(payload.forecast).level === 'Very Low') {
            console.log(payload.forecast , "= Very Low")
            return <circle cx={cx} cy={cy} r={4} fill="var(--veryLowColour)" />;
        } else if (carbonIntensityDescription(payload.forecast).level === 'Low') {
            console.log(payload.forecast , "= Low")
            return <circle cx={cx} cy={cy} r={4} fill="var(--lowColour)" />;
        } else if (carbonIntensityDescription(payload.forecast).level === 'Moderate') {
            console.log(payload.forecast , "= Moderate")
            return <circle cx={cx} cy={cy} r={4} fill="var(--midColour)" />;
        } else if (carbonIntensityDescription(payload.forecast).level === 'High') {
            console.log(payload.forecast , "= High")
            return <circle cx={cx} cy={cy} r={4} fill="var(--highColour)" />;
        } else {
            console.log(payload.forecast , "= Very High")
            return <circle cx={cx} cy={cy} r={4} fill="var(--veryHighColour)" />;
        }
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
                    left: -22,
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
                    label={{ value: 'Now', position: 'insideTop', fill: 'var(--text-colour-primary)' }}
                    strokeDasharray="5, 5"
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CarbonIntensityChart;
