const expect = require('expect');
const {isRealString} = require('./validation')

describe('isRealString',() =>{
    it("should reject non string value", () =>{
     var res = isRealString(98);
     expect(res).toBe(false);  
    })

    it("should reject string with only space", () =>{
        var res = isRealString(" ");
        expect(res).toBe(false);
    })

    it("should allow string with non space character", () =>{
        var res = isRealString("Vishesh Mishra");
        expect(res).toBe(true);
    })


})