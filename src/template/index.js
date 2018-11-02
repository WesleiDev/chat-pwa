require('./style.scss')
require('font-awesome/css/font-awesome.css')

const header = require('./header.html')
const sidbar = require('./sidebar.html');

export default{
    el: "#app",
    template:` 
    <div id="wrapper">
        ${header}
        <div id="main"></div>

    </div>
    ${sidbar}
    `
    ,
    afteBind: () =>{
        console.log('Carregou componente')
        let btnMenu = document.querySelector('.menu-icon');
        let sideBar = document.getElementById('sidebar');
        btnMenu.addEventListener('click', function(e){
            e.preventDefault();
            if(sideBar.className == 'hide-sidebar' || sideBar.className ==''){
                sideBar.className = 'show-sidebar'
            }else{
                sideBar.className = 'hide-sidebar';
            }
            
        })
    }
}