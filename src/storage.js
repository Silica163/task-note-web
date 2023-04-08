// update localStorage
function updateLS(){
	const l_entries = local.entries();
	for(let i = 0 ;i < local.size;i++){
		var [id ,value] = l_entries.next().value;
		localStorage.setItem(JSON.stringify(id),JSON.stringify(value));
	}
	for(let id of Object.entries(localStorage)){
		if(id == '"'+name_list+'"')continue;
		if(id in local.get(name_list))continue;
		localStorage.removeItem(id);
	}
}

function writeLocal(key,value){
	local.set(key,value);
	updateLS();
}

// update name_list
function updateNL(nl){
	local.set("name_list",nl);
	updateLS();
	for( let i of local.get("name_list")){
		getItem(i);
	}
}

// execute when revive an item.
function reciveItem({type,data,id}){
	writeLocal(id,{type:type,data:data});
}
