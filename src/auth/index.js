import  { app }  from '../firebase'

let template = document.createElement('template');
template.innerHTML = require('./template.html');
console.log(template)
template = template.content.childNodes;

document.querySelector('body').appendChild(template[0]);

let btnLogin                = document.getElementById('btn-login');
let btnRedirectCreate       = document.getElementById('btn-redirect-create');
let btnBackLogin            = document.getElementById('btn-back-login');
let contentLogin            = document.querySelector('.login');
let contentCreateAccount    = document.querySelector('.creat-account');    
let inputFile               = document.getElementById('file-avatar');
let displayAvatar           = document.querySelector('.avatar');
const modal                 = document.querySelector('.modal');

//redireciona o usuário para se
const redirectCreate = function(e){
    e.preventDefault();
    contentLogin.className += ' hidden';
    contentCreateAccount.className = ''; 
    
}

//Volta a tela para o login
const backLogin = function(e){
    e.preventDefault();
    contentLogin.className = 'login';
    contentCreateAccount.className += ' hidden'; 
}

//Para mostrar na tela a imagem selecionada no input
const changeAvatar = function(e){
    e.preventDefault();
    var reader = new FileReader();
    reader.onload = function(e){
        displayAvatar.src = e.currentTarget.result;
    }
    reader.readAsDataURL(e.target.files[0])

}
btnRedirectCreate.addEventListener('click', redirectCreate)
btnBackLogin.addEventListener('click', backLogin)
inputFile.addEventListener('change', changeAvatar)

app.auth().onAuthStateChanged(function(user){
    if(user){
        modal.className = 'modal';
    }else{
        modal.className += ' open';
    }
})

export default {
    el:null,
    template:null,
    afterBind(){
        console.log('Auth carregado')
    }
}