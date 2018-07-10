'use strict';


function appendPosts(postsJson) {

	let length = postsJson.data.length;
	let postsGrid = document.getElementById('posts-grid');

	let maxCount = sessionStorage.getItem('max_count');
	if (maxCount == undefined) {
		maxCount = 10;
		sessionStorage.setItem('max_count', maxCount);
	}


	while (postsGrid.firstChild) {
		postsGrid.removeChild(postsGrid.firstChild);
	}

	//append posts nodes to html DOM
	for (let i = 0; i < maxCount; i++) {


		if ((postsJson.data[i].showPost !== -1) && (postsJson.data[i].deletedPost !== true)) {
			let post = document.createElement('article');
			if (i == maxCount - 1) post.onmouseover = appendTen;

			let tags = ``;
			postsJson.data[i].tags.forEach((item, i, arr) => {
				tags += `<span class="w3-tag w3-teal w3-margin-bottom w3-margin-right">${item}</span>`;
			});

			var date = new Date(postsJson.data[i].createdAt);
			post.className = "post";
			post.innerHTML = `<div class=" w3-center">
                          <img src="${postsJson.data[i].image}" alt="${postsJson.data[i].title}" style="width:100%" class="w3-hover-opacity">
                          <button class="w3-button w3-red" style="width:100%;" onClick="deletePost('${postsJson.data[i].title}')">Delete the post</button>
                        </div>
                        <div class="w3-container w3-white">
                          <p><b>${postsJson.data[i].title}</b></p>
                          <p class="w3-text-gray">${date.toDateString()}</p>
                          <p>${postsJson.data[i].description}</p>
                          <div class="w3-container"><p>${tags}</p></div>
                       </div>`;

			postsGrid.appendChild(post);
		}
	}
}

//Draw Posts Function
function drawPost(postsJson, sortUploudsDate, tags, keySearch, deletedPosts) {

	let length = postsJson.data.length;
	//sort Posts by Date
	if (sortUploudsDate === 'recently') {
		postsJson.data.sort(date_sort_desc);
	} else {
		postsJson.data.sort(date_sort_asc);
	}

	//sort by Tags
	if (tags.length > 0) {
		sortByTags(postsJson, tags);
	}

	//filter by Keywords
	if (keySearch !== '') {
		searchKeyword(postsJson, keySearch)
	}

	//filtered deleted posts
	postsJson.data.forEach((item, i, arr) => {

		deletedPosts.forEach((deletedPost) => {
			if (deletedPost === item.title) item["deletedPost"] = true;
		});

	});

	//append posts nodes to html DOM
	appendPosts(postsJson);

}

//load json file function
function loadJSON(sortUploudsDate = 'recently', tags = [], keySearch = '', deletedPost = []) {
	fetch('posts.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (postsJson) {
			drawPost(postsJson, sortUploudsDate, tags, keySearch, deletedPost);
		})
		.catch(alert);
}


function appendTen(e) {
	e.target.removeEventListener('onmouseover', appendTen);
	let maxCount = 1 * sessionStorage.getItem('max_count');
	maxCount += 10;
	sessionStorage.setItem('max_count', maxCount);

	let date = localStorage.getItem('date_filter');
	if (date == "firstly") document.getElementById('date_filter').value = "firstly";
	let tags = localStorage.getItem('tags_filter');
	if (tags == '' || tags == undefined) tags = [];
	else tags = tags.split(",");
	loadJSON(date, tags, '', []);
}