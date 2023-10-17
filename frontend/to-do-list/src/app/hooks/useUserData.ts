import axios, { AxiosPromise, AxiosResponse } from "axios"
import { UserData } from "../interface/userData"
import { useMutation, useQuery, useQueryClient } from "react-query"

const API_URL = 'http://localhost:8080'

// const handleLogin = () => {
//     const userData: UserData = {
//       email: string,
//       password: password,
//     };

//     axios.post(`{API_URL}` + '/auth/register', userData)
//     .then((response) => {
//         return response.data;
//       })
// }