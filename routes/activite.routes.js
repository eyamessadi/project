const router = require('express').Router();
const activiteController = require('../controllers/activite.controller');


router.get('/', activiteController.readActivite);
router.post('/create', activiteController.createActivite);
router.put ('/:id',activiteController.updateActivite);
router.delete('/:id',activiteController.deleteActivite);

//notes
router.patch('/note-activite/:id', activiteController.noteActivite);
router.patch('/edit-note-activite/:id',activiteController.editNoteActivite);
router.patch('/delete-note-activite/:id',activiteController.DeleteNoteActivite);

module.exports = router;