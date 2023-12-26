import toast from "react-hot-toast";

export const sendConfirmation = async (data)=> fetch("/api/confirm",{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
    }
}).then((res)=>{
    if (res.status>=200 && res.status<300){
        toast.success("Message Sent Successfully!!");
    }
    return res.json();
})