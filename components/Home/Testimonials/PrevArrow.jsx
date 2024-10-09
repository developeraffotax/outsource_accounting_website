import { GrPrevious } from "react-icons/gr";

export function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      


      <GrPrevious className={className} style={{ ...style, display: "block", color: 'rgb(156 163 175)',   scale: '2', marginTop: '25px' }} onClick={onClick}/>
    );
  }


