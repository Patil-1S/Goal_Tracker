import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1728384344780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar not null',
          },
          {
            name: 'mobile',
            type: 'varchar not null',
          },
          {
            name: 'gender',
            type: 'varchar not null',
          },
          {
            name: 'country',
            type: 'varchar not null',
          },
          {
            name: 'hobbies',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar not null unique',
          },
          {
            name: 'password',
            type: 'varchar not null',
          },
          {
            name: 'createdAt',
            type: 'timestamp not null',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp not null',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'timestamp not null',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
