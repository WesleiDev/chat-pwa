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
        let htmlMessage = "";
        let auxClass = (snap.val().idEmitter == userInstance.user.uid )? "emit" : "dest";

        htmlMessage = partialMessage.replace(/{{ class }}/g,auxClass )
                                    .replace(/{{ id }}/g, snap.key)
                                    .replace(/{{ msg }}/g, snap.val().message)
        
        contentMessages.insertAdjacentHTML('beforeend', htmlMessage)

        window.location.href = "#"+snap.key;
    })
}