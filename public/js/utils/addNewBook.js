import { applyDeleteEventListener } from "./deleteBookHandler";
import { api } from "./axiosConfig";
import { BookCard } from "../classes/BookCard";
const faliureAlert = document.getElementById("faliureAlert");
const sucessAlert = document.getElementById("sucessAlert");
const bookForm = document.getElementById("bookSubmitForm");
const modal = document.getElementById("staticBackdrop");
const deleteBtns = document.querySelectorAll(".deleteBtn")
const bookSpace = document.querySelector(".bookSpace2");

const books = [];

async function addBook(e) {
  e.preventDefault();
  const formData = new FormData(bookForm);
  const authors = formData.get("authors");
  const authorsArray = authors.split(",").map((author) => author.trim());
  formData.set("authors", JSON.stringify(authorsArray));
  const plainFormData = {};
  for (let [key, value] of formData.entries()) {
    plainFormData[key] = value;
  }
  console.log(plainFormData);

  try {
    const response = await api.post("/books/addBook", plainFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      sucessAlert.innerText = "Book Created Sucessfully !!!";
      sucessAlert.classList.remove("hideAlert");
      const bookCard = new BookCard({
        title: response.data.bookDetails.title,
        authors: response.data.bookDetails.authors,
        publisher: response.data.bookDetails.publisher,
        description: response.data.bookDetails.description,
        genere: response.data.bookDetails.genere,
        imageLink: response.data.bookDetails.imageLink,
        id: response.data.bookDetails._id,
        inDb : true
      });
      books.push(bookCard);
      const card = bookCard.createCard();
      bookSpace.appendChild(card);
      window.location.reload()
    }
  } catch (error) {
    console.error("Error adding book:", error);
    faliureAlert.innerText = "SomeThing Went Wrong";
    faliureAlert.classList.toggle("hideAlert");
  }
}

bookForm.addEventListener("submit", addBook);

deleteBtns.forEach((deleteBtn) => {
  console.log(deleteBtn);
  console.log(bookSpace);
  console.log(deleteBtn.parentNode.parentNode);
  applyDeleteEventListener(
    deleteBtn,
    bookSpace,
    deleteBtn.parentNode.parentNode.parentNode
  );
});
