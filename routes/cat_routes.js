var _ = require('lodash');
var Cat = require('../models/cat_model');

module.exports = function (app) {

    _cats = [];

    //create
    app.post('/cat', (req,res) => {
        var newCat = new Cat(req.body);
        newCat.save((err) => res.json({info:'cat created successfully'}));
    });

    //read
    app.get('/cat', (req,res) => {
        Cat.find((err, cats)=>{
            if(err) {
                res.json({info:'failed'});
                return
            }
            res.json({info:'success', data:cats});
        });
    });

    app.get('/cat/:id', (req,res) => {
        Cat.findById(req.params.id, (err,cat)=>{
            if(err) {
                res.json({info:'failed'});
            }
            if(cat){
                //simulate long lookup
                setTimeout(()=>{
                    res.json({info:'success', data:cat});
                },5000)
            }else{
                res.json({info:'not found'});
            }
        });
    });

    //update
    app.put('/cat/:id', (req,res) => {
       Cat.findById(req.params.id, (err, cat)=>{
           if(err){
               res.json({info:'error not found'});
           }
           if(cat){
               _.merge(cat, req.body);
               cat.save((err)=>{
                   if(err){
                       res.json({info:'error saving'});
                   }
                   res.json({info:'success updating'});
               })
           }else{
               res.json({info:'cat not found'})
           }
       });
    });

    //delete
    app.delete('/cat/:id', (req,res) => {
       Cat.findByIdAndRemove(req.params.id, (err)=>{
           if(err){
               res.json({info:'error removing'});
               return
           }
           res.json({info:'success'});
       });
    });

};