import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTags1744975407036 implements MigrationInterface {
    name = 'RemoveTags1744975407036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "goals" DROP COLUMN "tags"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "goals" ADD "tags" text');
    }

}
