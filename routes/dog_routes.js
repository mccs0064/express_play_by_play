var _ = require('lodash');
var Dog = require('../models/cat_model');

module.exports = function (app) {

    _dogs = [];

    //create
    app.post('/dog', (req,res) => {
        var newDog = new Dog(req.body);
        newDog.save((err) => res.json({info:'dog created successfully'}));
    });

    //read
    app.get('/dog', (req,res) => {
        Dog.find((err, dogs)=>{
            if(err) {
                res.json({info:'failed'});
                return
            }
            //simulate long data request
            setTimeout(()=>{
                res.json({info:'success', data:dogs});
            },10000)

        });
    });

    app.get('/dog/:id', (req,res) => {
        Cat.findById(req.params.id, (err,dog)=>{
            if(err) {
                res.json({info:'failed'});
            }
            if(dog){
                res.json({info:'success', data:dog});
            }else{
                res.json({info:'not found'});
            }
        });
    });

    //update
    app.put('/dog/:id', (req,res) => {
       Dog.findById(req.params.id, (err, dog)=>{
           if(err){
               res.json({info:'error not found'});
           }
           if(dog){
               _.merge(dog, req.body);
               dog.save((err)=>{
                   if(err){
                       res.json({info:'error saving'});
                   }
                   res.json({info:'success updating'});
               })
           }else{
               res.json({info:'dog not found'})
           }
       });
    });

    //delete
    app.delete('/dog/:id', (req,res) => {
       Dog.findByIdAndRemove(req.params.id, (err)=>{
           if(err){
               res.json({info:'error removing'});
               return
           }
           res.json({info:'success'});
       });
    });

};