const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WHKJZX', {useNewUrlParser: true});
module.exports = mongoose;