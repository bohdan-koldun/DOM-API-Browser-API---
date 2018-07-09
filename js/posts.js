'use strict';

function appendPosts(postsJson) {
  let length = postsJson.data.length;
  let postsGrid = document.getElementById('posts-grid');
  
  while (postsGrid.firstChild) { postsGrid.removeChild(postsGrid.firstChild); }

  //append posts nodes to html DOM
  for (let i = 0; i < length; i++) {

    if (postsJson.data[i].showPost !== -1 || postsJson.data[i].deletedPost !== true) {
      let post = document.createElement('article');

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

    sessionStorage.setItem("posts", postsJson.data);
  }
}

//Draw Posts Function
function drawPost(postsJson, sortUploudsDate, tags, keySearch) {

  let length = postsJson.data.length;
  //sort Posts by Date
  if (sortUploudsDate === 'recently') { postsJson.data.sort(date_sort_desc); }
  else { postsJson.data.sort(date_sort_asc); }

  //sort by Tags
  if (tags.length > 0) { sortByTags(postsJson, tags); }

  //filter by Keywords
  if (keySearch !== '') { searchKeyword(postsJson, keySearch) }

  //append posts nodes to html DOM
  appendPosts(postsJson);

}

//load json file function
function loadJSON(sortUploudsDate = 'recently', tags = [], keySearch = '') {
  fetch('posts.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (postsJson) {
      drawPost(postsJson, sortUploudsDate, tags, keySearch);
    })
    .catch(alert);
}





