const router = require('express').Router();

const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'https://americancomposers.documents.azure.com:443/';
const key = 'KUkWogxJmmdUIHGl9B3QaCHU3100BO6H7Z6rdW0Daf6IGXWrUXXP6rZf7ZFZ5YSK14ZsqQoXjCctACDbcivASA==';
const databaseId = 'Forum';
const containerId = 'Users';


const cosmosClient = new CosmosClient({ endpoint, key });
const container = cosmosClient.database(databaseId).container(containerId);
const postContainer = cosmosClient.database(databaseId).container('Posts');
router.post('/update-profile/:id', async (req, res) => {
  try {
    const {id} = req.params
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.uid = @userID',
      parameters: [{ name: '@userID', value: id }]
    };

    const { resources: posts } = await container.items.query(querySpec).fetchAll();
    // Get the existing document from Cosmos DB
    const resource = posts[0]

    // Update the values if present, or create them if not present
    const updatedData = {
      ...resource,
      ...req.body
    };

    // Replace the existing document with the updated version
    await container.item(id).replace(updatedData);

    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('An error occurred while updating the profile.' + error);
  }
});


router.post('/create', async (req, res) => {
    try {
      const userData = JSON.parse(req.body)
      const { email } = userData;
      // Check if the email already exists in the Cosmos DB container
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.email = @email',
        parameters: [
          { name: '@email', value: email }
        ]
      };
  
      const { resources: matchingUsers } = await container.items.query(querySpec).fetchAll();
  
      if (matchingUsers.length > 0) {
        // Email already exists, return the matching user data
        const existingUser = matchingUsers[0];
        res.json(existingUser);
      } else {
        // Email does not exist, create a new user item
        const { resource: insertedUser } = await container.items.create(userData);
        res.json(insertedUser);
      }
    } catch (error) {
      console.error('Error inserting user data:', error);
      res.status(500).send('An error occurred while inserting the user data.');
    }
  });

  router.get('/get/:id', async (req, res) => {
    try {
      const {id} = req.params;
  
      // Define the query to fetch the specific user based on the email
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.uid = @id',
        parameters: [
          { name: '@id', value: id }
        ]
      };
  
      // Execute the query to retrieve the specific user
      const { resources: matchingUsers } = await container.items.query(querySpec).fetchAll();
  
      // Check if the matching user is found
      if (matchingUsers.length === 0) {
        return res.status(404).send('User not found.');
      }
  
      const user = matchingUsers[0];
      res.json(user);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).send('An error occurred while retrieving the user data.');
    }
  });
  router.get("/getUser", async (req, res) =>{
    console.log('here');
    const { resources: users } = await container.items.readAll().fetchAll();
    res.json(users);
  });
  router.delete('/delete/:id', async(req,res) =>{
    try {
   
      const id = req.params.id;
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [
          { name: '@id', value: id }
        ]
      };
      // Execute the query to retrieve the specific user
      const { resources: matchingUsers } = await container.items.query(querySpec).fetchAll();
      // console.log(matchingUsers);
      const uid = matchingUsers[0].uid;
      console.log('uid',uid);
      const querySpecForpost = {
        query: 'SELECT * FROM c WHERE c.userId = @userId',
        parameters: [{ name: '@userId', value: uid }]
      };
      const { resources: posts } = await postContainer.items.query(querySpecForpost).fetchAll();
      const numberOfPost = posts.length;
      for(let i=0;i<posts.length;i++){
        // console.log("postId",posts[i].id);
        postContainer.item(posts[i].id,posts[i].id).delete();
      }
      container.item(id,id).delete();
      res.status(200).json({ message: `user deleted successfully and ${numberOfPost} Associated Post also deleted` });
    } catch (error) {
      console.error('Error appending post:', error);
      res.status(500).send('An error occurred while appending the post.');
    }
  });
  router.post('/restrict/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.id = @userID',
        parameters: [{ name: '@userID', value: id }]
      };
  
      const { resources: users } = await container.items.query(querySpec).fetchAll();
      // Get the existing document from Cosmos DB
      const user = users[0]
      console.log('user',user);
      // Update the values if present, or create them if not present
      const updatedData = {
        ...user,
        'isRestricted': true,
      };
      console.log('updatedData',updatedData);
      // // Replace the existing document with the updated version
      await container.item(id).replace(updatedData);
  
      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('An error occurred while updating the profile.' + error);
    }
  });
  router.post('/unrestrict/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const querySpec = {
        query: 'SELECT * FROM c WHERE c.id = @userID',
        parameters: [{ name: '@userID', value: id }]
      };
  
      const { resources: users } = await container.items.query(querySpec).fetchAll();
      // Get the existing document from Cosmos DB
      const user = users[0]
      console.log('user',user);
      // Update the values if present, or create them if not present
      const updatedData = {
        ...user,
        'isRestricted': false,
      };
      console.log('updatedData',updatedData);
      // // Replace the existing document with the updated version
      await container.item(id).replace(updatedData);
  
      res.status(200).json(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('An error occurred while updating the profile.' + error);
    }
  });
  module.exports = router;