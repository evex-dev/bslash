import { GUI } from '../src/mod.tsx'
import React from 'react'
import projectData from '../src/lib/default-project/project-data.js'

export default function App () {
  return <GUI
    coreOptions={{
      canModifyCloudData: true,
      onLogOut() {
        console.log('Logout')
      },
      canSave: true
    }}
    session={{
      user: {
        username: 'nakasyou',
        thumbnailUrl: 'https://github.com/nakasyou.png'
      }
    }}
    bslashOptions={{
      getProfileURL: () => 'https://example.com',
    }}
    storage={{
        async loadProject(id, storage) {
            return new Blob([JSON.stringify(projectData(storage.translator))])
        },
        async loadAsset(id, type) {
            const ext = type.name ==  'ImageBitmap' ? 'png' : type.name === 'ImageVector' ? 'svg' : 'wav'
            const url = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${id}.${ext}/get/`
            return await fetch(url).then(res => res.blob())
        },
        async saveAsset(id, type, data) {
            return {success: true}
        },
        async saveProject(id, data, meta) {
            return { id: id === false ? '293': id }
        },
    }}
  />
}
