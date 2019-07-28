import axios from "axios";
import NProgress from "nprogress";
import "../node_modules/nprogress/nprogress.css";

axios.defaults.baseURL = "http://localhost:8081";

axios.interceptors.request.use(function(config) {
    NProgress.start();
    return config;
});

axios.interceptors.response.use(function(config) {
    NProgress.done();
    return config;
});

export const STRIPE_KEY= 'pk_test_NsauJtrtX7GYgepK9yrcoTgo'
export const PaymentApi= 'http://localhost:1234'
export const AdminApi = 'http://localhost:8081';
export const UserApi = 'http://localhost:8082';
export const CourseApi = 'http://localhost:8083';
export const ImageApi = 'http://localhost:1324';
export const QuizApi = 'http://localhost:8085';
