import {Dayjs} from 'dayjs';
export interface InterfaceBranch {
	name: string;
	batch: string;
	pk: number;
}

export interface InterfaceOrganizer {
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

export interface InterfaceParticipant {
	name: string;
	college_id: string;
	role: string;
	pk: number;
	status: number;
}

export interface InterfaceCreateUpdateSendData {
	pk?: number | undefined;
	organizer: number[];
	image: File | string | undefined;
	title: string;
	short_description: string;
	long_description: string;
	club: string;
	venue: string;
	start_date: string | undefined;
	end_date: string | undefined;
	date: string;
	time: string;
	branch: number[];
	fcfs: boolean;
	total_strength: number;
}

export interface InterfaceCreateEvent {
	pk?: number | undefined;
	organizer: InterfaceOrganizer[];
	image: File | string | undefined;
	title: string | undefined;
	short_description: string | undefined;
	long_description: string | undefined;
	club: InterfaceClub | undefined;
	venue: string | undefined;
	start_date: Dayjs | undefined;
	end_date: Dayjs | undefined;
	date: string | undefined;
	time: string | undefined;
	branch: InterfaceBranch[];
	owner: InterfaceOrganizer;
	fcfs: boolean;
	total_strength: number | undefined;
}

export interface InterfaceData {
	pk: number;
	date: string | undefined;
	long_description: string | undefined;
	organizer: InterfaceOrganizer[];
	branch: InterfaceBranch[];
	owner: InterfaceOrganizer;
	applied_count: number;
	accepted_count: number;
	total_strength: string;
	certificate: string | undefined;
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
	is_applied?: boolean;
	is_accepted?: boolean;
	is_declined?: boolean;

	// for organizers only
	approval_message?: any;
	participant?: InterfaceParticipant[];
	accepted_role?: string[];
	declined_count?: number;
	pending_count?: number;
	history?: TimeLineHistory[];

	// for HOD VC Dean Only
	hod_verified?: boolean;
	dean_verified?: boolean;
	vc_verified?: boolean;

	// for organizer and admins
	rejected?: boolean;
	report_verified?: boolean;
	report?: string;
	certified_quantity?: number;
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
	fcfs: string | null;
	total_strength: string | null;
}

export interface InterfaceCompletedRegisteredEvent {
	data: {
		pk: number;
		title: string;
		applicationStatus: string;
		club: string;
		history: any;
		eventStatus: string;
	}[];
	next: string | null;
	previous: string | null;
	pageNo: number;
	totalPageNo: number;
	setPageNo: Function;
	count: number;
}

export interface InterfaceEventProgress {
	data: {
		status: number;
		title: string;
		club: string;
		pk: number;
		eventStatus: string;
		description: string;
		failed: number;
		history: any;
		failedLabel: string | Array<string>;
	}[];
	pageNo: number;
	totalPageNo: number;
	setPageNo: Function;
	next: string | null;
	previous: string | null;
	count: number;
}

export interface InterfacePaginatedData {
	count: number;
	next: string | null;
	total_pages: number;
	previous: string | null;
	results: any[];
}

export interface TimeLineHistory {
	user: {
		name: string;
		role: string;
		college_id: number;
		batch: string;
		pk: number;
		branch: string;
	};
	success_title: string;
	failure_title: string;
	message: string;
	date: string;
	status: 0 | 1 | 2 | -1;
}

export default {};
