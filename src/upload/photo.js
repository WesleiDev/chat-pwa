let partialOption = require('./photo/template.html');

export default function(){
    //Carrega todos os dispositivos conectados
navigator.mediaDevices.enumerateDevices().then((devices) => {
    let options = [];


    devices.forEach((device)=>{
         console.log(device);
        if(device.kind == 'videoinput'){
            options.push(device);
        } 
        // options.push(device);    
    })

    // let template =

    //Cria as opções de camera
    let optionsPhoto       = document.getElementById('options-photo');
    let html = '';


    options.forEach((device) => {
        let label =  device.label;
        html += partialOption
                .replace(/{{ id }}/g, device.deviceId)
                .replace(/{{ label }}/g, label)    
    })

    console.log(html)
    optionsPhoto.innerHTML = html;


})
}
