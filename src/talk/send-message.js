import { UserClass } from "../auth/user";
import { app } from "../firebase";

export default function(e){
    try{
        e.preventDefault();
        const userInstance = new UserClass();
    
        let msg          = document.getElementById('message');
        let idChat   = document.getElementById("tab-chat").dataset.currentChat;
        let idDest       =  document.getElementById(idChat).dataset.uid;
    
        // console.log('Enviar menssagem: ', msg.value)
        // console.log("ID CHat: ", idChat);
        // console.log("Id destinatario: ", idDest);
        // console.log("ID emitente: ", userInstance.user.uid);       
        
    
        const refDatabase = app.database().ref("/posts/messages/"+idChat);
        refDatabase.push({
            idDest: idDest,
            idEmitter: userInstance.user.uid,
            message: msg.value
        }).then((result) => {
            msg.value = "";
            msg.focus();
            console.log(result)
        }).catch(err => alert('Erro ao enviar menssagem'))
    }catch(e){
        console.log(e)
    }
    
    
}