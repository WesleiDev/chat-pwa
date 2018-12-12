import upload from "./uploader";
let partialOption = require('./photo/template.html');
require('./photo/style.scss');

let streamVideo;
const startVideo = function(id){
    let config = {
        video:{ deviceId: id },
        audio: false
    }
    let video = document.createElement('video');
    document.querySelector('.preview-upload').append(video);
    document.getElementById('options-photo').innerHTML = "";

    video.addEventListener('click', function(e){
        let photo = new ImageCapture(streamVideo.getTracks()[0]);
        photo.takePhoto()
        .then((blobPhoto) =>{
            let name = Math.random().toString(36).substring(2);
            name += '.png';
            upload(blobPhoto, name, 'img')
        })
    })

    let success = function(strem){
        streamVideo = strem;
        video.srcObject = strem;
        video.play();
    }
    navigator.getUserMedia(config, success, (err) => alert(err))
}

export default function(){
    //Remove o vídeo atual
    let currentVideo = document.querySelector('.preview-upload video');
    if(currentVideo){
        currentVideo.remove();
    }
    
    //Carrega todos os dispositivos conectados
    navigator.mediaDevices.enumerateDevices().then((devices) => {
    let options = [];


    devices.forEach((device)=>{
        if(device.kind == 'videoinput'){
            options.push(device);
        } 
          //options.push(device);    
    })
    
    //Cria as opções de camera
    let optionsPhoto       = document.getElementById('options-photo');
    let html = '';


    options.forEach((device) => {
        let label =  device.label || 'camera';
        html += partialOption
                .replace(/{{ id }}/g, device.deviceId)
                .replace(/{{ label }}/g, label)    
    })

    console.log(html)
    optionsPhoto.innerHTML = html;

    document.querySelectorAll('#options-photo .opt-camera a').forEach((e)=>{
        e.addEventListener('click', function(e){
            e.preventDefault();
            console.log('DeviceID: ', e.target.dataset.device)
            startVideo(e.target.dataset.device)
        } )
    })


})
}