# c0d3.com

![CI](https://github.com/garageScript/c0d3.com/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/garageScript/c0d3-app/branch/master/graph/badge.svg)](https://codecov.io/gh/garageScript/c0d3-app)

Repo for c0d3.com powered by NextJS. A website to train people to be full stack software engineers.

## Prerequisites

- Node.JS
- Git

## How to Start

1. Clone the repository with SSH or HTTPS
    > SSH - `git clone git@github.com:garageScript/c0d3.com.git`

    > HTTPS - `git clone https://github.com/garageScript/c0d3.com.git`
2. After cloning the repository, run `yarn`.
3. Start the local development server with `PORT=3000 yarn dev`.
4. Navigate to [http://localhost:3000](http://localhost:3000) to view your application.

## How to Use Storybook

1. Run `STORY_PORT=6006 yarn storybook`.
2. Navigate to [http://localhost:6006](http://localhost:6006) in your browser.

## Contributing

Watch the video below to find out how to develop with TypeScript in React

[![React TypeScript Tutorial](http://i3.ytimg.com/vi/Z5iWr6Srsj8/hqdefault.jpg)](https://www.youtube.com/watch?v=Z5iWr6Srsj8)

### PR Criteria

1. Before submitting your code run `yarn autofix`.
2. When creating a new Component, include a StoryBook demo of the Component with the PR.
