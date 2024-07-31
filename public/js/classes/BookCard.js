import { applyDeleteEventListener } from "../utils/deleteBookHandler";

export class BookCard {
  constructor({
    title,
    authors,
    publisher,
    description,
    genere,
    imageLink,
    id,
    inDb = false,
  }) {
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;
    this.description = description;
    this.genere = genere;
    this.imageLink = imageLink;
    this.id = id;
    this.inDb = inDb;
  }

  createCard() {
    const card = document.createElement("div");
    card.className = "card small";
    card.style.width = "18rem";

    // Image
    const img = document.createElement("img");
    img.src = this.imageLink;
    img.className = "card-img-top cardImage";
    img.alt = this.title;
    card.appendChild(img);
    card.classList.add("adjust");
    // Card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Title
    console.log("TITLE CREATED");
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = this.title;
    cardBody.appendChild(title);

    // Description
    const description = document.createElement("p");
    description.className = "card-text ptag";
    description.textContent = this.description;
    cardBody.appendChild(description);

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    const viewButton = document.createElement("a");
    viewButton.href = `/books/viewBook/${this.id}`;
    viewButton.className = "btn btn-primary";
    viewButton.textContent = "View Details";
    btnContainer.appendChild(viewButton);

    if (this.inDb) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger deleteBtn";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("data-bookId", this.id);
      applyDeleteEventListener(deleteButton);
      btnContainer.appendChild(deleteButton);
    }

    cardBody.appendChild(btnContainer);
    card.appendChild(cardBody);

    return card;
  }
}
