export class Shape {
    private color = this.getRandomColor();
    constructor(private ctx: CanvasRenderingContext2D) {}
  
    spawnRect() {
      const wh = Math.random()*250 + 5;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, wh, wh);
    }

    spawnCircle(shapeValue) {
      const wh = Math.random()*250 + 5;
      this.ctx.beginPath();
      this.ctx.fillStyle= this.color;
      this.ctx.arc(Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, Math.random() * shapeValue, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }