import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charaters, setCharaters] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charaters) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  }, [length, numberAllowed, charaters, setPassword]);

  const [count, setCount] = useState(0)

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charaters, passwordGenerator])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (

    <>
      <div className='w-full max-w-md mx-auto shadow-md items-center
     rounded-lg p-4 m-8 text-orange-500 bg-gray-700'>
        <div className='flex justify-center items-center overflow-hidden m-4'>
          <input
            type="text"
            value={password}
            className='w-full outline-none py-1.5 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef} />
          <button onClick={copyPassword} className='bg-blue-700 text-white outline-none px-5 py-1.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer '
              onChange={(e) => setLength(e.target.value)} />
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
              defaultChecked={charaters}
              id='characterInput'
              onChange={() => { setCharaters((prev) => !prev) }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>




    </>
  )
}

export default App
