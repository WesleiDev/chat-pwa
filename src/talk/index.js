require('./style.scss');

export default {
    el: '#main',
    template: require('./template.html'),
    afteBind :()=>{
        console.log('Carregou a conversa')
        const talk    = document.getElementById('talk');
        const sideBar    = document.getElementById('sidebar');
        talk.addEventListener('click', function(e){
            e.preventDefault();
            sideBar.className = 'hide-sidebar';
        })
    }
}