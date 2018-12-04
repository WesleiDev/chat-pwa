export default function(){
    //Carrega todos os dispositivos conectados
navigator.mediaDevices.enumerateDevices().then((devices) => {
    let options = [];


    devices.forEach((device)=>{
        console.log(device);
    })

    //Cria as opções de camera


})
}
