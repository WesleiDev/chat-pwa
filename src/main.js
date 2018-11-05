import TemplateComponent from './template';
import TalkComponent from './talk';
import { app } from './firebase'

const components = [
    TemplateComponent,
    TalkComponent
]

class Init{
    constructor(){
        components.forEach((component) => {
            let element = document.querySelector(component.el);
            element.innerHTML =component.template;
            component.afteBind();
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

        let ref = app.database().ref('/list_posts/1');
    
        // ref.set({
        //     user_id:3
        // });

        // ref.on('value', function(snapshot){
        //     console.log(snapshot.val());
        // })

        var myConnectionsRef = app.database().ref('users/joe/connections');

        var lastOnlineRef = app.database().ref('users/joe/lastOnline');

        var connectedRef = app.database().ref('.info/connected');
        connectedRef.on('value', function(snap) {
        
        if (snap.val() === true) {
            console.log('Disconected')
            console.log(snap)
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
            var con = myConnectionsRef.push();

            // When I disconnect, remove this device
            con.onDisconnect().remove();

            // Add this device to my connections list
            // this value could contain info about the device or a timestamp too
            con.set(true);

            lastOnlineRef.onDisconnect().set({
                desc: 1
            });

    
        }
        });
    
    }
}

new Init();