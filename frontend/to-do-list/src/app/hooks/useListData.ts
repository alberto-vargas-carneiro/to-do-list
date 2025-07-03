import axios, { AxiosResponse } from "axios"
import { ListData } from "../interface/listData"
import { useQuery } from "react-query"

const token = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem('token') || 'false') : null;
const email = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem('userEmail') || 'false') : null;

const fetchData = async (): Promise<ListData[]> => {
    const response: AxiosResponse<ListData[]> = await axios.get('http://localhost:8080/todo', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            email: email
        }
    })
    return response.data
}

export default function useListData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['list-data'],
        retry: 2,
    })

    return {
        ...query,
        data: query.data,
    }
}