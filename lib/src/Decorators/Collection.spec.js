"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var setCollection = jest.fn();
jest.mock('../MetadataUtils', function () { return ({
    getMetadataStorage: function () { return ({
        setCollection: setCollection,
    }); },
}); });
describe('CollectionDecorator', function () {
    beforeEach(function () {
        jest.resetAllMocks();
    });
    it('should register collections', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            Entity = __decorate([
                Collection_1.Collection('foo')
            ], Entity);
            return Entity;
        }());
        expect(setCollection).toHaveBeenCalledWith({
            name: 'foo',
            entityConstructor: Entity,
        });
    });
    it('should register collections with default name', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            Entity = __decorate([
                Collection_1.Collection()
            ], Entity);
            return Entity;
        }());
        expect(setCollection).toHaveBeenCalledWith({
            name: 'Entities',
            entityConstructor: Entity,
        });
    });
});
//# sourceMappingURL=Collection.spec.js.map