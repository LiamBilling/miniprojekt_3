const key = '155c5c670c15afbc56b980003eb8974c';
const searchBtn = document.querySelector('button');
const div = document.querySelector('#wraper');
const txtInput = document.querySelector('.input-search');
let number = document.querySelector('#quantity');

searchBtn.addEventListener(
  'click', function () {
    if (number.value == '') {
      alert('Skriv in din Siffra!')
    }
    if (txtInput.value == '') {
      alert('Skriv in din Text!')
    }
    const divEl = document.querySelectorAll('#wraper *')
    for (let i = 0; i < divEl.length; i++) {
      let el = divEl[i];
      el.remove();
    }
    searchImage(txtInput.value, number.value);
  }
)

function searchImage(searchText, searchNumber) {
  const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${searchText}&sort=relevance&safe_search=1&accuracy=1&content_type=1&format=json&nojsoncallback=1&per_page=${searchNumber}&page=1`;
  fetch(url).then(
    function (response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        throw 'Något gick fel!. :(';
      }
    }
  ).then(
    function (data) {
      for (let i = 0; i < searchNumber; i++) {
        console.log(data);
        getImageUrl(data.photos.photo[i]);
      }
    }
  ).catch(
    function (error) {
      console.log(error);
    }
  );
}

function getImageUrl(photoObject) {
  let photo = photoObject;
  let size = document.querySelector('.size-selector').value;
  let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
  console.log(imgUrl);
  displayImg(imgUrl);
}

function displayImg(url) {
  let img = document.createElement('img');
  img.src = url;
  div.appendChild(img);
}
