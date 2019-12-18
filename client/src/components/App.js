import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../actions/authActions';
import { getAreaList } from '../actions/commonActions';
import '../css/style.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './home/Home';
import JobSearch from './job/JobSearch';
import JobDetail from './job/JobDetail';
import GlobalNav from './layout/GlobalNav';
import Signup from './account/Signup';
import MyPage from './account/MyPage';
import VerifyEmail from './auth/VerifyEmail';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import EmailSent from './static/EmailSent';
import NotFound from './static/NotFound';
import Signin from './account/Signin';
import PostedJob from './account/MyPage/PostedJob';
import JobEdit from './job/JobEdit';
import SavedJob from './account/MyPage/SavedJob';


function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAreaList());
    dispatch(getCurrentUser());
  }, [dispatch])

  return (
    <div className="App">
      <Router history={history}>
        <div className="fixedArea">
          <Header />
          <GlobalNav />
        </div>
        <div className="mainArea">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/jobs" exact component={JobSearch} />
            <Route path="/jobs/edit" exact component={JobEdit} />
            <Route path="/jobs/edit/:id" exact component={JobEdit} />
            <Route path="/jobs/:id" exact component={JobDetail} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/mypage/postedjoblist" exact component={PostedJob} />
            <Route path="/mypage/savedjoblist" exact component={SavedJob} />
            <Route path="/auth/verifyemail/:token" exact component={VerifyEmail} />
            <Route path="/auth/forgotpassword" exact component={ForgotPassword} />
            <Route path="/auth/resetpassword/:token" exact component={ResetPassword} />
            <Route path="/static/emailsent" exact component={EmailSent} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
         <Footer />
      </Router>
    </div>
  );
}

export default App;
