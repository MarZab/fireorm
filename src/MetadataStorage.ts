export interface IMetadataStorage {
  get(): any;
}

const globalStorage = {
  get: (): any => global,
};

export interface CollectionMetadata {
  target: Function;
  name: string;
}

export interface SubCollectionMetadata {
  target: Function;
  name: string;
  entity: Function;
}

export interface RepositoryMetadata {
  target: Function;
  entity: Function;
}

export class MetadataStorage {
  readonly collections: CollectionMetadata[] = [];
  readonly subCollections: SubCollectionMetadata[] = [];
  readonly repositories: RepositoryMetadata[] = [];
}

export const getMetadataStorage = (
  storage: IMetadataStorage = globalStorage
): MetadataStorage => {
  const global = storage.get();

  if (!global.metadataStorage) global.metadataStorage = new MetadataStorage();

  return global.metadataStorage;
};
