const {Course , validate} = require('../Models/courseModel');
const {category} = require('../Models/categorisModel')
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let course = await Course.find();
    res.send(course);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const Category = await category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid ID')

    const course = new Course({
        title : req.body.title,
        category : {
            _id : category._id,
            name : category.name
        },
        creator : req.body.creator,
        rating : req.body.rating

    });

    course = await Course.save();
    res.send(course);
});

router.put('/:id', async(req, res) => {
    const {error} = validate(req.body)
    if(error)res.status(400).send(error.details[0].message)
    const Category = await category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid ID')
    const course = await Course.findByIdAndUpdate(req.params.id,
    {
        title : req.body.title,
        category : {
            _id : category._id,
            name : category.name
        },
        creator : req.body.creator,
        rating : req.body.rating
    },{new : true});
    if (!course) return res.status(404).send('The movie with the given ID was not found');
    res.send(category);
});

router.delete('/:id', async(req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send('The movie with the given ID was not found.');
    res.send(category);
});

router.get('/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send('The movie with the given ID was not found');
    
    res.send(course);
});

module.exports = router;