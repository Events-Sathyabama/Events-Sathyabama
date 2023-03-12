import API from '../API';

const axios = new API.Axios();

export default async function card_call(
	pageNo: number,
	query: string,
	setPageNo: Function,
	totalPage: number,
	setTotalPage: Function,
	setData: Function,
	url_name: string
) {
	if (pageNo > totalPage) {
		return;
	}
	(async () => {
		try {
			const request = await axios.get(API.get_url(url_name), {
				page: pageNo,
				q: query,
			});
			if (request.status === 200) {
				if (!request.data.hasOwnProperty('results')) {
					setPageNo(1);
					return;
				}
				setTotalPage(request.data.total_pages);
				setData(request.data.results);
			}
		} catch (err: any) {
			if (err.response.status === 404) {
				setPageNo(1);
			}
		}
	})();
}
