import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import styles from './Chart.module.scss';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{label}</div>
        <div className={styles.tooltipLabel}>${payload[0].value}</div>
      </div>
    );
  }

  return null;
};

const Chart = ({ data }) => {
  return <div className={styles.chart}>
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 24,
          right: 8,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C9E7FF" stopOpacity={1}/>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="m" stroke="#8884d8" fill="url(#gradient)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
}

export default Chart;
