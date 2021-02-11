import {useState, useEffect} from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null) 
  const [isPending, setisPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // switching the link fast causing error for useFetch
    // clean up function with abortController signal
    const abortCont = new AbortController();

    setTimeout(()=>{
      fetch(url, {signal: abortCont.signal})
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
        .catch(err => {
          if (err.name == "AbortError"){
            console.log("fetch aborted")
          } else{
            setisPending(false)
            setError(err.message) 
          }          
        })
    },100)
    return () => abortCont.abort();
  },[url])

  return {data, isPending, error};
}
 
export default useFetch;