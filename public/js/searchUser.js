import { api } from "./utils/axiosConfig";
import { UserCard } from "./classes/UserCard";
const searchForm = document.getElementById("searchForm");
const workSpace = document.querySelector(".workSpace")
const userCards = [];
function displayUserCards(details) {
  workSpace.innerHTML = ""
  details.map((detail) => {
    const card = new UserCard({
      userId: detail._id,
      imgSrc: detail.profileImageURL,
      email: detail.email,
      followers: detail.followers | 0,
      userName: detail.userName,
    });
    userCards.push(card);
    console.log(card);
    return card.constructCard();
  }).map(card =>{workSpace.appendChild(card)});
}

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
try {
  let userName = document.getElementById("searchBar").value;
  if(!userName.length) userName = "empty";
  console.log("Npfkajsndfkuihiluj iuehgoiubgip;gr sboliugholiShreyash");
  console.log(userName
  );
  const response = await api.get(`/user/getUsers/${userName}`);
  console.log(response);
  const matchingUsers = response.data;
  displayUserCards(matchingUsers);
} catch (error) {
  console.log(error.message);
}
});
