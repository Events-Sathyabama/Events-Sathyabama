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
						<>
							<Profile.Student id={id} branch={branch} name={fullName} />
							<TabsProfile.Student></TabsProfile.Student>
						</>
					)}
					{role === 'Teacher' && (
						<>
							<Profile.Teacher
								id={id}
								branch={branch}
								name={fullName}></Profile.Teacher>
							<TabsProfile.Teacher></TabsProfile.Teacher>
						</>
					)}
					{role === 'HOD' && (
						<>
							<Profile.HOD id={id} branch={branch} name={fullName}></Profile.HOD>
							<TabsProfile.HOD></TabsProfile.HOD>
						</>
					)}
					{role === 'Vice-Chancellor' && (
						<>
							<Profile.VC id={id} branch={branch} name={fullName}></Profile.VC>
							<TabsProfile.VC></TabsProfile.VC>
						</>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}
