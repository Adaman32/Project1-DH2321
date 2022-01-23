import React, { useState} from 'react';
import { scaleBand, scaleLinear, scaleOrdinal, max, lab } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from './ColorLegend';
import { Dropdown } from './Dropdown';

const width = window.innerWidth;
const height = window.innerHeight;

const margin = {top: 100, right: 350, left: 180, bottom: 80}
const xAxisLabelOffset = 50;

const colorValue = d => d.major;
const colorLegendLabel = 'Major';

const options = [
  {value: 'informationVisualization', label:'Information Visualization skill'},
  {value: 'statistics', label: 'Statistical skill'},
  {value: 'mathematics', label: 'Mathematics skill'},
  {value: 'artistic', label: 'Drawing & Artistic skill'},
  {value: 'computerUsage', label: 'Computer usage skill'},
  {value: 'programming', label: 'Programming skill'},
  {value: 'graphics', label: 'Computer graphics skill'},
  {value: 'hci', label: 'Human-Computer interaction skill'},
  {value: 'uxEvaluation', label: 'UX Evaluation skill'}, 
  {value: 'communication', label: 'Communication skills'}, 
  {value: 'collaboration', label:'Collaboration skill'},
  {value: 'codeRepository',label: 'Code Repository skill'}
];

const getLabel = value => {
    
  for(let i=0; i < options.length; i++){
    if(options[i].value === value){
      return options[i].label;
    }
  }

};

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);

  console.log(data);

  const initialXAttribute = 'programming';
  const [selectedValue, setSelectedValue] = useState(initialXAttribute);
  const yValue = d => d.alias;
  const xValue = d => d[selectedValue];  
  const axisLabel = getLabel(selectedValue);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
  	.paddingInner(0.2);

  const xScale = scaleLinear()
    .domain([0, 10])
    .range([0, innerWidth])
  	.nice();
  
  const colorScale = scaleOrdinal()
  	.domain(data.map(colorValue))
  	.range(['#E6842A','#137B80','#8E6C8A', '#E3BA22', '#BD2D28', '#05426C', '#A0B700', '#33B6D0', '#DCBDCF', '#842']);
  
    
  
  const filteredData = data.filter(d => hoveredValue === colorValue(d));
  
  return (
    <>
      <g className='dropdown'>
        <label htmlFor="property">Criterion: </label>
        <Dropdown 
          key="property"
          options={options} 
          id="property" 
          onSelectedValueChange={setSelectedValue}
          selectedValue={selectedValue}
        />
      </g>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale}/>
          <text 
            className="axis-title" 
            x={innerWidth / 2} 
            y={innerHeight + xAxisLabelOffset} 
            textAnchor="middle"
          >{axisLabel}</text>
          <g className="tick" transform={`translate(${innerWidth + 75}, 150)`}>
            <text 
              textAnchor="middle" 
              className="axis-label"
              x={25}
              y={-25}
              fontSize={24}
              >{colorLegendLabel}</text>
            <ColorLegend 
              tickSpacing = {25}
              colorScale={colorScale}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
            />
          </g> 
          <g opacity={hoveredValue ? 0.2 : 1}>
            <Marks 
              data={data} 
              xScale={xScale} 
              yScale={yScale} 
              xValue={xValue} 
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
            />
          </g>
          <Marks 
            data={filteredData} 
            xScale={xScale} 
            yScale={yScale} 
            xValue={xValue} 
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
          />
        </g>
      </svg>
    </>
  );
};

export default App;