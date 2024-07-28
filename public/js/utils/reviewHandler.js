import axios from "axios";
import { api } from "./axiosConfig";
const updateEdit = document.querySelectorAll(".updateEdit");
const deleteReview = document.querySelectorAll(".deleteReview");

async function addReview(e, textInput) {
  try {
    const response = await api.post("/review/addReview", {
      bookId: e.target.getAttribute("data-id"),
      comment: textInput.value,
    });
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}

export function handleRiew(addReviewBtn, textInput) {
  addReviewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addReview(e, textInput);
  });
}

export async function sendEditRequest(e) {
  const value = e.target.parentNode.parentNode.querySelector("input").value;
  console.log(value);
  if (!value) {
    return;
  }
  try {
    const response = await api.put("/review/editreview", {
      reviewId: e.target.getAttribute("data-reviewId"),
      editedString: value,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function handleReviewComments() {
  const nodeList = document.querySelectorAll(".addCommentBtn");
  nodeList.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.target.parentNode
        .querySelector(".commentOnReview")
        .classList.remove("hidden");
      e.target.parentNode
        .querySelector(".postCommentBtn")
        .classList.remove("hidden");
    });
  });
  document.querySelectorAll(".postCommentBtn").forEach((element) => {
    element.addEventListener("click", async (e) => {
      try {
        const response = await api.put("/review/commentOnReview", {
          commentId: e.target.getAttribute("data-reviewId"),
          comment: e.target.parentNode.querySelector("input").value,
        });
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    });
  });
  document.querySelectorAll(".updateEdit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      await sendEditRequest(e);
      window.location.reload();
    });
  });
  document.querySelectorAll(".editReview").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentNode.parentNode
        .querySelector("input")
        .classList.remove("hidden");
      e.target.parentNode.querySelector(".cancel").classList.remove("hidden");
      e.target.parentNode
        .querySelector(".updateEdit")
        .classList.remove("hidden");
      e.target.classList.add("disabled");
      e.target.parentNode
        .querySelector(".cancel")
        .addEventListener("click", (e) => {
          e.target.parentNode.parentNode
            .querySelector("input")
            .classList.add("hidden");
          e.target.parentNode
            .querySelector(".updateEdit")
            .classList.add("hidden");
          e.target.classList.add("hidden");
          e.target.parentNode
            .querySelector(".editReview")
            .classList.remove("disabled");
        });
    });
  });
}

deleteReview.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    try {
      console.log("HELLO HELLO");
      const response = await api.delete("/review/deleteRoute", {
        params: {
          reviewId: e.target.getAttribute("data-reviewId"),
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  });
});

async function respondToReviewResponse(reviewId, responseCode, amt) {
  try {
    const response = await api.put("/review/likeDislikeReview", {
      reviewId,
      responseCode,
      amt,
    });
    console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error(error.message);
  }
}

document.querySelectorAll(".likeReview").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    let amt = 1;
    if (e.target.classList.contains("Liked")) {
      amt = -1;
      e.target.classList.remove("Liked");
    }
    await respondToReviewResponse(
      e.target.getAttribute("data-review-id"),
      1,
      amt
    );
  });
});
document.querySelectorAll(".dislikeReview").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    let amt = 1;
    if (e.target.classList.contains("Disliked")) {
      amt = -1;
      e.target.classList.remove("Disliked");
    }
    await respondToReviewResponse(
      e.target.getAttribute("data-review-id"),
      0,
      amt
    );
  });
});
