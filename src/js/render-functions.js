export function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class='gallery-item'>
        <a class="gallery-link" href="${largeImageURL}">
          <img class='gallery-image' src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}" />
          <div class="info">
            <div class="info-item">
              <p>Likes</p>
              <p>${likes}</p>
            </div>
            <div class="info-item">
              <p>Views</p>
              <p>${views}</p>
            </div>
            <div class="info-item">
              <p>Comments</p>
              <p>${comments}</p>
            </div>
            <div class="info-item">
              <p>Downloads</p>
              <p>${downloads}</p>
            </div>
          </div>
        </a>
      </li>
    `
    )
    .join('');
}
