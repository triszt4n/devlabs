const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WHKJZX', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = mongoose;