import { useEffect, useState } from 'react'

// In React, we'll render UI with state and state updates Declaratively
// React does DOM manipulation for us under the hood!
const url = 'https://api.adviceslip.com/advice'

export default function App() {
  const [advice, setAdvice] = useState('')
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAdvice = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Could not fetch the data')
      }
      const data = await response.json()
      console.log(data)
      const { slip: advice } = data
      console.log(advice.advice)
      setLoading(false)
      setAdvice(advice.advice)
      setCount(prev => prev + 1)
    } catch (error) {
      setLoading(false)
      setError('There was an Error')
    }
  }

  if (loading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Get Some Advices</h1>
      <button onClick={handleAdvice}>Get advice</button>

      <p>{advice}</p>

      <h2>Count: {count}</h2>
    </div>
  )
}
