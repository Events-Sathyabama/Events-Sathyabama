import {Button} from '@mui/material';
const ViewReport = (props: {reportLink: string | undefined}) => {
	return (
		<div className="flex flex-col sm:flex-row w-full justify-between p-3 gap-2 items-center border border-blue-300 bg-blue-50 rounded-md text-lg">
			<p className="text-lg text-[#014361] text-center mx-1">
				You can access the event report by clicking here!
			</p>
			<a href={props.reportLink} target="_blank">
				<Button
					variant="contained"
					style={{backgroundColor: '#1565c0'}}
					className="w-72">
					View Event Report
				</Button>
			</a>
		</div>
	);
};
export default ViewReport;
