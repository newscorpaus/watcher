createdb:
	yarn build-ts
	node dist/db/createTable.js

# perms:
# 	aws lambda add-permission \
# 		--function-name watcher \
# 		--region ap-southeast-2 \
# 		--statement-id dcs123 \
# 		--action "lambda:InvokeFunction" \
# 		--principal s3.amazonaws.com \
# 		--source-arn arn:aws:s3:::dcs-events-test \
# 		--source-account 787828630462 \
# 		--profile Digital:DEV:TCOGAdminsRole

# db:
# 	aws rds create-db-instance \
# 		--db-instance-identifier watcher-development2 \
# 		--allocated-storage 20 \
# 		--db-instance-class db.t2.small \
# 		--engine postgres \
# 		--master-username dcsadmin \
# 		--master-user-password dcsy3s123 \
# 		--tags Key=Bu,Value="News Digital Media",Key=Product,Value=DCS,Key=Service,Value=Watcher \
# 		--profile Digital:DEV:TCOGAdminsRole

