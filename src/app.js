const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {
  // TODO

  const uniqueId = uuid(); 
  repositories.push({ 
    id: uniqueId, 
    title: request.body.title, 
    url: request.body.url, 
    techs: request.body.techs, 
    likes: 0 
  })

  const repositoryIndex = repositories.findIndex( repository => repository.id === uniqueId);
  
  response.status(200).json(repositories[repositoryIndex])


});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;
  const {title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(repositoryIndex < 0){

    response.status(400).json({error: 'ID not found'})
  }

  repositories[repositoryIndex] = {
    id,
    title,
    url,
    techs,
    likes : repositories[repositoryIndex].likes
  }

  response.status(200).json(repositories[repositoryIndex])

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

    if(repositoryIndex < 0){
        return response.status(400).json({error: 'Repository not found'})
    }

    // deleta um array pela sua posicao
    repositories.splice(repositoryIndex,1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if(repositoryIndex < 0){
      return response.status(400).json({error: 'Repository not found'})
  }

  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes += 1;

  return response.status(200).json(repositories[repositoryIndex])

});

module.exports = app;
