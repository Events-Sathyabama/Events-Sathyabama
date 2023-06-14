import React from 'react';
import {CircularProgress} from '@mui/material';

interface CircularProgressBarProps {
	remainingHeight: string;
	remainingWidth: string;
}

const CircularLoader: React.FC<CircularProgressBarProps> = ({
	remainingHeight,
	remainingWidth,
}) => {
	return (
		<div
			className="flex justify-center items-center"
			style={{
				height: remainingHeight,
				width: remainingWidth,
			}}>
			<CircularProgress />
		</div>
	);
};

export default CircularLoader;
