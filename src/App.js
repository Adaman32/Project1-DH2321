import React, { useState} from 'react';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3';
import { useData } from './useData';
// import { useQualitativeData } from './useQualitativeData';
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

// export const Marks = ({data, xScale, yScale, xValue, yValue, colorScale, colorValue, showIndividualData}) => 
// 	data.map((d) => (
//           <rect
//             className="mark"
//             key={yValue(d)}
//             y={yScale(yValue(d))}
//             width={xScale(xValue(d))}
//             height={yScale.bandwidth()}
//             fill={colorScale(colorValue(d))}
//             onClick={() => showIndividualData(d)}
//           />
    			
//         ))


const IndividualData = ({selectedIndividual, tickSpacing}) => (   
<g className='individual'>
  <text style={{fontSize: 2+"em", textAnchor: "start"}} >{selectedIndividual.alias}</text>
  {console.log(selectedIndividual.programming)}
  <text id="hobbies" transform={`translate(0, ${tickSpacing})`}>{selectedIndividual.hobbiesInterests}</text>
  <text transform={`translate(0, ${tickSpacing * 2})`}>Programming skill: </text>
  <text transform={`translate(0, ${tickSpacing * 3})`}>Communication skill: </text>
  <text transform={`translate(0, ${tickSpacing * 4})`}>Collaboration skill: </text>
  <text transform={`translate(0, ${tickSpacing * 5})`}>Drawing and Artistic skill: </text>
  <text transform={`translate(0, ${tickSpacing * 6})`}>Computer Graphics programming skill: </text>
  <text transform={`translate(0, ${tickSpacing * 7})`}>Mathematics skill: </text>
  <text transform={`translate(0, ${tickSpacing * 8})`}>Information Visualization skill: </text>
  <text transform={`translate(0, ${tickSpacing * 9})`}>Computer Usage skill: </text>
  <text transform={`translate(0, ${tickSpacing * 10})`}>Human-Computer Interaction skill: </text>
  <text transform={`translate(0, ${tickSpacing * 11})`}>UX Evaluation skill: </text>
  <text transform={`translate(0, ${tickSpacing * 12})`}>Statistics skill: </text>
</g>
);

const IndividualDataBars = ({selectedIndividual, tickSpacing, height, width}) => (
  <g className='individual' transform='translate(10, -10)'>
    <rect fill="#842" width={selectedIndividual.programming * width} height={height} transform={`translate(0, ${tickSpacing * 2})`}></rect>
    <rect fill="#842" width={selectedIndividual.communication * width} height={height} transform={`translate(0, ${tickSpacing * 3})`}></rect>
    <rect fill="#842" width={selectedIndividual.collaboration * width} height={height} transform={`translate(0, ${tickSpacing * 4})`}></rect>
    <rect fill="#842" width={selectedIndividual.artistic * width} height={height} transform={`translate(0, ${tickSpacing * 5})`}></rect>
    <rect fill="#842" width={selectedIndividual.graphics * width} height={height} transform={`translate(0, ${tickSpacing * 6})`}></rect>
    <rect fill="#842" width={selectedIndividual.mathematics * width} height={height} transform={`translate(0, ${tickSpacing * 7})`}></rect>
    <rect fill="#842" width={selectedIndividual.informationVisualization * width} height={height} transform={`translate(0, ${tickSpacing * 8})`}></rect>
    <rect fill="#842" width={selectedIndividual.computerUsage * width} height={height} transform={`translate(0, ${tickSpacing * 9})`}></rect>
    <rect fill="#842" width={selectedIndividual.hci * width} height={height} transform={`translate(0, ${tickSpacing * 10})`}></rect>
    <rect fill="#842" width={selectedIndividual.uxEvaluation * width} height={height} transform={`translate(0, ${tickSpacing * 11})`}></rect>
    <rect fill="#842" width={selectedIndividual.statistics * width} height={height} transform={`translate(0, ${tickSpacing * 12})`}></rect>
  </g>
)
  

  




const App = () => {
  const data = useData();
  // const qualitativeData = useQualitativeData();
  const [hoveredValue, setHoveredValue] = useState(null);
  const [updatedValue, setUpdatedValue] = useState(null);

  // console.log(qualitativeData);

  const initialXAttribute = 'programming';
  const [selectedCriterionValue, setCriterionSelectedValue] = useState(initialXAttribute);
  const yValue = d => d.alias;
  const xValue = d => d[selectedCriterionValue];  
  const axisLabel = getLabel(selectedCriterionValue);

  const [selectedIndividual, setSelectedIndividual] = useState('Gandalbldore');
  // console.log(selectedIndividual);
  const [selectedSortValue, setSortSelectedValue] = useState('ascending');

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
    .range([0, innerWidth*0.6])
  	.nice();
  
    const xScaleIndividual = scaleLinear()
    .domain([0, 10])
    .range([0, 200])
  	.nice();

  const colorScale = scaleOrdinal()
      .domain(data.map(colorValue))
      .range(colors);


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
        <button id={updatedValue} onClick={setUpdatedValue}>Update</button>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale}/>
          <text 
            className="axis-title" 
            x={innerWidth * 0.6/2} 
            y={innerHeight + xAxisLabelOffset} 
            textAnchor="middle"
          >{axisLabel}</text>
          <g className="tick" transform={`translate(${innerWidth*0.6 + 50}, 50)`}>
            <text 
              textAnchor="middle" 
              className="axis-label"
              x={25}
              y={-25}
              fontSize={32}
              >{colorLegendLabel}</text>
            <ColorLegend 
              clasName="legend"
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
              showIndividualData={setSelectedIndividual}
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
            showIndividualData={setSelectedIndividual}
          />
        </g>
        <g className="hobbies" transform={`translate(${innerWidth/2 + 550}, 500)`}>
          <IndividualData 
            selectedIndividual={selectedIndividual}
            tickSpacing = {25}
          />
          <g transform="translate(10,40)">
          <AxisBottom 
            xScale={xScaleIndividual} 
            innerHeight={270} 
            />
          </g>
          <IndividualDataBars 
            selectedIndividual={selectedIndividual}
            height={15}
            tickSpacing = {25}
            width={20}
          />
          <text 
          fill='#635F5D'
          textAnchor="middle" 
          fontSize={16}
          transform={`translate(120, 350)`}
          >Skill level</text>
        </g>
      </svg>
    </>
  );
};

export default App;