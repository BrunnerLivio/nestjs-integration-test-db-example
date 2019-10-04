import * as fs from "fs"
import * as Path from "path"

import { DatabaseService } from "../database/database.service"
import { Injectable } from "@nestjs/common"

/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 *
 * This class is inspired by https://github.com/jgordor
 * https://github.com/nestjs/nest/issues/409#issuecomment-364639051
 */
@Injectable()
export class TestUtils {
  databaseService: DatabaseService

  /**
   * Creates an instance of TestUtils
   */
  constructor(databaseService: DatabaseService) {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("ERROR-TEST-UTILS-ONLY-FOR-TESTS")
    }
    this.databaseService = databaseService
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server) {
    await server.httpServer.close()
    await this.closeDbConnection()
  }

  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    const connection = await this.databaseService.connection
    if (connection.isConnected) {
      await (await this.databaseService.connection).close()
    }
  }

  /**
   * Returns the order id
   * @param entityName The entity name of which you want to have the order from
   */
  getOrder(entityName) {
    const order: string[] = JSON.parse(
      fs.readFileSync(Path.join(__dirname, "../test/fixtures/_order.json"), "utf8")
    )
    return order.indexOf(entityName)
  }

  /**
   * Returns the entites of the database
   */
  async getEntities() {
    const entities = []
    ;(await (await this.databaseService.connection).entityMetadatas).forEach(x =>
      entities.push({ name: x.name, tableName: x.tableName, order: this.getOrder(x.name) })
    )
    return entities
  }

  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures() {
    const entities = await this.getEntities()
    await this.cleanAll(entities)
    await this.loadAll(entities)
  }

  /**
   * Cleans all the entities
   */
  async cleanAll(entities) {
    try {
      for (const entity of entities.sort((a, b) => b.order - a.order)) {
        const repository = await this.databaseService.getRepository(entity.name)
        await repository.query(`DELETE FROM ${entity.tableName};`)
        // Reset IDs
        await repository.query(`DELETE FROM sqlite_sequence WHERE name='${entity.tableName}'`)
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`)
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities: any[]) {
    try {
      for (const entity of entities.sort((a, b) => a.order - b.order)) {
        const repository = await this.databaseService.getRepository(entity.name)
        const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`)
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, "utf8"))
          const result = await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute()
        }
      }
    } catch (error) {
      throw new Error(`ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`)
    }
  }
}
