require('./style.scss')
require('font-awesome/css/font-awesome.css')

const header = require('./header.html')

export default{
    el: "#app",
    template:` 
    <div>
        ${header}
    </div>
    `
    ,
    afteBind: () =>{
        console.log('Carregou componente')
    }
}