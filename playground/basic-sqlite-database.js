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
});

var User = sequelize.define('user',{
	email:{
		type: Sequelize.STRING
	}
}); 

Todo.belongsTo(User);

User.hasMany(Todo);

sequelize.sync().then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function(user){
		user.getTodos({
			where:{
				completed: true
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				
					console.log(todo.toJSON());
				
			})
		})
	})
	
	// User.create({
	// 	email: 'sachin@gmail.com'
	// }).then(function(){
	// 	return Todo.create({
	// 		desciption: "Clean Yard"
	// 	})
	// }).then(function(todo){
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo);
	// 	});
	// });


});