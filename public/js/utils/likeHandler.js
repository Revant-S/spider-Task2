import { api } from "./axiosConfig";

async function likeTheBook(e) {
    console.log(e.target.parentNode);
  try {
    const response = await api.put("/books/like", {
      bookId: e.target.parentNode.getAttribute("data-id"),
    });
    if (response.data.isLiked) {
      updateIcon(e.target, "/public/appImages/likeFilled.svg");
    } else {
      updateIcon(e.target, "/public/appImages/likeEmpty.svg");
    }
    console.log(e.target.parentNode);
    e.target.parentNode.parentNode.parentNode.querySelector("#numberOfLikes").textContent = "Likes: "+response.data.likes.toString();
  } catch (error) {
    console.log(error);
  }
}

export function updateIcon(element, to) {
  element.src = to;
}
export function handleLikeBtn(likeButton) {
  likeButton.addEventListener("click", likeTheBook);
}
