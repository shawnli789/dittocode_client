import logoSrc from '../img/logo.png'
import RedirectButton from '../components/buttons/RedirectButton'
import Fade from 'react-reveal/Fade';
import FeatureCard from '../components/cards/FeatureCard';
import timer from '../img/timer.png'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import MockProblemTable from '../components/mock/MockProblemTable';
import MockBarChart from '../components/mock/MockBarChart';
import MockLineChart from '../components/mock/MockLineChart';
import MockPieChart from '../components/mock/MockPieChart';
import { Helmet } from 'react-helmet';

function Home(props) {
  const slideProperties = {
    indicators: true,
    duration: 4000,
    prevArrow: <span />,
    nextArrow: <span />,
    pauseOnHover: true
  }

  const tableHeight = '280px'
  const chartHeight = '232px'

  return (
    <div className="container">
      <Helmet>
        <title>DittoCode</title>
        <meta
          name="description"
          content="DittoCode is a simple but powerful tool that helps you organize and visualize your coding progress when preparing for technical interviews." />
      </Helmet>
      <Fade delay={200}>
        <div className="d-flex mt-5 mx-4 align-items-center">
          <div className="me-auto justify-content-start">
            <img src={logoSrc} className="logo-img mb-3" style={{ marginRight: '10px' }} alt="..." />
            <span className='fs-1'>DittoCode</span>
          </div>
          <div className='me-4'>
            <RedirectButton href='/sign-in' className='btn btn-outline-primary lift'>Sign In</RedirectButton>
          </div>
        </div>
      </Fade>

      <Fade delay={200}>
        <div className='text-center mt-6' style={{ marginLeft: '15%', marginRight: '15%' }}>
          <p style={{ fontSize: '2.8em' }}><span className='fw-bold'>Organize</span> and <span className='fw-bold'>Visualize</span> coding practice</p>
          <p className='header-subtitle text-start fs-3'>
            DittoCode is a simple but powerful tool that helps you organize and visualize your coding progress when preparing for technical interviews.
            As you practice on coding platforms, DittoCode intelligently analyzes and records your results to quickly enhance your productivity and skills.
          </p>
          <RedirectButton href='/sign-up' className='mt-6 btn btn-outline-primary lift py-3 px-5 fs-2'>Sign Up Here</RedirectButton>

        </div>
      </Fade>


      <div className='row text-center mt-6 mx-6'>
        <Fade delay={0}>
          <div className='col'>
            <FeatureCard icon='fe fe-globe' color='blue'>
              <h1 className='mb-5'>Comprehensive </h1>
              <p >All in one solution to boost your practice workflow</p>
            </FeatureCard>
          </div>
        </Fade>
        <Fade delay={100}>
          <div className='col' >
            <FeatureCard icon='fe fe-feather' color='pink'>
              <h1 className='mb-5'>Interactive</h1>
              <p>Fast and responsive UI with a modern elegant design</p>
            </FeatureCard>
          </div>
        </Fade>
        <Fade delay={200}>
          <div className='col'>
            <FeatureCard icon='fe fe-pie-chart' color='purple'>
              <h1 className='mb-5'>Visualized</h1>
              <p>Fantastic data visualization provides rich information at a glance</p>
            </FeatureCard>
          </div>
        </Fade>
      </div>
      <p className='fw-bold text-center mt-6' style={{ fontSize: '2.8em' }}>Key Features</p>

      <div className='row mt-6 mx-6'>
        <Fade left>
          <div className='col-lg-12 col-xl-5 order-lg-last order-xl-first  fs-3'>
            <h1>Organize Practice</h1>
            <p className='text-muted'>A flexible table that coordinates your practice so that you can always keep on top of your goals.</p>
            <p className='text-muted'>The advanced filtering, searching and sorting capabilities will keep all valuable information upfont.</p>
          </div>
        </Fade>
        <Fade right>
          <div className='col-lg-12 col-xl-7'>
            <MockProblemTable minHeight={tableHeight} />
          </div>
        </Fade>
      </div>
      <div className='row mt-6 pt-3 mx-6'>
        <Fade left>
          <div className='col-lg-12 col-xl-7'>
            <div className='slide-container'>
              <Slide {...slideProperties}>
                <div className='each-slide'>
                  <MockLineChart height={chartHeight} />
                </div>
                <div className='each-slide'>
                  <MockPieChart height='168px' />
                </div>
                <div className='each-slide'>
                  <MockBarChart height={chartHeight} />
                </div>
              </Slide>
            </div>

          </div>
        </Fade>
        <Fade right>
          <div className='col-lg-12 col-xl-5 fs-3'>
            <h1>Visualize Progress</h1>
            <p className='text-muted'>Our real time dashboard will intelligently analyze your historical data to generate daily recommendations and render beautifully responsive charts. </p>
            <p className='text-muted'>From yesterday's practice number to all-year trends, all insights are at your fingertips</p>
          </div>
        </Fade>
      </div>
      <div className='row mt-6 pt-2 mx-6'>
        <Fade left>
          <div className='col-lg-12 col-xl-5 order-lg-last order-xl-first fs-3'>
            <h1>Pomodoro Timer</h1>
            <p className='text-muted'>A built in pomodoro style timer that provides an immersive environment for conquering your next coding challenge.</p>
            <p className='text-muted'>Prepare yourself for the real interview by pitting your problem solving skills against the clock.</p>
          </div>
        </Fade>
        <Fade right>
          <div className='col-lg-12 col-xl-7'>
            <div className='card' style={{ height: '342px' }}>
              <img src={timer} alt="..." className='card-img' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </Fade>
      </div>

      <div>
        <hr style={{ marginTop: '150px' }} />
        <div className="text-center text-dark p-3">
          © 2021 dittocode.io.
        </div>
      </div>

    </div>
  );
}

export default Home;
