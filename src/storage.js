function updateLS(){
	const l_entries = local.entries();

	for(let i = 0 ;i < local.size;i++){
		var [id ,value] = l_entries.next().value;
		updateItem(id);
	}

	for(let id of Object.keys(localStorage)){
		if(id == name_list)continue;
		if(local.get(name_list).indexOf(id) != -1)continue;
		localStorage.removeItem(id);
	}

	if (data_ready())display();
}

function updateNL(s_nl){
	var nl = Object.values(s_nl);
	local.set("name_list",nl);
	for( let i of local.get("name_list")){
		getItem(i);
	}
}

function reciveItem({type,data,id}){
	local.set(id,{type:type,data:data});
	updateLS();
}

function removeItem(id){
	var nl = local.get(name_list).filter((value)=>{
		return value != id;
	});
	local.set(name_list,nl);
	local.delete(id);
	localStorage.setItem(name_list,JSON.stringify(nl));
	localStorage.removeItem(id);
	writeItem(id);
}

function updateItem(id){
	localStorage.setItem(id,JSON.stringify(local.get(id)));
}
