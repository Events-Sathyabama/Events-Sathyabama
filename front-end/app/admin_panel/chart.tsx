'use client';
import React from 'react';
import {ResponsiveLine} from '@nivo/line';

interface DataPoint {
	x: string;
	y: number;
}

interface ChartData {
	id: string;
	color: string;
	data: DataPoint[];
}

interface LineChartProps {
	data: ChartData[];
}

const LineChart: React.FC<LineChartProps> = ({data}) => (
	<ResponsiveLine
		data={data}
		margin={{top: 50, right: 50, bottom: 50, left: 60}}
		xScale={{type: 'point'}}
		yScale={{
			type: 'linear',
			min: 'auto',
			max: 'auto',
			stacked: true,
			reverse: false,
		}}
		yFormat=" >-.2f"
		curve="catmullRom"
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'Month',
			legendOffset: 36,
			legendPosition: 'middle',
		}}
		axisLeft={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: 'Event Count',
			legendOffset: -40,
			legendPosition: 'middle',
		}}
		colors={{scheme: 'category10'}}
		lineWidth={3}
		pointSize={10}
		pointColor={{theme: 'background'}}
		pointBorderWidth={2}
		pointBorderColor={{from: 'serieColor'}}
		pointLabelYOffset={-12}
		enableArea={true}
		useMesh={true}
	/>
);

export default LineChart;
