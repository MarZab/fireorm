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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomRepository_1 = require("./CustomRepository");
var BaseFirestoreRepository_1 = require("../BaseFirestoreRepository");
var setRepository = jest.fn();
jest.mock('../MetadataUtils', function () { return ({
    getMetadataStorage: function () { return ({
        setRepository: setRepository,
    }); },
}); });
describe('CustomRepositoryDecorator', function () {
    beforeEach(function () {
        setRepository.mockReset();
    });
    it('should call metadataStorage.setRepository with right params', function () {
        var Entity = /** @class */ (function () {
            function Entity() {
            }
            return Entity;
        }());
        var EntityRepo = /** @class */ (function (_super) {
            __extends(EntityRepo, _super);
            function EntityRepo() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EntityRepo = __decorate([
                CustomRepository_1.CustomRepository(Entity)
            ], EntityRepo);
            return EntityRepo;
        }(BaseFirestoreRepository_1.BaseFirestoreRepository));
        expect(setRepository).toHaveBeenCalledWith({
            entity: Entity,
            target: EntityRepo,
        });
    });
});
//# sourceMappingURL=CustomRepository.spec.js.map