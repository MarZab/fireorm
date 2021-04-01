import { OrderByDirection, DocumentReference, CollectionReference } from '@google-cloud/firestore';
import { Query } from '@google-cloud/firestore';
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type PartialWithRequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
export declare type WithOptionalId<T extends {
    id: unknown;
}> = Pick<T, Exclude<keyof T, 'id'>> & Partial<Pick<T, 'id'>>;
export declare type IFirestoreVal = string | number | Date | boolean | DocumentReference | null;
export declare enum FirestoreOperators {
    equal = "==",
    notEqual = "!=",
    lessThan = "<",
    greaterThan = ">",
    lessThanEqual = "<=",
    greaterThanEqual = ">=",
    arrayContains = "array-contains",
    arrayContainsAny = "array-contains-any",
    in = "in",
    notIn = "not-in"
}
export interface IFireOrmQueryLine {
    prop: string;
    val: IFirestoreVal | IFirestoreVal[];
    operator: FirestoreOperators;
}
export interface IOrderByParams {
    fieldPath: string;
    directionStr: OrderByDirection;
}
export declare type IQueryBuilderResult = IFireOrmQueryLine[];
export declare type IWherePropParam<T> = keyof T | ((t: T) => unknown);
export interface IQueryable<T extends IEntity> {
    whereEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereNotEqualTo(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereGreaterThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereGreaterOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereLessOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereArrayContains(prop: IWherePropParam<T>, val: IFirestoreVal): IQueryBuilder<T>;
    whereArrayContainsAny(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    whereIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    whereNotIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): IQueryBuilder<T>;
    find(): Promise<T[]>;
    findOne(): Promise<T | null>;
    customQuery(func: ICustomQuery<T>): IQueryBuilder<T>;
}
export interface IOrderable<T extends IEntity> {
    orderByAscending(prop: IWherePropParam<T>): IQueryBuilder<T>;
    orderByDescending(prop: IWherePropParam<T>): IQueryBuilder<T>;
}
export interface ILimitable<T extends IEntity> {
    limit(limitVal: number): IQueryBuilder<T>;
}
export declare type IQueryBuilder<T extends IEntity> = IQueryable<T> & IOrderable<T> & ILimitable<T>;
export declare type ICustomQuery<T> = (query: Query, firestoreColRef: CollectionReference) => Promise<Query>;
export interface IQueryExecutor<T> {
    execute(queries: IFireOrmQueryLine[], limitVal?: number, orderByObj?: IOrderByParams, single?: boolean, customQuery?: ICustomQuery<T>): Promise<T[]>;
}
export interface IBatchRepository<T extends IEntity> {
    create(item: WithOptionalId<T>): void;
    update(item: T): void;
    delete(item: T): void;
}
export interface ISingleBatchRepository<T extends IEntity> extends IBatchRepository<T> {
    commit(): Promise<unknown>;
}
export interface IFirestoreBatchSingleRepository<T extends IEntity> extends IBatchRepository<T> {
    commit(): Promise<void>;
}
export interface IFirestoreBatch {
    getRepository<T extends IEntity>(entity: Constructor<T>): IBatchRepository<T>;
    getSingleRepository<T extends IEntity>(pathOrConstructor: EntityConstructorOrPath<T>): IFirestoreBatchSingleRepository<T>;
    commit(): Promise<unknown>;
}
export interface IBaseRepository<T extends IEntity> {
    findById(id: string): Promise<T | null>;
    create(item: PartialBy<T, 'id'>): Promise<T>;
    update(item: PartialWithRequiredBy<T, 'id'>): Promise<PartialWithRequiredBy<T, 'id'>>;
    delete(id: string): Promise<void>;
}
export declare type IRepository<T extends IEntity> = IBaseRepository<T> & IQueryBuilder<T> & IQueryExecutor<T>;
export declare type ITransactionRepository<T extends IEntity> = IRepository<T>;
export interface ITransactionReference<T = IEntity> {
    entity: T;
    propertyKey: string;
    path: string;
}
export declare type ITransactionReferenceStorage = Set<ITransactionReference>;
export declare type ISubCollection<T extends IEntity> = IRepository<T> & {
    createBatch: () => IFirestoreBatchSingleRepository<T>;
    runTransaction<R = void>(executor: (tran: ITransactionRepository<T>) => Promise<R>): Promise<R>;
};
export interface IEntity {
    id: string;
}
export declare type Constructor<T> = {
    new (): T;
};
export declare type EntityConstructorOrPathConstructor<T extends IEntity> = {
    new (): T;
};
export declare type IEntityConstructor = Constructor<IEntity>;
export declare type IEntityRepositoryConstructor = Constructor<IRepository<IEntity>>;
export declare type EntityConstructorOrPath<T> = Constructor<T> | string;
export interface IFirestoreTransaction<T extends IEntity = IEntity> {
    getRepository(entityOrConstructor: EntityConstructorOrPath<T>): IRepository<T>;
}
