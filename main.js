let myKey = config.MY_KEY;

const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=9&api_key=${myKey}`;

const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${myKey}`;

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${myKey}`;


const btnGen = document.getElementById('show-more-btn');
const btnFav = document.getElementById('show-fav-btn');
const imgContainer = document.getElementById('img-container');
const imgContainerFavs = document.getElementById('img-container-fav');
const noFav = '🤍';
const fav = '💚';


btnGen.addEventListener('click', reload)

btnFav.addEventListener('click', loadFav)

function reload() {
  location.reload()
}

async function loadRandomCats() {

  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  data.map((result) => {
    const card = document.createElement('div')
    const img = document.createElement('img');
    const emoji = document.createElement('p');
    img.src = result.url;
    emoji.innerText = noFav;
    imgContainer.appendChild(card)
    card.appendChild(img)
    card.appendChild(emoji)


    emoji.onclick = () => saveFav(result.id)

  });

};

async function saveFav(id) {

  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });

};

async function deleteFav(id) {

  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',

  });

  reload()
  loadFav()

};


async function loadFav() {

  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();

  imgContainer.style.display = 'none';
  imgContainerFavs.style.display = 'grid';


  data.map((result) => {

    const card = document.createElement('div')
    const img = document.createElement('img');
    const emoji = document.createElement('p');
    img.src = result.image.url;
    emoji.innerText = fav;
    imgContainerFavs.appendChild(card)
    card.appendChild(img)
    card.appendChild(emoji)

    emoji.onclick = () => deleteFav(result.id)
  });
};


loadRandomCats();
