import { StorageStorageItemInterface } from '../interfaces/storage/StorageStorageItem.Interface'

export class StorageService {
  constructor() {}

  public setStorage(storageItem: StorageStorageItemInterface) {
    localStorage.setItem(storageItem.key, storageItem.value)
  }

  public getStorage(storageItem: StorageStorageItemInterface) {
    return localStorage.getItem(storageItem.key)
  }

  public removeStorage(storageItem: StorageStorageItemInterface) {
    localStorage.removeItem(storageItem.key)
  }
}
