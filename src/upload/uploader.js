import { app } from '../firebase';
import sendMessage from '../talk/send-message';

export default function(file, name, type){
    console.log('Enviando para o firebase')
    let fileMessage = {};
    const refDatabase = app.storage().ref('/files/'+name);

    refDatabase.put(file)
    .then((snapshot) =>{
        snapshot.ref.getDownloadURL().then(function(downloadURL){
            console.log('Realizou o upload: ', downloadURL)
            fileMessage = {
                type : type,
                url: downloadURL
            }
            sendMessage(fileMessage)
        })
        
    })

} 