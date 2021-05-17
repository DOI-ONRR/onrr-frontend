import { useEffect, useState } from 'react'

export default function useFetch(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
        async function loadData() {
            const response = await fetch(url);
            console.debug('response yo: ', response)
            if(!response.ok) {
                // oh no! something went wrong
                return
            }

            const posts = await response.json();
            setData(posts)
        }

        loadData()
    }, [url])
    return data
}