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
  value = 10;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ctx = this.canvas?.nativeElement.getContext('2d');
    this.ngZone.runOutsideAngular(() => this.tick());
    this.setIntervals();
  }

  setIntervals() {
    setInterval(() => {
      this.tick();
    }, 400);
    setInterval(() => {
      this.clear();
    }, 30000);
  }

  tick() {
    const shape = new Shape(this.ctx);
    this.shapes = this.shapes.concat(shape);
    this.shapes.forEach((shape: Shape) => {
      shape.spawnCircle(this.value);
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
