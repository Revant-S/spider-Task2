import axios from "axios";
import config from "config";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  withCredentials: true
});

export async function search() {
  try {
    const response = await api.get("/volumes", {
      params: {
        q: "flowers",
        filter: "partial",
        key: config.get("Book_Hub_APIKEY")
      }
    });
    response.data.items.forEach((element : any) => {
        const obj = {
            volumeInfo : element.volumeInfo,

        }
        console.log(obj);
        
    });
  } catch (error:any) {
    console.error("Error searching books:", error.response ? error.response.data : error.message);
  }
}