import React, { useState} from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3';
import { useData } from './useData';
import { useQualitativeData } from './useQualitativeData';
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

// const hobbyLegendLabel = 'Hobbies';

const colors = ['#E6842A','#137B80','#8E6C8A', '#E3BA22', '#BD2D28', '#05426C', '#A0B700', '#33B6D0', '#DCBDCF', '#842']

const propertyOptions = [
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

// const hobbies = [
//   {value: 'games', label: 'Games' },
//   {value: 'sports', label: 'Sports' },
//   {value: 'music', label: 'Music' },
//   {value: 'desgnArt', label: 'Design, Art & Photography' },
//   {value: 'nature', label: 'Nature & Hiking' },
//   {value: 'moviesSeriesYoutube', label: 'Watching Movies, Series or Youtube' },
//   {value: 'workOut', label: 'Working out' },
//   {value: 'reading', label: 'Reading' },
//   {value: 'goingOut', label: 'Going out with friends' },
//   {value: 'programming', label: 'Programming' },
//   {value: 'cooking', label: 'Cooking' },
// ]

const sortOptions = [
  {value: 'ascending', label:'Ascending values'},
  {value: 'descending', label: 'Descending values'},
];

const getLabel = value => {
  for(let i=0; i < propertyOptions.length; i++){
    if(propertyOptions[i].value === value){
      return propertyOptions[i].label;
    }
  }
};

// const HobbyLegend = ({
//   hobbyScale, 
//   tickSpacing = 10, 
//   tickSize = 7, 
//   tickTextOffset = 15,
// }) => 
  
//   hobbyScale.range().map((rangeValue, i) => (
//         <g 
//           key={i}
//           transform={`translate(0,${i * tickSpacing})`}
//         >
//         <text 
//           dy=".32em"
//           x={tickTextOffset}
//           >{rangeValue}</text>
//         </g>
//   ));

const App = () => {
  const data = useData();
  const qualitativeData = useQualitativeData();
  const [hoveredValue, setHoveredValue] = useState(null);

  console.log(qualitativeData);

  const initialXAttribute = 'programming';
  const [selectedCriterionValue, setCriterionSelectedValue] = useState(initialXAttribute);
  const yValue = d => d.alias;
  const xValue = d => d[selectedCriterionValue];  
  const axisLabel = getLabel(selectedCriterionValue);

  const [selectedSortValue, setSortSelectedValue] = useState(null);

  if (!data || !qualitativeData) {
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
      .range(colors);

  // const hobbyScale = scaleOrdinal()
  //   .domain(qualitativeData.map(yValue))
  //   .range(qualitativeData.columns);


  const filteredData = data.filter(d => hoveredValue === colorValue(d));
  
  function compareAsc(a, b) {
    if(+a[selectedCriterionValue] > +b[selectedCriterionValue]) return -1;
    if(+a[selectedCriterionValue] < +b[selectedCriterionValue]) return 1;
    else return 0;
  }

  function compareDesc(a, b) {
    if(+a[selectedCriterionValue] < +b[selectedCriterionValue]) return -1;
    if(+a[selectedCriterionValue] > +b[selectedCriterionValue]) return 1;
    else return 0;
  }

  if(selectedSortValue === 'ascending') {
    data.sort(compareAsc);
  }
  else data.sort(compareDesc);

  return (
    <>
      <div className='dropdown'>
        <label htmlFor="property">Criterion: </label>
        <Dropdown 
          options={propertyOptions} 
          id="property" 
          onSelectedValueChange={setCriterionSelectedValue}
          selectedValue={selectedCriterionValue}
        />
        <label style={{marginLeft: 50 + 'px'}} htmlFor="sort">Sort by: </label>
        <Dropdown 
          options={sortOptions} 
          id="sort" 
          onSelectedValueChange={setSortSelectedValue}
          selectedValue={selectedSortValue}
        />
      </div>
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
          <g className="tick" transform={`translate(${innerWidth + 75}, 50)`}>
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
          {/* <g className="tick" transform={`translate(${innerWidth + 75}, 350)`}>
            <text 
              textAnchor="middle" 
              className="axis-label"
              x={25}
              y={-25}
              fontSize={24}
              >{colorLegendLabel}</text>
            <HobbyLegend
              hobbyScale={hobbyScale}
              tickSpacing={25}
            />
          </g> */}
          <g opacity={hoveredValue ? 0.2 : 1}>
            <Marks 
              data={data} 
              qualitativeData = {qualitativeData}
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