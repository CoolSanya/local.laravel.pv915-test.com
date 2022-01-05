import axios from "axios";

export default axios.create({
    baseURL: "http://local.laravel.pv915-test.com:80/",
    headers: {
        "Content-type": "application/json"
    }
});