import React, { useEffect, useState } from 'react'
import './App.css'

import { agent } from './verixyz/setup'

function App() {
  const [didDoc, setDidDoc] = useState<any>()

  const resolve = async () => {
    const doc = await agent.resolveDid({
      //didUrl: 'did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730',
      didUrl: 'did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867',
    })

    setDidDoc(doc)
  }

  useEffect(() => {
    resolve()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <pre id="result">{didDoc && JSON.stringify(didDoc, null, 2)}</pre>
      </header>
    </div>
  )
}

export default App