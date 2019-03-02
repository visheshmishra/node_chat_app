var expect = require('expect');
var {generateMessage}  = require('./message')

describe('generateMessage', ()=>{
    it('should create new message object', () =>{
        var from = "vishesh";
        var text = "Hey how are you";
        var message = generateMessage(from,text);
        expect(typeof message.createdAt).toBe('number'),
        expect(message).toMatchObject({
            from, 
            text
        })
    })
})