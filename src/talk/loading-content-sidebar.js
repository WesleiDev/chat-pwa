import { app } from '../firebase';
import { UserClass } from '../auth/user';
import initTalk from './init-talk';

export default function(idTab){
    const partialCardUser = require('./partial-card-user.html')
    const userInstance = new UserClass();
    let contentSidbar = document.querySelector('.content-sidebar');
    const refDatabase = app.database();

    if(idTab == 'tab-users'){
        let htmlUsers = '';
        refDatabase.ref('/users')
            //Cosulta todos os usuários do sistema
            .once('value', function(snapshot){
                let data = Object.entries(snapshot.val());
                data.forEach((item)=>{
                    if(item[1].uid !== userInstance.user.uid){
                        htmlUsers += partialCardUser
                                    .replace(/{{ avatar }}/g, item[1].avatar)
                                    .replace(/{{ email }}/g, item[1].email)
                                    .replace(/{{ uid }}/g, item[1].uid)

                                    
                    }
                    
                })
                contentSidbar.innerHTML = htmlUsers;
                    
               document.querySelectorAll('.user-list').forEach((e) =>{
                    e.addEventListener('click', initTalk );
                })
            })
        
        
    }else{
        contentSidbar.innerHTML = '<h1>Conversas ativas</h1>'
    }
}