function search() {
    let searchText = document.getElementById('search').value
    searchText = String(searchText).trim()
    url = '/api/getLevel/' + searchText
    
}

