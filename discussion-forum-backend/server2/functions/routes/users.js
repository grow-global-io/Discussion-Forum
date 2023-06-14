const router = require('express').Router();

const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'https://americancomposers.documents.azure.com:443/';
const key = 'KUkWogxJmmdUIHGl9B3QaCHU3100BO6H7Z6rdW0Daf6IGXWrUXXP6rZf7ZFZ5YSK14ZsqQoXjCctACDbcivASA==';
const databaseId = 'Forum';
const containerId = 'Users';


const cosmosClient = new CosmosClient({ endpoint, key });
const container = cosmosClient.database(databaseId).container(containerId);


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
module.exports = router;