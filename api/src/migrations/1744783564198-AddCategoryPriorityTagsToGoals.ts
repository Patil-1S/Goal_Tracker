import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryPriorityTagsToGoals1744783564198
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "goals"
            ADD "category" VARCHAR NOT NULL DEFAULT 'PERSONAL'
        `);
    await queryRunner.query(`
            ALTER TABLE "goals"
            ADD "priority" VARCHAR NOT NULL DEFAULT 'MEDIUM'
        `);
    await queryRunner.query(`
            ALTER TABLE "goals"
            ADD "tags" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "goals" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "goals" DROP COLUMN "priority"`);
    await queryRunner.query(`ALTER TABLE "goals" DROP COLUMN "category"`);
  }
}
