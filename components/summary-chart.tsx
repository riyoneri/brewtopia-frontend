"use client";

import classNames from "classnames";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SummaryChartProperties {
  className?: string;
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function SummaryChart({ className }: SummaryChartProperties) {
  return (
    <div className={classNames(className, "flex flex-col")}>
      <h3>Sales this week</h3>
      <div className="grid flex-1">
        <div className="">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={150} data={data}>
              <CartesianGrid strokeDasharray="3" />
              <YAxis />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" className="!fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
