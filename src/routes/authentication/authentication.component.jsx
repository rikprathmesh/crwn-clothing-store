// import React, { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

const Authentication = () => {
  // useEffect(() => {
  //   redirectedAuth()
  // }, [])

  // const redirectedAuth = async () => {
  //   const response = await getRedirectResult(auth)
  //   // console.log("get redirect result",response);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }

  return (
    <div className="authentication-container">
      
      <SignInForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Signin with Google redirect
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default Authentication;
