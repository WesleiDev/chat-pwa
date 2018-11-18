import { app } from '../firebase';
import { UserClass } from '../auth/user';
import loadingMesage from "./loading-message";



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
    .on('value', (snapshot)=>{
        contentSidbar.innerHTML = "";
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
                    htmlUsers = htmlUsers.replace('class="card-user user-chat"','class="card-user user-chat active"')
                    //Carrega as menssagens do usuario selecionado
                    loadingMesage();
                }

            contentSidbar.insertAdjacentHTML('beforeend', htmlUsers)
            

            //Se for o último elemento
            if((i+1) == data.length){
                

                document.querySelectorAll('.user-chat').forEach((e, index) =>{
                    e.addEventListener("click", function(e){  
                        let oldCardSelected = document.querySelector('.card-user.user-chat.active');
                        //Remove o card antigo que estava selecionado
                        if(oldCardSelected!== null){
                            oldCardSelected.className = "card-user user-chat";
                        }
                      
                        //Adiciona a conversa ativa
                        const cardSelected = document.getElementById(data[index][0]);
                        cardSelected.className += " active";
                        cardSelected.dataset.uid = user_chat.val().uid;
                       

                        //Informa qual é a conversa atual
                        let tab_chat = document.getElementById("tab-chat");
                        tab_chat.dataset.currentChat = data[index][0];

                        //Esconde o sidebar
                        document.querySelector('.menu-icon').click();
                        //Carrega as menssagens do usuario selecionado
                        loadingMesage();
                    })
                })    
            }
            
            
    

            })
        }
    

        

        
        
    })
}