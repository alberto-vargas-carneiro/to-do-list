import axios, { AxiosPromise, AxiosResponse } from "axios"
import { ListData } from "../interface/listData"
import { useQuery } from "react-query"

const API_URL = 'http://localhost:8080'

const fetchData = async(): Promise<ListData[]> => {
    const response: AxiosResponse<ListData[]> = await axios.get(`${API_URL}/todo`)
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