import dayjs, {Dayjs} from 'dayjs';
export interface InterfaceBranch{
    name: string;
	batch: string;
	pk: number;
}

export interface InterfaceOrganizer{
    name: string;
	college_id: string;
	role: string;
}

export interface InterfaceClub {
	name: string;
	abbreviation?: string;
	inputValue?: string;
}

export interface InterfaceData {
	title: string | undefined;
	club: InterfaceClub | undefined;
	image: File | string | undefined;
	start_date: Dayjs | undefined;
	end_date: Dayjs | undefined;
	short_description: string | undefined;
	long_description: string | undefined;
	branch: InterfaceBranch[];
	date: string | undefined;
	time: string | undefined;
	venue: string | undefined;
	organizer: InterfaceOrganizer[];
	owner: InterfaceOrganizer[];
}

export interface InterfaceError {
	title: string | null;
	club: string | null;
	image: string | null;
	start_date: string | null;
	end_date: string | null;
	short_description: string | null;
	long_description: string | null;
	branch: string | null;
	date: string | null;
	time: string | null;
	venue: string | null;
	organizer: string | null;
}

export default {};