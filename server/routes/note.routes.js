/* Dependencies */
var note_controller = require('../controllers/note.controller.js'), 
    express = require('express'), 
    router = express.Router();

//lists all notes made
router.use('/', note_controller.noteByLinkedID);
router.route('/')
    .get(note_controller.list)
    .post(note_controller.create);

router.route('/:note_id')
    .get(note_controller.read)
    .put(note_controller.update)
    .delete(note_controller.delete);

router.param('note_id', note_controller.noteByID);

module.exports = router;