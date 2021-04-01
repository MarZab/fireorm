"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataStorage_1 = require("./MetadataStorage");
var BaseFirestoreRepository_1 = require("./BaseFirestoreRepository");
describe('MetadataStorage', function () {
    var metadataStorage = undefined;
    var Entity = /** @class */ (function () {
        function Entity() {
        }
        return Entity;
    }());
    var SubEntity = /** @class */ (function () {
        function SubEntity() {
        }
        return SubEntity;
    }());
    var SubSubEntity = /** @class */ (function () {
        function SubSubEntity() {
        }
        return SubSubEntity;
    }());
    var col = {
        entityConstructor: Entity,
        name: 'entity',
    };
    var subCol = {
        entityConstructor: SubEntity,
        name: 'subEntity',
        parentEntityConstructor: Entity,
        propertyKey: 'subEntities',
    };
    var subSubCol = {
        entityConstructor: SubSubEntity,
        name: 'subSubEntity',
        parentEntityConstructor: SubEntity,
        propertyKey: 'subSubEntities',
    };
    beforeEach(function () {
        metadataStorage = new MetadataStorage_1.MetadataStorage();
    });
    describe('getCollection', function () {
        beforeEach(function () {
            metadataStorage.setCollection(subSubCol);
            metadataStorage.setCollection(subCol);
            metadataStorage.setCollection(col);
        });
        it('should get Collection by string', function () {
            var entityMetadata = metadataStorage.getCollection('entity');
            expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
            expect(entityMetadata.name).toEqual(col.name);
            expect(entityMetadata.segments).toEqual(['entity']);
            expect(entityMetadata.subCollections.length).toEqual(1);
        });
        it('should get Collection by constructor', function () {
            var entityMetadata = metadataStorage.getCollection(Entity);
            expect(entityMetadata.entityConstructor).toEqual(col.entityConstructor);
            expect(entityMetadata.name).toEqual(col.name);
            expect(entityMetadata.segments).toEqual(['entity']);
            expect(entityMetadata.subCollections.length).toEqual(1);
        });
        it('should get SubCollection by string', function () {
            var entityMetadata = metadataStorage.getCollection('entity/entity-id/subEntity/subEntity-id/subSubEntity');
            expect(entityMetadata.entityConstructor).toEqual(subSubCol.entityConstructor);
            expect(entityMetadata.name).toEqual(subSubCol.name);
            expect(entityMetadata.segments).toEqual(['entity', 'subEntity', 'subSubEntity']);
            expect(entityMetadata.subCollections.length).toEqual(0);
        });
        it('should get SubCollection by constructor', function () {
            var entityMetadata = metadataStorage.getCollection(subSubCol.entityConstructor);
            expect(entityMetadata.entityConstructor).toEqual(subSubCol.entityConstructor);
            expect(entityMetadata.name).toEqual(subSubCol.name);
            expect(entityMetadata.segments).toEqual(['entity', 'subEntity', 'subSubEntity']);
            expect(entityMetadata.subCollections.length).toEqual(0);
        });
        it('should return null when using invalid collection path', function () {
            var entityMetadata = metadataStorage.getCollection('this_is_not_a_path');
            expect(entityMetadata).toEqual(null);
        });
        it('should throw error if initialized with an invalid subcollection path', function () {
            var entityMetadata = metadataStorage.getCollection('entity/entity-id/subEntity/subEntity-id/fake-path');
            expect(entityMetadata).toEqual(null);
        });
        it('should return null when using invalid collection constructor', function () {
            var NewEntity = /** @class */ (function () {
                function NewEntity() {
                }
                return NewEntity;
            }());
            var entityMetadata = metadataStorage.getCollection(NewEntity);
            expect(entityMetadata).toEqual(null);
        });
        it('should initialize subcollection metadata', function () {
            var entityMetadata = metadataStorage.getCollection('entity');
            expect(entityMetadata.subCollections.length).toEqual(1);
            expect(entityMetadata.subCollections[0].entityConstructor).toEqual(subCol.entityConstructor);
            expect(entityMetadata.subCollections[0].segments).toEqual(['entity', 'subEntity']);
        });
        it('should throw error if initialized with an incomplete path', function () {
            expect(function () {
                return metadataStorage.getCollection('entity/entity-id/subEntity/subEntity-id');
            }).toThrow('Invalid collection path: entity/entity-id/subEntity/subEntity-id');
        });
    });
    describe('setCollection', function () {
        it('should store collections', function () {
            metadataStorage.setCollection(col);
            var collection = metadataStorage.collections.find(function (c) { return c.entityConstructor === col.entityConstructor; });
            expect(collection.entityConstructor).toEqual(col.entityConstructor);
            expect(collection.name).toEqual(col.name);
            expect(collection.parentEntityConstructor).toEqual(col.parentEntityConstructor);
            expect(collection.propertyKey).toEqual(col.propertyKey);
            expect(collection.segments).toEqual([col.name]);
        });
        it('should throw when trying to store duplicate collections', function () {
            metadataStorage.setCollection(col);
            expect(function () { return metadataStorage.setCollection(col); }).toThrowError("Collection with name " + col.name + " has already been registered");
        });
        it('should update segments for nested subcollections', function () {
            // Due to the order of how the decorators are evaluated,
            // children collections are registered first
            metadataStorage.setCollection(subSubCol);
            metadataStorage.setCollection(subCol);
            metadataStorage.setCollection(col);
            var collection = metadataStorage.collections.find(function (c) { return c.entityConstructor === subSubCol.entityConstructor; });
            expect(collection.segments).toEqual([col.name, subCol.name, subSubCol.name]);
        });
    });
    describe('getRepository', function () {
        var EntityRepository = /** @class */ (function (_super) {
            __extends(EntityRepository, _super);
            function EntityRepository() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EntityRepository;
        }(BaseFirestoreRepository_1.BaseFirestoreRepository));
        var entityRepository = {
            entity: Entity,
            target: EntityRepository,
        };
        beforeEach(function () {
            metadataStorage.setRepository(entityRepository);
        });
        it('should get repositories', function () {
            var repo = metadataStorage.getRepository(Entity);
            expect(repo.entity).toEqual(entityRepository.entity);
            expect(repo.target).toEqual(entityRepository.target);
        });
        it('should return null for invalid repositories', function () {
            var WrongEntity = /** @class */ (function () {
                function WrongEntity() {
                }
                return WrongEntity;
            }());
            var repo = metadataStorage.getRepository(WrongEntity);
            expect(repo).toEqual(null);
        });
    });
    describe('setRepository', function () {
        var EntityRepository = /** @class */ (function (_super) {
            __extends(EntityRepository, _super);
            function EntityRepository() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EntityRepository;
        }(BaseFirestoreRepository_1.BaseFirestoreRepository));
        var entityRepository = {
            entity: Entity,
            target: EntityRepository,
        };
        it('should store repositories', function () {
            metadataStorage.setRepository(entityRepository);
            expect(metadataStorage.getRepositories().size).toEqual(1);
            expect(metadataStorage.getRepositories().get(entityRepository.entity).entity).toEqual(Entity);
        });
        it('should throw when trying to store two repositories with the same entity class', function () {
            var EntityRepository2 = /** @class */ (function (_super) {
                __extends(EntityRepository2, _super);
                function EntityRepository2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return EntityRepository2;
            }(BaseFirestoreRepository_1.BaseFirestoreRepository));
            var entityRepository2 = {
                entity: Entity,
                target: EntityRepository2,
            };
            metadataStorage.setRepository(entityRepository);
            expect(function () { return metadataStorage.setRepository(entityRepository2); }).toThrowError('Cannot register a custom repository twice with two different targets');
        });
        it('should throw when trying to store repositories that dont inherit from BaseRepository', function () {
            var EntityRepository2 = /** @class */ (function () {
                function EntityRepository2() {
                }
                return EntityRepository2;
            }());
            var Entity2 = /** @class */ (function () {
                function Entity2() {
                }
                return Entity2;
            }());
            var entityRepository2 = {
                entity: Entity2,
                target: EntityRepository2,
            };
            metadataStorage.setRepository(entityRepository);
            expect(function () { return metadataStorage.setRepository(entityRepository2); }).toThrowError('Cannot register a custom repository on a class that does not inherit from BaseFirestoreRepository');
        });
    });
});
//# sourceMappingURL=MetadataStorage.spec.js.map