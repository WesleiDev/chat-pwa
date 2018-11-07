import AuthComponent from './auth';
import TemplateComponent from './template';
import TalkComponent from './talk';
import { app } from './firebase'

const components = [
    TemplateComponent,
    AuthComponent,
    TalkComponent
]

class Init{
    constructor(){
        components.forEach((component) => {
            if(component.el){
                let element = document.querySelector(component.el);
                element.innerHTML = component.template;
            }

            component.afterBind();
            
        })     
        
        // let ref = app.database().ref('/posts/messages/1/2');
    
        // ref.set({
        //     message:"Bate o pé você",
        //     emitter: 4,
        //     destinatorio: 3
        // });

        // let ref = app.database().ref('/users/1');
    
        // ref.set({
        //     name:"Weslei Ferreira",
        //     foto: 'URL DA FOTO PERFIL AQUI',
        // });

        // let ref = app.database().ref('/list_posts/1/1');
    
        // ref.set({
        //     user_id:2
        // });

        // let ref = app.database().ref('/posts').child('messages');
        // let refChild = ref.child('1');
    
        // ref.set({
        //     user_id:3
        // });

        // ref.on('value', function(snapshot){
        //     console.log(snapshot.val());
        // })

        // refChild.on('child_added', (snap) =>{
        //   console.log('Filho adicionado: ', snap.val())       
        // })

        
    
    }
}

new Init();