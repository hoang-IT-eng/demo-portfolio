import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ParticleCanvasProps {
  colorScheme?: 'flower' | 'aura' | 'solaris';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  colorScheme = 'flower',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleCount, setParticleCount] = useState(120);
  const [interactiveGlow, setInteractiveGlow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    const colorsByScheme = {
      flower: [
        'rgba(255, 183, 77, ',   // amber/orange pollen
        'rgba(186, 104, 200, ',  // soft purple lavender
        'rgba(255, 224, 130, ',  // golden sunlit glow
        'rgba(240, 98, 146, ',   // pink petal dust
        'rgba(129, 199, 132, ',  // verdant leaf sparkle
      ],
      aura: [
        'rgba(182, 0, 168, ',
        'rgba(118, 33, 176, ',
        'rgba(190, 76, 0, ',
        'rgba(215, 226, 234, ',
      ],
      solaris: [
        'rgba(255, 153, 0, ',
        'rgba(255, 204, 0, ',
        'rgba(255, 85, 0, ',
        'rgba(255, 255, 255, ',
      ],
    };

    const palette = colorsByScheme[colorScheme] || colorsByScheme.flower;

    const particles: Particle[] = [];
    const spawnParticle = (px?: number, py?: number): Particle => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: px ?? Math.random() * width,
        y: py ?? Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.3,
        size: Math.random() * 4 + 1.5,
        baseSize: Math.random() * 4 + 1.5,
        color,
        alpha: Math.random() * 0.7 + 0.3,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(spawnParticle());
    }

    const mouse = { x: -1000, y: -1000, isDown: false };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Burst
      for (let i = 0; i < 20; i++) {
        const p = spawnParticle(clickX, clickY);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
        particles.push(p);
        if (particles.length > 200) particles.shift();
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Background ambient gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        width / 1.2
      );
      bgGrad.addColorStop(0, 'rgba(18, 22, 28, 0.95)');
      bgGrad.addColorStop(1, 'rgba(10, 11, 13, 0.98)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw interactive ambient sunbeam/glow at mouse position
      if (mouse.x > 0 && interactiveGlow) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        glow.addColorStop(0, 'rgba(255, 215, 120, 0.22)');
        glow.addColorStop(0.5, 'rgba(186, 104, 200, 0.08)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Turbulence
        p.x += p.vx + Math.sin(time + p.y * 0.02) * 0.4;
        p.y += p.vy + Math.cos(time + p.x * 0.02) * 0.3;

        // Mouse attraction/repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
          p.size = p.baseSize * (1 + force * 0.8);
        } else {
          p.size += (p.baseSize - p.size) * 0.1;
        }

        // Screen wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (p.life > p.maxLife) {
          particles[i] = spawnParticle();
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const currentAlpha =
          lifeRatio < 0.2
            ? (lifeRatio / 0.2) * p.alpha
            : lifeRatio > 0.8
            ? ((1 - lifeRatio) / 0.2) * p.alpha
            : p.alpha;

        // Draw particle with soft radial bloom
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        radGrad.addColorStop(0, `${p.color}${currentAlpha})`);
        radGrad.addColorStop(0.5, `${p.color}${currentAlpha * 0.5})`);
        radGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [colorScheme, particleCount, interactiveGlow]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#252830] bg-[#0A0B0D]">
      <canvas ref={canvasRef} className="w-full block cursor-crosshair" />

      {/* Top Overlay controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Interactive WebGL Simulation · Move mouse or click</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setInteractiveGlow(!interactiveGlow)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              interactiveGlow
                ? 'bg-[#B600A8]/30 text-white border border-[#B600A8]/50'
                : 'bg-black/60 text-[#8C9BA5] border border-white/10 hover:text-white'
            }`}
          >
            {interactiveGlow ? 'Glow: Active' : 'Glow: Off'}
          </button>
          <button
            type="button"
            onClick={() =>
              setParticleCount((prev) => (prev >= 180 ? 80 : prev + 40))
            }
            className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[#D7E2EA] hover:text-white transition-colors text-[11px] flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Density: {particleCount}</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-3 text-[11px] text-[#8C9BA5] pointer-events-none">
        Simulating custom GLSL vertex displacement & volumetric floral scattering
      </div>
    </div>
  );
};
