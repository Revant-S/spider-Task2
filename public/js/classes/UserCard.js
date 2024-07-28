export class UserCard {
  constructor({ userId, userName, email, imgSrc, followers }) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this.imgSrc = imgSrc;
    this.followers = followers;
  }

  constructCard() {
    const card = document.createElement("div");
    card.className = "card small";
    card.style.width = "18rem";
    const img = document.createElement("img");
    img.src = this.imgSrc;
    img.className = "card-img-top cardImage";
    img.alt = "User Avatar";
    card.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const h5UserName = document.createElement("h5");
    h5UserName.className = "card-title";
    h5UserName.textContent = this.userName;
    cardBody.appendChild(h5UserName);
    const emailTag = document.createElement("p");
    emailTag.className = "card-text ptag";
    emailTag.textContent = this.email;
    cardBody.appendChild(emailTag);
    const followersTag = document.createElement("p");
    followersTag.className = "card-text ptag";
    followersTag.textContent = `Followers: ${this.followers}`;
    cardBody.appendChild(followersTag);
    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";
    const viewBtn = document.createElement("a");
    viewBtn.href = `/user/getUser/${this.userId}`;
    console.log(viewBtn);
    viewBtn.className = "btn btn-primary";
    viewBtn.textContent = "View Details";
    btnContainer.appendChild(viewBtn);
    cardBody.appendChild(btnContainer);
    card.appendChild(cardBody);
    return card;
  }
}
