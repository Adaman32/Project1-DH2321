import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Adaman32/a48ebb6930ce28e77feaa4a832a4776b/raw/adac3262a0a064f25c196fba2531eeed6d0a5373/groupsData.csv';

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
      setData(data);
    });

    return () => {
      cancel = true;
    }

  }, []);

  return data;
}