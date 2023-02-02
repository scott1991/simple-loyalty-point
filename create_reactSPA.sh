#!/bin/bash
PROJECT=spa_src
npx create-react-app $PROJECT --skip-git
rm -rf ./$PROJECT/.git
printf 'PORT=3001\nBUILD_PATH=../spa\n' > ./$PROJECT/.env.development
node -e 'let pj = JSON.parse(fs.readFileSync(process.argv[1]));pj["proxy"]="http://localhost:3000";fs.writeFileSync(process.argv[1],JSON.stringify(pj,null,2));' "./$PROJECT/package.json"

