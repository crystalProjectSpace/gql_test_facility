'use strict'

const http = require('http')
const { createHandler } = require('graphql-http/lib/use/http')
const { testSchema } = require('./test_schema')

const GQL_ENDPOINT = 'graphql'
const UTF8 = 'utf8'
const SUCCESS = 200
const DEFAULT_PORT = 3000

const gqlHandler = createHandler({schema: testSchema })


const DUMMY_CONTENT = '<html><head><title>TEST GQL</title><meta charset="utf-8"/></head><body><div>THIS IS A TEST RESPONSE</div></body></html>'


const testHandler = function(request, response) {
	console.log('request being processed')
	const { url, method } = request
	const isGQL = url.split('/').pop() === GQL_ENDPOINT
	
	if (isGQL) {
		gqlHandler(request, response)
	} else {
		response.writeHead(SUCCESS, { 'Content-Type': 'text/html' })
		response.end(DUMMY_CONTENT)
	}
}

const testServer = http.createServer(testHandler)
testServer.listen(DEFAULT_PORT)
console.log(`sandbox started on port: ${DEFAULT_PORT}`)