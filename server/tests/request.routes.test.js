var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Request = require('../models/request.model.js');

/* Global variables */
var app, agent;

var request = { //new Request created to test save, update, and delete calls
    clientID: 'octomom@gmail.com',
    requestState: 'Pending',
    budget: {
        min: 0,
        max: 1000000
    },
    party: {
        children: 8,
        adults: 2,
    },
    text: 'I have eight rambunctious kids. Take me somewhere were they won\'t annoy me.'
};

var id; //ObjectId of created test Request

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Request API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Request', function(done) {
        agent.post('/api/requests')
            .send(request)
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

    it('Get Request by _id', function(done) {
        agent.get('/api/requests/' + id) //specifies test BlogPost's ObjectId
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

    it('Get all Requests', function(done) {
        agent.get('/api/requests')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update Request by _id', function(done) {
        var reqUpdate = {
            title: 'THIS IS A TEST',
            text: 'This is not a drill: TEXT HAS BEEN UPDATED.'
        };
        agent.put('/api/requests/' + id)
            .send(reqUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/requests/' + id) //grabs updated BlogPost
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

    it('Delete Request by _id', function(done) {
        agent.delete('/api/requests/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/requests/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            Request.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});