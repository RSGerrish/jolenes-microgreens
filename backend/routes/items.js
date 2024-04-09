require('dotenv').config()

const Item = require('../models/itemModel')
const mongoose = require('mongoose')

const express = require('express')
const multer = require('multer')
const crypto = require('crypto')
const { getItems, getItem, createItem, deleteItem, updateItem, uploadFile, deleteFile } = require('../controllers/itemController')

const itemRouter = express.Router()

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// GET all items
itemRouter.get('/', getItems)

// GET a single item
itemRouter.get('/:id', getItem)

// POST a new item
itemRouter.post('/', upload.single('image'), async (req, res, next) => {
  const imageName = randomImageName()

  uploadFile(req.file.buffer, imageName, req.file.mimetype)
  console.log("Image added to bucket")

  req.body.imageName = imageName

  next()
}, createItem)

// DELETE an item
itemRouter.delete('/:id', deleteItem)

// UPDATE an item
itemRouter.patch('/:id', upload.single('image'), async (req, res, next) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item!'})
  }

  const newImageName = randomImageName()

  console.log('req.file', req.file)

  {req.file == undefined && 
    console.log("no new image to upload")
  }
  
  if (req.file != undefined) {
    const item = await Item.findById(id)

    if(!item) {
      return res.status(404).json({error: 'No such item!'})
    }

    console.log('deleting: ', item.imageName)
    await deleteFile(item.imageName)
    console.log('image deleted')

    console.log('handling new image')
    await uploadFile(req.file.buffer, newImageName, req.file.mimetype)
    req.body.imageName = newImageName
    console.log('new image uploaded')
/*     console.log(newImageName)
    await deleteFile(item.imageName)
    req.body.imageName = newImageName
    req.body.imageUrl = "" */
  }

  next()
}, updateItem)

module.exports = { itemRouter, upload }