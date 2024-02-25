const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://0.0.0.0:27017/web-project',{
   useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology:true,
})

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];
const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            //My Author ID
            author: '64888402ed7edc134fa62c82',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,        
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ut, perferendis fuga blanditiis et dolorum facilis assumenda aliquam laudantium, ratione incidunt pariatur natus iusto harum adipisci esse excepturi cupiditate at!',
            price,
            geometry:{ 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dqngqeybj/image/upload/v1687012979/Camp/hbm07i6jz1ysanpwpsbs.png',
                    filename: 'Camp/hbm07i6jz1ysanpwpsbs',                   
                  },
                  {
                    url: 'https://res.cloudinary.com/dqngqeybj/image/upload/v1687017947/Camp/jwhm6ccjivx6izso2boe.jpg',
                    filename: 'Camp/jwhm6ccjivx6izso2boe',                   
                  }
            ]
        })
        await camp.save();
    }

}
seedDB().then(()=>{
    mongoose.connection.close();
})