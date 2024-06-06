import { Box,Button,Typography} from '@mui/material';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../App.css';

const Counter = ({setCounterValue}) =>{

  const [counter, setCounter] = useState(0);
  
  const increment = () =>{ 
    setCounter(counter + 1)
    setCounterValue(counter + 1)
  };
  const decrement = () => {
    if(counter-1 >= 0){ 
      setCounter(counter - 1)
      setCounterValue(counter -1)
    }else{
     setCounter(0)
     setCounterValue(0)
    }
  };
  const reset = () => {
    setCounter(0)
    setCounterValue(0)
  };


  const bgColor = useSpring({
    backgroundColor: `rgba(0, 150, 136, ${Math.min(counter / 10, 1)})`,
  });

  return (
      <animated.div style={bgColor} className="counter-section">        
        <Typography variant="h4">Counter</Typography>
        <Typography variant="h5">{counter}</Typography>
        <Button variant="contained" color="primary" style={{margin : 10}} onClick={increment}>
          +
        </Button>
        <Button variant="contained" onClick={reset} style={{margin:10}}>
          Reset
        </Button>
        <Button variant="contained" color="secondary"  style={{margin:10}} onClick={decrement}>
          -
        </Button> 
      </animated.div>
    
  );
};
export default Counter;