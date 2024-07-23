import axios from "axios";
import config from "config";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  withCredentials: true
});

export async function searchOnine(search : string, term : string|undefined = "intitle", maxResults : number = 20) {
  try {
    const response = await api.get("/volumes", {
      params: {
        q: `${search}+intitle:${search}`,
        filter: "partial",
        maxResults: maxResults,
        orderBy : "newest",
        key: config.get("Book_Hub_APIKEY")
      }
    });;
    
    return response.data;
  } catch (error:any) {
    console.error("Error searching books:", error.response ? error.response.data : error.message);
  }
}

export async function searchASpecificVolume(VolumeId : string) {
  try {
    const response  = await api.get(`/volumes/${VolumeId}`, {
      params : {
        key: config.get("Book_Hub_APIKEY")
      }
    })
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
}