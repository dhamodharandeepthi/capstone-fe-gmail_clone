import { useState } from 'react'
import API from '../services/api'

const useapi = (urlObject) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsloading] = useState(false);

    const call = async (payload,type ='') => {
        setResponse(null);
        setIsloading(true);
        setError("");
        try {

            let res = await API(urlObject, payload,type)
            setResponse(res.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsloading(false);
        }
    }

    return { call, response, error, isLoading };

}

export default useapi;