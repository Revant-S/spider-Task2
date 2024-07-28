import { applySearchEventListener } from "./utils/searchBar";
import { populateBookSpace } from "./utils/populateBookSpace";
const bookSpace = document.querySelector(".bookSpace");
let books = [];
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");

books = applySearchEventListener(
  searchBtn,
  searchBar,
  populateBookSpace,
  bookSpace,
  books,
  false
);
