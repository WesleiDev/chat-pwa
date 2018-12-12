import { app } from '../firebase';
import sendMessage from '../talk/send-message';

export default function(file, name, type){
    const btnCancelUpload   = document.getElementById('btn-cancelar-upload');
    console.log('Enviando para o firebase')
    let fileMessage = {};
    const refDatabase = app.storage().ref('/files/'+name);

    refDatabase.put(file)
    .then((snapshot) =>{
        snapshot.ref.getDownloadURL().then(function(downloadURL){
            fileMessage = {
                type : type,
                url: downloadURL
            }
            sendMessage(fileMessage)
            btnCancelUpload.click();
        })
        console.log('Enviando arquivo')
        
    })

} 