import { UserClass } from './user';

export default   function(){
    const userInterface = new UserClass();
    let imgUser = document.getElementById('img-user-connected');
    imgUser.src = userInterface.user.avatar;
}