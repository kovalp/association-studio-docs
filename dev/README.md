---
title: "Developer's README. I exclude this to avoid confusion."
layout: default
nav_exclude: true
search_exclude: true
---

## Local deploy of Jekyll server

Install Ruby

```shell
sudo apt-get install ruby-full build-essential
```

Install Jekyll (Ruby packages)

```shell
bundle install
```

Start Jekyll server locally

```shell
bundle exec jekyll serve
```

View in your browser at http://127.0.0.1:4000, change .md and .html files and reload pages in the browser.


## Test the notebooks


```shell
uv run pytest --nbmake examples/
```

or 

```shell
uv run pytest examples/ex001_start.ipynb --nb-test-files
```

