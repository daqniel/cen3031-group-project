var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    User = require('../models/user.model.js');

/* Global variables */
var app, agent;

var user = { //new Users created to test save, update, and delete calls
    name: {
        first: 'Billy',
        middle: 'Ben',
        last: 'Bob'
    },
    email: 'billywillyfofilly@yahoo.com',
    password: 'p@33w0rd',
    phoneNumber: '123-456-7890',
    isAdmin: false
};

var badUserEmail = { //User created to test proper email formatting
    name: {
        first: 'Uncle',
        last: 'Sam'
    },
    email: 'freedom has no form',
    password: 'b@ld_3@6l3',
    phoneNumber: '321-654-0987',
    isAdmin: false
};

var badUserPhoneNumber = { //User created to test proper phone number formatting
    name: {
        first: 'Caveman',
        middle: 'from',
        last: 'Geico'
    },
    email: 'thecaveman@geico.com',
    password: 's@v3_15%_0r_m0r3_0n_c@r_1n5ur@nc3',
    phoneNumber: 'too much technology',
    isAdmin: false
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
        agent.post('/api/users')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.name.first.should.equal('Billy');
                res.body.name.middle.should.equal('Ben');
                res.body.name.last.should.equal('Bob');
                res.body.email.should.equal('billywillyfofilly@yahoo.com');
                res.body.password.should.equal('p@33w0rd');
                res.body.phoneNumber.should.equal('123-456-7890');
                res.body.isAdmin.should.equal(false);
                done();
            });
    });

    it('Reject creating User for wrong email', function(done){
        agent.post('/api/users')
            .send(badUserEmail)
            .expect(400)
            .end(function(err, res){
                should.exist(err);
                done();
            });
    });

    it('Reject creating User for wrong phone number', function(done) {
        agent.post('/api/users')
            .send(badUserPhoneNumber)
            .expect(400)
            .end(function(err, res){
                should.exist(err);
                done();
            });
    });

    it('Get User by User\'s email', function(done) {
        agent.get('/api/users/' + user.email) //specifies test BlogPost's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.name.first.should.equal('Billy');
                res.body.name.middle.should.equal('Ben');
                res.body.name.last.should.equal('Bob');
                res.body.email.should.equal('billywillyfofilly@yahoo.com');
                res.body.password.should.equal('p@33w0rd');
                res.body.phoneNumber.should.equal('123-456-7890');
                res.body.isAdmin.should.equal(false);
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

    it('Update User by User\'s email', function(done) {
        var userUpdate = {
            name: {
                first: 'Billy',
                middle: 'Ben',
                last: 'Bob'
            },
            email: 'billywillyfofilly@yahoo.com',
            password: 'C2PN69NOTC8OG2346UBRFXIJU4OG23K5CUXF2YBOV3KUJYFNC5I2TGU3Y',
            phoneNumber: '123-456-7890',
            isAdmin: true
        };
        agent.put('/api/users/' + user.email)
            .send(userUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/users/' + user.email) //grabs updated User
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.name.first.should.equal('Billy');
                        res.body.name.middle.should.equal('Ben');
                        res.body.name.last.should.equal('Bob');
                        res.body.email.should.equal('billywillyfofilly@yahoo.com');
                        res.body.password.should.equal('C2PN69NOTC8OG2346UBRFXIJU4OG23K5CUXF2YBOV3KUJYFNC5I2TGU3Y');
                        res.body.phoneNumber.should.equal('123-456-7890');
                        res.body.isAdmin.should.equal(true);
                        done();
                    });
            })
    });

    it('Delete User by User\'s email', function(done) {
        agent.delete('/api/users/' + user.email)
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