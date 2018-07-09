
//uploads date filter
let dateSelect = document.getElementById('date_filter');
let searchFilter = document.getElementById('search_filter');

dateSelect.onchange = function () {
    let dateFilter = dateSelect.options[dateSelect.selectedIndex].value;
    localStorage.setItem('date_filter', dateFilter);
    searchFilter.value = '';

    let tagsFilter = localStorage.getItem('tags_filter');
    if(tagsFilter == '') tagsFilter = [];
    else tagsFilter = tagsFilter.split(",");
    loadJSON(dateFilter, tagsFilter, '') 
 
};

//tags filter
let tagsFilter = document.getElementById('tags_filter');

tagsFilter.onchange = function () {
    let tagsSpan = document.getElementsByClassName('tag');
    tags = [];
    localStorage.setItem('tags_filter', tags);
    searchFilter.value

    let dateFilter = localStorage.getItem('date_filter');
    loadJSON(dateFilter, tags,'' ) 
}

//search filter
searchFilter.onkeyup = function () {

    let keyword = searchFilter.value;
    localStorage.setItem('search_filte', keyword);

    let dateFilter = localStorage.getItem('date_filter');
    let tagsFilter = localStorage.getItem('tags_filter');
    if(tagsFilter == '') tagsFilter = [];
     else tagsFilter = tagsFilter.split(",");

    loadJSON(dateFilter, tagsFilter, keyword) 
}
