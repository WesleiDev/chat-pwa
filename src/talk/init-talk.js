import { UserClass } from '../auth/user';
import { app } from '../firebase';


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
     const refDatabase = app.database()
     .ref('chat_list/'+userInstance.user.uid+'/'+idChat[0]+'_'+idChat[1]);

     //Primeiro consulta para depois inserir se não tiver
     refDatabase.once('value', function(snapshot){
         if(! snapshot.val()){
            refDatabase.set({
                user_id: uid,
                new_messages: 0
            }).then((data)=>{     
                //carrega os usuários   
               let tab_chat = document.getElementById("tab-chat");
               tab_chat.dataset.currentChat = idChat[0]+ '_'+idChat[1];
               tab_chat.click();
       
               //Esconde o sidebar
               let chat =  document.getElementById(idChat[0]+ '_'+idChat[1]); 
               if(chat){
                   chat.click();
               }      
               
       
            })
         }else{
             //Se já estiver na lista
            let tab_chat = document.getElementById("tab-chat");
            tab_chat.dataset.currentChat = idChat[0]+ '_'+idChat[1];
            tab_chat.click();
    
            //Esconde o sidebar
            let chat =  document.getElementById(idChat[0]+ '_'+idChat[1]); 
            if(chat){
                chat.click();
            }      
         }
     })

     //Adiciona a lista do segundo usuário
     const refDatabase2 = app.database()
     .ref('chat_list/'+uid+'/'+idChat[0]+'_'+idChat[1]);

     //Primeiro consulta e se não tiver, insere
     refDatabase2.once('value', function(snapshot){
         if(!snapshot.val()){
                refDatabase2.set({
                    user_id: userInstance.user.uid,
                    new_messages: 0
                }).then((data)=>{     
                    console.log('Salvou a lista do outro usuário')
                })             
         }
     })
    //  refDatabase2.set({
    //      user_id: userInstance.user.uid,
    //      new_messages: 0
    //  }).then((data)=>{     
    //      console.log('Salvou a lista do outro usuário')
    //  })

    



} 