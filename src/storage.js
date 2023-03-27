// update localStorage
function updateLS(){
	const l_entries = local.entries();
	for(let i = 0 ;i < local.size;i++){
		var [id ,value] = l_entries.next().value;
		localStorage.setItem(JSON.stringify(id),JSON.stringify(value));
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

function writeItem(id){
	var ld = local.get(id);
	var data = {
		ld,
		id:id
	}
}
