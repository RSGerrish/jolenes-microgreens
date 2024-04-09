const express = require('express')
const { getMailList, getAddress, createAddress, deleteAddress, updateAddress } = require('../controllers/addressController')

const router = express.Router()

// GET all email addresses
router.get('/', getMailList)

// GET a single email address
router.get('/:id', getAddress)

// POST a new email address
router.post('/', createAddress)

// DELETE an email address
router.delete('/:id', deleteAddress)

// UPDATE an email address
router.patch('/:id', updateAddress)

module.exports = router