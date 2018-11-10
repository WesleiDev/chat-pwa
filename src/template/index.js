import closeMenu from '../utils/CloseMenu';
require('./style.scss')
require('font-awesome/css/font-awesome.css')

const header = require('./header.html')
const sidbar = require('./sidebar.html');
const footer = require('./footer.html');



export default{
    el: "#app",
    template:` 
    <div id="wrapper">
        ${header}
        <div id="main"></div>
        ${footer}
    </div>
    ${sidbar}
    `
    ,
    afterBind: () =>{
        console.log('Carregou template');
        const btnMenu = document.querySelector('.menu-icon');
        
        btnMenu.addEventListener('click', closeMenu)
    }
}