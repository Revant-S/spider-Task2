import { api } from "./axiosConfig";

async function addReview(e, textInput) {
    console.log(textInput);
    try {
        const response = await api.post("/review/addReview" , {
            bookId : e.target.getAttribute("data-id"),
            comment : textInput.value
        })
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}

export function handleRiew(addReviewBtn, textInput) {
    console.log(addReviewBtn);
  addReviewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addReview(e, textInput);
  });
}
