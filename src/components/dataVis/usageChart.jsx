import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useViewportWidth } from '../../hooks/useViewportWidth';
import { parseISO, format, isValid, eachMinuteOfInterval, differenceInMinutes, startOfMinute } from 'date-fns';

const UsageChart = ({ data }) => {
    const width = useViewportWidth();

    if (!data || data.length === 0) {
        return <p>No data available.</p>;
    }

    // Sort data by timestamp to ensure correct order in the chart
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Find the full range from start to end
    const startDate = new Date(data[0].timestamp);
    const endDate = new Date(data[data.length - 1].timestamp);

    // Create a full range of dates from start to end with the same granularity as your dataset
    const fullDateRange = eachMinuteOfInterval({
      start: startDate,
      end: endDate
    }, { step: 1 }); // Change `step` to match the expected interval of your data points

    // Reduce the existing data into a map for quick lookup
    const dataMap = data.reduce((map, item) => {
        const dateKey = startOfMinute(new Date(item.timestamp)).toISOString(); // Normalize date to minute start
        map[dateKey] = item.kWh;
        return map;
    }, {});

    // Map full date range to objects, using data from the map or null if not present
    const completeData = fullDateRange.map(date => {
        const dateKey = date.toISOString();
        return {
            timestamp: dateKey,
            kWh: dataMap[dateKey] ?? null  // Use null for missing kWh values
        };
    });

    const formatXAxis = (tickItem) => {
        if (!tickItem) {
            console.error("Invalid tick item received:", tickItem);
            return "";
        }

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
                <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                    <p className="label">{`Time: ${format(parseISO(data.timestamp), 'HH:mm:ss')}`}</p>
                    <p className="intro">{`Energy Used: ${data.kWh} kWh`}</p>
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
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={completeData}
                    margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxis}
                        stroke="var(--text-colour-secondary)"
                        tick={axisTickStyle}
                    />
                    <YAxis stroke="var(--text-colour-secondary)" tick={axisTickStyle} />
                    <Tooltip content={renderTooltipContent} />
                    <Line
                        type="monotone"
                        dataKey="kWh"
                        stroke="var(--primary-colour)"
                        dot={false}
                        activeDot={{ r: 4 }}
                        connectNulls={false}
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UsageChart;
