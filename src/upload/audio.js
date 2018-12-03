import upload from "./uploader";

let streamAudio;
let recorder;

const audioRecorder = () =>{
    recorder = new MediaRecorder(streamAudio);

    let chuncks = [];

    recorder.ondataavailable = (event) =>{
        chuncks.push(event.data)
    }

    //salva a gravação em Blob para enviar para o firebase
    recorder.onstop = () =>{
        let blob = new Blob(chuncks, {type:'audio/ogg'});
        chuncks = [];

        let name = Math.random().toString(36).substring(2);
        name += '.ogg';
        console.log("Audio : ", blob);
        upload(blob, name, 'audio')
    }

    recorder.start();
}

export default function(){
    if(streamAudio){
        recorder.stop();
        streamAudio.getTracks()[0].stop();
        console.log("Parando o audio");
        streamAudio = null;
    }else{
        let config = {
            video: false,
            audio: true
        }

        let success = function(stream){
            streamAudio = stream;
            audioRecorder();
            console.log("Salvando audio");

        }

        navigator.getUserMedia(config, success, (err) => console.log(err))

    }
}