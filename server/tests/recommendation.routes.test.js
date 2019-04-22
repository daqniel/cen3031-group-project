var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Recommendation = require('../models/recommendation.model.js');

/* Global variables */
var app, agent;

var recommend = { //new Recommendation created to test save, update, and delete calls
    client: 'J. Jonah Jameson',
    title: 'The Perfect Vacation: Alcatraz!',
    text: 'Go here and never come back for only $499.',
    link: 'www.amazingalcatraz.com/booknow'
};

var badRecommend = { //new Recommendation created to test save, update, and delete calls
    client: 'J. Jonah Jameson',
    title: 'The Perfect Vacation: Alcatraz!',
    text: 'Go here and never come back for only $499.',
    link: 'brb gonna hate on spider-man right quick'
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
                res.body.client.should.equal('J. Jonah Jameson');
                res.body.title.should.equal('The Perfect Vacation: Alcatraz!');
                res.body.text.should.equal('Go here and never come back for only $499.');
                res.body.link.should.equal('www.amazingalcatraz.com/booknow');
                id = res.body._id;
                done();
            });
    });

    it('Reject creating Recommendation for wrong link', function(done){
        agent.post('/api/recommendations')
            .send(badRecommend)
            .expect(400)
            .end(function(res){
                should.not.exist(res);
                done();
            });
    });

    it('Get Recommendation by _id', function(done) {
        agent.get('/api/recommendations/' + id) //specifies test Recommendation's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.client.should.equal('J. Jonah Jameson');
                res.body.title.should.equal('The Perfect Vacation: Alcatraz!');
                res.body.text.should.equal('Go here and never come back for only $499.');
                res.body.link.should.equal('www.amazingalcatraz.com/booknow');
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
            client: 'J. Jonah Jameson',
            title: 'The Perfect Vacation: Anywhere but the Daily Bugle!',
            text: 'Go here and never come back for only $1.',
            link: 'www.dailybugle.com'
        };
        agent.put('/api/recommendations/' + id)
            .send(recommendUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/recommendations/' + id) //grabs updated Recommendation
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.client.should.equal('J. Jonah Jameson');
                        res.body.title.should.equal('The Perfect Vacation: Anywhere but the Daily Bugle!');
                        res.body.text.should.equal('Go here and never come back for only $1.');
                        res.body.link.should.equal('www.dailybugle.com');
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