/* Dependencies */
var note_controller = require('../controllers/note.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* Read all users, Create new user */
/* Can read a specific user by it's linkedId */
router.route('/')
    .get(note_controller.noteByLinkedId, note_controller.list)
    .post(note_controller.create);

router.route('/:noteId')
    .get(note_controller.read)
    .put(note_controller.update)
    .delete(note_controller.delete);

module.exports = router;