import { handleLikeBtn } from "./utils/likeHandler"
import { handleFav } from "./utils/favHandler"
import { handleRiew } from "./utils/reviewHandler";
const likeButton = document.getElementById("likeButton");
const favBtn = document.getElementById("favoriteButton");
const submitReviewBtn = document.getElementById("submitReviewBtn");
const textInput = document.getElementById("floatingTextarea");
const buyNowBtn = document.getElementById("buyNowBtn");

if (buyNowBtn) {
    buyNowBtn.addEventListener("click", (e)=>{
        window.location.href = `/purchase/purchasePage/${e.target.getAttribute("data-Bookid")}`;
    })
    
}
console.log(textInput);
handleRiew(submitReviewBtn , textInput)
handleLikeBtn(likeButton);
handleFav(favBtn);
