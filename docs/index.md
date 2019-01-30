# Wiki Create Guide

## Use Notepad++(Optional)
* [Notepad++ Download](https://notepad-plus-plus.org/download)
* [Explorer Plug](https://github.com/funap/npp-explorer-plugin/releases)

## Install MKDocs
* [MKDocs Office Website](https://www.mkdocs.org)
* [Material Theme Office Website](https://squidfunk.github.io/mkdocs-material)
* Config your site, and add your notebooks

* Now your site looks like this:

![mkdocs_site](assets/images/mkdocs_site.png)


## Host Your Site To Github
* Create a new repository. Example: https://github.com/user_name/repository_name
* Initialize your local git repository, and add remote github repository, and push it

```bash
cd your_site_path
git init
git add remote https://github.com/user_name/repository_name
git add .
git commit -m "first commit"
git push origin master
```
* Deploy your site

```bash
mkdocs gh-deploy
```

## Put you site on the github pages
* Create a new github repository
* Push your site to the github repository
* Set the github pages "Settings->GitHub Pages->source->master branch"

!!! success
    It is OK.

