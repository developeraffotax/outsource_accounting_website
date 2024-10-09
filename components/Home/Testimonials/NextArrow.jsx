import { GrNext } from "react-icons/gr";

export function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      


      <GrNext className={className} style={{ ...style, display: "block", color: 'rgb(156 163 175)',   scale: '2', marginTop: '25px' }} onClick={onClick}/>
    );
  }







  //<div className={className} style={{ ...style, display: "block", background: "red",   scale: '2' }} onClick={onClick} />