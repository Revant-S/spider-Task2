import { api } from "./axiosConfig";
const followersNumber = document.getElementById("followersNumber");
const followBtn = document.getElementById("followBtn");

function transformBtn(isFollowing, followBtn) {
  console.log(isFollowing);
  if (isFollowing) {
    followBtn.textContent = "Unfollow";
    followBtn.classList.remove("btn-primary");
    followBtn.classList.add("btn-outline-primary");
    console.log(followersNumber.textContent);
    followersNumber.textContent = parseInt(followersNumber.textContent) + 1;
  } else {
    followBtn.textContent = "Follow";
    followBtn.classList.add("btn-primary");
    followBtn.classList.remove("btn-outline-primary");

    followersNumber.textContent = parseInt(followersNumber.textContent) - 1;
  }
}

async function sendFollowAndUnFollowRequest(requestedTo) {
  try {
    const response = await api.post("/user/followUser", { requestedTo });

    if (response.data.success) {
      console.log(response.data);
      transformBtn(response.data.following, followBtn);
    } else {
      console.error("Failed to update follow status:", response.data.message);
    }
  } catch (error) {
    console.error("Error in follow/unfollow request:", error.message);
  }
}

if (followBtn) {
  followBtn.addEventListener("click", (e) => {
    const userId = e.target.getAttribute("data-userId");
    sendFollowAndUnFollowRequest(userId);
  });
}
