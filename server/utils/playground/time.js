var moment  = require("moment");
var timestamp = moment().valueOf();
console.log(moment(timestamp).format('DD/MM/YYYY:h:mm:a'));
//console.log(timestamp.format('DD/MM/YYYY:h:mm'));