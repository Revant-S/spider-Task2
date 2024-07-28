import { api } from "./axiosConfig";
export async function sendSearchRequest(searchBar) {
  const response = await api.get("/books/search", {
    params: {
      search: JSON.stringify(searchBar.value.trim()),
    },
  });
  return response
}




export function applySearchEventListener(searchBtn, searchBar,cb, bookSpace, books) {
  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const response = await sendSearchRequest(searchBar)
    cb(response.data.data.items, bookSpace, books)
  });
}
