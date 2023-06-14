import Pagination from '@mui/material/Pagination';

interface pageProps {
	totalPage: number;
	pageNo: number;
	setPageNo: Function;
}

export default function Paginator(props: pageProps) {
	return (
		<Pagination
			count={props.totalPage}
			page={props.pageNo}
			onChange={(event, value) => {
				props.setPageNo(value);
			}}
			color="primary"
			
		/>
	);
}
