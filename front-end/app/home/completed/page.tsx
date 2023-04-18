import Main from '../main';

export const metadata = {
	title: 'Completed Events | Events@Sathyabama',
	description: 'A list of the completed events at Sathyabama University.',
};

export default function Completed() {
	return <Main url={'event:completed_list'} heading="Completed Events" />;
}
