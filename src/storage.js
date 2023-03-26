// update localStorage
function updateLS(){
	for(let i in local)
		localStorage.setItem(i,JSON.stringify(local[i]));
}

// update name_list
function updateNL(nl){
	local.set("name_list",nl);
	console.log(local);
	updateLS();
	for( let i of local.get("name_list")){
		getItem(i);
	}
}
