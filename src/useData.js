import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Adaman32/a48ebb6930ce28e77feaa4a832a4776b/raw/8d144e066853f6270483db85277b4d4a8ba02d10/groupsData.csv';

function compare(a, b) {
	if(+a.collaboration > +b.collaboration) return -1;
  if(+a.collaboration < +b.collaboration) return 1;
  else return 0;
}

export const useData = () =>{
  const [data, setData] = useState(null);
  
  useEffect(() => {
    let cancel = false;

    const row = (d) => {
      d.Collaboration = +d['1'];
      return d;
    };

    csv(csvUrl, row).then((data) => {
      if(cancel) return;
      data.sort(compare);
      setData(data);
    });

    return () => {
      cancel = true;
    }

  }, []);

  return data;
}