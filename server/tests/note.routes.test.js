var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Note = require('../models/note.model.js');

/* Global variables */
var app, agent, note, id;

var note = {
    type: 'Client',
    linkedId: '1',
    title: 'Test Title',
    text: 'This is the body of the test note'
};

/* Unit tests for testing server side routes for the listings API */
describe('Tests for Note API call', function() {
    this.timeout(10000);
    before(function(done) {
        app = express.init();
        agent = request.agent(app);
        done();
    });

    it('Create Notes', function(done) {

    });
    it('Get Note by _id', function(done) {

    });
    it('Get all Notes', function(done) {

    });
    it('Get all Notes by linkedId', function(done) {

    });
    it('Update Note by _id', function(done) {

    });
    it('Delete Note by _id', function(done) {

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