import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTaskEntity1744971848606 implements MigrationInterface {
  name = 'AddTaskEntity1744971848606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
      "deletedAt" TIMESTAMP, 
      "task_title" character varying NOT NULL, 
      "completed" boolean NOT NULL DEFAULT false,
     "goalId" uuid,
    CONSTRAINT "PK_task_id" PRIMARY KEY ("id"),
    CONSTRAINT "FK_task_goal" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_task_goal"`,
    );
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
