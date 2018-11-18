import { app } from '../firebase';
import { UserClass } from '../auth/user';



export default function(){
    const partialCardUserChat = require('./partial-card-user-chat.html')
    const userInstance = new UserClass();
    let contentSidbar = document.querySelector('.content-sidebar');
    const refDatabase = app.database();
    let htmlUsers = '';
    contentSidbar.innerHTML = "";
    let current_chat  = document.getElementById("tab-chat").dataset.currentChat;
    
    //transformar isto na listagem de todas as conversas do usuário conectado
    refDatabase.ref('chat_list/'+userInstance.user.uid)
    .once('value', (snapshot)=>{
        let data = (snapshot.val()!== null)?Object.entries(snapshot.val()): [];
        for(let i = 0; i < data.length;i++ ){
            app.database().ref('/users/'+data[i][1].user_id)
            .once('value', function(user_chat){
                htmlUsers = partialCardUserChat
                            .replace(/{{ avatar }}/g, user_chat.val().avatar)
                            .replace(/{{ email }}/g, user_chat.val().email)
                            .replace(/{{ id }}/g, data[i][0])
                //Se for a conversa atual
                if(current_chat === data[i][0] ){
                    console.log("Passou id da conversa: ", current_chat);
                    htmlUsers = htmlUsers.replace('class="card-user user-chat"','class="card-user user-chat active"')
                }

            contentSidbar.innerHTML += htmlUsers; 

            //Se for o último elemento
            if((i+1) == data.length){
                document.querySelectorAll('.user-chat').forEach((e, index) =>{
                    e.addEventListener("click", function(e){                        
                        //Adiciona a conversa ativa
                        document.getElementById(data[index][0]).className += " active";
                        console.log("Clicou: ", e)
                        e.className += " active";
                    })
                })    
            }
            
            
    

            })
        }
    

        

        
        
    })
}