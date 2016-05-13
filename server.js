var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;


app.use(bodyParser.json());
//GET /todos


app.get('/todos',function(req,res){
	
		res.json(todos);
	
})

//GET /todos/:id
app.get('/todos/:id',function(req,res){

	var todoId = parseInt(req.params.id,10);
	
	var matchedTodo = _.findWhere(todos,{id: todoId});

	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
	
})

app.post('/todos',function(req,res){
	var body = _.pick(req.body,'description','completed');
	
	if(!_.isBoolean(body.completed)  || !_.isString(body.description) || body.description.trim().length === 0)
	{	
		return res.status(400).send();
	}

	body.id = todoNextId++;

	body.description = body.description.trim();
	
	todos.push(body);

	console.log('description ' + body.description);

	res.json(body); 
});

app.delete('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	
	var matchedTodo = _.findWhere(todos,{id: todoId});

	if(!matchedTodo){
		return res.status(404).json('no todo item found for this id');
	}

	var updatedTodos = _.without(todos,matchedTodo);

	todos = updatedTodos;

	res.json(matchedTodo);
});

app.put('/todos/:id',function(req,res){
	var body = _.pick(req.body,'description','completed');
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	var validAttributes = {};


	if(!matchedTodo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}else if(body.hasOwnPropery('completed')){
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description;
	}else if(body.hasOwnPropery('description')){
		return res.status(400).send();
	}

	
	 _.extend(matchedTodo,validAttributes);

	 res.json(matchedTodo);

});

app.listen(PORT,function(){
	console.log('Express listening on PORT ' + PORT);
});