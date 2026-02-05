import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Vibrant neon-retro colors
const COLORS = [
  '#FF00C1', // Neon Pink
  '#00FFF9', // Neon Cyan
  '#FFEA00', // Vivid Yellow
  '#39FF14', // Acid Green
  '#9D00FF', // Electric Purple
  '#FF5E00', // Bright Orange
];

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]], // L
];

const TetrisAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<(HTMLDivElement | null)[][]>([]);
  const blockSize = 20;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cols = Math.floor(container.offsetWidth / blockSize);
    const rows = Math.floor(container.offsetHeight / blockSize);

    // Initialize grid state
    gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(null));

    const checkAndClearRows = () => {
      const grid = gridRef.current;
      let rowsToClear: number[] = [];

      // Find full rows
      for (let r = 0; r < rows; r++) {
        if (grid[r].every(cell => cell !== null)) {
          rowsToClear.push(r);
        }
      }

      if (rowsToClear.length === 0) return;

      // Animate clearing
      const tl = gsap.timeline({
        onComplete: () => {
          // Remove elements and shift grid
          rowsToClear.forEach(rIndex => {
            grid[rIndex].forEach(cell => cell?.remove());
            grid.splice(rIndex, 1);
            grid.unshift(Array(cols).fill(null));
          });

          // Animate remaining blocks down
          grid.forEach((row, r) => {
            row.forEach((cell) => {
              if (cell) {
                gsap.to(cell, {
                  top: r * blockSize,
                  duration: 0.3,
                  ease: "bounce.out"
                });
              }
            });
          });
        }
      });

      rowsToClear.forEach(rIndex => {
        tl.to(grid[rIndex], {
          backgroundColor: '#FFF',
          filter: 'brightness(3)',
          opacity: 0,
          scale: 1.1,
          duration: 0.2,
          stagger: 0.02
        }, 0);
      });
    };

    const spawnBlock = () => {
      if (!container) return;

      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const shapeWidth = shape[0].length;
      const startCol = Math.floor(Math.random() * (cols - shapeWidth));
      
      // Calculate landing row (Collision Detection)
      let landingRow = rows - shape.length;
      for (let r = 0; r <= rows - shape.length; r++) {
        let collision = false;
        for (let sr = 0; sr < shape.length; sr++) {
          for (let sc = 0; sc < shapeWidth; sc++) {
            if (shape[sr][sc] && gridRef.current[r + sr]?.[startCol + sc]) {
              collision = true;
              break;
            }
          }
          if (collision) break;
        }
        if (collision) {
          landingRow = r - 1;
          break;
        }
      }

      // Don't spawn if the landing row is off-screen (game over state)
      if (landingRow < 0) {
          // Reset grid if full
          gridRef.current.forEach(row => row.forEach(cell => cell?.remove()));
          gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(null));
          return;
      }

      // Create block elements
      const activeBlocks: HTMLDivElement[] = [];
      shape.forEach((row, sr) => {
        row.forEach((cell, sc) => {
          if (cell) {
            const block = document.createElement('div');
            block.style.position = 'absolute';
            block.style.width = `${blockSize}px`;
            block.style.height = `${blockSize}px`;
            block.style.backgroundColor = color;
            block.style.border = '1px solid black';
            block.style.boxShadow = 'inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.4)';
            block.style.left = `${(startCol + sc) * blockSize}px`;
            block.style.top = `-${blockSize * 4}px`;
            container.appendChild(block);
            activeBlocks.push(block);

            // Temporarily store target data for animation
            (block as any).targetPos = { r: landingRow + sr, c: startCol + sc };
          }
        });
      });

      // Drop animation
      gsap.to(activeBlocks, {
        top: (i, target) => (target.targetPos.r * blockSize),
        duration: 1.5,
        ease: "none",
        onComplete: () => {
          // Register blocks in the grid
          activeBlocks.forEach((block: any) => {
            const { r, c } = block.targetPos;
            if (gridRef.current[r]) {
              gridRef.current[r][c] = block;
            }
          });
          checkAndClearRows();
        }
      });
    };

    const interval = setInterval(spawnBlock, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default TetrisAnimation;