import { app } from '../firebase';
import { UserClass } from '../auth/user';

export default function(idTab){
    const partialCardUser = require('./partial-card-user.html')
    const userInstance = new UserClass();
    let contentSidbar = document.querySelector('.content-sidebar');
    const refDatabase = app.database();

    if(idTab == 'tab-users'){
        console.log(contentSidbar)
        let htmlUsers = '';
        refDatabase.ref('/users')
            .once('value', function(snapshot){
                let data = Object.entries(snapshot.val());
                data.forEach((item)=>{
                    if(item[1].uid !== userInstance.user.uid){
                        htmlUsers += partialCardUser
                                    .replace(/{{ avatar }}/g, item[1].avatar)
                                    .replace(/{{ email }}/g, item[1].email)
                    }
                    
                })
                contentSidbar.innerHTML = htmlUsers
            })
        
        
    }else{
        contentSidbar.innerHTML = '<h1>Conversas ativas</h1>'
    }
}