// Date sort Functions
let date_sort_asc = function (post1, post2) {

	var date1 = new Date(post1.createdAt);
	var date2 = new Date(post2.createdAt);
	return date1 - date2;
};

let date_sort_desc = function (post1, post2) {
	var date1 = new Date(post1.createdAt);
	var date2 = new Date(post2.createdAt);
	return date2 - date1;
};


let tags_sort_desc = function (post1, post2) {
    let num_date =0, num_tag = 0;

    var date1 = new Date(post1.createdAt);
    var date2 = new Date(post2.createdAt);
    
    if(date1 < date2) num_date =0.1;
    num_tag = (1*post2.countFilterTags) - (1*post1.countFilterTags);

	return num_tag + num_date;
};


//sort by Tag
function searchTag(tag, tags) {
	if (tags.indexOf(tag) == -1) {
		return -1
	} else {
		return 1;
	}
}

function sortByTags(postsJson, tags) {

	let length = postsJson.data.length;

	for (let i = 0; i < length; i++) {
		let countFilterTags = 0;
		tags.forEach((item, j, arr) => {
			countFilterTags += searchTag(item, postsJson.data[i].tags);
		});
		postsJson.data[i]["countFilterTags"] = countFilterTags;
	}
	postsJson.data.sort(tags_sort_desc);
}


//search
function searchStr(key, str) {
	var keyExp = new RegExp(key, "i");
	if (str.search(keyExp) == -1) {
		return -1
	} else {
		return 1;
	}
}

function searchKeyword(postsJson, key) {
	let length = postsJson.data.length;

	for (let i = 0; i < length; i++) {
		postsJson.data[i]["showPost"] = searchStr(key, postsJson.data[i].title);
	}
}


//delete post

function getDeletedPosts() {
	let deletedPosts = sessionStorage.getItem("deleted_titels");
	if (deletedPosts === '' || deletedPosts == null) deletedPosts = [];
	else deletedPosts = deletedPosts.split(",");
	return deletedPosts;
}

function deletePost(postTitle) {

	let deletedPosts = getDeletedPosts();
	deletedPosts.push(postTitle);
	sessionStorage.setItem("deleted_titels", deletedPosts);

	let dateFilter = localStorage.getItem('date_filter');
	let tagsFilter = localStorage.getItem('tags_filter');
	if (tagsFilter == '') tagsFilter = [];
	else tagsFilter = tagsFilter.split(",");

	let srchKeyword = document.getElementById('search_filter').value;

	loadJSON(dateFilter, tagsFilter, srchKeyword, deletedPosts);
}