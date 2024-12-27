import { GUI } from '../src/mod.tsx'
import React from 'react'

export default function App () {
  return <GUI
    coreOptions={{
      canModifyCloudData: true,
      onLogOut() {
        console.log('Logout')
      },
    }}
    session={{
      user: {
        username: 'nakasyou',
        thumbnailUrl: 'https://github.com/nakasyou.png'
      }
    }}
    bslashOptions={{
      getProfileURL: () => 'https://example.com'
    }}
  />
}
