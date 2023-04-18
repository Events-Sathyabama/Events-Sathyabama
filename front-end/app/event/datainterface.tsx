import {Dayjs} from 'dayjs';
export interface InterfaceBranch{
    name: string;
	batch: string;
	pk: number;
}

export interface InterfaceOrganizer{
    name: string;
	college_id: string;
	role: string;
	pk: number;
}

export interface InterfaceClub {
	name: string;
	abbreviation?: string;
	inputValue?: string;
}

export interface InterfaceParticipant{
	name: string;
	college_id: string;
	role: string;
	pk: number;
	status: number
}

export interface InterfaceData {
	pk: number;
	date: string;
	long_description: string;
	organizer: InterfaceOrganizer[];
	branch: InterfaceBranch[];
	owner: InterfaceOrganizer;
	applied_count: number;
	accepted_count: number;
	total_strength: string;
	image: File | string | undefined;
	title: string | undefined;
	short_description: string | undefined;
	club: InterfaceClub | undefined;
	venue: string | undefined;
	start_date: Dayjs | undefined;
	end_date: Dayjs | undefined;
	time: string | undefined;
	fcfs: boolean;
	status: string;

	// For students only
	is_applied?:boolean,
	is_accepted?:boolean,
	is_declined?:boolean,
	
	// for organizers only
	
	approval_message?:any,
	participant?: InterfaceParticipant[];
	accepted_role?: string[];
	declined_count?:number ,
	pending_count?: number,

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
	fcfs:string | null;
	total_strength: string | null
}

export default {};