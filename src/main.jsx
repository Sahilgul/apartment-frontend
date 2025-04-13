// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );


// // main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import { AuthProvider } from './contexts/AuthContext'; // ✅ import this
// import App from './App';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <AuthProvider> {/* ✅ wrap App here */}
//         <App />
//       </AuthProvider>
//     </Provider>
//   </React.StrictMode>
// );



// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext'; // for auth context
import { ListingsProvider } from './contexts/ListingsContext'; // for listings context
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ListingsProvider> {/* Wrap with ListingsProvider */}
          <App />
        </ListingsProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

