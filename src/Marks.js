export const Marks = ({data, xScale, yScale, xValue, yValue, colorScale, colorValue}) => 
	data.map((d) => (
          <rect
            className="mark"
            key={yValue(d)}
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
            fill={colorScale(colorValue(d))}
            onClick={() => (console.log(d))}
          />
    			
        ))