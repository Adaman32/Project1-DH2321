export const ColorLegend = ({
    colorScale, 
    tickSpacing = 10, 
    tickSize = 7, 
    tickTextOffset = 15,
    onHover,
    hoveredValue
  }) => 
    colorScale.domain().map((domainValue, i) => (
          <g 
            key={i}
            transform={`translate(0,${i * tickSpacing})`}
            onMouseEnter={() => {onHover(domainValue)}}
            onMouseOut={() => {onHover(null)}}
            opacity={hoveredValue && domainValue !== hoveredValue ? 0.2 : 1}
          >
              <circle fill={colorScale(domainValue)} r={tickSize}/>
          <text 
            className="legend"
            dy=".32em"
            x={tickTextOffset}
            >{domainValue}</text>
          </g>
    ));
  
  