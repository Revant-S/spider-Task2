import { BookCard } from "./classes/BookCard";

import { applySearchEventListener } from "./utils/searchBar";

const bookSpace = document.querySelector(".bookSpace2");
const books = [];
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

export function populateBookSpace(data) {
  bookSpace.innerHTML = "";
  console.log(data);
  data.forEach((book) => {
    const card = new BookCard({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      publisher: book.volumeInfo.publisher,
      description: book.volumeInfo.description,
      imageLink: book.volumeInfo.imageLinks.thumbnail,
      genere: "HELLO",
      inDb: false,
      id: book.id,
    });
    books.push(card);
    const bookCard = card.createCard();
    bookSpace.appendChild(bookCard);
  });
}

applySearchEventListener(searchBtn, searchBar, populateBookSpace);
