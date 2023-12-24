export const sendConfirmation = async (data)=> fetch("/api/confirm",{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
        "Content-Type":"application/json",
        Accept: "application/json",
    }
}).then((res)=>{
    if (res.status!=200) alert ("Couldn't send mail!!");
    return res.json();
})