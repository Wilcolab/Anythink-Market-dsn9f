require("dotenv").config();
const mongoose = require("mongoose");

async function init() {
    console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    require("../models/User");
    require("../models/Item");
    require("../models/Comment");
}

// a helper function
function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    var uuid = s.join("");
    return uuid;
}

async function generateUsers() {
    await init();
    const User = await mongoose.model('User');
    for (let i = 0; i < 100; i++) {
        const user = new User();

        const id = createUUID();
        const username = `user${id}test`.toLowerCase();
        user.username = username;
        const email = `user${id}_test@email.com`.toLowerCase();
        user.email = email;
        const password = `user${id}_test_pass`;
        user.setPassword(password);
        console.log("user", JSON.stringify(user)); 
        try {
            await user.save();
        } catch (e) {
            console.error('****************** User creation error *************');            
            console.error(e);
            console.error('****************** ');            
         
        }       
    }
}

async function generateProducts() {
    await init();
    const User = mongoose.model('User');
    const Item = mongoose.model('Item');

    // const user = await mongoose.model('User').findOne();
    for (let i = 0; i < 100; i++) {
        const title = `product${i}`;
        const description = `product${i} desc`;
        const image = '';
        const tagList = [];
        const payload = {
            title,
            description,
            image,
            tagList
        };
        const item = new Item(payload);
        item.seller = await User.findOne({}).exec();
        console.log('item', JSON.stringify(item));

        try {
            await item.save();
        } catch(e) {
            console.error('****************** Product creation error *************');            
            console.error(e);
            console.error('****************** ');            
         
        };
    }
}

async function generateComments() {
    await init();
    const User = mongoose.model('User');
    const Item = mongoose.model('Item');
    const Comment = mongoose.model('Comment');
    for (let i = 0; i < 100; i++) {
        const body = `test comment ${i}`;
        const comment = new Comment({ body });
        comment.item = await Item.findOne();
        comment.seller = await User.findOne({}).exec();
        console.log('comment', JSON.stringify(comment));
        try {
            await comment.save();
        } catch(e) {
            console.error('****************** Comment creation error *************');            
            console.error(e);
            console.error('****************** ');            
         
        };
    }
}

generateUsers();
generateProducts();
generateComments();
