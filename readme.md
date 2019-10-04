# Example for NestJS Database Integration Testing

This repository is a quick example, on how to 
setup a database for each test scenario.

## Fixtures

In the folder `src/test/fixtures` are JSON files which will be used as test data.
The file `src/test/fixtures/_order.json` defines in which order the entites should be inserted.
This is made, to create relations between entities. 

To clarify: The TeacherUser has the foreign key `user` and `teacher`. In order to insert
the TeacherUser, the `test.utils.ts`-Component needs to know the order of the entities. Because
TeacherUser can not be inserted, without an User or Teacher entity. 

## Install

```
npm install
```

## Run

```
npm test
```
