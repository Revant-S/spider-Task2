import { api } from "./axiosConfig";

async function addBookToFav(e) {
  try {
    const response = await api.put("/books/addToFav", {
      bookId: e.target.parentNode.getAttribute("data-id"),
    });
    if (response.data.isFavorite) {
      updateIcon(e.target, "/public/appImages/addToFavFilled.svg");
    } else {
      updateIcon(e.target, "/public/appImages/addToFavEmpty.svg");
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export function updateIcon(element, to) {
  element.src = to;
}
export function handleFav(favBtn) {
    favBtn.addEventListener("click", addBookToFav);
}
