---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Getting started
description: Get the project up and running

# Author box
author:
    title: About Author
    title_url: '#'
    external_url: true
    description: Author description

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Previous page
        url: '#'
    next:
        content: Next page
        url: '#'
---

## Local setup

```bash
# Start database
$ docker-compose up

# Update env
$ echo DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestjs?schema=public" > .env.local
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```