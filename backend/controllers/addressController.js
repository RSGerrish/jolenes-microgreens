const Address = require('../models/addressModel')
const mongoose = require('mongoose')

// GET all addresses
const getMailList = async (req, res) => {
  const mailList = await Address.find({}).sort({createdAt: -1})

  res.status(200).json(mailList)
}

// GET a single address
const getAddress = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such address!'})
  }

  const address = await Address.findById(id)

  if(!address) {
    return res.status(404).json({error: 'No such address'})
  }

  res.status(200).json(address)
}

// POST a single address
const createAddress = async (req, res) => {
  const { email, name, weekly } = req.body

  // add doc to db
  try {
    const address = await Address.create({email, name, weekly})
    res.status(200).json(address)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE a single address
const deleteAddress = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such address!'})
  }

  const address = await Address.findOneAndDelete({_id: id})

  if(!address) {
    return res.status(404).json({error: 'No such address'})
  }

  res.status(200).json(address)
}

// UPDATE a single address
const updateAddress = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such address!'})
  }

  const address = await Address.findOneAndUpdate({_id: id}, {
    ...req.body  // Destructure req.body into our address record to update
  })

  if(!address) {
    return res.status(400).json({error: 'No such address'})
  }

  res.status(200).json(address)
}

module.exports = { getMailList, getAddress, createAddress, deleteAddress, updateAddress }