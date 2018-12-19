import { UserClass } from "../auth/user";
import { app } from "../firebase";

const partialMessage = require("./partial-message.html");


export default function(e){
    //Esconde o sidebar
    document.querySelector('.menu-icon').click();
    
    let  contentMessages = document.getElementById("talk");
    contentMessages.innerHTML = "";

    let idChat   = document.getElementById("tab-chat").dataset.currentChat;

    let refDatabase = app.database().ref('/posts').child('messages');

    let refChild = refDatabase.child(idChat);

    // refDatabase.on('value', function(snapshot){
    //     console.log(snapshot.val());
    // })

    const userInstance = new UserClass();

    

    refChild.on('child_added', (snap) =>{
        
        //Somente o usuário estiver na mesma conversa
        if(document.getElementById("tab-chat").dataset.currentChat === idChat){
            let htmlMessage = "";
            let auxClass = (snap.val().idEmitter == userInstance.user.uid )? "emit" : "dest";
    
            htmlMessage = partialMessage.replace(/{{ class }}/g,auxClass )
                                        .replace(/{{ id }}/g, snap.key)
                                        .replace(/{{ msg }}/g, snap.val().message)

            if(snap.val().type.type == 'img'){
                //Remove o hidden e adicionar a imagem
                htmlMessage = htmlMessage.replace(/content-file hidden/g, "content-file" )
                .replace(/{{ file }}/g, "<img src='"+snap.val().type.url+"'>");
            }else
            if(snap.val().type.type == 'audio'){
                //Remove o hidden e adicionar a imagem
                htmlMessage = htmlMessage.replace(/content-file hidden/g, "content-file" )
                .replace(/{{ file }}/g, "<audio controls='true' name='media'><source src='"+snap.val().type.url+"' type='audio/ogg'></audio>");
            }

            
            
            contentMessages.insertAdjacentHTML('beforeend', htmlMessage)
    
            window.location.href = "#"+snap.key;
        }
        
    })
}