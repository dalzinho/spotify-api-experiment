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

var getRandomAlbumFromList = function(array){
  return array[Math.floor(Math.random() * array.length)]
}

var populateList = function(object){
  var listOfAlbums = object.albums.items
  console.log(listOfAlbums);

  var albumListDiv = document.querySelector('#albums');
  var table = document.createElement('table');
  var tableHead = document.createElement('thead');
  var tableBody = document.createElement('tbody');
  
  var sleeveHead = document.createElement('th');
  var artistHead = document.createElement('th');
  artistHead.innerText = 'Artist';
  var albumTitleHead = document.createElement('th');
  albumTitleHead.innerText = 'Title';
  var playHead = document.createElement('th');
  playHead.innerText = "play";

  albumListDiv.appendChild(table);
  table.appendChild(tableHead);
  tableHead.appendChild(sleeveHead);
  tableHead.appendChild(artistHead);
  tableHead.appendChild(albumTitleHead);
  tableHead.appendChild(playHead);
  table.appendChild(tableBody);


  listOfAlbums.forEach(function(album){
    // create a new row and attach to tbody
    var tr = document.createElement('tr');
    tableBody.appendChild(tr);
    // create a cell for sleeve and add image
    var sleeve = document.createElement('td');
    sleeve.classList.add('sleeve');
    var sleeveImage = document.createElement('img');
    sleeveImage.setAttribute('src', album.images[0].url);
    sleeve.appendChild(sleeveImage);
    // create cell for artist name and populate
    var artistName = document.createElement('td');
    artistName.innerText = album.artists[0].name;
    // create cell for title and populate
    var albumTitle = document.createElement('td');
    albumTitle.innerText = album.name;
    // add play button
    var playButton = document.createElement('td');
    var playUrl = album.external_urls.spotify;
    playButton.innerHTML = "<a href='" + playUrl + "''>play</a>";

    // add 3 cells elements to the new row
    tr.appendChild(sleeve);
    tr.appendChild(artistName);
    tr.appendChild(albumTitle);
    tr.appendChild(playButton);

    var body = document.querySelector('body');
    body.setAttribute('background', getRandomAlbumFromList(listOfAlbums).images[0].url)
  });
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