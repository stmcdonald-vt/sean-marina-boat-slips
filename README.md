# Sean's Marina - Boat Slip API
This API is used to monitor boat slips at Sean's Marina. They are a quickly growing startup that is hoping to acquire new boat-slips in the future!

## Tech Stack

### OpenAPI Docs
As a quick reference for myself and to make the project easier to work with a team, I created an OpenAPI document.

### TypeScript
I chose to use Typescript for this project as the strongly typed nature makes it a good choice for working with teams. While it takes a bit more thought up-front, it can significantly reduce human error. 

### Express.js
I chose Express as the Node.js framework to build my API because it's not too difficult to work with and finding documentation is easy due to it's popularity.

### Mocha + Chai
I chose Mocha and Chai as my testing and assertion libraries because they are both popular and I am personally familiar with using them.

### DynamoDB
I chose to use DynamoDB to track the boat slips during and after each API call. With only 3 boat slips currently monitored by the API, it will most likely fall within the AWS free-tier and cost very little. As Sean's Marina expands it's fleet of boat-slips, the database very easily scales along with it!

I also considered using MongoDB Atlas, which has both free and serverless options that are also affordable. I ultimately went with DynamoDB as it seems to have more flexibility in configuration. 

### AWS SDK
To establish connections to the database table, I went with the AWS SDK's DynamoDB Client. It was a little tricky at first to figure out their way of indicating data types using letters codes, but I was able to create and utilize a factory with a fromAWSItem() method to make life easier!

## Design

### DynamoDB
I decided to create two separate database tables, one for production and one for testing. By have a separate database table, I can populate the test table before each of my tests without impacting the production table.

When selecting a primary key for my data, I decided to stick with slipNumber as my partition key and opted out of a sort key. I did this so that I would have the option to create sparse global secondary indexes for both vesselName and vacated properties. Unfortunately, because I needed strongly consistent reads prior to writing back to the table, I didn't get to leverage those indexes for my routes. However, it does allow for flexibility in future expansion.

### Routes + Controllers
I chose to maintain all logic that involves actually handling requests and responses in the route and extract the application logic into the controllers. This was helpful as it makes the routes easier to read and makes the controllers usable from wherever they're needed (i.e. tests and seeding data).

Additionally, having a controller dedicated to interacting with DynamoDB was very nice to have. All of my other controllers were able to easily 

### Tests all in one file?
While I would have preferred to separate out my tests into individual files, I found it was outputting feedback in a strange format and test results were very inconsistent from run to run. I didn't have enough time to investigate too much, but that would definitely would be something to look into when expanding on this project.