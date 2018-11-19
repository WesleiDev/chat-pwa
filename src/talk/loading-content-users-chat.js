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
        console.log('SNAPSHOT CARREGADO: ', snapshot)
        
        // for(let i = 0; i < data.length;i++ ){
            app.database().ref('/users/'+snapshot.val().user_id)
            .once('value', function(user_chat){
                current_chat  = document.getElementById("tab-chat").dataset.currentChat;
                console.log('CHAT_ATUAL: ', current_chat)
                console.log('ID_CHAT',snapshot.key )
                htmlUsers = partialCardUserChat
                            .replace(/{{ avatar }}/g, user_chat.val().avatar)
                            .replace(/{{ email }}/g, user_chat.val().email)
                            .replace(/{{ id }}/g, snapshot.key)
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
                    console.log('Clicou no')
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

                        //Carrega as menssagens do usuario selecionado
                        loadingMesage();
                    })
                
            // }
            
            
    

            })
        // }
    

        

        
        
    })
}