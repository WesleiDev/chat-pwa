import { app } from '../firebase';
import { UserClass } from '../auth/user';
import loadingMesage from "./loading-message";



export default function(){
    const partialCardUserChat = require('./partial-card-user-chat.html')
    const userInstance = new UserClass();
    let contentSidbar = document.querySelector('.content-users-chat');
    const refDatabase = app.database();
    let htmlUsers = '';
    contentSidbar.innerHTML = "";
    let current_chat = "";
    
    //transformar isto na listagem de todas as conversas do usuário conectado
    refDatabase.ref('chat_list').child(userInstance.user.uid)
    .on('child_added', (snapshot)=>{
        let data = (snapshot.val()!== null)?Object.entries(snapshot.val()): [];
    
            app.database().ref('/users/'+snapshot.val().user_id)
            .once('value', function(user_chat){
                current_chat  = document.getElementById("tab-chat").dataset.currentChat;
                htmlUsers = partialCardUserChat
                            .replace(/{{ avatar }}/g, user_chat.val().avatar)
                            .replace(/{{ email }}/g, user_chat.val().email)
                            .replace(/{{ new_messages }}/g, snapshot.val().new_messages)
                            .replace(/{{ id }}/g, snapshot.key);
                
                //verifica se possui novas mensagem            
                if(parseInt(snapshot.val().new_messages) > 0 ){
                    htmlUsers = htmlUsers.replace(/{{ class_new_messages }}/g, 'active')
                }            
                //Se for a conversa atual
                if(current_chat === snapshot.key){
                    let oldCardSelected = document.querySelector('.card-user.user-chat.active');
                    //Remove o card antigo que estava selecionado
                    if(oldCardSelected!== null){
                        oldCardSelected.className = "card-user user-chat";
                    }
                    htmlUsers = htmlUsers.replace('class="card-user user-chat"','class="card-user user-chat active"')
                    //Carrega as menssagens do usuario selecionado
                    loadingMesage();
                }

            contentSidbar.insertAdjacentHTML('beforeend', htmlUsers)
            

            //Se for o último elemento
            // if((i+1) == data.length){               

                document.getElementById(snapshot.key).addEventListener("click", function(e){  
                        let oldCardSelected = document.querySelector('.card-user.user-chat.active');
                        //Remove o card antigo que estava selecionado
                        if(oldCardSelected!== null){
                            oldCardSelected.className = "card-user user-chat";
                        }
                      
                        //Adiciona a conversa ativa
                        const cardSelected = document.getElementById(snapshot.key);
                        cardSelected.className += " active";
                        cardSelected.dataset.uid = user_chat.val().uid;
                       

                        //Informa qual é a conversa atual
                        let tab_chat = document.getElementById("tab-chat");
                        tab_chat.dataset.currentChat = snapshot.key;

                        const refChange2 = refDatabase;

                        //Limpa as notificações
                        refChange2.ref('chat_list/'+userInstance.user.uid+'/'+snapshot.key).update({
                            new_messages: 0
                        })
                        let notification = document.getElementById(snapshot.key).childNodes[1];
                        notification.innerHTML = 0;
                        notification.className = "new-message";

                        //Carrega as menssagens do usuario selecionado
                        loadingMesage();
                    })          

            })
    
    })
    const refDataChange =     refDatabase;
    refDataChange.ref('chat_list').child(userInstance.user.uid)
    .on('child_changed', (snapshot)=>{
        current_chat  = document.getElementById("tab-chat").dataset.currentChat;
        let notification = document.getElementById(snapshot.key).childNodes[1];//Pega o span

        if(current_chat === snapshot.key){
            notification.innerHTML = 0;
            notification.className = "new-message";
            const refChange2 = refDatabase;
            refChange2.ref('chat_list/'+userInstance.user.uid+'/'+snapshot.key).update({
                new_messages: 0
            })
        }else{
            notification.innerHTML = snapshot.val().new_messages;
            notification.className = "new-message active";
        }
    })
}