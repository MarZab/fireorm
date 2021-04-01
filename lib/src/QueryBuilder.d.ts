import { IQueryBuilder, IFireOrmQueryLine, IOrderByParams, IFirestoreVal, IQueryExecutor, IEntity, IWherePropParam, ICustomQuery } from './types';
export default class QueryBuilder<T extends IEntity> implements IQueryBuilder<T> {
    protected executor: IQueryExecutor<T>;
    protected queries: Array<IFireOrmQueryLine>;
    protected limitVal: number;
    protected orderByObj: IOrderByParams;
    protected customQueryFunction?: ICustomQuery<T>;
    constructor(executor: IQueryExecutor<T>);
    private extractWhereParam;
    whereEqualTo(param: IWherePropParam<T>, val: IFirestoreVal): this;
    whereNotEqualTo(param: IWherePropParam<T>, val: IFirestoreVal): this;
    whereGreaterThan(prop: IWherePropParam<T>, val: IFirestoreVal): this;
    whereGreaterOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): this;
    whereLessThan(prop: IWherePropParam<T>, val: IFirestoreVal): this;
    whereLessOrEqualThan(prop: IWherePropParam<T>, val: IFirestoreVal): this;
    whereArrayContains(prop: IWherePropParam<T>, val: IFirestoreVal): this;
    whereArrayContainsAny(prop: IWherePropParam<T>, val: IFirestoreVal[]): this;
    whereIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): this;
    whereNotIn(prop: IWherePropParam<T>, val: IFirestoreVal[]): this;
    limit(limitVal: number): this;
    orderByAscending(prop: IWherePropParam<T>): this;
    orderByDescending(prop: IWherePropParam<T>): this;
    find(): Promise<T[]>;
    customQuery(func: ICustomQuery<T>): this;
    findOne(): Promise<T>;
}
