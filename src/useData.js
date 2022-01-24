import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Adaman32/a48ebb6930ce28e77feaa4a832a4776b/raw/4c56da4883b73f4fb3f6908e88da41ff9bbc43d0/groupsData.csv';

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