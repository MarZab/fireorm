import { Firestore } from '@google-cloud/firestore';
import { ValidatorOptions } from 'class-validator';
import { IEntityConstructor, Constructor, IEntity, IEntityRepositoryConstructor } from './types';
export interface CollectionMetadata {
    name: string;
    entityConstructor: IEntityConstructor;
    parentEntityConstructor?: IEntityConstructor;
    propertyKey?: string;
}
export interface SubCollectionMetadata extends CollectionMetadata {
    parentEntityConstructor: IEntityConstructor;
    propertyKey: string;
}
export interface CollectionMetadataWithSegments extends CollectionMetadata {
    segments: string[];
}
export interface SubCollectionMetadataWithSegments extends SubCollectionMetadata {
    segments: string[];
}
export interface FullCollectionMetadata extends CollectionMetadataWithSegments {
    subCollections: SubCollectionMetadataWithSegments[];
}
export interface RepositoryMetadata {
    target: IEntityRepositoryConstructor;
    entity: IEntityConstructor;
}
export interface MetadataStorageConfig {
    validateModels: boolean;
    validatorOptions?: ValidatorOptions;
}
export declare class MetadataStorage {
    readonly collections: Array<CollectionMetadataWithSegments>;
    protected readonly repositories: Map<IEntityConstructor, RepositoryMetadata>;
    config: MetadataStorageConfig;
    getCollection: (pathOrConstructor: string | IEntityConstructor) => {
        subCollections: SubCollectionMetadataWithSegments[];
        segments: string[];
        name: string;
        entityConstructor: Constructor<IEntity>;
        parentEntityConstructor?: Constructor<IEntity>;
        propertyKey?: string;
    };
    setCollection: (col: CollectionMetadata) => void;
    getRepository: (param: IEntityConstructor) => RepositoryMetadata;
    setRepository: (repo: RepositoryMetadata) => void;
    getRepositories: () => Map<Constructor<IEntity>, RepositoryMetadata>;
    firestoreRef: Firestore;
}
