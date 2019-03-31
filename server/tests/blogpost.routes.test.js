var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    BlogPost = require('../models/blogpost.model.js');

/* Global variables */
var app, agent;

var blog = { //new BlogPosts created to test save, update, and delete calls
    title: 'THIS IS A TEST',
    text: 'This blog post is only a test. Do not be alarmed.'
};

var id; //ObjectId of created test BlogPost

/* Unit tests for testing server side routes for the listings API */
describe('Tests for BlogPost API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create BlogPost', function(done) {
        agent.post('/api/blogposts')
            .send(blog)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.title.should.equal('THIS IS A TEST');
                res.body.text.should.equal('This blog post is only a test. Do not be alarmed.');
                id = res.body._id;
                done();
            });
    });

    it('Get BlogPost by _id', function(done) {
        agent.get('/api/blogposts/' + id) //specifies test BlogPost's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.title.should.equal('THIS IS A TEST');
                res.body.text.should.equal('This blog post is only a test. Do not be alarmed.');
                res.body._id.should.equal(id);
                done();
            });
    });

    it('Get all BlogPosts', function(done) {
        agent.get('/api/blogposts')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update BlogPost by _id', function(done) {
        var blogUpdate = {
            title: 'THIS IS A TEST',
            text: 'This is not a drill: TEXT HAS BEEN UPDATED.'
        };
        agent.put('/api/blogposts/' + id)
            .send(blogUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/blogposts/' + id) //grabs updated BlogPost
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.title.should.equal('THIS IS A TEST');
                        res.body.text.should.equal('This is not a drill: TEXT HAS BEEN UPDATED.');
                        res.body._id.should.equal(id);
                        done();
                    });
            })
    });

    it('Delete BlogPost by _id', function(done) {
        agent.delete('/api/blogposts/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/blogposts/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            BlogPost.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});