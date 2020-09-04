# DevLabs
DevLabs: Administration site for project management. Users/Developers can register, create projects, invite members and post milestones into the running project. There are Projects, Developers, Milestones and Memberships for assinging Developers to Projects.

## Requirements
- [Node](https://nodejs.org/en/download/)
- Nodemon (optional)
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Robo 3T](https://robomongo.org/download) for database check (not Studio 3T)

## Setting up
```bash
git clone https://github.com/triszt4n/devlabs.git
npm i
```

## Running
```bash
npm start
```

## Notes
The webapp right now does NOT handle unauthorized requests (it lets them all in).
E.g.: anybody can delete a project only by knowing the id of a project, anybody could post
a milestone to a foreign project just by knowing the id. Only developers are protected in this sense.
