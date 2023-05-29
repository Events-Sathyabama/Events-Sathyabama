import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge, {BadgeProps} from '@mui/material/Badge';
import {styled} from '@mui/material/styles';

interface NotificationIconButtonProps {
	notificationCount: number;
}

const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
	'& .MuiBadge-badge': {
		right: 5,
		top: 3,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}));

export default function NotificationIconButton({
	notificationCount,
}: NotificationIconButtonProps) {
	return (
		<div className="flex w-10 justify-center items-center h-10 hover:bg-blue-50 hover:border-blue-300 transition-all duration-400 border border-gray-300 rounded-full">
			{notificationCount > 0 ? (
				<StyledBadge badgeContent={notificationCount} color="warning">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.2}
						stroke="currentColor"
						className="w-[1.85rem] h-[1.85rem] text-gray-600">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</StyledBadge>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7 text-gray-600">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
					/>
				</svg>
			)}
		</div>
	);
}
