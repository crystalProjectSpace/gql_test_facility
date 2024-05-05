'use strict'

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
} = require('graphql')

const DUMMY_DATA = [
	{ id: 1, name: 'test_object_A' },
	{ id: 2, name: 'test_object_B' },
	{ id: 3, name: 'test_object_C' },
	{ id: 4, name: 'test_object_D' },
]

const testEntity = new GraphQLObjectType({
	name: 'TestEntity',
	fields: {
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
	}
})

const testEntityList = new GraphQLList(testEntity)

/*const query = new GraphQLObjectType({
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
})*/
// test query fetch from a liist of entities
const query_2 = new GraphQLObjectType({
	name: 'TestEntityList',
	fields: {
		entities: {
			type: testEntityList,
			args: {
				id: { type: GraphQLInt },
				text: { type: GraphQLString },
			},
			resolve: (_, args) => {
				const { id, text } = args
				if (id >= 0) {
					return [DUMMY_DATA.find(d => d.id === id)]
				}
	
				if (text) {
					return DUMMY_DATA.filter(d => d.name.includes(text))
				}
	
				return [DUMMY_DATA[0]]
			}
		},
	}
})

const testSchema = new GraphQLSchema({ query: query_2 })

module.exports = { testSchema }