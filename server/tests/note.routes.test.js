var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Note = require('../models/note.model.js');

/* Global variables */
var app, agent;

var note = { //new Note created to test save, update, and delete calls
    type: 'Client',
    linkedId: '5c990e800e74a10b93c91caf',
    title: 'Also has fear of rivers.',
    text: 'Also avoid recommending everything near rivers.'
};

var id; //ObjectId of created test Note

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Note API call', function() {
    this.timeout(10000);

    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Notes', function(done) {
        agent.post('/api/notes')
            .send(note)
            .expect(200)
            .end(function(err, res){
               should.not.exist(err);
               should.exist(res.body._id);
               res.body.linkedId.should.equal('5c990e800e74a10b93c91caf');
               res.body.type.should.equal('Client');
               res.body.title.should.equal('Also has fear of rivers.');
               res.body.text.should.equal('Also avoid recommending everything near rivers.');
               id = res.body._id;
               done();
            });
    });

    it('Get Note by _id', function(done) {
        agent.get('/api/notes/' + id) //specifies test note's ObjectId
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                res.body.linkedId.should.equal('5c990e800e74a10b93c91caf');
                res.body.type.should.equal('Client');
                res.body.title.should.equal('Also has fear of rivers.');
                res.body.text.should.equal('Also avoid recommending everything near rivers.');
                res.body._id.should.equal(id);
                done();
            });
    });

    it('Get all Notes', function(done) {
        agent.get('/api/notes')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Get all Notes by linkedId', function(done) {
        agent.get('/api/notes/?linkedId=5c990e800e74a10b93c91caf') //specifies a linkedId shared by multiple test Notes
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                should.exist(res);
                done();
            });
    });

    it('Update Note by _id', function(done) {
        var noteUpdate = {
            type: 'Client',
            linkedId: '5c990e800e74a10b93c91caf',
            title: 'Also has fear of rivers, streams, and lakes.',
            text: 'Also avoid recommending everything near rivers or fresh water.'
        };
        agent.put('/api/notes/' + id)
            .send(noteUpdate)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                agent.get('/api/notes/' + id) //grabs updated note
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        should.exist(res);
                        res.body.linkedId.should.equal('5c990e800e74a10b93c91caf');
                        res.body.type.should.equal('Client');
                        res.body.title.should.equal('Also has fear of rivers, streams, and lakes.');
                        res.body.text.should.equal('Also avoid recommending everything near rivers or fresh water.');
                        res.body._id.should.equal(id);
                        done();
                    });
            })
    });

    it('Delete Note by _id', function(done) {
        agent.delete('/api/notes/' + id)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                agent.get('/api/notes/' + id)
                    .expect(400)
                    .end(function(err, res) {
                        id = undefined;
                        done();
                    });
            })
    });

    after(function(done) {
        if(id) {
            Note.remove({_id: id}, function(err){
                if(err) throw err;
                done();
            })
        }
        else {
            done();
        }
    });
});