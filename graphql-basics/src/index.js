import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
	type Query {
		title: String!
		price: Float!
		releaseYear: Int
		rating: Float
		inStock: Boolean!
	}
` 

// Resolvers
const resolvers = {
	Query: {
		title() {
			return 'Ilai the greatest dog alive'
		},
		price() {
			return 99.99
		},
		releaseYear() {
			return null
		},
		rating() {
			return 10.0
		},
		inStock() {
			return true
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