import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge, {BadgeProps} from '@mui/material/Badge';
import {styled} from '@mui/material/styles';

function stringAvatar(
	width: string,
	height: string,
	fontSize: string,
	nameinput?: string
) {
	const [initials, setInitials] = React.useState('');

	React.useEffect(() => {
		const name = nameinput ? nameinput : localStorage.getItem('name') ?? '';
		const initials = name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
		setInitials(initials);
	}, []);

	if (initials === '') {
		return (
			<Avatar
				sx={{
					width: width,
					height: height,
					borderRadius: '9999px',
					bgcolor: 'gray',
					fontSize: fontSize,
				}}
			/>
		);
	}

	return (
		<Avatar
			sx={{
				width: width,
				height: height,
				borderRadius: '9999px',
				bgcolor: 'gray',
				fontSize: fontSize,
			}}>
			{initials}
		</Avatar>
	);
}

interface LetterAvatarProps {
	width: string;
	height: string;
	fontSize: string;
	name?: string;
}

export default function LetterAvatar(props: LetterAvatarProps) {
	return stringAvatar(props.width, props.height, props.fontSize, props.name);
}
