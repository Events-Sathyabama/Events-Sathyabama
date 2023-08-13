import Main from '../main';

export const metadata = {
	title: 'Upcoming Events | Events@Sathyabama',
	description: 'A list of the upcoming events at Sathyabama University.',
};

export default function Upcoming() {
	return <Main url={'event:upcoming_list'} heading="Upcoming Events" />;
}
