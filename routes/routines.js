const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');

// Get all routines
router.get('/', async (req, res) => {
  try {
    const routines = await Routine.find().sort({ createdAt: -1 });
    res.json(routines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a routine
router.post('/', async (req, res) => {
  const routine = new Routine({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    frequency: req.body.frequency,
    timeOfDay: req.body.timeOfDay,
  });

  try {
    const newRoutine = await routine.save();
    res.status(201).json(newRoutine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a routine
router.put('/:id', async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });

    if (req.body.title != null) routine.title = req.body.title;
    if (req.body.description != null) routine.description = req.body.description;
    if (req.body.category != null) routine.category = req.body.category;
    if (req.body.frequency != null) routine.frequency = req.body.frequency;
    if (req.body.timeOfDay != null) routine.timeOfDay = req.body.timeOfDay;
    
    // For toggling completion for a specific date
    if (req.body.toggleDate) {
      const date = req.body.toggleDate;
      if (routine.completedDates.includes(date)) {
        routine.completedDates = routine.completedDates.filter(d => d !== date);
      } else {
        routine.completedDates.push(date);
      }
    }

    const updatedRoutine = await routine.save();
    res.json(updatedRoutine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a routine
router.delete('/:id', async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });

    await routine.deleteOne();
    res.json({ message: 'Routine deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
