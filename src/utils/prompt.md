instead of calling the firebaseAuthListener in the app.tsx file, is it ok to create another component AuthInitializer that has the onauthstatechange from firebase and also stores the redx state and use it wrap the entire component like this >
 <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
          <App />
      </AuthInitializer>
    </Provider>
  </StrictMode>,