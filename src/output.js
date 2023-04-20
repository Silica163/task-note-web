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

function createCard(id,{data,type}){
	const card = document.createElement("div");
	const title = document.createElement("h2");
	title.innerHTML = id;
	card.id = id;
	card.className = "item";
	card.appendChild(title);
	card.innerHTML += "<hr>";
	card.appendChild(createData({data:data,type:type}));
	return card;
}

function updateCard(id){
	const data = local.get(id);
	const card = document.getElementById(id);
	card.childNodes[2].remove();
	card.appendChild(createData(data));
}

function createData({data,type}){
	switch (type){
		case 0:return createList(data);
			break;
		case 1:return createNote(data);
			break;
	}
}

function getCard(id,{data,type}){
	const exists_card = document.getElementById(id);

	// if the card was created overwride it insted of create a new one.
	if(exists_card == null){
		return createCard(id,{data:data,type:type});
	}

	updateCard(id);
	return null;
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
