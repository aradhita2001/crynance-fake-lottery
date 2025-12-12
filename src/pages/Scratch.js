import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ScratchCard from '../components/ScratchCard';

export default function Scratch() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.form ?? {};
  const [openResult, setOpenResult] = useState(false);

  function handleComplete() {
    setOpenResult(true);
  }

  const [cardWidth, setCardWidth] = useState(() => Math.min(window.innerWidth - 48, 360));

  useEffect(() => {
    function onResize() {
      setCardWidth(Math.min(window.innerWidth - 48, 360));
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Box sx={{ px: 2 }}>
      <Paper sx={{ p: 3, width: '100%', maxWidth: 520, mx: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Scratch & Win
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Participant: {form.name || 'Guest'} — scratch to reveal your prize.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <ScratchCard width={cardWidth} height={Math.round(cardWidth * 0.55)} prize={`You won a ${prize}!`} onComplete={handleComplete} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Button onClick={() => navigate('/')} variant="outlined">Back</Button>
        </Box>
      </Paper>

      <Dialog open={openResult} onClose={() => setOpenResult(false)}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>You won a Notebook in this giveaway.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenResult(false); navigate('/'); }}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
