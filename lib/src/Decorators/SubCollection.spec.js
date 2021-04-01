"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var SubCollection_1 = require("./SubCollection");
var Collection_1 = require("./Collection");
var setCollection = jest.fn();
jest.mock('../MetadataUtils', function () { return ({
    getMetadataStorage: function () { return ({
        setCollection: setCollection,
    }); },
}); });
describe('SubCollectionDecorator', function () {
    beforeEach(function () {
        jest.resetAllMocks();
    });
    it('should register collections', function () {
        var SubEntity = /** @class */ (function () {
            function SubEntity() {
            }
            return SubEntity;
        }());
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            __decorate([
                SubCollection_1.SubCollection(SubEntity, 'subs'),
                __metadata("design:type", Object)
            ], Entity.prototype, "subentity", void 0);
            Entity = __decorate([
                Collection_1.Collection()
            ], Entity);
            return Entity;
        }());
        expect(setCollection).toHaveBeenCalledWith({
            name: 'subs',
            entityConstructor: SubEntity,
            parentEntityConstructor: Entity,
            propertyKey: 'subentity',
        });
    });
    it('should register collections with default name', function () {
        var SubEntity = /** @class */ (function () {
            function SubEntity() {
            }
            return SubEntity;
        }());
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            __decorate([
                SubCollection_1.SubCollection(SubEntity),
                __metadata("design:type", Object)
            ], Entity.prototype, "subentity", void 0);
            Entity = __decorate([
                Collection_1.Collection()
            ], Entity);
            return Entity;
        }());
        expect(setCollection).toHaveBeenCalledWith({
            name: 'SubEntities',
            entityConstructor: SubEntity,
            parentEntityConstructor: Entity,
            propertyKey: 'subentity',
        });
    });
});
//# sourceMappingURL=SubCollection.spec.js.map