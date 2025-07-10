const express = require('express');
const router = express.Router();
const {
  createTrade,
  getTrades,
  updateTrade,
  deleteTrade,
  getTradeStats,
  searchTrades,
  getStrategyStats,
  getMonthlyStats,
  // Optional: getTradeById
} = require('../controllers/tradeController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Trade = require('../models/Trade'); // Move to top for clarity

/**
 * ⚠️ NOTE:
 * Static routes must come before dynamic ones to prevent conflicts (e.g. /stats vs /:id)
 */

// --------------------- Static Routes ---------------------

router.get('/stats/monthly', protect, getMonthlyStats);
router.get('/strategies/stats', protect, getStrategyStats);
router.get('/stats', protect, getTradeStats);
router.get('/search', protect, searchTrades);

// --------------------- Main Trade Routes ---------------------

router.post('/', protect, createTrade);
router.get('/', protect, getTrades);

// --------------------- Trade Upload ---------------------

router.post('/:id/upload', protect, upload.single('screenshot'), async (req, res) => {
  try {
    const tradeId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier uploadé' });
    }

    const updatedTrade = await Trade.findByIdAndUpdate(
      tradeId,
      { screenshot: req.file.path },
      { new: true }
    );

    if (!updatedTrade) {
      return res.status(404).json({ message: 'Trade non trouvé' });
    }

    res.json({
      message: 'Image uploadée avec succès',
      trade: updatedTrade,
    });
  } catch (error) {
    console.error('Erreur lors de l’upload :', error);
    res.status(500).json({ message: 'Erreur lors de l’upload de l’image' });
  }
});

// --------------------- Dynamic Routes (MUST BE LAST) ---------------------

router.put('/:id', protect, updateTrade);
router.delete('/:id', protect, deleteTrade);
// router.get('/:id', protect, getTradeById); // Optional

module.exports = router;
