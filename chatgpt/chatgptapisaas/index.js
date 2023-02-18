// an express server which will handle the requests from the client and send the response back to the client

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-6b1b3d9e-1f5e-4b0f-9b1a-6b1b3d9e1f5e",
    apiKey: "sk-6b1b3d9e-1f5e-4b0f-9b1a-6b1b3d9e1f5e"
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    res.json({
        message: "Hello World!"
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
