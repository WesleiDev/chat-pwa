import loadingContent from './loading-content-sidebar';
import sendMessage from "./send-message";
require('./style.scss');


export default {
    el: '#main',
    template: require('./template.html'),
    afterBind :()=>{
        console.log('Carregou a conversa')
        const talk       = document.getElementById('talk');
        const sideBar    = document.getElementById('sidebar');
        const tabs       = document.querySelectorAll('.tab');


        talk.addEventListener('click', function(e){
            e.preventDefault();
            sideBar.className = 'hide-sidebar';
        })

        tabs.forEach((e, index)=>{
            tabs[index].addEventListener('click', function(e){
                const currentTabActive = document.querySelector('.tab-active')
                currentTabActive.className = 'tab';
                e.currentTarget.className  = 'tab tab-active';
                loadingContent(e.currentTarget.id);
                
            })
        })

        //Inicializar a lista de conversas
        const btnSend = document.getElementById('btn-send');
        btnSend.addEventListener('click',sendMessage)
        
        const message    = document.getElementById("message");
        message.addEventListener("keypress", function(e){
            if(e.key == "Enter"){
                //Quando o usuário precionar o enter para enviar a menssagem
                sendMessage(e)
            }
            
        })

         
        

      
    }
}