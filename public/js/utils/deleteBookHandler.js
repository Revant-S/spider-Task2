import { api } from "./axiosConfig";

async function sendDeleteRequest(id) {
    try {
        const response = await api.delete(`/books/deleteBook/${id}`); 
        console.log(response.data);
        return response.data.success;
    } catch (error) {
        console.log(error.message);
    }
}

export function applyDeleteEventListener(deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
        const bookId = e.target.getAttribute("data-bookId");
        sendDeleteRequest(bookId);
        console.log(e.target.parentNode.parentNode.parentNode);
        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode)
    });
}
