import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../actions/authActions';
import { getAreaList } from '../actions/commonActions';
import '../css/style.css';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

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
import Signin from './account/Signin';
import PostedJob from './account/MyPage/PostedJob';
import JobEdit from './job/JobEdit';
import SavedJob from './account/MyPage/SavedJob';
import ApplyJob from './job/ApplyJob';
import EmailSent from './static/EmailSent';
import NotFound from './static/NotFound';
import Terms from './static/Terms';
import Privacy from './static/Privacy';
import ContactForm from './contact/ContactForm';
import BusinessProfileList from './profile/BusinessProfileList';
import Dashboard from './admin/Dashboard';
import ThreadHome from './thread/ThreadHome';
import ThreadEditForm from './thread/ThreadEditForm';
import ThreadDetail from './thread/ThreadDetail';


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
            <Route path="/profiles" exact component={BusinessProfileList} />
            <PrivateRoute path="/jobs/edit" userType="Business" exact component={JobEdit} />
            <PrivateRoute path="/jobs/edit/:id" userType="Business" exact component={JobEdit} />
            <Route path="/jobs/:id" exact component={JobDetail} />
            <PrivateRoute path="/jobs/:id/apply" userType="Personal" exact component={ApplyJob} />
            <Route path="/thread/edit" exact component={ThreadEditForm} />
            <Route path="/thread/edit/:id" exact component={ThreadEditForm} />
            <Route path="/thread/:id" exact component={ThreadDetail} />
            <Route path="/thread" exact component={ThreadHome} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <PrivateRoute path="/mypage" exact component={MyPage} />
            <PrivateRoute path="/mypage/postedjoblist" userType="Business" exact component={PostedJob} />
            {/* <Route path="/mypage/postedjoblist" exact component={PostedJob} /> */}
            <PrivateRoute path="/mypage/savedjoblist" userType="Personal" exact component={SavedJob} />
            {/* <Route path="/mypage/savedjoblist" exact component={SavedJob} /> */}
            <Route path="/auth/verifyemail/:token" exact component={VerifyEmail} />
            <Route path="/auth/forgotpassword" exact component={ForgotPassword} />
            <Route path="/auth/resetpassword/:token" exact component={ResetPassword} />
            <Route path="/contact" exact component={ContactForm} />
            <Route path="/emailsent" exact component={EmailSent} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/terms" exact component={Terms} />
            <AdminRoute path='/admin' exact component={Dashboard} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
         <Footer />
      </Router>
    </div>
  );
}

export default App;
