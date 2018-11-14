import loadingContent from './loading-content-sidebar';
import { app } from '../firebase';
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

        //transformar isto na listagem de todas as conversas do usuário conectado
        // app.database().ref('chat_list/mt5RXuzLLjbUur3njf69mUf06WF3')
        // .on('value', (snapshot)=>{
        //     let data = Object.entries(snapshot.val());
        //     for(let i = 0; i < data.length;i++ ){
        //         app.database().ref('/users/'+data[i][1].user_id)
        //         .on('value', function(data){
        //             console.log('USUARIO DA LISTA: ', data.val())
        //         })
        //     }
            
        // })

        // document.querySelector('.tab-active')
    }
}