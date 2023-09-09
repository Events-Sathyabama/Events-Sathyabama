import {CircularProgress} from '@mui/material';
import React from 'react';

interface CircularProgressBarProps {
	remainingHeight: string;
	remainingWidth: string;
}

const CircularLoader: React.FC<CircularProgressBarProps> = ({
	remainingHeight,
	remainingWidth,
}) => {
	debugger;
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
