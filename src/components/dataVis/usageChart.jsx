import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import { parseISO, format, isValid, eachDayOfInterval, startOfDay } from 'date-fns';

const UsageChart = ({ data }) => {
    const width = useViewportWidth();

    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    // Sort data by timestamp to ensure correct order in the chart
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const startDate = startOfDay(new Date(data[0].timestamp));
    const endDate = startOfDay(new Date(data[data.length - 1].timestamp));

    // Generate a list of all days between the start and end date
    const days = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const formatXAxis = (tickItem) => {
        try {
            const date = parseISO(tickItem);
            if (!isValid(date)) {
                console.error("Invalid date after parsing:", tickItem);
                return tickItem;
            }
            return format(date, 'HH:mm');
        } catch (error) {
            console.error("Error parsing or formatting date for X axis:", error, tickItem);
            return tickItem;
        }
    };

    const renderTooltipContent = (props) => {
        const { active, payload } = props;
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-bg-outer rounded-lg p-2 flex flex-col gap-2" >
                    <div className='flex flex-row justify-start gap-5'>
                        <span className="material-symbols-outlined text-text-colour-primary size-2">schedule</span>
                        <p className="label text-text-colour-primary">{`${format(parseISO(data.timestamp), 'dd/MM HH:mm')}`}</p>
                    </div>
                    <div className='flex flex-row justify-start gap-5'>
                        <span className="material-symbols-outlined text-text-colour-primary size-2">bolt</span>
                        <p className="intro text-text-colour-primary">{`${data.kWh} kWh`}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const axisTickStyle = {
        fontSize: width < 1024 ? '0.85rem' : width < 1280 ? '0.9rem' : '1rem',
        fill: 'var(--text-colour-primary)'
    };

    return (
        <div className="w-full h-[40vh] xl:h-[65vh]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="2 2" stroke="var(--text-colour-tertiary)"/>
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="var(--text-colour-secondary)"
                        tick={axisTickStyle}
                    />
                    <YAxis stroke="var(--text-colour-secondary)" tick={axisTickStyle} />
                    <Tooltip content={renderTooltipContent} />
                    {days.map(day => (
                        <ReferenceLine key={day} x={day.toISOString()} stroke="red" label={format(day, 'MMM dd')} />
                    ))}
                    <Line
                        type="bump"
                        dataKey="kWh"
                        stroke="var(--primary-colour)"
                        dot={false}
                        activeDot={{ r: 4 }}
                        connectNulls={true}
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
