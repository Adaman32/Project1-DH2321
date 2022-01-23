export const AxisLeft = ({yScale}) => 
	yScale.domain().map(tickValue => (
          <g key={tickValue} className="tick" transform={`translate(0,${yScale(tickValue) + yScale.bandwidth() / 2})`}>
            <text 
              x={-10}
              style={{textAnchor:'end'}}
              dy="0.32em"
              >{tickValue}</text>
          </g>
        ))