import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Grid, Paper, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', country: '', cryptoLegal: 'no' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [openNotEligible, setOpenNotEligible] = useState(false);

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[0-9\- ]{7,20}$/;

  function validateField(name, value) {
    if (name === 'name') {
      if (!value || value.trim().length < 2) return 'Please enter your full name.';
      return '';
    }
    if (name === 'email') {
      if (!value) return 'Email is required.';
      if (!emailRe.test(value)) return 'Enter a valid email.';
      return '';
    }
    if (name === 'phone') {
      if (!value) return 'Phone is required.';
      if (!phoneRe.test(value)) return 'Enter a valid phone number.';
      return '';
    }
    if (name === 'dob') {
      if (!value) return 'Date of birth is required.';
      const d = new Date(value);
      const now = new Date();
      if (isNaN(d.getTime()) || d >= now) return 'Enter a valid birth date in the past.';
      return '';
    }
    if (name === 'country') {
      if (!value || value.trim().length < 2) return 'Country is required.';
      return '';
    }
    if (name === 'cryptoLegal') {
      if (!value) return 'Please indicate crypto legality.';
      return '';
    }
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // validate all fields
    const nextErrors = {};
    Object.keys(form).forEach(key => {
      nextErrors[key] = validateField(key, form[key]);
    });
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, dob: true, country: true, cryptoLegal: true });

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    // If crypto is not legal in the user's country, show not-eligible dialog instead of proceeding
    if (form.cryptoLegal === 'no') {
      setOpenNotEligible(true);
      return;
    }

    // For this app we don't persist — just navigate to scratch page
    navigate('/scratch', { state: { form } });
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sx={{ px: 2 }}>
        <Paper elevation={0} sx={{ p: 2, mb: 2, background: 'linear-gradient(180deg, rgba(6,182,212,0.06), rgba(16,185,129,0.03))' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Crynance Lottery
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Enter for a chance to win the grand prize of <strong>10 BTC</strong> in our lottery. This is a
            mobile-first experience — no backend. For now, every entry receives a prize (Notebook).
          </Typography>
        </Paper>
        <Dialog open={openNotEligible} onClose={() => setOpenNotEligible(false)}>
          <DialogTitle>Not eligible</DialogTitle>
          <DialogContent>
            <Typography>
              We're sorry — because crypto is not legal in your country, you are not eligible to participate
              in this lottery.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenNotEligible(false)}>OK</Button>
          </DialogActions>
        </Dialog>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="email"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Date of birth"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />

            <TextField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={!!errors.country}
              helperText={errors.country}
            />

            <FormControl component="fieldset" sx={{ mt: 1 }} error={!!errors.cryptoLegal}>
              <FormLabel component="legend">Is crypto legal in your country?</FormLabel>
              <RadioGroup row name="cryptoLegal" value={form.cryptoLegal} onChange={handleChange} onBlur={handleBlur}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
              {!!errors.cryptoLegal && <FormHelperText>{errors.cryptoLegal}</FormHelperText>}
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
