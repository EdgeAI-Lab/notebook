e:
cd MyNotebook
@echo pulling ...
git pull
@echo pull done
@echo add all change into repositories
git add .
@echo add done
@echo commit all change
git commit -m "update"
@echo commit done
@echo push it to remote repositories
git push origin master
@echo push done
@echo convert markdown files to html files
mkdocs build
@echo convert done
@echo deploying ...
mkdocs gh-deploy
@echo deploy done