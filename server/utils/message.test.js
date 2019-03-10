var expect = require('expect');
var {generateMessage, generateLocationMessage}  = require('./message')

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

describe('generateLocationMessage',() =>{
    it('should create a location link', () =>{
        var from = "Vishesh";
        var lat = 15;
        var long = 16;
        var url = "https://www.google.com/maps?q=15,16";
        var message = generateLocationMessage(from,lat,long);
        expect(typeof message.createdAt).toBe('number'),
        expect(message).toMatchObject({from, url})
    })
})