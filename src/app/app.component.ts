import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, Input } from '@angular/core';
import { Shape } from './shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  shapes: Shape[] = [];
  size = 10;
  speed = 400;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.tick());
    this.setIntervals();
    window.addEventListener('resize', this.resizeCanvas, false);
    this.resizeCanvas();
  }

  resizeCanvas() {
    if(!this.ctx) return;
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

  setIntervals() {
    setInterval(() => {
      this.tick();
    }, this.speed);
    setInterval(() => {
      this.clear();
    }, 30000);
  }

  tick() {
    const shape = new Shape(this.ctx);
    this.shapes = this.shapes.concat(shape);
    this.shapes.forEach((shape: Shape) => {
      shape.spawnCircle(this.size);
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  clear() {
    this.shapes= [];
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  destroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }

  ngOnDestroy() {
    this.destroy();
  }

}
