import shape from '../../img/services-shape.svg';
import shape1 from '../../img/services-shape-1.svg';
import shape2 from '../../img/services-shape-2.svg';
import shape3 from '../../img/services-shape-3.svg';
function FeatureCard(props) {
  let serviceColor = shape1;
  if (props.color === 'pink') serviceColor=shape2;
  if (props.color === 'purple') serviceColor=shape3;
  return (
    <div className="card card-fill single-services">
      <div className="card-body  mt-0">
        <div className="row align-items-center gx-0">

          <div className="col">
            <div className='text-center mb-4'>
              <div className='services-icon'>
                <img className='shape' src={shape} alt='shape' />
                <img className='shape-1' src={serviceColor} alt='shape' />
                <i className={props.icon} />
              </div>
            </div>
              {props.children}
          </div>

        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
