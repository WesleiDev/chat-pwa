import { UserClass } from '../auth/user';
import { app } from '../firebase';
import loadingUsersChat from "./loading-content-users-chat";

export default function(e){
    e.preventDefault();

    const userInstance = new UserClass();

    let uid =  e.path[0].id;
   
    //Caso  usuário não clique no elemento correto
    for(let i = 0; i <  e.path.length ; i++){
        uid =  e.path[i].id;
        if(uid !== ""){
            break;
        }        
    }

    let idChat = [uid, userInstance.user.uid]

    //Ordena o array para sempre ficar na mesma orde
    idChat.sort((el1, el2) => el1.localeCompare(el2))
     const refDatabse = app.database()
     .ref('chat_list/'+userInstance.user.uid+'/'+idChat[0]+'_'+idChat[1]);

     refDatabse.set({
         user_id: uid
     }).then((data)=>{        
        let tab_chat = document.getElementById("tab-chat");
        tab_chat.dataset.currentChat = idChat[0]+ '_'+idChat[1];
        tab_chat.click();
   
        //Carrega a lista de usários

     })

    



} 