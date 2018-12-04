import loadingContent from './loading-content-sidebar';
import sendMessage from "./send-message";
import uploadFile from  "../upload/file";
import recordAudio from '../upload/audio';
import photo       from '../upload/photo';
require('./style.scss');

let template = document.createElement('template');
template.innerHTML = require('../upload/md-upload.html');
template = template.content.childNodes;

document.querySelector('body').appendChild(template[0]);

export default {
    el: '#main',
    template: require('./template.html'),
    afterBind :()=>{
        const main              = document.getElementById('main');
        const sideBar           = document.getElementById('sidebar');
        const tabs              = document.querySelectorAll('.tab');
        const btnAttachment     = document.getElementById('btn-attachment');
        const modalUpload       = document.getElementById('md-upload');
        const btnCancelUpload   = document.getElementById('btn-cancelar-upload');
        let btnOptFile          = document.querySelectorAll('.btn-option-file');


        // main.addEventListener('click', function(e){
        //     e.preventDefault();
        //     sideBar.className = 'hide-sidebar';
        // })

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
        btnSend.addEventListener('click',function(e){
            sendMessage({ type:'txt' })
        })
        
        const message    = document.getElementById("message");
    
        message.addEventListener("keypress", function(e){
            if(e.key == "Enter"){
                //Quando o usuário precionar o enter para enviar a menssagem
                sendMessage({ type:'txt' })
            }
            
        })

        //Abrir modal de upload
        btnAttachment.addEventListener('click', function(e){
            e.preventDefault();
            const currentChat = document.querySelector('.tab-active').dataset.currentChat;
            if(typeof currentChat === 'undefined'){
                alert('Selecione uma conversa para enviar arquivos');
                return;
            }
            modalUpload.className += ' open';
        })

        //Fechar modal de upload
        btnCancelUpload.addEventListener('click', function(e){
            e.preventDefault();
            modalUpload.className = 'modal';
        })

        //Quando clicar em alguma das opções para upload
        btnOptFile.forEach((e)=>{
            e.addEventListener('click', function(e){
                e.preventDefault();
                switch (e.target.parentNode.id){
                  case 'btn-camera':
                    photo();
                    console.log('Tirar foto')
                  break;  
                  case 'btn-file':
                    uploadFile()
                  break;
                  case 'btn-mic':
                    recordAudio()
                  break;
                }
                
            })
        })

         
        

      
    }
}