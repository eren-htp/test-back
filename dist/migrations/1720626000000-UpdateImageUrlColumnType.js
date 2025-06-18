"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateImageUrlColumnType1720626000000 = void 0;
class UpdateImageUrlColumnType1720626000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE plant MODIFY COLUMN imageUrl TEXT`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE plant MODIFY COLUMN imageUrl VARCHAR(255)`);
    }
}
exports.UpdateImageUrlColumnType1720626000000 = UpdateImageUrlColumnType1720626000000;
//# sourceMappingURL=1720626000000-UpdateImageUrlColumnType.js.map