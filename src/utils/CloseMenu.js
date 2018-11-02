export default function(e){
    
    const sideBar = document.getElementById('sidebar');

    e.preventDefault();
    if(sideBar.className == 'hide-sidebar' || sideBar.className ==''){
        sideBar.className = 'show-sidebar'
    }else{
        sideBar.className = 'hide-sidebar';
    }
}