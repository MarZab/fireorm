import { IEntity, Constructor } from '../types';
import { Firestore, DocumentReference } from '@google-cloud/firestore';
import { FullCollectionMetadata } from '../MetadataStorage';
import { ValidationError } from '../Errors/ValidationError';
import { ValidatorOptions } from 'class-validator';
declare type BatchOperation<T extends IEntity> = {
    type: 'create' | 'update' | 'delete';
    item: IEntity;
    ref: DocumentReference;
    collectionMetadata: FullCollectionMetadata;
    validateModels: boolean;
    validatorOptions?: ValidatorOptions;
};
export declare class FirestoreBatchUnit {
    private firestoreRef;
    private status;
    operations: BatchOperation<IEntity>[];
    constructor(firestoreRef: Firestore);
    add<T extends IEntity>(type: BatchOperation<T>['type'], item: T, ref: DocumentReference, collectionMetadata: FullCollectionMetadata, validateModels: boolean, validatorOptions?: ValidatorOptions): void;
    commit: () => Promise<FirebaseFirestore.WriteResult[]>;
    validate(item: IEntity, Entity: Constructor<IEntity>, validatorOptions?: ValidatorOptions): Promise<ValidationError[]>;
}
export {};
