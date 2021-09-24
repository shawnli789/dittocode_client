import Helmet from 'react-helmet';
import { Fragment, useState, useEffect, useRef, useContext } from 'react';
import useSound from 'use-sound';
import TimerClock from '../components/timer/TimerClock';
import PlayButton from '../components/timer/PlayButton';
import PauseButton from '../components/timer/PauseButton';
import SettingSlider from '../components/timer/SettingSlider';
import ResetButton from '../components/timer/ResetButton';
import tickSound from '../utils/tick.mp3';
import bellSound from '../utils/bell.mp3';
import TimerContext from '../store/timer-context';
import BackButton from '../components/timer/BackButton';
import TimerBackConfirmationModal from '../components/modals/TimerBackConfirmationModal';
import CompletedConfirmationModal from '../components/modals/CompletedConfirmationModal';
import TimerSaveModal from '../components/modals/TimerSaveModal';
import useAxiosInstance from '../hooks/use-axios-instance';
import { useHistory } from "react-router";

function Timer(props) {
  const timerCtx = useContext(TimerContext);
  let problemInfo = timerCtx.problemInfo;
  const tags = problemInfo.tags.split(',');
  const tagElement = tags.map((t, index) => {
    t = t.trim();
    return <span key={index} className="badge rounded-pill bg-secondary mx-1">{t}</span>;
  })
  let difficultyColor;
  if (problemInfo.difficulty === 'hard') {
    difficultyColor = "text-danger";
  } else if (problemInfo.difficulty === 'medium') {
    difficultyColor = "text-warning";
  } else if (problemInfo.difficulty === 'easy') {
    difficultyColor = "text-success";
  }
  const difficultyElement = <span className={difficultyColor}>{problemInfo.difficulty}</span>

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(30);
  const [reset, setReset] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  // Make sure useEffect can always get the latest state value.
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  // Sound State
  const [shouldPlayTickSound, setShouldPlayTickSound] = useState(false);
  const [shouldPlayBellSound, setShouldPlayBellSound] = useState(false);
  const [playTick, { stop }] = useSound(
    tickSound,
    { volume: 0.5 }
  );
  const [playBell] = useSound(
    bellSound,
    { volume: 0.5 }
  );


  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    setReset(false);
    secondsLeftRef.current = totalMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
    const interval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        isPausedRef.current = true;
        setIsPaused(true);
        setShowTimeUpModal(true);
        return;
      }
      tick();
    }, 1000)
    return () => clearInterval(interval)
  }, [totalMinutes, reset])

  // Show reload warning modal before unload the page.
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    if (e) {
      e.returnValue = '';
    }
    return '';
  }


  useEffect(() => {
    if (secondsLeft <= 10 && secondsLeft > 0 && !isPaused) {
      setShouldPlayTickSound(true);
    } else {
      setShouldPlayTickSound(false);
    }
    if (secondsLeft === 0) {
      setShouldPlayBellSound(true);
    } else {
      setShouldPlayBellSound(false);
    }
  }, [secondsLeft, isPaused])

  useEffect(() => {
    if (shouldPlayTickSound) {
      playTick();
    } else {
      stop();
    }
    if (shouldPlayBellSound) {
      playBell();
    }
  }, [shouldPlayTickSound, shouldPlayBellSound])


  const percentage = Math.round(secondsLeft / (totalMinutes * 60) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  const backHandler = () => {
    timerCtx.setShowTimer(false)
  }

  const sliderChangeHandler = (value) => {
    setTotalMinutes(value);
  }



  const { postProblem } = useAxiosInstance();
  const history = useHistory();

  const successHandler = () => {
    console.log(Math.round(secondsLeftRef.current / 60))
    setShowTimeUpModal(false);
    problemInfo = {
      ...problemInfo,
      "completed": "Yes",
      "time_spent": totalMinutes - Math.round(secondsLeftRef.current / 60) + 1
    }
    setShowSaveModal(true);
    postProblem(problemInfo).then(function () {
      setShowSaveModal(false);
      timerCtx.setShowTimer(false);
      history.push("/problems")
    }).catch(function (error) {
      setShowSaveModal(false);
      alert(error)
    });
  }

  const failHandler = () => {
    setShowTimeUpModal(false);
    problemInfo = {
      ...problemInfo,
      "completed": "No",
      "time_spent": totalMinutes - Math.round(secondsLeftRef.current / 60)
    }
    setShowSaveModal(true);
    postProblem(problemInfo).then(function () {
      setShowSaveModal(false);
      timerCtx.setShowTimer(false);
      history.push("/problems")
    }).catch(function (error) {
      setShowSaveModal(false);
      alert(error)
    });
  }

  const completedHandler = () => {
    setShowTimeUpModal(true);
  }

  return (
    <Fragment>
      <Helmet bodyAttributes={{ style: 'background-color : #30384b' }} />
      <div className="container">
        <div className="row gx-5">
          <div className="col-4" >
            <BackButton
              className="mediaButton"
              style={{ paddingTop: "30px" }}
              onClick={() => setShowBackModal(true)}
            />
          </div>
          <div className="col-4 timer">
            <TimerClock
              value={percentage}
              text={minutes + ':' + seconds}
            />
          </div>
          <div className="col-4 center-block">
            <div className='card problem-card'>
              <div className='card-header'>
                <h4 className="card-header-title">
                  {problemInfo.number + '. ' + problemInfo.title}
                </h4>
              </div>
              <div className='card-body'>
                <div className='container px-0'>
                  <div className='row gx-0 mb-3'>
                    <div className='col-4'>
                      <span>Tags:</span>
                    </div>
                    <div className='col-8'>
                      <span>{tagElement}</span>
                    </div>
                  </div>
                  <div className='row gx-0 mb-3'>
                    <div className='col-4'>
                      <span>Type:</span>
                    </div>
                    <div className='col-8'>
                      <span className="mx-1">{problemInfo.type}</span>
                    </div>
                  </div>
                  <div className='row gx-0 mb-3'>
                    <div className='col-4'>
                      <span>Difficulty:</span>
                    </div>
                    <div className='col-8'>
                      <span className="mx-1">{difficultyElement}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col" />
          <div className="col text-center">
            {isPaused ? <PlayButton className="mediaButton" onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
              : <PauseButton className="mediaButton" onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
            <ResetButton
              className="mediaButton"
              style={{ width: '85px' }}
              onClick={() => {
                setReset(true);
              }}
            />
          </div>
          <div className="col">
            <button
              className='btn btn-outline-light btn-lg py-3 px-5 fs-2'
              style={{ marginTop: "60px", marginLeft: '80px' }}
              onClick={completedHandler}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="row sliderDiv">
          <SettingSlider
            value={totalMinutes}
            onChange={sliderChangeHandler}
            disabled={!isPausedRef.current}
          />
        </div>
      </div>

      <TimerBackConfirmationModal
        show={showBackModal}
        handleClose={() => setShowBackModal(false)}
        className='timer-back-modal pt-8'
        actionHandler={() => backHandler()}
        title="Are you sure?"
        body="You will lose the current process. "
      />

      <CompletedConfirmationModal
        show={showTimeUpModal}
        handleClose={() => setShowTimeUpModal(false)}
        className='completed-modal pt-8'
        successHandler={successHandler}
        failHandler={failHandler}
        body={
          <div>
            <p>You spent {totalMinutes - Math.round(secondsLeftRef.current / 60)} minute(s) on this challenge.</p>
            <p>Are you able to complete it?</p>
          </div>
        }
      />

      <TimerSaveModal
        show={showSaveModal}
        className='save-modal pt-8'
        body="Saving..."
      />

    </Fragment>
  )
}

export default Timer

