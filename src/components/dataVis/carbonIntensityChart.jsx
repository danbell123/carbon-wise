import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { parseISO, format } from 'date-fns';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import carbonIntensityDescription from '../../utils/carbonIntensityDescription'; 

const CarbonIntensityChart = ({ data }) => {
    // Immediately use the hook at the top level
    const width = useViewportWidth();

    // Check for data validity at the top level before any other logic
    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    // Date processing
    const now = new Date();
    const minutes = now.getMinutes();
    now.setMinutes(minutes < 30 ? 0 : 30, 0);
    const nowForReferenceLine = format(now, "yyyy-MM-dd'T'HH:mm'Z'");

    // Determine viewport-based styling
    let interval, fontSize;
    if (width < 768) {
        interval = 14;
        fontSize = '0.85rem';
    } else if (width < 1024) {
        interval = 20;
        fontSize = '0.85rem';
    } else if (width < 1280) {
        interval = 12;
        fontSize = '0.9rem';
    } else {
        interval = 8;
        fontSize = '1rem';
    }

    const axisTickStyle = { fontSize, fill: 'var(--text-colour-primary)' };

    const formatXAxis = (tickItem) => {
        try {
            return format(parseISO(tickItem), 'HH:mm');
        } catch (error) {
            console.error("Error parsing date for X axis:", error);
            return tickItem; // Fallback to showing unformatted date
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { forecast, from } = payload[0].payload;    
            return (
                <div className="custom-tooltip bg-bg-outer rounded-lg p-2 flex flex-col gap-2">
                    <div className='flex flex-row justify-start gap-5'>
                        <span className="material-symbols-outlined text-text-colour-primary">schedule</span>
                        <p className="text-text-colour-primary">{format(parseISO(from), 'dd/MM HH:mm')}</p>
                    </div>
                    <div className='flex flex-row justify-start gap-5'>
                        <span className="material-symbols-outlined text-text-colour-primary">scatter_plot</span>
                        <p className="text-text-colour-primary">{`${forecast} gCO2/kWh`}</p>
                    </div>
                </div>
            );
        }
    
        return null;
    };

    const CustomizedDot = (props) => {
        const { cx, cy, payload } = props;
        try {
            const intensityLevel = carbonIntensityDescription(payload.forecast).level;
            const colorMap = {
                'Very Low': 'var(--veryLowColour)',
                'Low': 'var(--lowColour)',
                'Moderate': 'var(--midColour)',
                'High': 'var(--highColour)',
                'Very High': 'var(--veryHighColour)'
            };
            return <circle cx={cx} cy={cy} r={4} fill={colorMap[intensityLevel] || 'gray'} />;
        } catch (error) {
            console.error("Error rendering custom dot:", error);
            return null; // Avoid rendering a faulty dot
        }
    };

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -22, bottom: 0 }}
                >
                    <XAxis
                        dataKey="from"
                        tickFormatter={formatXAxis}
                        stroke="var(--text-colour-secondary)"
                        interval={interval}
                        tick={axisTickStyle}
                    />
                    <YAxis stroke="var(--text-colour-secondary)" tick={axisTickStyle} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="linear"
                        dataKey="forecast"
                        stroke="var(--text-colour-secondary)"
                        dot={<CustomizedDot />}
                    />
                    <ReferenceLine
                        x={nowForReferenceLine}
                        stroke="var(--text-colour-secondary)"
                        label={{ value: 'Now', position: 'insideTop', fill: 'var(--text-colour-primary)' }}
                        strokeDasharray="5, 5"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CarbonIntensityChart;
