const expect = require('expect')
const {Users} = require('./users')

describe('Users',()=>{
    var users = new Users();
    beforeEach(()=>{
        users.users = [
            {
                id:102,
                name:"Varsha",
                room:"Test1"
            },{
                id:103,
                name:"Dolly",
                room:"Test2"
            },{
                id:104,
                name:"Vishesh",
                room:"Test1"
            }
        ]
    });

    it('should add a user', ()=>{
    var users = new Users();
        var user ={
            id:101,
            name:"Vishesh",
            room:"NodeJs"
        }
        var userRes = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    })

    it("should remove a user if id exist", () =>{
        var id= 103;
       var user =  users.removeUser(id);
       expect(user.id).toBe(id);
    })

    it('should not remove user if id does not exist',() =>{
        var id=105;
        var user  = users.removeUser(id);
        expect(user.id).toBeNull();
    })

    it('should return for test1 room', () =>{
        var room = "Test1";
        var user  = users.getUserList(room);
        expect(user).toEqual(["Varsha",'Vishesh']);
    })

    it('should return user if id match',() =>{
        var id= 103;
        var user = users.getUser(id);
        expect(user.id).toBe(id);
    })
})