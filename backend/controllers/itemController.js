require('dotenv').config()

const Item = require('../models/itemModel')
const mongoose = require('mongoose')
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretKey = process.env.SECRET_ACCESS_KEY

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
},
region: bucketRegion
})

// UPLOAD image to S3
const uploadFile = (fileBuffer, fileName, mimetype) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

//DELETE image in S3
const deleteFile = (fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

//GET signed URL for image in S3
const getObjectSignedUrl = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  }

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url
}

// GET all items
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({createdAt: -1})

  for (let item of items) {
    item.imageUrl = await getObjectSignedUrl(item.imageName)

    await Item.updateOne({_id: item.id}, {imageUrl: item.imageUrl})
  }

  res.status(200).json(items)
}

// GET a single item
const getItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item!'})
  }
  
  const item = await Item.findOne({_id: id})

  if(!item) {
    return res.status(404).json({error: 'No such item!'})
  }

  item.imageUrl = await getObjectSignedUrl(item.imageName)

  await Item.updateOne({_id: id}, {imageUrl: item.imageUrl})
  
  res.status(200).json(item)
}

// POST a single item
const createItem = async (req, res, next) => {
  const { image, imageName, name, description, qp, benefits } = req.body

  // add doc to db
  try {
    const item = await Item.create({image, imageName, name, description, qp, benefits})
    
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

  next()
}

// DELETE a single address
const deleteItem = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item!'})
  }

  /* const item = await Item.findOneAndDelete({_id: id}) */
  const item = await Item.findById(id)

  if(!item) {
    return res.status(404).json({error: 'No such item!'})
  }

  console.log(item.imageName)

  await deleteFile(item.imageName)

  await Item.deleteOne({ _id: id })

  res.status(200).json(item)
}

// UPDATE a single address
const updateItem = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item!'})
  }

  const item = await Item.findOneAndUpdate({ _id: id }, req.body)

  res.status(200).json(item)
}

module.exports = { getItems, getItem, createItem, deleteItem, updateItem, uploadFile, deleteFile }