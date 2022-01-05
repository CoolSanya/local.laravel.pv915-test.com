import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import "cropperjs/dist/cropper.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthUser } from './components/auth/Login/action';

const token = localStorage.token as string;

if(token) {
  AuthUser(token, store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
