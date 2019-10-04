import { Connection } from "typeorm"

import { TestUtils } from "../test/test.utils"
import { Test } from "@nestjs/testing"

import * as Fs from "fs"
import * as Path from "path"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DatabaseService } from "../database/database.service"
import { DatabaseModule } from "../database/database.module"
import { UserRepository } from "./user.repository"

describe("UserRepository", () => {
  let userRepository: UserRepository
  let testUtils: TestUtils
  beforeEach(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils]
    }).compile()
    testUtils = module.get<TestUtils>(TestUtils)
    await testUtils.reloadFixtures()
    userRepository = testUtils.databaseService.connection.getCustomRepository(UserRepository)

    done()
  })

  afterEach(async done => {
    await testUtils.closeDbConnection()
    done()
  })

  describe("findAll", () => {
    it("should return all users", async done => {
      const [data, total] = await userRepository.findAll()
      expect(total).toBe(1)
      expect(data.length).toEqual(1)
      expect(data[0].name).toBe("Peter")
      done()
    })
  })
})
