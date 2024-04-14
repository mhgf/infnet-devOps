import { MigrationInterface, QueryRunner } from "typeorm";

export class Relations1712523366128 implements MigrationInterface {
    name = 'Relations1712523366128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "deleted_at" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "user_id" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "user_id" TO "deleted_at"`);
    }

}
