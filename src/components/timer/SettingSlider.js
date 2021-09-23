
import ReactSlider from 'react-slider';
function SettingSlider(props) {
  return (
    <div style={{ textAlign: 'left'}}>
      <label className={props.disabled? 'slider-label disabled' : 'slider-label'}>{props.value + ":00"}</label>
      <ReactSlider
        className={props.disabled? 'slider disabled' : 'slider'}
        thumbClassName={props.disabled? 'thumb disabled' : 'thumb'}
        trackClassName={'track'}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        min={1}
        max={120}
      />
    </div>
  );
}

export default SettingSlider;

