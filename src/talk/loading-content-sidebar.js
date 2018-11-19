import loadingUsers from "./loading-content-users";
import loadingUsersChat from "./loading-content-users-chat";

export default function(idTab){

    //Este arquivo é trabahar com a SideBar
    if(idTab == 'tab-users'){   
        document.querySelector('.content-users').className = 'content-users';
        document.querySelector('.content-users-chat').className = 'content-users-chat hidden';               
    }else{
        document.querySelector('.content-users-chat').className = 'content-users-chat';
        document.querySelector('.content-users').className = 'content-users hidden';            

    }
}