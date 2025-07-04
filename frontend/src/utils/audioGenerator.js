// Simple audio generator for lofi-style ambient music
export class LofiGenerator {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.oscillators = [];
    this.isPlaying = false;
  }

  async initialize() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.1;
    this.masterGain.connect(this.audioContext.destination);
    
    return this.audioContext;
  }

  createLofiChord() {
    // Create a simple chord progression
    const frequencies = [
      [220, 277.18, 329.63], // A minor
      [196, 246.94, 293.66], // G major
      [174.61, 220, 261.63], // F major
      [130.81, 164.81, 196]  // C major
    ];

    return frequencies;
  }

  async startLofiAmbient() {
    if (this.isPlaying) return;
    
    await this.initialize();
    this.isPlaying = true;

    const chords = this.createLofiChord();
    let chordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying) return;

      // Stop previous oscillators
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
      this.oscillators = [];

      // Play current chord
      const currentChord = chords[chordIndex];
      currentChord.forEach((freq, i) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
        
        // Create lofi effect with slight detuning
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 2, this.audioContext.currentTime);
        
        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 / currentChord.length, this.audioContext.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3.5);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 4);
        
        this.oscillators.push(osc);
      });

      chordIndex = (chordIndex + 1) % chords.length;
      
      if (this.isPlaying) {
        setTimeout(playChord, 4000); // Change chord every 4 seconds
      }
    };

    playChord();
    return this.audioContext;
  }

  stop() {
    this.isPlaying = false;
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.oscillators = [];
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  getAnalyser() {
    if (!this.audioContext) return null;
    
    const analyser = this.audioContext.createAnalyser();
    analyser.fftSize = 256;
    this.masterGain.connect(analyser);
    
    return analyser;
  }
}