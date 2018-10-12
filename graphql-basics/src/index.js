import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

//Demo user data 
const users = [{
	id: 1,
	name: 'Cedric',
	email: 'cedric@example.com',
	age: 28
}, {
	id: 2,
	name: 'Sarah',
	email: 'sarah@example.com'
}, {
	id: 3,
	name: 'Marcin',
	email: 'marcin@example.com'
}]

const posts = [{
	id: '1',
	title: 'title a',
	body: 'body a' ,
	published: true
}, {
	id: '2',
	title: 'title b',
	body: 'body b' ,
	published: false
}, {
	id: '3',
	title: 'title c',
	body: 'body c' ,
	published: true
}]

// Type definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]! 
		posts(posts: String): [Post!]!
		greeting(name: String, position: String): String!
		add(numbers: [Float!]!): Float!
		grades: [Int]!
		sven: User! 
		post: Post!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
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
			return posts
		},
		greeting(parent, args, ctx, info) {
			if (args.name && args.position) {
				return `Hello ${args.name}! You are my favourite ${args.position}.`	
			} else {
				return 'Hello!'
			}
		},
		add(parent, args, ctx, info) {
			if(args.numbers.length === 0) {
				return 0
			}

			return args.numbers.reduce((acc, curr)=> {
				return acc + curr
			})			
		},
		grades(parent, args, ctx, info) {
			return [99, 80, 93]
		},
		sven() {
			return {
				//that's the place where you can perfom db actions, atm still hard coded :P
				id: 'abc123',
				name: 'Sven',
				email: 'sven@example.com',
				age: 26
			}
		},
		post() {
			return {
				id: 'cba321',
				title: 'Cedrics GraphQL Workshop',
				body: 'Fuck me, that is awesome!',
				published: true
			}
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