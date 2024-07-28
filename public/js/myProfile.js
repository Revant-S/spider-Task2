import { applyDeleteEventListener } from "./utils/deleteBookHandler";
import { api } from "./utils/axiosConfig";
const deleteBookBtns = document.querySelectorAll(".delete-btn");
const changeProfileImageForm = document.getElementById("changeProfileImageForm")

changeProfileImageForm.addEventListener("submit" , async (e)=>{
    const url = window.location.href
    e.preventDefault();
    const newForm = new FormData(changeProfileImageForm);
  try {
    const response = await api.put("/books/changeProfileImage", newForm , {
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    })
    console.log(response);
    if(response.data.success){
        window.location.href = url
    }
  } catch (error) {
    console.log(error.message);
  }
})


deleteBookBtns.forEach(deleteBtn =>{
    applyDeleteEventListener(deleteBtn ,deleteBtn.parentNode.parentNode , deleteBtn.parentNode)
})
