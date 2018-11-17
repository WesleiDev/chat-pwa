import { UserClass } from './user';
import loadingContent from '../talk/loading-content-sidebar';
export default   function(){
    const userInterface = new UserClass();
    let imgUser = document.getElementById('img-user-connected');
    imgUser.src = userInterface.user.avatar;
    loadingContent('');
}