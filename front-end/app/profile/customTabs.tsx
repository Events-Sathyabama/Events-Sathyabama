import Image from 'next/image';
import React from 'react';
import API from '../API';
import {
	InterfaceCompletedRegisteredEvent,
	InterfaceEventProgress,
	InterfacePaginatedData,
} from '../datainterface';
import Paginator from '../pagination';
import useEffect from '../useEffect';
import {CardsLoader} from './LoadingCards';
import ProfileCards from './profileCards';

const axios = new API.Axios();

function TabPanel(props: any) {
	const {children, value, index, ...other} = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && (
				<div className="flex flex-col gap-2 w-full items-center justify-center">
					{children}
				</div>
			)}
		</div>
	);
}

interface InterfacePanelProps {
	value: number;
	setLoader: any;
	Loader: number;
	index: number;
}

function RegisteredEventPanel(props: InterfacePanelProps) {
	const {value, setLoader, Loader, index} = props;

	const [event, setEvent] = React.useState<InterfaceCompletedRegisteredEvent>();
	const [pageNo, setPageNo] = React.useState(1);

	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:registered'), {
					page: pageNo,
				});
				const data: InterfacePaginatedData = response.data;
				setEvent({
					pageNo: pageNo,
					totalPageNo: data.total_pages,
					data: response.data.results,
					next: data.next,
					previous: data.previous,
					count: data.count,
					setPageNo: setPageNo,
				});
				console.log('registered: ', data, 'Pageno: ', pageNo);
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[pageNo],
		setLoader
	);
	return (
		<TabPanel value={value} index={index}>
			{/* Events which the student has opted-in to participate. (Will contain pending
					for approval, accepted) */}
			{event !== undefined && event.data.length > 0 ? (
				event.data.map((event) => {
					return (
						<ProfileCards
							title={event.title}
							club={event.club}
							pk={event.pk}
							history={event.history}
							applicationStatus={event.applicationStatus}
							eventStatus={event.eventStatus}
						/>
					);
				})
			) : event?.data === undefined ? (
				<CardsLoader />
			) : (
				<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
					<Image src="/profileFallback.svg" width={250} height={250} alt="No Data" />
					<p className="text-lg font-normal text-[#1976d2] mt-4">
						No registered events.
					</p>
				</div>
			)}
			{event !== undefined && (event.next !== null || event.previous !== null) && (
				<Paginator
					pageNo={event.pageNo}
					totalPage={event.totalPageNo}
					setPageNo={event.setPageNo}
				/>
			)}
		</TabPanel>
	);
}

function PendingEventPanel(props: InterfacePanelProps) {
	const {value, setLoader, Loader, index} = props;

	const [event, setEvent] = React.useState<InterfaceEventProgress>();
	const [pageNo, setPageNo] = React.useState(1);
	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:pending'), {
					page: pageNo,
				});
				const data: InterfacePaginatedData = response.data;
				console.log('Pending: ', data);
				setEvent({
					pageNo: pageNo,
					totalPageNo: data.total_pages,
					data: data.results,
					next: data.next,
					previous: data.previous,
					count: data.count,

					setPageNo: setPageNo,
				});
				console.log('Pending: ', data);
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[pageNo],
		setLoader
	);

	return (
		<TabPanel value={value} index={index}>
			{/* Events which are organised by the teacher and pending for approval. */}
			{event !== undefined && event.data.length > 0 ? (
				event.data.map((event) => {
					return (
						<ProfileCards
							variant="organiser"
							title={event.title}
							club={event.club}
							pk={event.pk}
							eventStatus={event.eventStatus}
							description={event.description}
							failed={event.failed}
							history={event.history}
							failedLabel={event.failedLabel}
						/>
					);
				})
			) : event?.data === undefined ? (
				<CardsLoader />
			) : (
				<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
					<Image src="/profileFallback.svg" width={250} height={250} alt="No Data" />
					<p className="text-lg font-normal text-[#1976d2] mt-4">
						No events pending for approval.
					</p>
				</div>
			)}
			{event !== undefined && (event.next !== null || event.previous !== null) && (
				<Paginator
					pageNo={event.pageNo}
					totalPage={event.totalPageNo}
					setPageNo={event.setPageNo}
				/>
			)}
		</TabPanel>
	);
}

function CompletedEventPanel(props: InterfacePanelProps) {
	const {value, setLoader, Loader, index} = props;
	const [event, setEvent] = React.useState<InterfaceCompletedRegisteredEvent>();
	const [pageNo, setPageNo] = React.useState(1);
	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:completed'), {
					page: pageNo,
				});
				const data: InterfacePaginatedData = response.data;
				console.log('Completed: ', data);
				setEvent({
					pageNo: pageNo,
					totalPageNo: data.total_pages,
					data: response.data.results,
					next: data.next,
					previous: data.previous,
					count: data.count,
					setPageNo: setPageNo,
				});
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[pageNo],
		setLoader
	);
	return (
		<TabPanel value={value} index={index}>
			{/* Events which the student has opted-in and has completed. */}
			{event !== undefined && event.data.length > 0 ? (
				event.data.map((event) => {
					return (
						<ProfileCards
							title={event.title}
							club={event.club}
							pk={event.pk}
							applicationStatus={event.applicationStatus}
							eventStatus={event.eventStatus}
							history={event.history}
						/>
					);
				})
			) : event?.data === undefined ? (
				<CardsLoader />
			) : (
				<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
					<Image src="/profileFallback.svg" width={250} height={250} alt="No Data" />
					<p className="text-lg font-normal text-[#1976d2] mt-4">
						No completed events.
					</p>
				</div>
			)}
			{event !== undefined && (event.next !== null || event.previous !== null) && (
				<Paginator
					pageNo={event.pageNo}
					totalPage={event.totalPageNo}
					setPageNo={event.setPageNo}
				/>
			)}
		</TabPanel>
	);
}

function OrganisingEventPanel(props: InterfacePanelProps) {
	const {value, setLoader, Loader, index} = props;

	const [pageNo, setPageNo] = React.useState(1);
	const [event, setEvent] = React.useState<InterfaceEventProgress>();
	useEffect(
		() => {
			const query = window.setTimeout(async () => {
				const response = await axios.get(API.get_url('event:organizing'), {
					page: pageNo,
				});

				const data: InterfacePaginatedData = response.data;
				console.log('Organizing: ', data);
				setEvent({
					pageNo: pageNo,
					totalPageNo: data.total_pages,
					data: data.results,
					next: data.next,
					previous: data.previous,
					count: data.count,
					setPageNo: setPageNo,
				});
			});
			return () => {
				window.clearInterval(query);
			};
		},
		[pageNo],
		setLoader
	);
	return (
		<TabPanel value={value} index={index}>
			{/* Events which the student is organising i.e. Student Coordinator */}
			{event !== undefined && event.data.length > 0 ? (
				event.data.map((event) => {
					return (
						<ProfileCards
							variant="organiser"
							current={event.status}
							title={event.title}
							club={event.club}
							pk={event.pk}
							eventStatus={event.eventStatus}
							description={event.description}
							failed={event.failed}
							history={event.history}
							failedLabel={event.failedLabel}
						/>
					);
				})
			) : event?.data === undefined ? (
				<CardsLoader />
			) : (
				<div className="flex flex-col w-full py-4 sm:py-0 sm:min-h-[68vh] items-center justify-center">
					<Image src="/profileFallback.svg" width={250} height={250} alt="No Data" />
					<p className="text-lg font-normal text-[#1976d2] mt-4">
						No organising events.
					</p>
				</div>
			)}
			{event !== undefined && (event.next !== null || event.previous !== null) && (
				<Paginator
					pageNo={event.pageNo}
					totalPage={event.totalPageNo}
					setPageNo={event.setPageNo}
				/>
			)}
		</TabPanel>
	);
}

export default {
	RegisteredEvent: RegisteredEventPanel,
	OrganisingEvent: OrganisingEventPanel,
	CompletedEvent: CompletedEventPanel,
	PendingEvent: PendingEventPanel,
};
