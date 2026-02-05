class RetroSound {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      } else {
        this.enabled = false;
      }
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  private initCtx() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    this.initCtx();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Short, sharp square wave click
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    // this.initCtx(); // Often don't resume on hover to avoid aggressive autoplay policies or annoyance
    
    // Very subtle high tick
    if (this.ctx.state === 'running') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.005, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
    }
  }

  playSuccess() {
     if (!this.enabled || !this.ctx) return;
     this.initCtx();
     
     const now = this.ctx.currentTime;
     
     // 8-bit coin/success sound (Two rapid notes)
     const osc1 = this.ctx.createOscillator();
     const gain1 = this.ctx.createGain();
     osc1.type = 'square';
     osc1.frequency.setValueAtTime(523.25, now); // C5
     gain1.gain.setValueAtTime(0.03, now);
     gain1.gain.linearRampToValueAtTime(0, now + 0.1);
     osc1.connect(gain1);
     gain1.connect(this.ctx.destination);
     osc1.start(now);
     osc1.stop(now + 0.1);

     const osc2 = this.ctx.createOscillator();
     const gain2 = this.ctx.createGain();
     osc2.type = 'square';
     osc2.frequency.setValueAtTime(1046.50, now + 0.1); // C6
     gain2.gain.setValueAtTime(0.03, now + 0.1);
     gain2.gain.linearRampToValueAtTime(0, now + 0.3);
     osc2.connect(gain2);
     gain2.connect(this.ctx.destination);
     osc2.start(now + 0.1);
     osc2.stop(now + 0.3);
  }

  playMenuOpen() {
    if (!this.enabled || !this.ctx) return;
    this.initCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Slide up
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
  
  playMenuClose() {
    if (!this.enabled || !this.ctx) return;
    this.initCtx();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Slide down
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }
}

export const soundEffects = new RetroSound();