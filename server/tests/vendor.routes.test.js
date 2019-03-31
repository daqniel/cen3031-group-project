var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Vendor = require('../models/vendor.model.js');

/* Global variables */
var app, agent;

var vendor = { //new Vendors created to test save, update, and delete calls
    name: 'Testy\'s Test Location',
    email: 'ttlocation@gmail.com',
    link: 'www.ttlocation.gov',
    phoneNumber: '352-123-4567'
};

var id; //ObjectId of created test Vendor

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Vendor API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Vendor', function(done) {
        agent.post('/api/vendors')
            .send(vendor)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                res.body.name.should.equal('Testy\'s Test Location');
                res.body.email.should.equal('ttlocation@gmail.com');
                res.body.link.should.equal('www.ttlocation.gov');
                res.body.phoneNumber.should.equal('352-123-4567');
                id = res.body._id;
                done();
            });
    });

    it('Get Vendor by _id', function(done) {
        agent.get('/api/vendors/' + id) //specifies test Vendor's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.name.should.equal('Testy\'s Test Location');
                res.body.email.should.equal('ttlocation@gmail.com');
                res.body.link.should.equal('www.ttlocation.gov');
                res.body.phoneNumber.should.equal('352-123-4567');
                res.body._id.should.equal(id);
                done();
            });
    });

    it('Get all Vendors', function(done) {
        agent.get('/api/vendors')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.should.have.length(3);
                done();
            });
    });

    it('Update Vendor by _id', function(done) {
        var vendorUpdate = {
            name: 'Testy\'s Test Location',
            email: 'ttlocation@gmail.com',
            link: 'www.ttlocation.com',
            phoneNumber: '352-123-4567'
        };
        agent.put('/api/vendors/' + id)
            .send(vendorUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/vendors/' + id) //grabs updated Vendor
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.name.should.equal('Testy\'s Test Location');
                        res.body.email.should.equal('ttlocation@gmail.com');
                        res.body.link.should.equal('www.ttlocation.com');
                        res.body.phoneNumber.should.equal('352-123-4567');
                        res.body._id.should.equal(id);
                        done();
                    });
            })
    });

    it('Delete Vendor by _id', function(done) {
        agent.delete('/api/vendors/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/vendors/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            Vendor.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});