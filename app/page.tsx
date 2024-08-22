'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>('')
  useEffect(() => {
      axios.get('http://localhost:3000/api')
      .then((response) => {
        setData(response.data.hello)
      })
  }, [])
  return (
  <>
  {data}
  </>
  );
}