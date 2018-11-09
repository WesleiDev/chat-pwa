import  { app }  from '../firebase'
import  { UserClass } from './user';

let template = document.createElement('template');
template.innerHTML = require('./template.html');
template = template.content.childNodes;

document.querySelector('body').appendChild(template[0]);

let btnLogin                = document.getElementById('btn-login');
let btnCreateAccount        = document.getElementById('btn-create-account');
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

const createAccount = function(e){
    e.preventDefault();
    let email    = document.getElementById('create-email');
    let password = document.getElementById('create-password');
    let avatar   = document.getElementById('file-avatar');

    //criando usuário no firebase
    app.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(data){     

        const refStorage = app.storage().ref('/users/'+data.user.uid); 
        //Salva a imagem do usuário
        refStorage.put(avatar.files[0])
        .then((snapshot) =>{
            snapshot.ref.getDownloadURL()
                .then(function(downloadURL){
                    //Salva usuário
                    const refDatabase = app.database().ref('/users/'+data.user.uid);
                    refDatabase.set({
                        email: data.user.email,
                        uid: data.user.uid,
                        avatar : downloadURL
                    })
                })
        }) 
        
    })
    .catch(function(err){
        alert('ERRO'+err.message)
        console.log('ERRO AO CADASTRAR USUARIO: ', err)
    })
}

const login = function(e){
    e.preventDefault();
    let email    = document.getElementById('edit-email');
    let password = document.getElementById('edit-password');

    app.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function(data){
        console.log(data)
    }).catch(function(err){
        alert('Erro: '+err.message)
    })

}

btnRedirectCreate.addEventListener('click', redirectCreate)
btnBackLogin.addEventListener('click', backLogin)
inputFile.addEventListener('change', changeAvatar)

//Verifica se o usuário esta logado
app.auth().onAuthStateChanged(function(user){
    if(user){
        modal.className = 'modal';
        let userInstance = new UserClass();
        userInstance.user = {email:user.email, uid: user.uid};

        //Pega a imagem do usuário 
        app.database().ref('/users/'+userInstance.user.uid)
        .once('value', (snapshot)=>{
            userInstance.avatar = snapshot.val().avatar;
        })

    }else{
        modal.className += ' open';
        btnCreateAccount.addEventListener('click', createAccount);
        btnLogin.addEventListener('click', login);
    }
})

export default {
    el:null,
    template:null,
    afterBind(){
        console.log('Auth carregado')
    }
}