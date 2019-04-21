var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Recommendation = require('../models/recommendation.model.model.js');

/* Global variables */
var app, agent;

var recommend = { //new Recommendation created to test save, update, and delete calls
    client: 'J. Jonah Jameson',
    title: 'The Perfect Vacation: Alcatraz!',
    text: 'Go here and never come back for only $499.',
    link: 'www.amazingalcatraz.com/booknow'
};

var id; //ObjectId of created test Recommendation

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Recommendation API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Recommendation', function(done) {
        agent.post('/api/recommendations')
            .send(recommend)
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

    it('Get Recommendation by _id', function(done) {
        agent.get('/api/recommendations/' + id) //specifies test Recommendation's ObjectId
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

    it('Get all Recommendations', function(done) {
        agent.get('/api/recommendations')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update Recommendation by _id', function(done) {
        var recommendUpdate = {
            title: 'THIS IS A TEST',
            text: 'This is not a drill: TEXT HAS BEEN UPDATED.'
        };
        agent.put('/api/recommendations/' + id)
            .send(recommendUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/recommendations/' + id) //grabs updated BlogPost
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

    it('Delete Recommendations by _id', function(done) {
        agent.delete('/api/recommendations/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/recommendations/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            Recommendation.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});