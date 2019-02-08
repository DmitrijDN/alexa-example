import {
  Component,
  OnChanges,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as D3 from 'd3';
import { LineChartService, IDot } from './line-chart.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnChanges, AfterViewInit {

  @ViewChild('container') element: ElementRef;

  private dots = [{ x: 0, y: 0 }];
  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private yScale;
  private xAxis;
  private yAxis;
  private htmlElement: HTMLElement;

  curveArray = [
    { 'curve': D3.curveLinear, 'curveTitle': 'curveLinear' },
    { 'curve': D3.curveStep, 'curveTitle': 'curveStep' }
  ];

  selectedCurve = 'curveLinear';

  constructor(private lineChartService: LineChartService) { }


  ngOnInit() {
    let index = 0;
    this.lineChartService.messages.subscribe(data => {
      if (data === 'clear') {
        this.dots = [];
      }
      if (data.chartType) {
        this.onCurveChange(data.chartType);
      } else {
        this.dots.push({
          x: ++index,
          y: parseInt(data.y)
        });
      }
      this.buildChart();
    });
  }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
  }

  ngOnChanges(): void {
    this.setup();
  }

  onCurveChange(curve: string) {
    this.selectedCurve = curve;
    this.setup();
  }

  private setup(): void {
    this.margin = { top: 20, right: 20, bottom: 30, left: 50 };
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.buildChart();
  }

  private buildChart() {
    let data = [...this.dots];
    this.xAxis = D3.axisBottom(this.xScale);
    this.yAxis = D3.axisLeft(this.yScale);

    this.host.html('');

    let line = D3.line()
      .curve(this.curveArray.find((item) => item.curveTitle === this.selectedCurve).curve || D3.curveLinear)
      .x((d: IDot) => { return this.xScale(d.x); })
      .y((d: IDot) => { return this.yScale(d.y); });

    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.xScale.domain(D3.extent(data, function (d: any) {
      return d.x;
    }));
    this.yScale.domain(D3.extent(data, function (d: any) {
      return d.y;
    }));

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis);

    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    this.svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);
  }
}