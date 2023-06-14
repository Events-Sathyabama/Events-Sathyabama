import LetterAvatar from '../avatar';

interface ProfileProps {
	id: string;
	branch?: string;
	batch?: string,
	name: string;
	role: string;
}

export default function Profile(props: ProfileProps): JSX.Element {
	const {id, branch, name, role, batch} = props;

	return (
		<div className="flex flex-col w-72 md:w-96">
			<div className="bg-white p-3 border border-blue-400 rounded shadow-lg">
				<div className="flex flex-col items-center">
					<LetterAvatar width="8rem" height="8rem" fontSize="3rem"></LetterAvatar>
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
							{role === 'Student' ? 'Reg No.' : 'EID'}
						</span>
						<span className="text-lg ml-auto">{id}</span>
					</li>
					{role === 'Student' && (
						<>
							<li className="flex items-center py-2 px-3">
								<span className="text-lg font-semibold">Branch</span>
								<span className="text-lg ml-auto">{branch}</span>
							</li>
							<li className="flex items-center py-2 px-3">
								<span className="text-lg font-semibold">Batch</span>
								<span className="text-lg ml-auto">{batch}</span>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
