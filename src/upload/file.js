
export default function(){
    let file = document.getElementById('file-upload');
    //realiza upload dos arquivos do tipo
    //img, video, audio
    file.addEventListener('change', function(e){
        e.preventDefault();
        console.log('Selecionou arquivo para upload');
    })

    file.click();

    console.log('Função para realizar o upload de arquivos')
}