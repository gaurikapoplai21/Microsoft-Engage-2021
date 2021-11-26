from flask import Flask,Response,request
import pymongo
import json
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
from datetime import datetime
import maildemo
import makeSchedule
import webbrowser

#Flask app config
app = Flask(__name__, static_folder='static')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


#Connect with Mongodb client
try:
    mongo = pymongo.MongoClient(
        host="localhost",
        port=27017,
        serverSelectionTimeoutMS=1000
    )
    db = mongo.teamup
    mongo.server_info()



except:
    print("ERROR - Cannot connect it to db")


###############################################

@app.route("/users", methods=["POST"])
@cross_origin()
def create_user():
    try:
        userName = request.json['userName']
        password = request.json['password']
        joinedOn = datetime.now()
        userType = request.json['userType']
        email = request.json['email']
        user = {

        "userName" : userName,
        "password" : password,
        "joinedOn" : joinedOn,
        "userType" : userType,
        "email" : email

        }

        dbResponse = db.Users.insert_one(user)
        return Response(
            response=json.dumps(
                {
                    "message":"user created",
                    "userId": f"{dbResponse.inserted_id}"
                }
            ),
            status=200,
            mimetype="application/json"
        )


    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"user not added"}),
            status = 500,
            mimetype="application/json"

        )    


@app.route("/users/<userId>",methods=["GET"])
@cross_origin()
def get_user(userId):
    try:
        data = db.Users.find_one({"_id":ObjectId(userId)})
        data["_id"] = str(data["_id"])
        data["joinedOn"] = data["joinedOn"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"User does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/users/login/<email>",methods=["GET"])
@cross_origin()
def login_user(email):
    try:
        data = db.Users.find_one({"email":email})
        data["_id"] = str(data["_id"])
        data["joinedOn"] = data["joinedOn"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"User does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/users/<userId>",methods=["PATCH"])
@cross_origin()
def update_user(userId):
    try:
        dbResponse = db.Users.update_one(
            {"_id":ObjectId(userId)},
            {"$set":

            {
            "userName" : request.json["userName"],
             "password" : request.json["password"],
             "email" : request.json["email"]
            }
            }
        )
        if(dbResponse.modified_count == 0):
            return Response(
                response=json.dumps({"message":"user not updated"}),
                status=200,
                mimetype = "application/json"
            )
        return Response(
            response=json.dumps({"message":"user updated"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot update user"}),
            status = 500,
            mimetype="application/json"
        )




@app.route("/users/<userId>",methods=["DELETE"])
@cross_origin()
def delete_user(userId):
    try:
        dbResponse = db.Users.delete_one({"_id":ObjectId(userId)})
        if(dbResponse.deleted_count == 0):
            return Response(
                response = json.dumps({"message":"user does not exist"}),
                status=200,
                mimetype="application/json"
            )
        return Response(
            response=json.dumps({"message":"user deleted","userId":f"{userId}"}),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot delete user"}),
            status=500,
            mimetype="application/json"
        ),



##############################################
@app.route('/events',methods=["POST"]) #no participants or teams while creating
@cross_origin()
def create_event():
    try:
        createdBy = request.json['createdBy']
        createdId = request.json['createdId']
        createdOn = datetime.now()
        registrationDeadline = request.json['registrationDeadline']
        submissionDeadline = request.json['submissionDeadline']
        minTeamSize = request.json['minTeamSize']
        maxTeamSize = request.json['maxTeamSize']
        maxMarks = request.json['maxMarks']
        eventName = request.json['eventName']
        eventDescription = request.json['eventDescription']
        participants = []
        teams = []
        uploadedFiles = request.json['uploadedFiles']
        referenceLinks = list(request.json['referenceLinks'].split("\n")) 
        event = {

        "createdBy" : createdBy,
        "createdId" : createdId,
        "createdOn" : createdOn,
        "registrationDeadline" : registrationDeadline,
        "submissionDeadline" : submissionDeadline,
        "minTeamSize" : minTeamSize,
        "maxTeamSize" : maxTeamSize,
        "maxMarks" : maxMarks,
        "eventName" : eventName,
        "eventDescription" : eventDescription,
        "participants" : participants,
        "teams" : teams,
        "uploadedFiles" : uploadedFiles,
        "referenceLinks" : referenceLinks,

        }



        dbResponse = db.Events.insert_one(event)
        return Response(
            response=json.dumps(
                {
                    "message":"Event created",
                    "eventId": f"{dbResponse.inserted_id}"
                }
            ),
            status=200,
            mimetype="application/json"
        )


    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"event not added"}),
            status = 500,
            mimetype="application/json"

        )


@app.route("/events/<eventId>",methods=["GET"])
@cross_origin()
def get_event(eventId):
    try:
        data = db.Events.find_one({"_id":ObjectId(eventId)})
        data["_id"] = str(data["_id"])
        data["createdOn"] = data["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
        #data["registrationDeadline"] = data["registrationDeadline"]
        #data["submissionDeadline"] = data["submissionDeadline"]
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Event does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/events/all",methods=["GET"])
@cross_origin()
def get_all_events():
    try:
        data = db.Events.find()
        data = list(data)
        for obj in data:
             obj["_id"] = str(obj["_id"])
             obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["registrationDeadline"] = obj["registrationDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["submissionDeadline"] = obj["submissionDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Events cannot be displayed"}),
            status = 500,
            mimetype="application/json"
        )
@app.route("/events/teacher/<createdId>",methods=["GET"])
@cross_origin()
def get_events_per_teacher(createdId):
    try:
        data = db.Events.find({"createdId":createdId})
        data = list(data)
        for obj in data:
             obj["_id"] = str(obj["_id"])
             obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["registrationDeadline"] = obj["registrationDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["submissionDeadline"] = obj["submissionDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Events cannot be displayed"}),
            status = 500,
            mimetype="application/json"
        )

    
@app.route("/events/<eventId>/edit",methods=["PATCH"]) #can update participants and teams as well
@cross_origin()
def update_event(eventId):
    try:
        dbResponse = db.Events.update_one(
            {"_id":ObjectId(eventId)},
            {"$set":

            {
             "createdBy" : request.json["createdBy"],
             "registrationDeadline" : request.json['registrationDeadline'],
             "submissionDeadline" : request.json['submissionDeadline'],
             "minTeamSize" : request.json["minTeamSize"],
             "maxTeamSize" : request.json["maxTeamSize"],
             "maxMarks" : request.json["maxMarks"],
             "eventName" : request.json["eventName"],
             "eventDescription" : request.json["eventDescription"],
             "uploadedFiles" : request.json["uploadedFiles"],
             "referenceLinks" : list(request.json['referenceLinks'].split("\n")) 
            }
            }
        )
        if(dbResponse.modified_count == 0):
            return Response(
                response=json.dumps({"message":"event not updated"}),
                status=200,
                mimetype = "application/json"
            )
        return Response(
            response=json.dumps({"message":"event updated"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot update event"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/events/<eventId>/addteams",methods=["PATCH"]) #can update participants and teams as well
@cross_origin()
def add_teams(eventId):
    try:
        dbResponse = db.Events.update_one(
            {"_id":ObjectId(eventId)},
            {"$set":

            {
             "participants":list(request.json["participants"].split(",")),
             "teams": list(request.json["teams"].split(","))
            }
            }
        )
        if(dbResponse.modified_count == 0):
            return Response(
                response=json.dumps({"message":"team not added"}),
                status=200,
                mimetype = "application/json"
            )
        return Response(
            response=json.dumps({"message":"team added"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot add team"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/events/<eventId>",methods=["DELETE"])
@cross_origin()
def delete_event(eventId):
    try:
        dbResponse = db.Events.delete_one({"_id":ObjectId(eventId)})
        if(dbResponse.deleted_count == 0):
            return Response(
                response = json.dumps({"message":"event does not exist"}),
                status=200,
                mimetype="application/json"
            )
        return Response(
            response=json.dumps({"message":"event deleted","userId":f"{eventId}"}),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot delete event"}),
            status=500,
            mimetype="application/json"
        ),

##############################################

@app.route("/upload", methods=["POST"])
@cross_origin()
def upload_file():
    try:
        fileName = request.json['fileName']
        uploadedBy = request.json['uploadedBy']
        uploadedOn = datetime.now()
       
        file = {

        "fileName" : fileName,
        "uploadedBy" : uploadedBy,
        "uploadedOn" : uploadedOn,
       
        }
        dbResponse = db.Files.insert_one(file)
        return Response(
            response=json.dumps(
                {
                    "message":"file uploaded",
                    "fileId": f"{dbResponse.inserted_id}"
                }
            ),
            status=200,
            mimetype="application/json"
        )


    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"file not uploaded"}),
            status = 500,
            mimetype="application/json"

        )  

        
@app.route("/upload/<fileId>",methods=["GET"])
@cross_origin()
def get_file(fileId):
    try:
        data = db.Files.find_one({"_id":ObjectId(fileId)})
        data["_id"] = str(data["_id"])
        data["uploadedOn"] = data["uploadedOn"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"File does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/upload/<fileId>",methods=["DELETE"])
@cross_origin()
def delete_file(fileId):
    try:
        dbResponse = db.Files.delete_one({"_id":ObjectId(fileId)})
        if(dbResponse.deleted_count == 0):
            return Response(
                response = json.dumps({"message":"file does not exist"}),
                status=200,
                mimetype="application/json"
            )
        return Response(
            response=json.dumps({"message":"file deleted","fileId":f"{fileId}"}),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot delete file"}),
            status=500,
            mimetype="application/json"
        ),

##############################################

#while creating a team: marks scored,files uploaded, submission link, submission time is null
@app.route("/teams", methods=["POST"])
@cross_origin()
def create_team():
    try:
        eventId = request.json['eventId']
        teamName = request.json['teamName']
        createdBy = request.json['createdBy']
        createdOn = datetime.now()
        members = request.json['members']
        marksScored = []
        projectTitle = ""
        submittedOn = datetime.strptime("01/01/1970, 00:00:00", '%d/%m/%Y, %H:%M:%S')
        submissionLink = ""
        names = request.json['names']
        emails = request.json['emails']
        eventName = request.json['eventName']

       
        team = {

        "eventId" : eventId,
        "eventName" : eventName,
        "teamName" : teamName,
        "createdBy" : createdBy,
        "createdOn" : createdOn,
        "members": members,
        "marksScored": marksScored,
        "projectTitle": projectTitle,
        "submissionLink": submissionLink,
        "submittedOn": submittedOn,
        "names": names,
        "emails":emails
       
        }

        dbResponse = db.Teams.insert_one(team)
        return Response(
            response=json.dumps(
                {
                    "message":"team registered",
                    "teamId": f"{dbResponse.inserted_id}"
                }
            ),
            status=200,
            mimetype="application/json"
        )


    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"team could not get registered"}),
            status = 500,
            mimetype="application/json"

        )  


@app.route("/teams/<teamId>",methods=["GET"])
@cross_origin()
def get_team(teamId):
    try:
        data = db.Teams.find_one({"_id":ObjectId(teamId)})
        data["_id"] = str(data["_id"])
        data["createdOn"] = data["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
        data["submittedOn"] = data["submittedOn"].strftime("%d/%m/%Y, %H:%M:%S")

        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Team does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/teams/event/<eventId>",methods=["GET"])
@cross_origin()
def get_team_per_event(eventId):
    try:
        data = db.Teams.find({"eventId":eventId})
        data = list(data)
        for obj in data:
        
            obj["_id"] = str(obj["_id"])
            obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
            obj["submittedOn"] = obj["submittedOn"].strftime("%d/%m/%Y, %H:%M:%S")

        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Team does not exist"}),
            status = 500,
            mimetype="application/json"
        )
@app.route("/teams/user/<userId>",methods=["GET"])
@cross_origin()
def get_team_per_user(userId):
    try:
        data = db.Teams.find({"members":userId})
        data = list(data)
        for obj in data:
        
            obj["_id"] = str(obj["_id"])
            obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
            obj["submittedOn"] = obj["submittedOn"].strftime("%d/%m/%Y, %H:%M:%S")

        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Team does not exist"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/teams/<teamId>",methods=["DELETE"])
@cross_origin()
def delete_team(teamId):
    try:
        dbResponse = db.Teams.delete_one({"_id":ObjectId(teamId)})
        if(dbResponse.deleted_count == 0):
            return Response(
                response = json.dumps({"message":"team does not exist"}),
                status=200,
                mimetype="application/json"
            )
        return Response(
            response=json.dumps({"message":"team deleted","teamId":f"{teamId}"}),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot delete team"}),
            status=500,
            mimetype="application/json"
        ),

@app.route("/teams/<teamId>/edit",methods=["PATCH"])
@cross_origin()
def update_team(teamId):
    try:
       
        dbResponse = db.Teams.update_one(
            {"_id":ObjectId(teamId)},
            {"$set":

            {
                "teamName" : request.json["teamName"],
                "createdBy" : request.json["createdBy"],
                "members": request.json["members"],
                "names": request.json["names"],
                "emails": request.json["emails"]
            
            }
            }
        )
        if(dbResponse.modified_count == 0):
            return Response(
                response=json.dumps({"message":"team not updated"}),
                status=200,
                mimetype = "application/json"
            )
        return Response(
            response=json.dumps({"message":"team updated"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot update team"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/teams/<teamId>/submit",methods=["PATCH"])
@cross_origin()
def submit_project(teamId):
    try:
       
        dbResponse = db.Teams.update_one(
            {"_id":ObjectId(teamId)},
            {"$set":

            {
                "projectTitle": request.json["projectTitle"],
                "submissionLink":request.json["submissionLink"],
                "submittedOn" : datetime.now()
            
            }
            }
        )
        
        return Response(
            response=json.dumps({"message":"submission done"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot submit"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/teams/<teamId>/evaluate",methods=["PATCH"])
@cross_origin()
def evaluate_project(teamId):
    try:
       
        dbResponse = db.Teams.update_one(
            {"_id":ObjectId(teamId)},
            {"$set":

            {
                "marksScored": request.json["marksScored"],
            
            }
            }
        )
       
        return Response(
            response=json.dumps({"message":"project evaluated"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"project not evaluated"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/teams/<teamId>/activate",methods=["PATCH"])
@cross_origin()
def active_link(teamId):
    try:
       
        dbResponse = db.Teams.update_one(
            {"_id":ObjectId(teamId)},
            {"$set":

            {
                "submissionLink": request.json["submissionLink"],
            
            }
            }
        )
        if(dbResponse.modified_count == 0):
            return Response(
                response=json.dumps({"message":"no submission link specified"}),
                status=200,
                mimetype = "application/json"
            )
        return Response(
            response=json.dumps({"message":"submission link activated"}),
            status=200,
            mimetype = "application/json"
        )

        
    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot activate submission link"}),
            status = 500,
            mimetype="application/json"
        )

##############################################

@app.route("/email/initiatereminder", methods=["POST"])
@cross_origin()
def initiate_reminder():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        subject = "Submission Due for " + eventName
        body = """This is a reminder email that your team has not made any submission for the project - """ + eventName + """. Please make a submission before the deadline on the Team-Up portal."""
        
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )    

@app.route("/email/eventcreated/teacher", methods=["POST"])
@cross_origin()
def event_created1():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        subject = "Event Created -  " + eventName
        body = """This is a confirmation email that you have created an event - """ + eventName + """ successfully on the Team-Up portal. This event is now live for all the students."""
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )  

@app.route("/email/eventcreated/students", methods=["POST"])
@cross_origin()
def event_created2():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        teacher = request.json["teacher"]
        subject = "Event Created -  " + eventName
        body = """This mail is to inform you that the event - """ + eventName + """ was created by Prof. """ + teacher + """ on the Team-Up portal. Login to the Team-Up portal for more details."""
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )    

@app.route("/email/teamregistered", methods=["POST"])
@cross_origin()
def team_registered():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        subject = "Team Created for the event -  " + eventName
        body = """This is a confirmation email for successful registration of your team for the event - """ + eventName + """ on the Team-Up portal. Your professor will now be able to view the registered team details."""
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )  

@app.route("/email/submissionreceived", methods=["POST"])
@cross_origin()
def submission_received():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        subject = "Successful submission for the event -  " + eventName
        body = """This is a confirmation email for successful submission of the deliverables from your team for the event - """ + eventName + """ on the Team-Up portal. Your professor will now be able to view the submission."""
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )   

@app.route("/email/marksuploaded", methods=["POST"])
@cross_origin()
def marks_uploaded():
    try:
        eventName = request.json["eventName"]
        contacts = request.json["contacts"]
        subject = "Marks uploaded for the event -  " + eventName
        body = """This email is to inform you that your professor has completed evaluation of your team for the event - """ + eventName + """ on the Team-Up portal. Login to view your marks on the MySubmissions tab."""
        maildemo.sendmail(contacts,subject,body)

        return Response(
            response = json.dumps({"message":"emails sent successfully"}),
            status = 200,
            mimetype="application/json"

        )   
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )     

###############################################

@app.route("/make-schedule", methods=["POST"])
@cross_origin()
def make_schedule():
    try:
      
      dates = request.json['selectedDate']
      slots = request.json['numSlots']
      duration = request.json['duration']["minutes"]
      eventId = request.json['eventId']
      teams = db.Teams.find({"eventId":eventId})
      teams = list(teams)
      names = []
      emails = []
      teamNames = []
      teamIds = []
      for obj in teams:
          names.append(obj["names"])
          emails.append(obj["emails"])
          teamNames.append(obj["teamName"])
          teamIds.append(str(obj["_id"]))
      
      new_dates = []
      for obj in dates:
          new_dates.append(datetime.strptime(obj,"%Y-%m-%dT%H:%M:%S+05:30"))
          

      #for obj in teams:
        
            #obj["_id"] = str(obj["_id"])
            #obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
            #obj["submittedOn"] = obj["submittedOn"].strftime("%d/%m/%Y, %H:%M:%S")
      res = makeSchedule.scheduler(new_dates, slots, duration,names,emails,teamNames,teamIds)

      return Response(
            response = json.dumps(res),
            status = 200,
            mimetype="application/json"
      )



    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"emails not sent"}),
            status = 500,
            mimetype="application/json"

        )  

###############################################
@app.route("/schedule", methods=["POST"])
@cross_origin()
def schedule():
    try:
        eventName = request.json["eventName"]
        eventId = request.json["eventId"]
        createdBy = request.json["createdBy"]
        schedule = request.json["schedule"]
        createdOn = datetime.now()
        schedule_generated = {
          "eventName":eventName,
          "eventId":eventId,
          "createdBy":createdBy,
          "schedule":schedule,
          "createdOn": createdOn


        }    
        dbResponse = db.Schedules.insert_one(schedule_generated)
        return Response(
            response=json.dumps(
                {
                    "message":"Schedule released",
                    "teamId": f"{dbResponse.inserted_id}"
                }
            ),
            status=200,
            mimetype="application/json"
        )
    except Exception as e:
        print(e)
        return Response(
            response = json.dumps({"message":"Schedule not released"}),
            status = 500,
            mimetype="application/json"

        )

@app.route("/schedule/all",methods=["GET"])
@cross_origin()
def get_all_schedules():
    try:
        data = db.Schedules.find()
        data = list(data)
        for obj in data:
             obj["_id"] = str(obj["_id"])
             obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["registrationDeadline"] = obj["registrationDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["submissionDeadline"] = obj["submissionDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"Schedules cannot be displayed"}),
            status = 500,
            mimetype="application/json"
        )
@app.route("/schedule/<userId>",methods=["GET"])
@cross_origin()
def get_schedules_per_teacher(userId):
    try:
        data = db.Schedules.find({"createdBy":userId})
        data = list(data)
        for obj in data:
             obj["_id"] = str(obj["_id"])
             obj["createdOn"] = obj["createdOn"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["registrationDeadline"] = obj["registrationDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
             #obj["submissionDeadline"] = obj["submissionDeadline"].strftime("%d/%m/%Y, %H:%M:%S")
        return Response(
            response = json.dumps(data),
            status=200,
            mimetype="application/json"
        )
        
       

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"No schedules created by this user"}),
            status = 500,
            mimetype="application/json"
        )

@app.route("/schedule/<scheduleId>",methods=["DELETE"])
@cross_origin()
def delete_schedule(scheduleId):
    try:
        dbResponse = db.Schedules.delete_one({"_id":ObjectId(scheduleId)})
        
        return Response(
            response=json.dumps({"message":"schedule deleted"}),
            status=200,
            mimetype="application/json"
        )

    except Exception as e:
        print(e)
        return Response(
            response=json.dumps({"message":"cannot delete schedule"}),
            status=500,
            mimetype="application/json"
        ),

###############################################


if __name__ == "__main__":
    app.run(port=5000,debug=True)
