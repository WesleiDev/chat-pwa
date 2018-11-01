require('./style.scss')

export default{
    el: "#app",
    template:require('./partial.html'),
    afteBind: () =>{
        console.log('Carregou componente')
    }
}