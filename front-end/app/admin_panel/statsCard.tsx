import React from 'react';

interface StatsCardProps {
	statCount: number;
	statDescription: string;
	statPeriod: string;
}

const StatsCard: React.FC<StatsCardProps> = (props) => {
	const {statCount, statDescription, statPeriod} = props;

	return (
		<div className="flex flex-col p-5 border border-gray-300 rounded-md shadow-md w-40 sm:w-48 bg-white">
			<p className="text-7xl font-medium text-[#017efc] truncate">{statCount}</p>
			<p className="text-black text-lg font-medium truncate">{statDescription}</p>
			<p className="truncate">{statPeriod}</p>
		</div>
	);
};

export default StatsCard;
