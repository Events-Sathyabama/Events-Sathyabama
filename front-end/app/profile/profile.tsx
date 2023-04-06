interface ProfileProps {
	id: string;
	branch?: string;
	name: string;
	role: string;
}

export default function Profile(props: ProfileProps): JSX.Element {
	const {id, branch, name, role} = props;

	return (
		<div className="flex flex-col w-72 md:w-96">
			<div className="bg-white p-3 border border-blue-400 rounded shadow-lg">
				<div className="flex flex-col items-center">
					<img
						className="h-32 w-32 rounded-full border border-gray-300"
						src="/Profile.png"
						alt=""
					/>
					<p className="text-gray-900 text-center truncate w-64 font-bold text-2xl my-2">
						{name}
					</p>
				</div>

				<ul className="bg-gray-100 text-gray-600 mt-3 rounded shadow-sm border border-gray-200 divide-y divide-gray-300">
					<li className="flex items-center py-2 px-3">
						<span className="text-lg font-semibold">Role</span>
						<span className="ml-auto">
							<span className="bg-green-500 py-1 px-2 rounded text-white text-lg">
								{role}
							</span>
						</span>
					</li>
					<li className="flex items-center py-2 px-3">
						<span className="text-lg font-semibold">
							{role === 'Student' ? 'Register Number' : 'Employee ID'}
						</span>
						<span className="text-lg ml-auto">{id}</span>
					</li>
					{role === 'Student' && (
						<li className="flex items-center py-2 px-3">
							<span className="text-lg font-semibold">Branch</span>
							<span className="text-lg ml-auto">{branch}</span>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
