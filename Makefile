createdb:
	yarn build-ts
	node dist/db/createTable.js
	
