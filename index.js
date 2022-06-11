// const { MongoClient } = require("mongodb");
console.log("hey");
async function main() {
  const MongoClient = require("mongodb").MongoClient;
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    // await addProject(
    //   client,
    //   "Landing Page",
    //   "Avi",
    //   "Orel",
    //   "HTml",
    //   "Css",
    //   "react",
    //   "123456"
    // );

    // await addProject(
    //   client,
    //   "GameApp",
    //   "Tamar",
    //   "Yossi",
    //   "C++",
    //   "C",
    //   null,
    //   "num"
    // );
    // await addProject(
    //   client,
    //   "ProfilesServer",
    //   "Itamar",
    //   "Gal",
    //   "Node.js",
    //   "JavaScript",
    //   "Php",
    //   "num"
    // );

    // await insertProjectType(
    //   client,
    //   "X-Company",
    //   "sunday/Wednesday-office",
    //   "Monday/Tusday/Thursday-Home",
    //   "Doron",
    //   "Shimi",
    //   "Avi"
    // );

    // await insertProjectType(
    //   client,
    //   "Y-Company",
    //   "sunday/Wednesday-office",
    //   "Monday/Tusday/Thursday-Home",
    //   "Tomer",
    //   "Ben",
    //   "Elihiyu"
    // );

    // await insertProjectType(
    //   client,
    //   "Students FInall Project",
    //   "sunday-Wednesday-office",
    //   "Thursday-Home",
    //   "Regev",
    //   "Tal",
    //   "Adi"
    // );

    // await InsertError(client, "403", "66-68", "72-89", "4", "7", "12", "id");
    // await InsertError(client, "404", "52-60", "72-89", "59", "64", "66", "id");
    // await InsertError(client, "403", "22-23", "99-101", "16", "20", "id");

    // await addProjectToError(client, "id", "objectId(629f84ab10add99a8c651fc4)");
    // await addProjectToError(client, "id", "objectId(629f84ab10add99a8c651fc5)");
    // await addProjectToError(
    //   client,
    //   "629f84ab10add99a8c651fc6)",
    //   "objectId629f84ab10add99a8c651fc6)"
    // );

    // await typeToProject(client, "num", "objectId(629f8564e451e32ad430f11f)");
    // await typeToProject(
    //   client,
    //   "objectId(629f8564e451e32ad430f11f)",
    //   "objectId(629f8564e451e32ad430f120)"
    // );
    // await typeToProject(client, "num", "objectId(629f8564e451e32ad430f121)");
  } catch (error) {
    console.log("there was an error!" + error);
  } finally {
    client.close();
    console.log("the connection was close");
  }
}

async function listOfDataBase(client) {
  const databaseList = await client.db().admin().listDatabases();

  databaseList.databases.forEach((db) => {
    console.log("DB Name:" + db.name);
  });
}

async function addProject(
  client,
  projectName,
  leader0,
  leader1,
  ProgrammingLang0,
  ProgrammingLang1,
  ProgrammingLang2,
  ProjectTypeNum
) {
  let project = {
    name: projectName,
    leaders: [leader0, leader1],
    ProgrammingLang: [ProgrammingLang0, ProgrammingLang1, ProgrammingLang2],
    typeProject: ProjectTypeNum,
  };
  const result = await client
    .db("Customers")
    .collection("projects")
    .insertOne(project);
}

async function insertProjectType(
  client,
  projectType,
  location0,
  location1,
  programer0,
  programer1,
  programer2
) {
  let TpeOfProject = {
    name: projectType,
    Location: [location0, location1],
    Team: [programer0, programer1, programer2],
  };
  const result = await client
    .db("Customers")
    .collection("projectType")
    .insertOne(TpeOfProject);
}

async function InsertError(
  client,
  ErrorType,

  If1line0,
  If1line1,

  If2line0,
  If2line1,
  If2line2,
  projetid
) {
  let Errors = {
    type: ErrorType,
    mainFile: [If1line0, If1line1],
    mainFunction: [If2line0, If2line1, If2line2],
    projectId: projetid,
  };
  const result = await client
    .db("Customers")
    .collection("Error")
    .insertOne(Errors);
}

async function addProjectToError(client, projectName, error) {
  const setError = await client
    .db("Customers")
    .collection("projects")
    .updateOne({ name: projectName }, { $set: { ErrorId: error } });
  console.log(setError);
}

async function AddErrorToProject(client, findpError, error) {
  const setError = await client
    .db("Customers")
    .collection("Error")
    .updateOne({ projectId: findpError }, { $set: { projectId: error } });
  console.log(setError);
}

async function typeToProject(client, typeProject, error) {
  const setError = await client
    .db("Customers")
    .collection("projects")
    .updateOne({ typeProject: typeProject }, { $set: { typeProject: error } });
  console.log(setError);
}

main();
