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
		res.json()
			.then(reciveItem)
			.catch(console.warn);
	}).catch(console.warn);
}
function writeItem(id){
	var ld = local.get(id);
	if( ld == undefined)ld = {
		data:null,
		type:0
	};
	if(id == name_list){
		console.log("cannot write to",name_list);
		return 0;
	}
	updateItem(id);
	var data = {
		mode:"w",
		val:ld.data,
		type:ld.type,
		id:id
	}
	post_data(data).then(res=>{
		res.json().then(d=>{
			if(typeof d == "object")console.log(d.error);
		}).catch(console.warn);
	}).catch(console.warn);
}

function getNL(){
	post_data({
		mode:"r",
		id:name_list
	}).then((res)=>{
		res.json().then(updateNL);
	}).catch(console.warn);
}
