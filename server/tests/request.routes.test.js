var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Request = require('../models/request.model.js');

/* Global variables */
var app, agent;

//Different party members to be a part of the Request
var req = { //new Request created to test save, update, and delete calls
    clientId: 'octomom@gmail.com',
    requestState: 'Pending',
    budget: {min: 0, max: 1000000},
    location: {from : 'Gainesville, FL', to: 'New York, NY',},
    travelDates:{departing: new Date("2019-04-24"), returning: new Date("2019-04-30")},
    numAdults: 1,
    numChildren: 8,
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
                res.body.clientId.should.equal('octomom@gmail.com');
                res.body.requestState.should.equal('Pending');
                res.body.budget.min.should.equal(0);
                res.body.budget.max.should.equal(1000000);
                res.body.location.from.should.equal('Gainesville, FL');
                res.body.location.to.should.equal('New York, NY');
                res.body.numAdults.should.equal(1);
                res.body.numChildren.should.equal(8);
                res.body.partySize.should.equal(9);
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
                res.body.clientId.should.equal('octomom@gmail.com');
                res.body.requestState.should.equal('Pending');
                res.body.budget.min.should.equal(0);
                res.body.budget.max.should.equal(1000000);
                res.body.location.from.should.equal('Gainesville, FL');
                res.body.location.to.should.equal('New York, NY');
                res.body.numAdults.should.equal(1);
                res.body.numChildren.should.equal(8);
                res.body.partySize.should.equal(9);
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
            clientId: 'octomom@gmail.com',
            requestState: 'Declined',
            budget: {min: 0, max: 1000000},
            location: {from : 'Gainesville, FL', to: 'New York, NY',},
            travelDates:{departing: new Date("2019-04-24"), returning: new Date("2019-04-30")},
            numAdults: 2,
            numChildren: 8,
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
                        res.body.clientId.should.equal('octomom@gmail.com');
                        res.body.requestState.should.equal('Declined');
                        res.body.budget.min.should.equal(0);
                        res.body.budget.max.should.equal(1000000);
                        res.body.location.from.should.equal('Gainesville, FL');
                        res.body.location.to.should.equal('New York, NY');
                        res.body.numAdults.should.equal(2);
                        res.body.numChildren.should.equal(8);
                        res.body.partySize.should.equal(10);
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