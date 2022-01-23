export const AxisBottom = ({xScale, innerHeight, width}) => 
	xScale.ticks().map(tickValue => (
          <g key={tickValue} className="tick" transform={`translate(${xScale(tickValue)},0)`}>
            <line
              x1={width}
              y1={0}
              x2={width} 
              y2={innerHeight}
              stroke="gray"
            />
            <text 
              y={innerHeight + 10}
              style={{textAnchor:'middle'}}
              dy="0.71em"
              >{tickValue}</text>
          </g>
        ));

