import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Components

import Home from "../Screens/Home/Home"
import SignIn from "../Screens/Authentication/SignIn";
import SignUp from "../Screens/Authentication/SignUp";
import ForgetPassWord from "../Screens/Authentication/ForgetPass";
import NewPass from "../Screens/Authentication/NewPass";
import Chat from "../Screens/Chat";

const AppRouter = (props) => {
  var {isAuthenticated, userInfo, expData, expHis,updateExpHis, incData, incHis, updateIncHis, contacts, uploadDoc, doc, userData} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"  render={() => <SignIn isAuthenticated={isAuthenticated} userInfo={userInfo} />} exact />
        <Route path="/home" render={() => <Home 
          isAuthenticated={isAuthenticated} 
          userInfo={userInfo} 
          expData={expData}
          expHis={expHis} 
          updateExpHis={updateExpHis} 
          incData={incData} 
          incHis={incHis}
          updateIncHis={updateIncHis}
          contacts={contacts} 
          uploadDoc={uploadDoc}
          doc={doc}
          userData={userData}
           /> }  />
        <Route path="/signup"  render={() => <SignUp isAuthenticated={isAuthenticated} userInfo={userInfo} />} exact />
        <Route path="/resetpasword" render={() => <ForgetPassWord   isAuthenticated={isAuthenticated} /> } />
        <Route path="/newPass/" component={NewPass} isAuthenticated={isAuthenticated} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
