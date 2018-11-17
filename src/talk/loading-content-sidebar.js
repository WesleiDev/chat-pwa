import loadingUsers from "./loading-content-users";
import loadingUsersChat from "./loading-content-users-chat";

export default function(idTab){

    //Este arquivo é trabahar com a SideBar
    if(idTab == 'tab-users'){        
        loadingUsers()
        
    }else{
        loadingUsersChat();       

    }
}