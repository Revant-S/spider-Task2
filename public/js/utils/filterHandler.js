
import { api } from "./axiosConfig";
import { populateBookSpace } from "./populateBookSpace";
const bookSpace = document.querySelector(".bookSpace")
const form = document.getElementById("filterForm");
let books = []

console.log(bookSpace);


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let author
  const  keyWord = document.getElementById("keyWord").value.trim();
  if(document.getElementById("author")){const author = document.getElementById("author").value.trim();}
  author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const minPrice = document.getElementById("minPrice").value.trim();
  const maxPrice = document.getElementById("maxPrice").value.trim();
  const priceRange = [];
  if (minPrice) priceRange.push(minPrice);
  if (maxPrice) priceRange.push(maxPrice);

  const params = {
    author: author || undefined,
    genre: genre || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    keyWord,
    price: priceRange.length ? priceRange.join(",") : undefined,
  };

  try {
    const response = await api.get("/filter/getFilteredBooks", { params: params });
    console.log(response.data);
    console.log("Filter results:", response.data);
    books = populateBookSpace(response.data, bookSpace,books, true)
  } catch (error) {
    console.error(
      "Error fetching filter results:",
      error.response ? error.response.data : error.message
    );
  }
});

