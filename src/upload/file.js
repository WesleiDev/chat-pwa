import upload from "./uploader";

export default function(){
    let file = document.getElementById('file-upload');
    let displayUpload = document.getElementById('display-upload');
    const btnSendUpload = document.getElementById('btn-send-upload');

    //realiza upload dos arquivos do tipo
    //img, video, audio
    file.addEventListener('change', function(e){
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function(e){
        displayUpload.src = e.currentTarget.result;
        }

        reader.readAsDataURL(e.target.files[0])
        
            console.log('Selecionou arquivo para upload');
    })

    btnSendUpload.addEventListener('click', function(e){

        let nameImage = Math.random().toString(36).substring(2);
        nameImage += '.png';
        upload(file.files[0], nameImage, 'img')
      

    })


    file.click();

    console.log('Função para realizar o upload de arquivos')
}