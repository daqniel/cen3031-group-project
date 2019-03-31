var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    User = require('../models/user.model.js');

/* Global variables */
var app, agent;

var user = { //new Users created to test save, update, and delete calls
    name: 'Billy Bob',
    email: 'billywillyfofilly@yahoo.com',
    password: 'p@33w0rd',
    phoneNumber: '123-456-7890',
};

var badUserEmail = { //User created to test proper email formatting
    name: 'Unlce Sam',
    email: 'freedom has no form',
    password: 'b@ld_3@6l3',
    phoneNumber: '321-654-0987',
};

var badUserPhoneNumber = { //User created to test proper phone number formatting
    name: 'Geico Caveman',
    email: 'thecaveman@geico.com',
    password: 's@v3_15%_0r_m0r3_0n_c@r_1n5ur@nc3',
    phoneNumber: 'too much technology',
};

var id; //ObjectId of created test User

/* Unit tests for testing server side routes for the listings API */
describe('Tests for User API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create User', function(done) {
        agent.post('/api/users') //
            .send(user)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.name.should.equal('Billy Bob');
                res.body.email.should.equal('billywillyfofilly@yahoo.com');
                res.body.password.shoudl.equal('p@33w0rd');
                res.body.phoneNumber.shoudl.equal('123-456-7890');
                id = res.body._id;
                done();
            });
    });

    it('Reject creating User for wrong email', function(done){
        agent.post('/api/users')
            .send(badUserEmail)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                done();
            });
    });

    it('Reject creating User for wrong phone number', function(done) {
        agent.post('/api/users')
            .send(badUserPhoneNumber)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res.body._id);
                done();
            });
    });

    it('Get all Users', function(done) {
        agent.get('/api/users')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update User by _id', function(done) {
        var userUpdate = {
            name: 'Billy Bob',
            email: 'billywillyfofilly@yahoo.com',
            password: 'p@33w0rd',
            phoneNumber: '123-456-7890',
        };
        agent.put('/api/users/' + id)
            .send(userUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/users/' + id) //grabs updated User
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

    it('Delete User by _id', function(done) {
        agent.delete('/api/users/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/users/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            User.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});