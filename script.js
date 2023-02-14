const imagesContainer = document.querySelector(".images-container");
const loaderPage = document.querySelector(".loaderPage");

let newPhotos = [];
let areAllPhotosReady = false;
let readyPhotosNr = 0;
let totalPhotosNr;

//unsplash API setup
const unsplashApiKey = "DoOoeOz9CF9y_v5GHCEVzIGfNpHB2xxMLu-iIXFUyyk";

//helper function to set multiple attributes at once
const setAttributes = (element, attributesObj) => {
  for (const attr in attributesObj) {
    element.setAttribute(attr, attributesObj[attr]);
  }
};

//fetch data from unsplash API
async function fetchPhotosDataAndDisplay(howManyPhotos) {
  readyPhotosNr = 0;
  areAllPhotosReady = false;
  let unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${howManyPhotos}`;

  try {
    const response = await fetch(unsplashApiUrl);
    newPhotos = await response.json();
    displayPhotos(newPhotos);
  } catch (err) {
    console.log("Oops...", err);
  }
}

const displayPhotos = photosToDisplay => {
  totalPhotosNr = photosToDisplay.length;
  photosToDisplay.forEach(photo => {
    const photoInfoLink = document.createElement("a");
    setAttributes(photoInfoLink, {
      href: photo.links.html,
      target: "_blank"
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    photoInfoLink.appendChild(img);
    imagesContainer.appendChild(photoInfoLink);

    imageWasLoaded();
  });
};

const imageWasLoaded = () => {
  readyPhotosNr++;

  if (readyPhotosNr === totalPhotosNr) {
    areAllPhotosReady = true;
    loaderPage.hidden = true;
  }
};

//on load
fetchPhotosDataAndDisplay(5);

//on scroll to near bottom load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    areAllPhotosReady
  ) {
    areAllPhotosReady = false;
    fetchPhotosDataAndDisplay(30);
  }
});
