import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

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

  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const { hits } = await fetchImages(query);

    if (!hits.length) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
        ...toastErrorState,
      });
    } else {
      gallery.innerHTML = renderGallery(hits);
      lightbox.refresh();
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
