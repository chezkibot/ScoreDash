import "../styles/CircleText.css";



export default function CircleText(props) {
  return (
      <div className="circle">
        <p className="title">{props.name}</p>
        <p className="score">{props.value}</p>
    </div>
  );
}
