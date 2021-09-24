import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const red = "#f54e4e";

function TimerClock(props) {
  return (
    <div>
      <CircularProgressbar {...props} styles={buildStyles({
        textColor: '#fff',
        pathColor: red,
        tailColor: 'rgba(255,255,255,.2)',
      })} />
    </div>
  );
}

export default TimerClock;