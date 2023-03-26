'use client';
import Footer from '../footer';
import Navbar from '../navbar';
import Profile from './profile';
import TabsProfile from './tabsProfile';
import {useEffect, useState} from 'react';
import API from '@/app/API';
const axios = new API.Axios();

export default function ProfilePage(): JSX.Element {
	const [role, setRole] = useState('-');
	const [id, setId] = useState('-');
	const [branch, setBranch] = useState('-');
	const [fullName, setFullName] = useState('-');
	useEffect(() => {
		setRole(localStorage.getItem('role_name') || '-');
		setFullName(localStorage.getItem('name') || '-');
		setId(localStorage.getItem('id') || '-');

		(async () => {
			const id = API.jwt(window.localStorage.getItem('access')).user_id;
			const request = await axios.get(API.get_url('profile_detail', [id]));
			console.log(request.data);
			setRole(request.data.role);
			setId(request.data.college_id);
			setBranch(request.data.branch);
			setFullName(request.data.full_name);
		})();
	}, []);
	return (
		<div>
			<Navbar />
			<div className="container mx-auto my-5 p-5">
				<div className="md:flex no-wrap md:-mx-2 ">
					{role === 'Student' && (
						<div className='flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start'>
							<Profile id={id} branch={branch} name={fullName} role="Student" />
							<TabsProfile.Student></TabsProfile.Student>
						</div>
					)}
					{role === 'Teacher' && (
						<div className='flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start'>
							<Profile
								id={id}
								branch={branch}
								name={fullName}
								role="Teacher"></Profile>
							<TabsProfile.Teacher></TabsProfile.Teacher>
						</div>
					)}
					{role === 'HOD' && (
						<div className='flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start'>
							<Profile id={id} branch={branch} name={fullName} role="HOD"></Profile>
							<TabsProfile.HOD></TabsProfile.HOD>
						</div>
					)}
					{role === 'Vice-Chancellor' && (
						<div className='flex w-full flex-col md:flex-row gap-3 justify-center items-center md:items-start'>
							<Profile
								id={id}
								branch={branch}
								name={fullName}
								role="Vice-Chancellor"></Profile>
							<TabsProfile.VC></TabsProfile.VC>
						</div>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}
