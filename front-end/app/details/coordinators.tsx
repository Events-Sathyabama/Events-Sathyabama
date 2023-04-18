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
	console.log(coordinators);
	return (
		<div className="flex flex-col w-full -mt-3">
			{coordinators.map((coordinator, index) => (
				<div key={index} className="mt-3">
					<h1 className="text-xl">{coordinator.name}</h1>
					<p className="-mt-1 text-gray-500">{coordinator.role + ' Coordinator'}</p>
				</div>
			))}
		</div>
	);
}
