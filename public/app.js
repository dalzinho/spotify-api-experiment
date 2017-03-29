var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  console.log("request complete");
  if(this.status !== 200){
    return;
  }

  var jsonString = this.responseText;
  var JSONobject = JSON.parse(jsonString);
  console.log(JSONobject);
  populateList(JSONobject);
};

var populateList = function(object){
  var listOfAlbums = object.albums.items
  console.log(listOfAlbums);

  var albumListDiv = document.querySelector('#albums');
  var table = document.createElement('table');
  var tableHead = document.createElement('thead');
  var tableBody = document.createElement('tbody');
  var artistHead = document.createElement('th');
  artistHead.innerText = 'Artist';
  var albumTitleHead = document.createElement('th');
  albumTitleHead.innerText = 'Album Title';

  albumListDiv.appendChild(table);
  table.appendChild(tableHead);
  tableHead.appendChild(artistHead);
  tableHead.appendChild(albumTitleHead);
  table.appendChild(tableBody);


  listOfAlbums.forEach(function(album){
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);
    var artistName = document.createElement('td');
    artistName.innerText = album.artists[0].name;
    var albumTitle = document.createElement('td');
    albumTitle.innerText = album.name;
    tr.appendChild(artistName);
    tr.appendChild(albumTitle);


  })
}

var app = function(){
  var query = document.querySelector('#search-query');
query.onkeypress = function(event){
  console.log(event.which);
  if(event.which==13){
    var url = 'https://api.spotify.com/v1/search?q=' + query.value + '&type=album';
    makeRequest(url, requestComplete);
  }
}


}

window.onload = app;