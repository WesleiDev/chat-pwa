import upload from "./uploader";

export default function(){
    const file = document.getElementById('file-upload');

    const previewUpload = document.querySelector('.preview-upload');

    //Remove a imagem do display atual
    if(document.getElementById('display-upload')){
        document.getElementById('display-upload').remove();
    }
    let displayUpload = document.createElement('img');
    displayUpload.id = "display-upload";

    previewUpload.appendChild(displayUpload);

    const btnSendUpload = document.getElementById('btn-send-upload');

    //realiza upload dos arquivos do tipo
    //img, video, audio

    const callback = function(e){
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = function(e){
        displayUpload.src = e.currentTarget.result;
        }

        reader.readAsDataURL(e.target.files[0])
        
        console.log('Removendo evento');

        file.removeEventListener('change', callback);
    }

    file.addEventListener('change', callback )

    const callbackEnviar = function(e){

        let nameImage = Math.random().toString(36).substring(2);
        nameImage += '.png';
        upload(file.files[0], nameImage, 'img')

        btnSendUpload.removeEventListener('click', callbackEnviar);

    }
    btnSendUpload.addEventListener('click',callbackEnviar )


    file.click();

    console.log('Função para realizar o upload de arquivos')
}