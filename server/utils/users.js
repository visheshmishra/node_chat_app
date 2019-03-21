class Users{
    constructor() {
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.users.filter((user)=> user.id===id);
        var deletedUser ={id:null,
                          name:null,
                          room:null
        };

         this.users.forEach((user,idx)=>{
             if(user.id===id){
                deletedUser = this.users[idx];
                 this.users.splice(idx,1);
             }
         })
         return deletedUser;
    }

    getUser(id){
        return this.users.filter((user) => user.id===id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user) => user.room===room);
        var nameArray = users.map((user) => user.name);
        console.log(nameArray);
        return nameArray;
    }
}

module.exports = {Users}