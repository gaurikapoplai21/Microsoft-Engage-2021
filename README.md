# Microsoft Engage 2021 Project | Team-Up

Team-Up is a platform to automate the process of project management at schools and colleges. It allows teachers to create events for projects/assignments and for students to form teams and register themselves for the events. The teachers receive collated information about all the teams registered. Students can submit their GitHub links for the projects and the teachers can assign marks for their submissions.

This portal also has an automatic scheduler for conducting presentations. The teachers have to specify the dates and times as per their availability and a schedule is generated where all the registered teams are allocated a slot for their presentations. This generated schedule is then available to both teachers and students.

Additionally, for every event creation, project submission, schedule release and other important notification,emails are sent to the concerned users.


# Hosted Site

https://react-frontend-teamup.herokuapp.com/

# Table of Contents

* [Installation and Setup](#installation-and-setup)
* [System Specifications](#system-specifications)
* [Documentation](https://github.com/gaurikapoplai21/Microsoft-Engage-2021/tree/master/documentation)
* [Tech Stack](#tech-stack)
* [Note](#note)

# Installation and Setup
Please follow the below instructions inorder to set up the repository and run the project on your system.

## Cloning the repository
Clone the repository using the following command 

```bash
git clone https://github.com/gaurikapoplai21/Microsoft-Engage-2021.git
```
Once the repository has been cloned successfully, change your current working directory to Project's directory using
the following commmand 

```bash
cd Microsoft-Engage-2021
```

## Running client and server

### Step 1: Open 2 command prompts/terminals
 
### Step 2: Change the current working directory to client in the first terminal

```bash
cd client
```
### Step 3: Installing dependencies for the client application

```bash
npm i
```

### Step 4: Running the client application
Run the below command inorder to start the application. The application would be available at `localhost:3000`.
In case `port 3000` is busy, select another appropriate port to run the application on. The application will then be
available at `localhost:<selected-port>`. 

```bash
npm start
```

### Step 5: Change the current working directory to server in the second terminal

```bash
cd server
```

### Step 6: Creating and activating a virtual environment 

**For Windows**

```bash
pip install virtualenv
```

Once `virtualenv` is installed, run the following command to create the virtual environment

```bash
virtualenv env 
```

Once the virtualenv is created, you will see `env` folder present inside the `server` folder. Now, run the following
command to activate the virtual environment.

```bash
env\Scripts\activate
```

Once you execute this command, you should see `(env)` next to your command prompt.

**For Linux**

Run the following command to create the virtual environment

```bash
python3 -m venv env
```

Once the virtualenv is created, you will see `env` folder present inside the `server` folder. Now, run the following
command to activate the virtual environment.

```bash
source env/bin/activate
```

Once you execute this command, you should see `(env)` next to your command prompt.

### Step 7: Installing dependencies for server application

**For Windows**

```bash
pip install -r requirements.txt
```

**For Linux**

```bash
pip3 install -r requirements.txt
```

### Step 8: Running the server
Run the following command to start the server. Once the command executes, the server will start listening at `localhost:5000`.

**For Windows**

```bash
python server.py
```

**For Linux**

```bash
python3 server.py
```

# System Specifications

| Specification | Version       | 
|:-------------:|:-------------:|
| Operating System | Windows 10 |
| Processor     | Intel Core i5 7th gen | 
| RAM           | 8 GB          |   
| npm           | 6.13.4        |
| node          | 12.16.1       |
| Python        | 3.7.3         |
   
   
# Tech Stack

### Front-end : React.js
redux, axios, react-hooks, react-bootstrap, material-ui

### Back-end : Python
flask, smtplib, pymongo

### Database : MongoDB Atlas

# Note
1. Internet connectivity should be present while testing even locally because MongoDB Atlas is used as database and smtplib also requires internet connectivity.
2. Credentials for sending mails,database connections strings are stored as environment variables in the system. For testing locally, the .env file has been provided in the extra documents (through the submission portal). This is because a .env file must not be included in a repository. The .env file provided should be placed inside
`(server)` folder. (Same directory as server.py)




 







