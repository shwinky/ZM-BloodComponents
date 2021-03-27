import { useEffect, useState } from "react";
import styles from "./CoordinatorRouter.module.scss";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Route, Switch, Redirect } from "react-router-dom";
import { CoordinatorScreen } from "./CoordinatorScreen";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { LoginStatus } from "@zm-blood-components/common";
import CoordinatorSignInScreenContainer from "../screens/authentication/CoordinatorSignInScreenContainer";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import CoordinatorHeaderContainer from "../components/Header/CoordinatorHeaderContainer";
import ManageAppointmentsScreenContainer from "../screens/manageAppointmentsScreen/ManageAppointmentsScreenContainer";
import SearchDonorsScreenContainer from "../screens/serchDonorsScreen/SearchDonorsScreenContainer";

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function CoordinatorRouter() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange(setLoginStatus);
  }, [loginStatus]);

  let content = <LoadingScreen />;

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    content = <CoordinatorSignInScreenContainer />;
  }

  if (loginStatus === LoginStatus.LOGGED_IN) {
    content = (
      <Switch>
        <Route exact path={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS}>
          <ManageAppointmentsScreenContainer />
        </Route>
        <Route exact path={"/" + CoordinatorScreen.DONORS}>
          <SearchDonorsScreenContainer />
        </Route>
        <Route exact path={["/" + CoordinatorScreen.ADD_APPOINTMENTS, "*"]}>
          <AddAppointmentsScreenContainer />
        </Route>

        {/*in case of no match*/}
        <Redirect to={"/" + CoordinatorScreen.ADD_APPOINTMENTS} />
      </Switch>
    );
  }

  return (
    <>
      <CoordinatorHeaderContainer
        showSignOutButton={loginStatus === LoginStatus.LOGGED_IN}
      />
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>{appVersion}</div>
    </>
  );
}
