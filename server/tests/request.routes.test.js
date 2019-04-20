var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Request = require('../models/request.model.js');

/* Global variables */
var app, agent;

var req = { //new Request created to test save, update, and delete calls
    clientID: 'octomom@gmail.com',
    requestState: 'Pending',
    budget: {min: 0, max: 1000000},
    location: {from : 'Gainesville, FL', to: 'New York, NY',},
    travelDates:{departing: new Date("2019-04-24"), returning: new Date("2019-04-30")},
    party: {
        0: {name: 'Jack', birthDate: new Date("1998-09-11")},
        1: {name: 'Samantha', birthDate: new Date("1997-10-17")},
        2: {name: 'Brittany', birthDate: new Date("1990-12-26")}},
    wantTravelInsurance: false,
    wantCruise: true,
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
            .send(req)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.clientID.should.equal('octomom@gmail.com');
                res.body.requestState.should.equal('Pending');
                res.body.budget.min.should.equal(0);
                res.body.budget.max.should.equal(1000000);
                res.body.location.from.should.equal('Gainesville, FL');
                res.body.location.to.should.equal('New York, NY');
                res.body.party[0].name.should.equal('Jack');
                res.body.party[1].name.should.equal('Samantha');
                res.body.party[2].name.should.equal('Brittany');
                res.body.text.should.equal('I have eight rambunctious kids. Take me somewhere were they won\'t annoy me.');
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
                res.body.clientID.should.equal('octomom@gmail.com');
                res.body.requestState.should.equal('Pending');
                res.body.budget.min.should.equal(0);
                res.body.budget.max.should.equal(1000000);
                res.body.location.from.should.equal('Gainesville, FL');
                res.body.location.to.should.equal('New York, NY');
                res.body.party[0].name.should.equal('Jack');
                res.body.party[1].name.should.equal('Samantha');
                res.body.party[2].name.should.equal('Brittany');
                res.body.text.should.equal('I have eight rambunctious kids. Take me somewhere were they won\'t annoy me.');
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
            clientID: 'octomom@gmail.com',
            requestState: 'Declined',
            budget: {min: 0, max: 1000000},
            location: {from : 'Gainesville, FL', to: 'New York, NY',},
            travelDates:{departing: new Date("2019-04-24"), returning: new Date("2019-04-30")},
            party: {
                0: {name: 'Jake', birthDate: new Date("1998-09-11")},
                1: {name: 'Sam', birthDate: new Date("1997-10-17")},
                2: {name: 'Britt', birthDate: new Date("1990-12-26")}},
            wantTravelInsurance: false,
            wantCruise: true,
            text: 'I have eight rambunctious kids. Take me somewhere were they won\'t annoy me.'
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
                        res.body.clientID.should.equal('octomom@gmail.com');
                        res.body.requestState.should.equal('Declined');
                        res.body.budget.min.should.equal(0);
                        res.body.budget.max.should.equal(1000000);
                        res.body.location.from.should.equal('Gainesville, FL');
                        res.body.location.to.should.equal('New York, NY');
                        res.body.party[0].name.should.equal('Jake');
                        res.body.party[1].name.should.equal('Sam');
                        res.body.party[2].name.should.equal('Britt');
                        res.body.text.should.equal('I have eight rambunctious kids. Take me somewhere were they won\'t annoy me.');
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