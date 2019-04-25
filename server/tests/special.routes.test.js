var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Special = require('../models/special.model.js');

/* Global variables */
var app, agent;

var special = { //new BlogPosts created to test save, update, and delete calls
    title: 'PASS ONE TEST AND PASS ANOTHER ONE FREE HOPEFULLY',
    text: 'May or may not pass the test',
    expireDate: new Date("2019-04-01")
};

var id; //ObjectId of created test Special

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Special API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Special', function(done) {
        agent.post('/api/specials')
            .send(special)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.title.should.equal('PASS ONE TEST AND PASS ANOTHER ONE FREE HOPEFULLY');
                res.body.text.should.equal('May or may not pass the test');
                id = res.body._id;
                done();
            });
    });

    it('Get Special by _id', function(done) {
        agent.get('/api/specials/' + id) //specifies test BlogPost's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.title.should.equal('PASS ONE TEST AND PASS ANOTHER ONE FREE HOPEFULLY');
                res.body.text.should.equal('May or may not pass the test');
                res.body._id.should.equal(id);
                done();
            });
    });

    it('Get all Specials', function(done) {
        agent.get('/api/specials')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update Special by _id', function(done) {
        var specialUpdate = {
            title: 'PASS ONE TEST AND PASS ANOTHER ONE FREE HOPEFULLY',
            text: 'Will not pass the test for some reason',
            expireDate: new Date("2019-05-01")
        };
        agent.put('/api/specials/' + id)
            .send(specialUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/specials/' + id) //grabs updated BlogPost
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.title.should.equal('PASS ONE TEST AND PASS ANOTHER ONE FREE HOPEFULLY');
                        res.body.text.should.equal('Will not pass the test for some reason');
                        res.body._id.should.equal(id);
                        done();
                    });
            })
    });

    it('Delete Special by _id', function(done) {
        agent.delete('/api/specials/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/specials/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    it('Get newest n Specials',function(done){
        var n = 3;
        agent.get('/api/specials/?num=' + n)
            .expect(200)
            .end(function(err,res){
                should.not.exist(err);
                should.exist(res);
                res.body.should.have.length(n);
                done();
            });
    });

    it('Get oldest n Specials',function(done){
        var n = 3;
        agent.get('/api/specials/?num=' + n + '&order=old')
            .expect(200)
            .end(function(err,res){
                should.not.exist(err);
                should.exist(res);
                res.body.should.have.length(n);
                done();
            });
    });

    it('Get all Specials from oldest to newest',function(done){
        agent.get('/api/specials/?order=old')
            .expect(200)
            .end(function(err,res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    after(function(done) {
        if(id) {
            Special.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});