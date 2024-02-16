import axios from "axios";
import { BACKEND_URL } from "../config";

axios.defaults.baseURL = `${BACKEND_URL}/api/v1`;
