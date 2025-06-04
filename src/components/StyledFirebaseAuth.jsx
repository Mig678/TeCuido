import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, uiConfig } from '../database/firebaseResources';

const FirebaseAuthUI = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};

export default FirebaseAuthUI;
