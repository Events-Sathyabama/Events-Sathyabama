import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringAvatar(name: string) {
	let initials = name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.slice(0, 2);
	if (!name.includes(' ')) {
		initials = name[0];
	}
	initials = initials.toUpperCase(); // add this line to capitalize the initials
	return {
		sx: {
			bgcolor: '#017efc',
			fontSize: '4rem',
		},
		children: initials,
	};
}

export default function LetterAvatar(props: {name: string}) {
	return <Avatar className="h-32 w-32 rounded-full" {...stringAvatar(props.name)} />;
}
