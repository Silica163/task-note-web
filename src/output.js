function deleteCard(e){
	if(e.buttons != 1)return;
	const id = e.target.parentNode.id;

	const card = document.getElementById(id);
	if(card != null)card.remove();

	removeItem(id);
}

function editCard(e){
	if(e.buttons != 1)return;
	if(e.target.className == "del")return;
	const id = e.target.closest("section > div").id;
	edit(id);
}

function updateCard(id){
	const data = local.get(id);
	const card = document.getElementById(id);
	if(data.data == null || data.data == ""){
		removeItem(id);
		card.remove();
		return null;
	}
	card.childNodes[3].remove();
	card.appendChild(createData(data));
}

function getCard(id){
	const exists_card = document.getElementById(id);

	// if the card was created overwride it insted of create a new one.
	if(exists_card == null){
		return createCard(id);
	}

	updateCard(id);
	return null;
}


function addToBoard(card){
	board.appendChild(card);
}

function display(){
	for(let name of local.get(name_list)){
		let card = getCard(name);
		// When card is null that's mean it has been created.
		if(card != null)
			addToBoard(card);
	}
}
