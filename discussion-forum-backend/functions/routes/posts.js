const router = require('express').Router();

const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'https://americancomposers.documents.azure.com:443/';
const key = 'KUkWogxJmmdUIHGl9B3QaCHU3100BO6H7Z6rdW0Daf6IGXWrUXXP6rZf7ZFZ5YSK14ZsqQoXjCctACDbcivASA==';
const databaseId = 'Forum';
const containerId = 'Posts';


const cosmosClient = new CosmosClient({ endpoint, key });
const container = cosmosClient.database(databaseId).container(containerId);

router.get("/get-data/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Query Cosmos DB to retrieve the specific post by ID
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.id = @postId',
      parameters: [{ name: '@postId', value: postId }]
    };

    const { resources: posts } = await container.items.query(querySpec).fetchAll();

    if (posts.length === 1) {
      return res.status(200).json(posts[0]);
    } else {
      return res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error retrieving post:', error);
    return res.status(500).send('An error occurred while retrieving the post.');
  }
})

// router.post("/add-like/:id", async (req, res) => {
//   const { userId } = req.body;
//   const { id } = req.params
//   try {
//     const updatedDocument = await updateDocument(id, userId);
//     res.status(200).json({ message: "User ID added to likedBy array.", document: updatedDocument });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update document." });
//   }
// })
router.post("/add-like/:id", async (req, res) => {
  const data = JSON.parse(req.body)
  const { id } = req.params
  const {userId} = data
  try {
    const updatedDocument = await updateDocument(id, userId);
    res.status(200).json({ message: "User ID added to likedBy array.", document: updatedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update document." });
  }
})

router.delete('/remove-like/:postId', async (req, res) => {
  const postId = req.params.postId;
  const data = JSON.parse(req.body)
  const {valueToRemove} = data;

  try {
    console.log(valueToRemove)
    // Fetch the post from Cosmos DB
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.id = @postId',
      parameters: [{ name: '@postId', value: postId }]
    };

    const { resources: posts } = await container.items.query(querySpec).fetchAll();
    const post = posts[0]
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const likedByArray = post.likedBy;
    console.log(valueToRemove)
    const index = likedByArray.indexOf(valueToRemove);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Value not found in likedBy array' });
    }

    likedByArray.splice(index, 1);

    // Update the post in Cosmos DB
    await container.item(postId).replace(post);

    return res.json({ message: 'Value removed from likedBy array' });
  } catch (error) {
    console.error('Error removing value from likedBy array:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//

async function updateDocument(postId, userId) {
  // Retrieve the document from Cosmos DB
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.id = @postId',
    parameters: [{ name: '@postId', value: postId }]
  };
  const { resources } = await container.items.query(querySpec).fetchAll();
  const doc = resources[0]
  // Update the document in Cosmos DB
  const updatedData = { ...doc, likedBy: [...doc.likedBy, userId] };
  container.item(postId).replace(updatedData)
  return updatedData;
}
async function updateDocument2(postId, comment) {
  console.log(comment)
  // Retrieve the document from Cosmos DB
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.id = @postId',
    parameters: [{ name: '@postId', value: postId }]
  };

  const { resources } = await container.items.query(querySpec).fetchAll();
  const doc = resources[0]
  // Update the document in Cosmos DB
  const updatedData = { ...doc, comments: [...doc.comments, comment] };
  container.item(postId).replace(updatedData)
  return updatedData;
}


router.post('/create-thread/:id', async (req, res) => {
  try {
    // console.log(req.body)
    const data = JSON.parse(req.body)
    // console.log(data)
    const { id } = req.params;
    const updatedData = await updateDocument2(id,data);

    // res.status(201).json(updatedData);
  } catch (error) {
    console.error('Error appending post:', error);
    res.status(500).send('An error occurred while appending the post.');
  }
});


router.get('/get-data', async (req, res) => {
  try {
    // Check the sorting option from the query parameters
    const { sortBy } = req.query;
    // Query to fetch all items from the Cosmos DB container
    const querySpec = {
      query: 'SELECT * FROM c'
    };
    
    // Execute the query to retrieve all posts
    const { resources: posts } = await container.items.query(querySpec).fetchAll();
    // sort according to the query
    if (sortBy === 'comments') {
      posts.sort((a, b) => b.comments.length - a.comments.length);
    } else if (sortBy === 'likes') {
      posts.sort((a, b) => b.likedBy.length - a.likedBy.length);
    } else if (sortBy === 'newestFirst') { //Tatz
      posts.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('An error occurred while fetching the posts.');
  }
});

router.post('/create', async (req, res) => {
  try {
    // const { title, content,parent,userId } = req.body;
    const data = JSON.parse(req.body)
    const item = {
      // title,
      // content,
      // userId,
      ...data,
      createdDate: new Date().toISOString(),
      threadPosts: []
    };

    // Create the item in the Cosmos DB container
    const { resource: createdItem } = await container.items.create(item);

    res.status(201).json(createdItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).send('An error occurred while creating the item.');
  }
});

module.exports = router;