import { useCallback, useState, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(6)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState()

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "1234567890"
    if(char) str += "@#$%&_"

    for(let i=0; i<length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, number, char, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, char, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-40 text-black bg-gray-100">
        <h1 className="text-center text-xl mb-4 font-normal">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" 
          readOnly ref={passwordRef}>
          </input>
          <button className="px-3 py-0.5 bg-slate-700 text-white hover:bg-slate-600 shrink-0" onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className="flex text-sm gap-x-8">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={30} value={length} onChange={(e) => setLength(e.target.value)}></input>
            <label>Length {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={number} id="number-allowed" onChange={() => {
              setNumber((prev) => !prev);
            }}>
            </input>
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={char} id="char-allowed" onChange={() => {
              setChar((prev) => !prev);
            }}>
            </input>
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
