function post_data(content){
	var req = {
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(content)
	};
	return fetch(api_url,req);
}
function getItem(id){
	post_data({
		mode:"r",
		id:id
	}).then(res=>{
		res.json().then(console.log);
	}).catch(console.warn);
}
