import { Route, Switch } from 'react-router-dom';
import React, { Fragment, useContext, useState, Suspense } from 'react'
import AuthContext from './store/auth-context';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

import SignUp from './pages/SignUp';
import TimerContext from './store/timer-context';
import AdminContext from './store/admin-context';
import PageNotFound from './pages/PageNotFound';
import Admin from './pages/Admin'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const NewProblem = React.lazy(() => import('./pages/NewProblem'))
const NewCustomProblem = React.lazy(() => import('./pages/NewCustomProblem'))
const Timer = React.lazy(() => import('./pages/Timer'))
const Problems = React.lazy(() => import('./pages/Problems'))

function App() {
  const authCtx = useContext(AuthContext);
  const [showTimer, setShowTimer] = useState(false);
  const [problemInfo, setProblemInfo] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <Fragment>
      <Suspense fallback="">
        <AdminContext.Provider value={{
          isAdmin,
          setIsAdmin
        }}>
          <Switch>
            <Route exact path="/dashboard" component={authCtx.isLoggedIn ? Dashboard : SignIn} />
            <Route exact path="/problems" component={authCtx.isLoggedIn ? Problems : SignIn} />
            <Route exact path="/new-problem">
              <TimerContext.Provider value={{
                showTimer,
                setShowTimer,
                problemInfo,
                setProblemInfo
              }}>
                {authCtx.isLoggedIn ? (showTimer ? <Timer /> : <NewProblem />) : <SignIn />}
              </TimerContext.Provider>
            </Route>
            <Route exact path="/new-custom-problem">
              <TimerContext.Provider value={{
                showTimer,
                setShowTimer,
                problemInfo,
                setProblemInfo
              }}>
                {authCtx.isLoggedIn ? (showTimer ? <Timer /> : <NewCustomProblem />) : <SignIn />}
              </TimerContext.Provider>
            </Route>
            <Route exact path="/sign-in" component={authCtx.isLoggedIn ? Home : SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/admin" component={isAdmin? Admin : PageNotFound} />
            <Route exact path="/" component={authCtx.isLoggedIn ? Dashboard : Home} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </AdminContext.Provider>
      </Suspense>
    </Fragment>
  );
}

export default App;