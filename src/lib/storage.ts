// @ts-check
/// <reference types="@turbowarp/types" />
import ScratchStorage, { Asset, AssetType, DataFormat } from 'scratch-storage';

export interface SavedStatus {
  success: boolean
  /** Status Code */
  status?: number
}

export type BslashAssetType = {
    name: 'ImageBitmap' | 'ImageVector' | 'Sound'
}
export interface ProjectSaveMeta {
    isRemix: boolean
    originalId?: string | number
    isCopy: boolean
    title: string
}
export interface ProjectSaved {
    id: string | number
}

export interface StorageFunctions {
    loadProject: (id: number | string, storage: Storage) => Promise<Blob | null>
    loadAsset: (id: number | string, type: BslashAssetType) => Promise<Blob | null>
    saveAsset: (id: number | string, type: BslashAssetType, data: Uint8Array | string) => Promise<SavedStatus>
    saveProject: (id: number | string | false, data: string, meta: ProjectSaveMeta) => Promise<ProjectSaved>
}
export const storageStore: StorageFunctions ={
    loadProject: () => {
        throw new Error('loadProject function must be received.')
    },
    loadAsset() {
        throw new Error('loadAsset function must be received.')
    },
    saveAsset() {
        throw new Error('saveAsset function must be received.')
    },
    saveProject() {
        throw new Error('saveAsset function must be received.')
    },
}

const cacheStore = new Map<string | number, Asset>()
class Storage extends ScratchStorage {
    constructor() {
        super()
    }
    translator?: (m: string, v?: unknown) => string
    setProjectHost(host: string) {}
    setProjectToken(token: string) {}
    setAssetHost(host: string) {
}
    setTranslatorFunction(fn: (m: string, v?: unknown) => string) {
        this.translator = fn
    }
    addOfficialScratchWebStores() {}
    async load(type: AssetType, assetId: string, format: DataFormat) {
        switch(type.name) {
            case 'Project': {
                const blob = await storageStore.loadProject(assetId, this)
                if (!blob) {
                    return null
                }
                const buff = await blob.arrayBuffer()
                return new Asset(type, assetId, format, buff)
            }
            case 'ImageBitmap':
            case 'ImageVector':
            case 'Sound':
                const blob = await storageStore.loadAsset(assetId, { name: type.name })
                if (!blob) {
                    return null
                }
                const buff = new Uint8Array(await blob.arrayBuffer())
                const asset = new Asset(type, assetId, format,
                    // @ts-ignore
                    buff)
                cacheStore.set(assetId, asset)
                return asset
            default:
                console.warn('Not supported type', type)
                break
        }
        return null
    }
    get (assetId: string | number) {
        const got = cacheStore.get(assetId)
        if (got) {
            return got
        }
        return null
    }
    createAsset(
        assetType: AssetType,
        dataFormat: DataFormat,
        data: string | ArrayBuffer | Uint8Array,
        id: string | null,
        generateId: boolean
    ) {
        if (typeof data === 'string') {
            data = new TextEncoder().encode(data)
        } else if (data instanceof ArrayBuffer) {
            data = new Uint8Array(data)
        }
        const asset = new Asset(assetType, id as string, dataFormat,
            // @ts-ignore
            data,
            generateId)
        cacheStore.set(asset.assetId, asset)
        return asset
    }
    // @ts-ignore type is wrong
    async store(assetType: AssetType, dataFormat: DataFormat | null | undefined, data: Uint8Array, assetId: string | number): Promise<{
        status: string
        code: number
    }> {
        assetType
        const saved = await storageStore.saveAsset(assetId, {
            name: assetType.name as BslashAssetType['name']
        }, data)
        return {
            status: saved.success ? 'ok' : 'failed',
            code: saved.status ?? 200
        }
    }
}

const storage = new Storage();

export default storage
export type { Storage }
