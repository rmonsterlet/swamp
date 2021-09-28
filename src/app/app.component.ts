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
  tickInterval;
  clearInterval;
  shapes: Shape[] = [];
  size = 25;
  speed = 25;
  tickSpeed = this.getTickSpeed();
  bwChecked = false;

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
    clearInterval(this.tickInterval);
    clearInterval(this.clearInterval);
    this.tickInterval = setInterval(() => {
      this.tick();
    }, this.getTickSpeed());
    this.clearInterval =  setInterval(() => {
      this.clear();
    }, 30000);
  }

  tick() {
    const shape = new Shape(this.ctx, this.bwChecked);
    this.shapes = this.shapes.concat(shape);
    this.shapes.forEach((shape: Shape) => {
      shape.spawnCircle(this.size + 5);
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  getTickSpeed() {
    let _speed = this.speed;
    return - (_speed / 100) * 900 + 1000;
  }

  clear() {
    this.shapes= [];
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  speedChanged() {
    this.setIntervals();
  }

  destroy() {
    clearInterval(this.tickInterval);
    clearInterval(this.clearInterval);
    cancelAnimationFrame(this.requestId);
  }

  ngOnDestroy() {
    this.destroy();
  }

}
