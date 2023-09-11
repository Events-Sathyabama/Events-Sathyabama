import axios from 'axios';


export async function GET(request: Request) {
  // Define the custom URL you want to send the GET request to.
  
  const customURL = process.env.BACKEND_URL + '/api/event/change_event_status_to_complete?run_cron_job=true';
  
  const HTTP404 = new Response(undefined, {
    status:404,
    headers: {'Content-Type': 'text/json'}
  })

  const url = new URL(request.url);


  const params = new URLSearchParams(url.search);
  if(params.get('sync_backend_db_to_updated') !== 'true'){
    return HTTP404
  }
  try {
    const response = await axios({method:'get',url:customURL});
      return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: { 'Content-Type': 'text/json' },
      });
  } catch (error:any) {
    return HTTP404;
  }
}
