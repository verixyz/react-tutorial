# react-tutorial
a tutorial for react 

## initialize a new CRA priject

```bash
npx create-react-app verixyz-react-app --template typescript
cd verixyz-react-app
```
Install verixyz core, DIDResolver olugin and dependencies.
```bash
yarn add @verixyz/core @verixyz/did-resolver ethr-did-resolver web-did-resolver did-resolver
```

Create a setup file in src/verixyz/setup.ts and add the following code, replacing the INFURA_PROJECT_ID with your own.

```js
import { createAgent, IResolver } from '@verixyz/core'

import { DIDResolverPlugin } from '@verixyz/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = 'peopledata'

export const agent = createAgent<IResolver>({
  plugins: [
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
      }),
    }),
  ],

})
```
Open src/App.css and add the following styles to the top of the file:

```css
pre {
  font-family: monospace;
  white-space: pre;
}

#result {
  text-align: left;
  width: 900px;
  background-color: #24232d;
  color: #25c2a0;
  padding: 15px;
  overflow: scroll;
}
```

Open src/App.tsx and replace with the following code:
```js
import React, { useEffect, useState } from 'react'
import './App.css'

import { agent } from './verixyz/setup'

function App() {
  const [didDoc, setDidDoc] = useState<any>()

  const resolve = async () => {
    const doc = await agent.resolveDid({
      didUrl: 'did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730',
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
```

then run it. 
```bash
yarn start
```

You should see a did documents `did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730` be resolved:

```json
{
  "didDocumentMetadata": {},
  "didResolutionMetadata": {
    "contentType": "application/did+ld+json"
  },
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/secp256k1recovery-2020/v2"
    ],
    "id": "did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730",
    "verificationMethod": [
      {
        "id": "did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730#controller",
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": "did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730",
        "blockchainAccountId": "eip155:4:0x6AcF3bB1eF0eE84559De2bC2Bd9D91532062a730"
      }
    ],
    "authentication": [
      "did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730#controller"
    ],
    "assertionMethod": [
      "did:ethr:rinkeby:0x6acf3bb1ef0ee84559de2bc2bd9d91532062a730#controller"
    ]
  }
}
```

If you change the didUrl in App.tsx(line 11) to other did, you can see it be resolved also.

`did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867`

```json
{
  "didDocumentMetadata": {},
  "didResolutionMetadata": {
    "contentType": "application/did+ld+json"
  },
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/secp256k1recovery-2020/v2"
    ],
    "id": "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867",
    "verificationMethod": [
      {
        "id": "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controller",
        "type": "EcdsaSecp256k1RecoveryMethod2020",
        "controller": "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867",
        "blockchainAccountId": "eip155:3:0x2b606a3D6608376695a09111789E7CE25A1C82F3"
      },
      {
        "id": "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controllerKey",
        "type": "EcdsaSecp256k1VerificationKey2019",
        "controller": "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867",
        "publicKeyHex": "0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867"
      }
    ],
    "authentication": [
      "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controller",
      "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controllerKey"
    ],
    "assertionMethod": [
      "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controller",
      "did:ethr:ropsten:0x0223008f802a3ffb178ffa6b2830813e0a7f880dafe85cf4c6a5e68023596f2867#controllerKey"
    ]
  }
  ```
  

