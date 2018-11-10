let instance = null;

export class UserClass{


    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    get user(){
        return this._user;
    }

    set user(data){
        this._user = data;
    }

    set avatar(avatar){
        this._user.avatar = avatar;
    }

    
}