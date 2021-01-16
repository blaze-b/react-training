const express = require('express');

const router = express.Router();

// @route GET /api/users/test
// @desc  Tests users request
// @access Public
router.get('/test', (req, res)=> res.json({message:'Users Works'}));

module.exports=router;