function createNote(data){
	const em = document.createElement("pre");
	em.innerHTML = data;
	return em;
}

function createList(data){
	const task_div = document.createElement("div");
	for(let [check,task] of data){
		let chk = document.createElement("input");
		chk.setAttribute("type","checkbox");
		chk.checked = check === 0 ? false : true ;
		chk.disabled = true;
		chk.id = Math.random();
		let text = document.createElement("label");
		text.innerHTML = task;
		text.setAttribute("for",chk.id);
		task_div.append(chk,text,document.createElement("br"));
	}
	return task_div;
}
function getCard(id,{data,type}){
	const exists_card = document.getElementById(id);

	var card;
	var return_data;
	// if the card was created overwride it insted of create a new one.
	if(exists_card == null){
		// card not exists
		card = document.createElement("div");
		return_data = card;
	}
	else {
		card = exists_card;
		return_data = null;
		//clear card innerHTML
		card.innerHTML = "";
	}

	const title = document.createElement("h2");
	title.innerHTML = id;
	card.id = id;
	card.className = "item";
	card.appendChild(title);
	card.innerHTML += "<hr>";

	let d_data = {};
	switch (type){
		case 0:d_data = createList(data);
			break;
		case 1:d_data = createNote(data);
			break;
	}
	card.appendChild(d_data);
	return return_data;
}

function addToBoard(card){
	board.appendChild(card);
}

function display(){
	for(let name of local.get(name_list)){
		let card = getCard(
			name,
			local.get(name)
		);
		// When card is null that's mean it has been created.
		if(card != null)
			addToBoard(card);
	}
}
