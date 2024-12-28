import { storageStore, type ProjectSaveMeta } from './storage';

/**
 * Save a project JSON to the project server.
 * This should eventually live in scratch-www.
 * @param {number | string} projectId the ID of the project, null if a new project.
 * @param {string} vmState the JSON project representation.
 * @param {object} params the request params.
 * @property {?number} params.originalId the original project ID if a copy/remix.
 * @property {?boolean} params.isCopy a flag indicating if this save is creating a copy.
 * @property {?boolean} params.isRemix a flag indicating if this save is creating a remix.
 * @property {?string} params.title the title of the project.
 * @return {Promise} A promise that resolves when the network request resolves.
 */
export default async function (projectId: number | string | null | undefined, vmState: string, params: {
    originalId?: number | string,
    isCopy?: boolean,
    isRemix?: boolean,
    title?: string
}) {
    const isCreatingProject = projectId === null || typeof projectId === 'undefined';
    const meta: ProjectSaveMeta = {
        isCopy: Object.prototype.hasOwnProperty.call(params, 'isCopy'),
        originalId: params.originalId,
        isRemix: Object.prototype.hasOwnProperty.call(params, 'isRemix'),
        title: params.title ?? 'Untitled'
    }
    const saved = await storageStore.saveProject(isCreatingProject ? false : projectId!, vmState, meta)
    return saved
}
