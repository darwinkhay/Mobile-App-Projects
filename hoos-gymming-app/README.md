In order to access our cloud service (AWS Amplify), the following steps must be taken:
- Send bs6sxv@virginia.edu your email to request access. Log in with credentials given in email (one invitation has already been sent to sherriff@virginia.edu)
- Download aws cli with **npm install -g @aws-amplify/cli**
- Pull down our database to your local machine **amplify pull --appId dybtek6zmxecp --envName staging**.
- Select Visual Studio Code, Javascript, React-Native, etc. When it asks if you want the files in src, just keep pressing enter.
- Once completed, make sure a aws-exports.js file was generated under src/. If it's in another location, move it under the src folder. 
- You should now be able to run expo after npm install. Contact bs6sxv@virginia.edu or dkk8es@virginia.edu if you encounter any problems.
