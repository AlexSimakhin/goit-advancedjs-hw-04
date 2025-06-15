import axios from 'axios';

const API_KEY = import.meta.env.VITE_PIXABAY_TOKEN;
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 30,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
