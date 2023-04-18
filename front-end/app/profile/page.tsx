'use client';
import Footer from '../footer';
import Navbar from '../navbar';
import Profile from './profile';
import TabsProfile from './tabsProfile';
import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import API from '@/app/API';
import useEffect from '../useEffect';
const axios = new API.Axios();

export default function ProfilePage(): JSX.Element {
	const [role, setRole] = useState('-');
	const [id, setId] = useState('-');
	const [branch, setBranch] = useState('-');
	const [fullName, setFullName] = useState('-');

  const [loader, setLoader] = useState(0);
	const runOnce = true;

	useEffect(
		async () => {
			setRole(localStorage.getItem('role_name') || '-');
			setFullName(localStorage.getItem('name') || '-');
			setId(localStorage.getItem('id') || '-');

			const id = API.jwt(window.localStorage.getItem('access')).user_id;
			const request = await axios.get(API.get_url('profile_detail', [id]));
			setRole(request.data.role);
			setId(request.data.college_id);
			setBranch(request.data.branch);
			setFullName(request.data.full_name);
		},
		[],
		setLoader,
		runOnce
	);
  
	return (
		<div>
			<Navbar />
			<div className="container mx-auto my-5 p-5">
				<div className="md:flex no-wrap md:-mx-2 ">
					{role === '-' ? (
						<div className="flex flex-col justify-center items-center w-full min-h-[65vh] sm:min-h-[75vh]">
							<CircularProgress />
						</div>
					) : null}
					{role === 'Student' && (
						<div className="flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start">
							<Profile id={id} branch={branch} name={fullName} role="Student" />
							<TabsProfile.Student></TabsProfile.Student>
						</div>
					)}
					{role === 'Teacher' && (
						<div className="flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start">
							<Profile
								id={id}
								branch={branch}
								name={fullName}
								role="Teacher"></Profile>
							<TabsProfile.TeacherHODVC></TabsProfile.TeacherHODVC>
						</div>
					)}
					{role === 'HOD' && (
						<div className="flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start">
							<Profile id={id} branch={branch} name={fullName} role="HOD"></Profile>
							<TabsProfile.TeacherHODVC></TabsProfile.TeacherHODVC>
						</div>
					)}
					{role === 'Vice-Chancellor' && (
						<div className="flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start">
							<Profile
								id={id}
								branch={branch}
								name={fullName}
								role="Vice-Chancellor"></Profile>
							<TabsProfile.TeacherHODVC></TabsProfile.TeacherHODVC>
						</div>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}