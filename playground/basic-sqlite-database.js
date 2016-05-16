var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	desciption: {
		type: Sequelize.STRING,
		allowNull: false,
		validate:{
			len: [1,255]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced');

	Todo.findAll({
		where:{
			id:2
		}
	}).then(function(todos){
		if(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
			
		}else{
			console.log('todo not found');
		}
		
	}).catch(function(e){
		console.log(e);
	});

	// Todo.create({
	// 	desciption: 'take out trash'
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		desciption: 'clean office'
	// 	});
	// }).then(function(){
	// 	// return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where:{
	// 			desciption: {
	// 				$like: '%office%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if(todos){
	// 		todos.forEach(function(todo){
	// 			console.log(todo.toJSON());
	// 		});
			
	// 	}else{
	// 		console.log('no todos found');
	// 	}
	// }).catch(function(e){
	// 	console.log(e);
	// });
});