const { Component } = require("react");
const categories = require('../categories');
console.log('Categories object in booksList.js:', categories); // הוסף את השורה הזו

module.exports.BookList = [
    {name:"Elections 2021", author:"Sara Cohen",category:[categories.adults], amount:35, publicationDate:new Date(2021, 4, 25), price:80, discount:30, rating:4, numRating:10},
    {name:"Duplicatim", author:"Ayala Levi",category:[categories.comics,categories.childrens], amount:22, publicationDate:new Date(2022, 5, 10), price:67, discount:20, rating:2, numRating:6},
    {name:"The king", author:"Sara Cohen",category:[categories.teens,categories.cooking], amount:0, publicationDate:new Date(2022, 6, 27), price:82, discount:50, rating:5, numRating:20},
    {name:"Hello world", author:"Lea Kisner",category:[categories.childrens], amount:5, publicationDate:new Date(2023, 10, 11), price:55, discount:0, rating:4, numRating:15},
    {name:"My Shabbos", author:"David Levy", category:[categories.childrens], amount:18, publicationDate:new Date(2023, 2, 10), price:75, discount:10, rating:4.1, numRating:14},
    {name:"The Golden Key", author:"Rachel Shtern", category:[categories.fantasy, categories.childrens], amount:40, publicationDate:new Date(2022, 8, 5), price:50, discount:5, rating:3.9, numRating:22},
    {name:"Open the door", author:"Ben Zion", category:[categories.history, categories.adults], amount:12, publicationDate:new Date(2021, 11, 20), price:90, discount:20, rating:4.6, numRating:16},
    {name:"The Winner", author:"Shira Kaplan", category:[categories.cooking, categories.adults], amount:28, publicationDate:new Date(2024, 0, 1), price:65, discount:15, rating:4.3, numRating:11},
    {name:"Easy Code", author:"Moshe Klein", category:[categories.adults], amount:20, publicationDate:new Date(2023, 6, 15), price:70, discount:0, rating:4.0, numRating:9}
];