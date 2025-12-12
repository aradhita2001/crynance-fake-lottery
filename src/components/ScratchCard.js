import React, { useRef, useEffect, useState } from 'react';

export default function ScratchCard({ width = 300, height = 180, prize = 'You Won!', onComplete }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const confettiRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Draw background gradient
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, '#06202a');
    g.addColorStop(0.6, '#05384a');
    g.addColorStop(1, '#02323a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Draw simple confetti pattern (small circles in vibrant colors)
    const confettiColors = ['#06b6d4', '#ffb020', '#10b981', '#ef476f', '#ffd166'];
    const confettiCount = Math.floor(width / 30);
    for (let i = 0; i < confettiCount; i++) {
      const x = (i * 37 + Math.sin(i) * 20) % width;
      const y = (i * 23 + Math.cos(i) * 15) % height;
      const r = 4 + (i % 3);
      ctx.fillStyle = confettiColors[i % confettiColors.length];
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Centered "Notebook" text using height-relative sizing
    const baseFontSize = height * 0.15;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const maxWidth = width * 0.85;
    let fontSize = baseFontSize;
    ctx.font = `700 ${fontSize}px sans-serif`;
    while (ctx.measureText('Notebook').width > maxWidth && fontSize > height * 0.08) {
      fontSize -= 1;
      ctx.font = `700 ${fontSize}px sans-serif`;
    }
    ctx.fillText('Notebook', width / 2, height / 2);

    // Setup overlay canvas with metallic pattern and 'Scratch Here' label
    const overlay = overlayRef.current;
    overlay.width = width;
    overlay.height = height;
    const octx = overlay.getContext('2d');

    // create a small pattern canvas for diagonal stripes
    const pattern = document.createElement('canvas');
    pattern.width = 20;
    pattern.height = 20;
    const pctx = pattern.getContext('2d');
    pctx.fillStyle = '#9aa0a6';
    pctx.fillRect(0, 0, pattern.width, pattern.height);
    pctx.strokeStyle = 'rgba(255,255,255,0.06)';
    pctx.lineWidth = 4;
    pctx.beginPath();
    pctx.moveTo(0, pattern.height);
    pctx.lineTo(pattern.width, 0);
    pctx.stroke();

    const pat = octx.createPattern(pattern, 'repeat');
    octx.fillStyle = pat;
    octx.fillRect(0, 0, width, height);

    // highlight sheen
    const sheen = octx.createLinearGradient(0, 0, width, 0);
    sheen.addColorStop(0, 'rgba(255,255,255,0.04)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0.08)');
    sheen.addColorStop(1, 'rgba(255,255,255,0.02)');
    octx.fillStyle = sheen;
    octx.fillRect(0, 0, width, height);

    // 'Scratch here' label with smaller font
    octx.fillStyle = 'rgba(255,255,255,0.95)';
    octx.font = `bold ${Math.round(height * 0.08)}px sans-serif`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText('SCRATCH HERE', width / 2, height / 2);

    // set composite to allow erasing
    octx.globalCompositeOperation = 'destination-out';
  }, [width, height, prize]);

  useEffect(() => {
    if (completed && onComplete) onComplete();
  }, [completed, onComplete]);

  // Setup confetti canvas
  useEffect(() => {
    const confetti = confettiRef.current;
    if (confetti) {
      confetti.width = width;
      confetti.height = height;
    }
  }, [width, height]);

  function getPointerPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  function eraseAt(x, y) {
    const overlay = overlayRef.current;
    const octx = overlay.getContext('2d');
    const radius = Math.max(12, Math.round(Math.min(width, height) * 0.06));
    octx.beginPath();
    octx.arc(x, y, radius, 0, Math.PI * 2);
    octx.fill();
  }

  function handleStart(e) {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getPointerPos(e, overlayRef.current);
    eraseAt(pos.x, pos.y);
  }

  function handleMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPointerPos(e, overlayRef.current);
    eraseAt(pos.x, pos.y);
  }

  function handleEnd() {
    setIsDrawing(false);
    // compute reveal percent
    const overlay = overlayRef.current;
    const octx = overlay.getContext('2d');
    const image = octx.getImageData(0, 0, overlay.width, overlay.height);
    let cleared = 0;
    for (let i = 3; i < image.data.length; i += 4 * 4) {
      if (image.data[i] === 0) cleared++;
    }
    const total = (image.data.length / 4) / 4; // because sampled every 4th pixel
    const percent = (cleared / total) * 100;
    if (percent > 30) {
      // reveal fully
      octx.clearRect(0, 0, overlay.width, overlay.height);
      // Clear overlay text and pattern completely
      octx.globalCompositeOperation = 'source-over';
      octx.clearRect(0, 0, overlay.width, overlay.height);
      setCompleted(true);
    }
  }

  return (
    <div style={{ position: 'relative', width, height, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      <canvas
        ref={confettiRef}
        style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}
      />
      <canvas
        ref={overlayRef}
        style={{ position: 'absolute', left: 0, top: 0, touchAction: 'none' }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
}
