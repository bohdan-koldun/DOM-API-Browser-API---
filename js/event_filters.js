//uploads date filter
let dateSelect = document.getElementById('date_filter');
let searchFilter = document.getElementById('search_filter');


dateSelect.onchange = function () {
	let dateFilter = dateSelect.options[dateSelect.selectedIndex].value;
	localStorage.setItem('date_filter', dateFilter);
	searchFilter.value = '';

	let tagsFilter = localStorage.getItem('tags_filter');
	if (tags == '' || tags == null) tagsFilter = [];
	else tagsFilter = tagsFilter.split(",");
	loadJSON(dateFilter, tagsFilter, '', getDeletedPosts())

};

//tags filterfu
let tagsFilter = document.getElementById('tags_filter');

tagsFilter.onchange = function () {
	let tagsSpan = document.getElementsByClassName('tag');
	tags = [];
	for (let i = 0; i < tagsSpan.length; i++) {
		tags.push(tagsSpan[i].dataset.tag);
	}
	localStorage.setItem('tags_filter', tags);

	let dateFilter = localStorage.getItem('date_filter');
	loadJSON(dateFilter, tags, '', getDeletedPosts())
}

//search filter
searchFilter.onkeyup = function () {

	let keyword = searchFilter.value;

	let dateFilter = localStorage.getItem('date_filter');
	let tagsFilter = localStorage.getItem('tags_filter');
	if (tags == '' || tags == null) tagsFilter = [];
	else tagsFilter = tagsFilter.split(",");

	loadJSON(dateFilter, tagsFilter, keyword, getDeletedPosts());
}


function addaOldTags(tags) {
	tags.forEach((tag) => {
		let tag_elem = document.createElement('span');
		let tags_input = document.getElementsByClassName('tags-input')[0];
		tag_elem.className = "tag";
		tag_elem.innerHTML = tag;

		tags_input.insertBefore(tag_elem, tags_input.children[0]);
	});

}