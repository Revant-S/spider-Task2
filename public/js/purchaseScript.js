import { api } from "./utils/axiosConfig";

const purchaseNowBtn = document.getElementById("purchaseNowBtn");

purchaseNowBtn.addEventListener("click", async (e) => {
  const response = await api.put("/purchase/purchaseFromCoins", {
    bookId: e.target.getAttribute("data-BookId"),
  });
  if (response.data === "Insufficient Coins!!") {
    alert(response.data);
    return;
  }
  else if (response.data === "Book Purchased Sucessfully") {
    window.location.href = "/purchase/myPurchases"
  }
});
