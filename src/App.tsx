import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
import Auth from './interceptors/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
// import { getPosts } from './store/actions/post';
import { RootStateType } from './types.d';

const App = () => {
  // const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);

  const loadResources = () => {
    if (auth.loggedIn) {
      // dispatch(getPosts());
    }
  };

  useEffect(() => {
    loadResources();
  }, [auth]);

  return (
    <Router>
      <SuccessMessages />
      <Switch>
        <Auth isAuth exact path="/dashboard" component={Dashboard} />
        <Auth isAuth exact path="/dashboard/:id" component={SinglePost} />
        <Auth isAuth={false} exact path="/" component={Home} />
        <Auth isAuth={false} exact path="/login" component={Login} />
        <Auth isAuth={false} exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
