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
    text: 'Also avoid recommending everything near rivers'
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
               res.body.text.should.equal('Also has fear of rivers.');
               res.body.text.should.equal('Also avoid recommending everything near rivers.');
               id = res.body._id;
               done();
            });
    });

    it('Get Note by _id', function(done) {
        if(err){
            console.log(err);
        }else{
            agent.get('/api/notes/5c9912f2ad71b60bab26e7b5') //specifies test note's ObjectId
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    res.body.linkedId.should.equal('5c990f6f0e74a10b93c91cb1');
                    res.body.type.should.equal('Client');
                    res.body.title.should.equal('This guy failed me three times.');
                    res.body.text.should.equal('Recommend him a one way trip to Siberia.');
                    res.body._id.should.equal('5c9912f2ad71b60bab26e7b5');
                    done();
                });
        }
    });

    it('Get all Notes', function(done) {
        if(err){
            console.log(err);
        }else{
            agent.get('/api/notes')
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    done();
                });
        }
    });

    it('Get all Notes by linkedId', function(done) {
        if(err){
            console.log(err);
        }else{
            agent.get('/api/notes/?linkedId=5c990f6f0e74a10b93c91cb1') //specifies a linkedId shared by multiple test Notes
                .expect(200)
                .end(function (err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    done();
                });
        }
    });

    it('Update Note by _id', function(done) {
        var noteUpdate = {
            type: 'Client',
            linkedId: '5c990e800e74a10b93c91caf',
            title: 'Also has fear of rivers, streams, and lakes.',
            text: 'Also avoid recommending everything near rivers or fresh water.'
        };
        agent.put('/api/notes/5c9912f2ad71b60bab26e7b5')
            .send(noteUpdate)
            .expect(200)
            .end(function(err, res){
                should.not.exist(err);
                should.exist(res);
                res.body.linkedId.should.equal('5c990e800e74a10b93c91caf');
                res.body.type.should.equal('Client');
                res.body.text.should.equal('Also has fear of rivers, streams, and lakes.');
                res.body.text.should.equal('Also avoid recommending everything near rivers or fresh water.');
                res.body._id.should.equal(id);
                done();
            });
    });
    // it('Delete Note by _id', function(done) {
    //
    // });

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