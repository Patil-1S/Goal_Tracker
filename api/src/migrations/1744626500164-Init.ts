import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744626500164 implements MigrationInterface {
  name = 'Init1744626500164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."goal_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),"createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" character varying, "status" "public"."goal_status_enum" NOT NULL DEFAULT 'PENDING', "progress" integer NOT NULL DEFAULT '0', "deadline" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),"name" character varying NOT NULL,"email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_40bd308ea814964cec7146c6dce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "goals" DROP CONSTRAINT "FK_40bd308ea814964cec7146c6dce"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "goals"`);
    await queryRunner.query(`DROP TYPE "public"."goal_status_enum"`);
  }
}
