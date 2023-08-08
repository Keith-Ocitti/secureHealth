import Clock from "react-simple-clock";
import "./style.css";
export default function ClockComp() {
  return (
    <>
      <Clock live={true} className="clock" />
    </>
  );
}
