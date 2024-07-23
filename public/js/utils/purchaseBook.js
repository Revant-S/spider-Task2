import { api } from "./axiosConfig";
export async function butTheBook(e) {
    const bookId = e.target.getAttribute("data-Bookid");
    const response = await api.get("")
}