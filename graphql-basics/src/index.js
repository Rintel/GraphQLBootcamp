import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

//Demo user data 
const users = [{
	id: '1',
	name: 'Cedric',
	email: 'cedric@example.com',
	age: 28,
}, {
	id: '2',
	name: 'Sarah',
	email: 'sarah@example.com'
}, {
	id: '3',
	name: 'Marcin',
	email: 'marcin@example.com'
}]

//Demo post data
const posts = [{
	id: '1',
	title: 'The holy bible',
	body: 'God stuff' ,
	published: true,
	author: '1'
}, {
	id: '2',
	title: 'Die Kunst des Kämpfens',
	body: 'Fighting stuff' ,
	published: false,
	author: '1'
}, {
	id: '3',
	title: 'Die Kunst des Verlierens',
	body: 'Losing stuff' ,
	published: true,
	author: '2'
}]

const comments = [{
	id: '1',
	text: 'This is really great!',
	author: '2'
}, {
	id: '2',
	text: 'Why so serious?',
	author: '1'
}, {
	id: '3',
	text: 'xD xD xD LOL',
	author: '3'
}]

// Type definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]! 
		posts(query: String): [Post!]!
		comments(query:String): [Comment!]!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
	}

	type Comment {
		id: ID!
		text: String!
		author: User!
	}
` 

// Resolvers
const resolvers = {
	Query: {
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users
			}

			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		posts(parent, args, ctx, info) {
			if(!args.query) {
				return posts
			}
			
			return posts.filter((post => {
				return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
			}))
		},
		comments(parent, args, ctx, info) {
			return comments
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => {
				return post.author === parent.id
			})
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.author === parent.id
			})
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		}
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
}); 

server.start(()=> {
	console.log('The server is up!');
})