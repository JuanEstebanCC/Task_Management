const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const verifyToken = require('./verifyToken');

let User = require('../models/User');
let Task = require('../models/Task');

const DIR = './public/images/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.post('/new_task', upload.single('taskImage'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    taskName: req.body.taskName,
    priority: req.body.priority,
    expDate: req.body.expDate,
    taskImage: url + '/public/images/' + req.file.filename,
  });
  newTask
    .save()
    .then((result) => {
      res.status(201).json({
        taskImage: result.taskImage,
        message: 'Task registered successfully!',
        taskCreated: {
          _id: result._id,
          taskName: result.taskName,
          priority: result.priority,
          expDate: result.expDate,
          taskImage: result.taskImage,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

router.put('/edit_task/:id', upload.single('taskImage'), async (req, res) => {
  const url = req.protocol + '://' + req.get('host');

  const id = req.params.id;

  const taskName = req.body.taskName;
  const priority = req.body.priority;
  const expDate = req.body.expDate;
  const taskImage = url + '/public/images/' + req.file.filename;

  Task.findByIdAndUpdate(id, {
    $set: {
      taskName: taskName,
      priority: priority,
      expDate: expDate,
      taskImage: taskImage,
    },
  })
    .then(console.log(id, taskName))
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: 'Task was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Task with id=' + id,
      });
    });
});

router.delete('/delete_task/:id', async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted', task });
});

router.get('/tasks', async (req, res) => {
  const alumnos = await Task.find().sort('-_id');
  res.json(alumnos);
});

module.exports = router;
