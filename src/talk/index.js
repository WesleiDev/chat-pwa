require('./style.scss');

export default {
    el: '#main',
    template: require('./template.html'),
    afteBind :()=>{
        console.log('Carregou a conversa')
    }
}