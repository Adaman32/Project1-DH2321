import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/Adaman32/abf4367902e81780854974c24d1f717b/raw/fa541fdc901507d8cf9349baa32b8bd17ec2d55a/qualitativeData';

export const useQualitativeData = () =>{
  const [data, setData] = useState(null);
  
  useEffect(() => {
    let cancel = false;

    const row = (d) => {
      
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