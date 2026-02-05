import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Vibrant neon-retro colors that pop against the light footer
const COLORS = [
  '#FF00C1', // Neon Pink
  '#00FFF9', // Neon Cyan
  '#FFEA00', // Vivid Yellow
  '#39FF14', // Acid Green
  '#9D00FF', // Electric Purple
  '#FF5E00', // Bright Orange
  '#FF0000', // Classic Red
  '#0033FF', // Deep Blue
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
  const blockSize = 24; // Slightly larger for better visibility

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const updateGridSize = () => {
      const cols = Math.floor(container.offsetWidth / blockSize);
      const rows = Math.floor(container.offsetHeight / blockSize);
      return { cols, rows };
    };

    let { cols, rows } = updateGridSize();
    gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(null));

    const checkAndClearRows = () => {
      const grid = gridRef.current;
      const rowsToClear: number[] = [];

      // Find full rows
      for (let r = 0; r < rows; r++) {
        if (grid[r].every(cell => cell !== null)) {
          rowsToClear.push(r);
        }
      }

      if (rowsToClear.length === 0) return;

      // Arcade-style clearing animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Process removals from bottom to top to maintain index integrity during splice
          const sortedRows = [...rowsToClear].sort((a, b) => b - a);
          
          sortedRows.forEach(rIndex => {
            grid[rIndex].forEach(cell => cell?.remove());
            grid.splice(rIndex, 1);
            // Add new empty row at the top
            grid.unshift(Array(cols).fill(null));
          });

          // Gravity effect for remaining blocks
          grid.forEach((row, r) => {
            row.forEach((cell) => {
              if (cell) {
                gsap.to(cell, {
                  top: r * blockSize,
                  duration: 0.4,
                  ease: "bounce.out"
                });
              }
            });
          });
        }
      });

      // Dramatic flash then shrink effect
      rowsToClear.forEach(rIndex => {
        tl.to(grid[rIndex], {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 20px #FFFFFF, 0 0 40px #FFFFFF',
          scale: 1.2,
          duration: 0.1,
          stagger: 0.03
        }, 0);
        
        tl.to(grid[rIndex], {
          opacity: 0,
          scale: 0,
          rotate: 45,
          duration: 0.3,
          stagger: 0.02
        }, 0.15);
      });
    };

    const spawnBlock = () => {
      if (!container) return;

      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const shapeWidth = shape[0].length;
      
      // Intelligent spawning: try to pick a column that has gaps
      const startCol = Math.floor(Math.random() * (cols - shapeWidth));
      
      // Collision Detection: find where it lands
      let landingRow = -1;
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
        if (r === rows - shape.length) {
          landingRow = r;
        }
      }

      // Game Over / Reset state if it stacks too high
      if (landingRow < 1) {
          gsap.to(container.children, {
            opacity: 0,
            y: 20,
            stagger: 0.01,
            duration: 0.5,
            onComplete: () => {
              gridRef.current.forEach(row => row.forEach(cell => cell?.remove()));
              gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(null));
            }
          });
          return;
      }

      // Create piece elements
      const activeBlocks: HTMLDivElement[] = [];
      shape.forEach((row, sr) => {
        row.forEach((cell, sc) => {
          if (cell) {
            const block = document.createElement('div');
            block.style.position = 'absolute';
            block.style.width = `${blockSize}px`;
            block.style.height = `${blockSize}px`;
            block.style.backgroundColor = color;
            block.style.border = '2px solid black';
            // Classic Tetris bevel effect
            block.style.boxShadow = 'inset -3px -3px 0px rgba(0,0,0,0.4), inset 3px 3px 0px rgba(255,255,255,0.5)';
            block.style.left = `${(startCol + sc) * blockSize}px`;
            block.style.top = `-${blockSize * 2}px`;
            block.style.zIndex = '0';
            container.appendChild(block);
            activeBlocks.push(block);

            (block as any).targetPos = { r: landingRow + sr, c: startCol + sc };
          }
        });
      });

      // Quick arcade drop animation
      gsap.to(activeBlocks, {
        top: (i, target) => (target.targetPos.r * blockSize),
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
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

    // Spawn more frequently to keep the background active
    const interval = setInterval(spawnBlock, 1000);

    const handleResize = () => {
      const newSize = updateGridSize();
      cols = newSize.cols;
      rows = newSize.rows;
      // Note: Full grid reset on resize is simpler for background animations
      gridRef.current.forEach(row => row.forEach(cell => cell?.remove()));
      gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(null));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default TetrisAnimation;