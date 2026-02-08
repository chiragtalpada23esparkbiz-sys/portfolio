"use client";

import { useEffect, useRef } from "react";

interface CellState {
  opacity: number;
  targetOpacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cellStatesRef = useRef<Map<string, CellState>>(new Map());
  const ripplesRef = useRef<Ripple[]>([]);
  const animationRef = useRef<number>(0);
  const cellSize = 40;

  const getCellKey = (col: number, row: number) => `${col}-${row}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Grid settings
      const cols = Math.ceil(rect.width / cellSize) + 1;
      const rows = Math.ceil(rect.height / cellSize) + 1;

      // Check if dark mode
      const isDark = document.documentElement.classList.contains("dark");

      // Find which cell the mouse is over
      const hoveredCol = Math.floor(mouseRef.current.x / cellSize);
      const hoveredRow = Math.floor(mouseRef.current.y / cellSize);

      // Update ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += ripple.speed;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);
        return ripple.opacity > 0.01;
      });

      // Update cell states
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const key = getCellKey(col, row);
          const isHovered = col === hoveredCol && row === hoveredRow;

          // Get or create cell state
          let state = cellStatesRef.current.get(key);
          if (!state) {
            state = { opacity: 0, targetOpacity: 0 };
            cellStatesRef.current.set(key, state);
          }

          // Calculate cell center
          const cellCenterX = col * cellSize + cellSize / 2;
          const cellCenterY = row * cellSize + cellSize / 2;

          // Check if any ripple affects this cell
          let rippleEffect = 0;
          for (const ripple of ripplesRef.current) {
            const distance = Math.sqrt(
              Math.pow(cellCenterX - ripple.x, 2) +
                Math.pow(cellCenterY - ripple.y, 2),
            );

            // Cell is affected if it's near the ripple edge
            const rippleWidth = 60;
            const distanceFromEdge = Math.abs(distance - ripple.radius);

            if (distanceFromEdge < rippleWidth) {
              const effect =
                (1 - distanceFromEdge / rippleWidth) * ripple.opacity;
              rippleEffect = Math.max(rippleEffect, effect);
            }
          }

          // Set target opacity (hover or ripple)
          state.targetOpacity = isHovered ? 1 : rippleEffect;

          // Animate opacity towards target
          const speed = state.targetOpacity > state.opacity ? 0.3 : 0.08;
          state.opacity += (state.targetOpacity - state.opacity) * speed;

          // Also apply direct ripple effect for immediate response
          state.opacity = Math.max(state.opacity, rippleEffect * 0.8);

          const x = col * cellSize;
          const y = row * cellSize;

          // Base grid visibility
          const baseOpacity = isDark ? 0.06 : 0.02;

          // Draw cell background when hovered/rippled
          if (state.opacity > 0.01) {
            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${state.opacity * 0.08})`
              : `rgba(0, 0, 0, ${state.opacity * 0.04})`;
            ctx.fillRect(x, y, cellSize, cellSize);
          }

          // Draw cell border (always visible with base + hover effect)
          const borderOpacity =
            baseOpacity + state.opacity * (isDark ? 0.15 : 0.08);
          ctx.strokeStyle = isDark
            ? `rgba(255, 255, 255, ${borderOpacity})`
            : `rgba(0, 0, 0, ${borderOpacity})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only create ripple if click is within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        ripplesRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: 400,
          opacity: 1,
          speed: 8,
        });
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(draw);

    // Listen on document for mouse events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleClick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent pointer-events-none" />
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
