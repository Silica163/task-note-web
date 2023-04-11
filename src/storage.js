// update localStorage
function updateLS(){
	const l_entries = local.entries();

	for(let i = 0 ;i < local.size;i++){
		var [id ,value] = l_entries.next().value;
		localStorage.setItem(id,JSON.stringify(value));
	}

	for(let id of Object.keys(localStorage)){
		if(id == name_list)continue;
		if(local.get(name_list).indexOf(id) != -1)continue;
		console.log(id);
		localStorage.removeItem(id);
	}

	if (data_ready())display();
}

// update name_list
function updateNL(nl){
	local.set("name_list",nl);
	for( let i of local.get("name_list")){
		getItem(i);
	}
}

// execute when revive an item.
function reciveItem({type,data,id}){
	local.set(id,{type:type,data:data});
	updateLS();
}
