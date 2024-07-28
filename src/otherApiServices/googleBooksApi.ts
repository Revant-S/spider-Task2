import axios from "axios";
import config from "config";

export interface FilterParams {
  inauthor?: string,
  subject?: string,
  keyWord : string
}
const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  withCredentials: true
});

export async function searchOnine(search: string, term: string | undefined = "intitle", maxResults: number = 20) {
  try {
    const response = await api.get("/volumes", {
      params: {
        q: `${search}+intitle:${search}`,
        filter: "partial",
        maxResults: maxResults,
        orderBy: "newest",
        key: config.get("Book_Hub_APIKEY")
      }
    });;

    return response.data;
  } catch (error: any) {
    console.error("Error searching books:", error.response ? error.response.data : error.message);
  }
}

export async function searchASpecificVolume(VolumeId: string) {
  try {
    const response = await api.get(`/volumes/${VolumeId}`, {
      params: {
        key: config.get("Book_Hub_APIKEY")
      }
    })
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
}


function qConstructor(params: FilterParams): string {
  let q = params.subject || params.keyWord;
  console.log(params);
  
  if (params.inauthor) {
    q += `inauthor:${params.inauthor}+`;
  }
  if (params.subject) {
    q += `subject:${params.subject}+`;
  }
  if (q.endsWith("+")) {
    q = q.slice(0, -1);
  }

  return q;
}


export const searchForFilters = async (params: FilterParams) => {
  const search = qConstructor(params);
  console.log(search);
  
  try {
    const response = await api.get("/volumes", {
      params: {
        q: search, 
        filter: "partial",
        maxResults: 30, 
        orderBy: "newest", 
        key: config.get("Book_Hub_APIKEY")
      }
    });
    // console.log(response.data.items);
    
    return response.data.items;
  } catch (error: any) {
    console.error("Error searching books:", error.response ? error.response.data : error.message);
  }
}
