# Microsoft Engage 2021 Project | Team-Up
A portal for automating the process of teachers  to initiate a project and for students to receive information about these projects and form teams accordingly within a deadline. This enables  teachers to get organized information about the teams formed for a project.  This portal can be extended to cater to hackathons too. Students will be suggested team members according to preferred skills and interests.

# Table of Contents

* [Installation and Setup]()
* [System Specifications]()

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




 







