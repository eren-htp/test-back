import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageUrlColumnType1720626000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE plant MODIFY COLUMN imageUrl TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE plant MODIFY COLUMN imageUrl VARCHAR(255)`);
    }
} 