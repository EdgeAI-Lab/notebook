git pull
git add .
git commit -m "update"
git push origin master
mkdocs build
mkdocs gh-deploy
