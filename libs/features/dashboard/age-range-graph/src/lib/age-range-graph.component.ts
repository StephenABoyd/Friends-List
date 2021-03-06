import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Friend, State } from '@app-friends/utils/friend-store';
import * as d3 from 'd3';

@Component({
  selector: 'age-range-graph',
  templateUrl: './age-range-graph.component.html',
  styleUrls: ['./age-range-graph.component.scss']
})
export class AgeRangeGraphComponent implements OnChanges, AfterViewInit {
  @Input() friends?: State | null;
  myFriends: Friend[] = [];
  ranges: {min: number, max: number, count: number, label: string }[] = [
    {
      min: 0,
      max: 17,
      count: 0,
      label: '0-17'
    },
    {
      min: 18,
      max: 35,
      count: 0,
      label: '18-35'
    },
    {
      min: 36,
      max: 55,
      count: 0,
      label: '36-55'
    },
    {
      min: 56,
      max: 1000,
      count: 0,
      label: '56+'
    }
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.friends?.currentValue) {
      this.myFriends = changes.friends.currentValue.myFriends;
      this.updateRangeData();
      this.updateRangeChart();
    }
  }

  ngAfterViewInit() {
    this.updateRangeData();
    this.updateRangeChart();
  }

  private updateRangeData(): void {
    for (const range in this.ranges) {
      this.ranges[range].count = 0;
      this.myFriends.forEach(friend => {
        if (friend.age && friend.age >= this.ranges[range].min && friend.age <= this.ranges[range].max) {
          this.ranges[range].count++;
        }
      });
    }
  }

  private updateRangeChart(): void {
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 60
    };

    const size = {
      width: 400,
      height: 200,
      chartWidth: 400 - margin.left - margin.right,
      chartHeight: 200 - margin.top - margin.bottom
    };

    d3.select('#age_density_chart>svg').remove();
    const svg = d3.select('#age_density_chart').append('svg')
      .attr('viewBox', `0 0 ${size.width} ${size.height}`)
      .append('g')
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, this.ranges.length])
      .range([0, size.chartWidth]);

    const xAxis = d3.axisBottom(x)
      .tickFormat((d, i) => {
        return this.getTickLabel(i);
      })
      .ticks(this.ranges.length - 1);

    svg.append('g')
       .attr("transform", "translate(0," + (size.chartHeight - 10) + ")")
       .call(xAxis);

    const highestCount = this.getHighestCount();

    const y = d3.scaleLinear()
      .domain([highestCount, 0])
      .range([0, size.chartHeight]);

    const yAxis = d3.axisLeft(y)
      .ticks(highestCount);

    svg.append('g')
       .attr('transform', 'translate(0,-10)')
       .call(yAxis);

    const line: any = d3.line()
      .x(function(d, i) { return x(i); })
      .y(function(d: any) { return y(d.count); });

    svg.append('path')
      .datum(this.ranges)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#673ab7')
      .attr('stroke-width', '3')
      .attr('transform', 'translate(0,-10)');
  }

  private getHighestCount(): number {
    let highestCount = 0;
    this.ranges.forEach(range => range.count > highestCount ? highestCount = range.count : null);
    return highestCount;
  }

  private getTickLabel(index: number): string {
    if (index < this.ranges.length) {
      return this.ranges[index].label;
    }

    return '';
  }

}
