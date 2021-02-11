import {useState, useEffect} from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null) 
  const [isPending, setisPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTimeout(()=>{
      fetch(url)
        .then(res =>{
          if(!res.ok){
            throw Error("couldnt fetch the data for that resource")
          }
          return res.json()
        })
        .then(data =>{
          setData(data)
          setisPending(false)
          setError(null)
        })
        .catch(e => {
          setisPending(false)
          setError(e.message) 
        })
    },0)
  },[url])

  return {data, isPending, error};
}
 
export default useFetch;