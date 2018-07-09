// Date sort Functions
let date_sort_asc = function (post1, post2) {
    if (post1.createdAt > post2.createdAt) return 1;
    if (post1.createdAt < post2.createdAt) return -1;
    return 0;
  };
  
  let date_sort_desc = function (post1, post2) {
    if (post1.createdAt > post2.createdAt) return -1;
    if (post1.createdAt < post2.createdAt) return 1;
    return 0;
  };
  

  let tags_sort_desc = function (post1, post2) {
    return  post2.countFilterTags - post1.countFilterTags;
  };




//sort by Tag
function sortByTags(postsJson, tags) {

    let length = postsJson.data.length;

    for (let i = 0; i < length; i++) {
        let countFilterTags = 0;
        tags.forEach((item, j, arr) => {
            countFilterTags += arr.indexOf(item);
        });
        postsJson.data[i]["countFilterTags"] = countFilterTags;
    }
    postsJson.data.sort(tags_sort_desc);
}


//search
function searchStr(key, str) {
var keyExp = new RegExp(key,"i");
  if (str.search(keyExp) == -1) {
    return -1
  } else {
    return 1;
  }
}

function searchKeyword(postsJson, key) {
    let length = postsJson.data.length;

    for (let i = 0; i < length; i++) {
        postsJson.data[i]["showPost"] =  searchStr(key, postsJson.data[i].title);
    }
 }


 //delete post
 function deletePost(postTitle) {


    let dateFilter = localStorage.getItem('date_filter');
    let tagsFilter = localStorage.getItem('tags_filter');
    let searchFilter = localStorage.getItem('search_filter');



    // Получение данных из sessionStorage
   var posts = sessionStorage.getItem('posts');

   posts.forEach((item, i, arr) => {
       if( postTitle === item.title){
        post["deletedPost"] = true;
       }

});

  
   drawPost(posts, dateFilter, tagsFilter, searchFilter);
 }