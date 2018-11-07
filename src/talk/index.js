require('./style.scss');

export default {
    el: '#main',
    template: require('./template.html'),
    afterBind :()=>{
        console.log('Carregou a conversa')
        const talk       = document.getElementById('talk');
        const sideBar    = document.getElementById('sidebar');
        const tabs       = document.querySelectorAll('.tab');


        talk.addEventListener('click', function(e){
            e.preventDefault();
            sideBar.className = 'hide-sidebar';
        })

        tabs.forEach((e, index)=>{
            tabs[index].addEventListener('click', function(e){
                const currentTabActive = document.querySelector('.tab-active')
                currentTabActive.className = 'tab';
                e.currentTarget.className  = 'tab tab-active';
            })
        })
    }
}