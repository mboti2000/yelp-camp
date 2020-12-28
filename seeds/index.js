const mongoose = require('mongoose');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () =>{
    console.log('Database connected');
});

const sample = (arr)=>{
    return arr[Math.floor(Math.random()*arr.length)]
} 

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price =  Math.floor(Math.random()*20)+10;
        const campground = new Campground({
            author: '5fdfc15325fdcc37d0f455c3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                url:'https://res.cloudinary.com/dblc2xzir/image/upload/v1608912548/YelpCamp/wv1pqq07hnqh1mj1yepd.jpg',
                filename:'YelpCamp/wv1pqq07hnqh1mj1yepd' 
                },
                {
                    url:'https://res.cloudinary.com/dblc2xzir/image/upload/v1608912548/YelpCamp/tya5qtzlkorplbcmdwwg.jpg',
                    filename:'YelpCamp/tya5qtzlkorplbcmdwwg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porttitor auctor dolor.' ,
            price ,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }     
           });

        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
