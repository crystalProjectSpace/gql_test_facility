'use strict'

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const DUMMY_DATA = [
	{ id: 1, name: 'test_object_A' },
	{ id: 2, name: 'test_object_B' },
]

const testEntity = new GraphQLObjectType({
	name: 'TestEntity',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}
})

const query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		entity: {
			type: testEntity,
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (_, args) => {
				console.log('resolve function used')
				return DUMMY_DATA.find(d => d.id === args.id)
			},
		}
	},
})

const testSchema = new GraphQLSchema({ query })

module.exports = { testSchema }