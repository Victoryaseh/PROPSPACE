const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', propertyController.getAll);
router.get('/my-listings', protect, propertyController.getMyListings);
router.get('/:id', propertyController.getOne);
router.post('/', protect, propertyController.create);
router.put('/:id', protect, propertyController.update);
router.delete('/:id', protect, propertyController.remove);

module.exports = router;
