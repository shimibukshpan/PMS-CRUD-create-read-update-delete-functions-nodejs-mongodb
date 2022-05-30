async function main(){
    const MongoClient = require("mongodb").MongoClient;
    let uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    
    try{
        await client.connect();

        await getDataBasesList(client);

        await insertData(client,10,"projsect number 10","tel Aviv", "shimi bukshpan");

        await addErrorToProject(client, "projB", "errorrrrrrr");

        await changeParameterInProjectsType(client,"jerusalem");
        
        await removeErrorById(client);

        console.log("im connected!!");
    }catch(e){
        console.log("error" + e);
    }finally{
        client.close();
        console.log("im closed!");
    }
};
//get the data basess list
async function getDataBasesList(client){
    const list = await client.db().admin().listDatabases();
    list.databases.forEach(db => {
        console.log(db.name);
    });
};

//insert new object
async function insertData(client, projNum, projName, projWork, projFaunder){
    let mydataobj = {
        "project_number" : projNum,
        "project_name":projName,
        "project_work":projWork,
        "project_faunder":projFaunder
    };
    const result = await client.db("PMS")
    .collection("projecs")
    .insertOne(mydataobj);
    console.log(result);
};

//add errors to document in database
async function addErrorToProject(client, findproj, error){
    const setError = await client.db("PMS")
    .collection("projecs")
    .updateOne({"projectName":findproj},{$set:{"Error":error}});
    console.log(setError);
};

// change parameter in a database document
let parameters = "ber sheva";
async function changeParameterInProjectsType(client, oldprop){
    const setError = await client.db("PMS")
    .collection("TypeOfProjects")
    .updateOne({"project.workplase":oldprop},{$set:{"project.workplase":parameters}});
    console.log(setError);
};

// remove a error form a document by the id of the document
async function removeErrorById(client){
    let mongodb = require('mongodb');
    const removeError = await client.db("PMS")
    .collection("errors")
    .deleteOne({_id: mongodb.ObjectID('62949ce411f73bed49866688')});
    console.log(removeError);
};

main();