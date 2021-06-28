import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Friend, State } from '@app-friends/utils/friend-store';
import * as d3 from 'd3';

@Component({
  selector: 'age-graph',
  templateUrl: './age-graph.component.html',
  styleUrls: ['./age-graph.component.css']
})
export class AgeGraphComponent implements OnChanges, AfterViewInit {
  @Input() friends?: State | null;
  myFriends: Friend[] = [];
  ageData: Friend[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.friends?.currentValue) {
      this.myFriends = changes.friends.currentValue.myFriends;
      this.updateAgeData();
      this.updateAgeBarGraph();
    }
  }

  ngAfterViewInit() {
   this.updateAgeData();
   this.updateAgeBarGraph();
  }

  updateAgeBarGraph() {
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

    d3.select('#age_chart>svg').remove();
    const svg = d3.select('#age_chart').append('svg')
      .attr('viewBox', `0 0 ${size.width} ${size.height}`)
      .append('g')
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
      .range([0, size.chartWidth])
      .domain([0, d3.max(this.ageData, ({ age }) => age) as number]);

    const y = d3.scaleBand()
      .range([0, size.chartHeight])
      .domain(this.ageData.map(friend => friend.name))
      .padding(.6 / this.myFriends.length);

    const bars = svg.selectAll('rect')
      .data(this.ageData)
      .enter()
      .append('g');

    bars.append('rect')
      .attr('x', x(0))
      .attr('y', function(d) { return y(d.name) as number; })
      .attr('width', function(d) { return x(d.age as number); })
      .attr('height', y.bandwidth())
      .attr('fill', '#673ab7');

    bars.append('text')
        .attr("x", function(d) { return x(d.age as number) - 3; })
        .attr("y", function(d) { return (y(d.name) as number) + (y.bandwidth() / 2); })
        .attr("dy", ".35em")
        .attr('fill', 'white')
        .text(function(d) { return d.age as number; });

    svg.call(d3.axisLeft(y))
       .attr('font-size', 15)
       .attr('color', 'gray');
  }

  updateAgeData() {
    this.ageData = this.myFriends
      .filter((friend) => friend?.age)
      .sort((current, previous) => {
        if (current.age && previous.age) {
          return current.age > previous.age ? 1 : current.age === previous.age ? 0 : -1;
        }

        return -1;
      });
  }

}
