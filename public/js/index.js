const socket = io();
let user;
let chatBox=document.getElementById("chatBox");
Swal.fire({
    title: 'identificate!',
    input:"text",
    text: 'ingrese un nombre',
    inputValidator: (value) => {
        return !value &&" necesitar ingresar un nombre obligatoriamente"
},
allowOutsideClick: false,
}).then (result=>{
    user=result.value;
    return user;
}).then(user=>socket.emit("newUserLoger",{user}))
    .catch(error=>console.log(error))
    
    chatBox.addEventListener("keyup",evento=>{
        if(evento.key==="Enter"){
            if(chatBox.value.trim().length>0){
                socket.emit("message",{user,message:chatBox.value});
                chatBox.value="";
            }
        }   
    }) 

    socket.on("messages",data=>{
        let log  = document.getElementById("messageLogs");
        let messages="" ;
        data.forEach(msg => {
            messages= messages + ` ${msg.user} dice: ${msg.message} </br>`;
    })
    log.innerHTML=messages;
    })

    socket.on("newUser",user=>{
    Swal.fire({
        text:`nuevo usuario conectado ${user.user}`, 
        toast:true,
        position:"top-right",   
    }) 
    })