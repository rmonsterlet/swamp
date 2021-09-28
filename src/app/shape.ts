export class Shape {
    private color; 
    constructor(private ctx: CanvasRenderingContext2D, private bwChecked) {
      this.color = bwChecked ? this.getRandomBwColor() : this.getRandomColor();
    }
  
    spawnRect(size) {
      const wh = Math.random() * size * 2;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, wh, wh);
    }

    spawnCircle(size) {
      const wh = Math.random()*250 + 5;
      this.ctx.beginPath();
      this.ctx.fillStyle= this.color;
      this.ctx.arc(Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, Math.random() * size, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    private getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    private getRandomBwColor() {
      var v = (Math.random()*(256)|0).toString(16);
      return "#" + v + v + v;
    }
  }