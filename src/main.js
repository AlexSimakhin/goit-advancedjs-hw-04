import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const toastErrorState = {
  backgroundColor: 'rgba(239, 64, 64, 1)',
  messageColor: '#fff',
  titleColor: '#fff',
  iconColor: '#fff',
  timeout: 5000,
  progressBarColor: 'rgba(181, 27, 27, 1)',
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = form.elements.query.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const { hits, totalHits: total } = await fetchImages(currentQuery, page);
    totalHits = total;

    if (!hits.length) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
        ...toastErrorState,
      });
    } else {
      gallery.innerHTML = renderGallery(hits);
      lightbox.refresh();
      if (totalHits > hits.length) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      ...toastErrorState,
    });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none';

  try {
    const { hits } = await fetchImages(currentQuery, page);
    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    lightbox.refresh();

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalLoaded = document.querySelectorAll('.gallery-item').length;
    if (totalLoaded >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
      ...toastErrorState,
    });
  } finally {
    loader.style.display = 'none';
  }
});
