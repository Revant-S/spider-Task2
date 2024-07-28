import { BookCard } from "../classes/BookCard";

export function populateBookSpace(data, bookSpace, books, inDb) {
  console.log(data);
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
      inDb,
      id: book.id,
    });
    books.push(card);
    const bookCard = card.createCard();
    bookSpace.appendChild(bookCard);
  });
  return books;
}
