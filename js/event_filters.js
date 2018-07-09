
//uploads date filter
let dateSelect = document.getElementById('date_filter');

dateSelect.onchange = function () {
    let dateFilter = dateSelect.options[dateSelect.selectedIndex].value;
    localStorage.setItem('date_filter', dateFilter);

    let searchFilter = localStorage.getItem('search_filter');
    let tagsFilter = localStorage.getItem('tags_filter');
    if(tagsFilter == '') tagsFilter = [];
     else tagsFilter = tagsFilter.split(",");
    loadJSON(dateFilter, tagsFilter, searchFilter) 
 
};

//tags filter
let tagsFilter = document.getElementById('tags_filter');

tagsFilter.onchange = function () {
    let tagsSpan = document.getElementsByClassName('tag');
    tags = [];
    localStorage.setItem('tags_filter', tags);

    let dateFilter = localStorage.getItem('date_filter');
    let searchFilter = localStorage.getItem('search_filter');
    loadJSON(dateFilter, tags, searchFilter) 
}

//search filter
let searchFilter = document.getElementById('search_filter');

searchFilter.onkeyup = function () {

    let keyword = searchFilter.value;
    localStorage.setItem('search_filte', keyword);

    let dateFilter = localStorage.getItem('date_filter');
    let tagsFilter = localStorage.getItem('tags_filter');
    if(tagsFilter == '') tagsFilter = [];
     else tagsFilter = tagsFilter.split(",");

    loadJSON(dateFilter, tagsFilter, keyword) 
}
