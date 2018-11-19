import { UserClass } from './user';
import loadingUsersChat from "../talk/loading-content-users-chat";
import loadingUsers from "../talk/loading-content-users";
export default   function(){
    const userInterface = new UserClass();
    let imgUser = document.getElementById('img-user-connected');
    imgUser.src = userInterface.user.avatar;
    loadingUsersChat(); 
    loadingUsers();
}