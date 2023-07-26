// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

const instance = new SimpleLightbox;
galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(event) {
  event.preventDefault();
  const isGalleryImageEl = event.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
      return;
  }
  const largeImageUrl = event.target.dataset.source;
  openModal(largeImageUrl);
}

function openModal(url) {
  instance.setContent(`
    <img src="${url}" width="800" height="600">
  `);
  instance.show();
};

