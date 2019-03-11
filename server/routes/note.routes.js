/* Dependencies */
var note_controller = require('../controllers/note.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all notes made
router.route('/')
    .post(note_controller.create);

router.route('/:noteID')
    .get(note_controller.read)
    .put(note_controller.update)
    .delete(note_controller.delete);
