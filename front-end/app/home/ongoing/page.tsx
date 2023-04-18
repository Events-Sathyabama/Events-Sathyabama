import Main from '../main';

export const metadata = {
	title: 'Ongoing Events | Events@Sathyabama',
	description: 'A list of the ongoing events at Sathyabama University.',
};

export default function Ongoing() {
	return <Main url={'event:ongoing_list'} heading="Ongoing Events" />;
}
