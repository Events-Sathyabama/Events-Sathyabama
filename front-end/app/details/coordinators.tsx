import * as React from 'react';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import LetterAvatar from '../avatar';

interface Coordinator {
	name: string;
	role: string;
	college_id: string;
}

interface CoordinatorProps {
	coordinators: Coordinator[];
}

export default function Coordinators(props: CoordinatorProps) {
	const {coordinators} = props;
	return (
		<List className="flex flex-col py-4 gap-3 w-full border border-gray-300 rounded-md">
			{coordinators.map((coordinator, index) => (
				<div className="flex flex-row pl-4">
					<ListItemAvatar>
						<LetterAvatar
							width="2.5rem"
							height="2.5rem"
							fontSize="1rem"
							name={coordinator.name}></LetterAvatar>
					</ListItemAvatar>
					<div key={index} className="-mt-1 -ml-1">
						<h1 className="text-xl">{coordinator.name}</h1>
						<p className="-mt-1 text-gray-500">
							{coordinator.role + ' Coordinator'}
						</p>
					</div>
				</div>
			))}
		</List>
	);
}
