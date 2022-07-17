import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect,useState } from 'react';
import './Resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [startWidth, setStartWidth] = useState(window.innerWidth * 0.8);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if(timer){
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
       setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        setStartWidth(window.innerWidth * 0.8);
        // if(window.innerWidth * 0.8 < startWidth) {
        //   setStartWidth(window.innerWidth * 0.8);
        // }
      },100)
      
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize',listener)
    }
  },[])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.8, Infinity],
      height: Infinity,
      width: startWidth,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setStartWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [innerHeight * 0.2, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return (
    <ResizableBox
    {...resizableProps}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
