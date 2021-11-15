# Database Documentation

This README contains all the information about the database design.
It contains details about the tables and attributes.
**Note**: The fields which are mandatory are explicitly specified as required. 


## Table of Contents

1. [User Table](#user-table)
2. [Event Table](#event-table)
3. [Teams Table](#teams-table)
4. [Files Table](#files-table)
5. [Schedule Table](#schedule-table)
6. [Software Specifications](#software-specifications)

## User Table

This table contains the information about all the users who will be associated with
`Team-Up Platform`.

**Table Name**: `Users`

### Columns of the Users Table

1. **userId**: A unique UUID associated with each user. This field is required.
2. **email**: The email-id given by user at time of registration. This field is required.
3. **userType**: The user can either register as a `Student` or `Teacher`. The values for this column will be `student` or `teacher`. This field is required.
4. **password**: This is the password given by the user at time of registration. This field is required.
5. **joinedOn**: This is a date-time stamp in UTC representing the joining date of the user. This field is required.
6. **userName**: This is the name of the user. This field is required.

## Event Table

This table contains the information about any event created by the teacher. In the current use-case, it will be a project assigned to students. In the future, it could also be used for conducting hackathons.

**Table Name**: `Events`

### Columns of the Events Table

1. **eventId**: A unique UUID associated with each event. This field is required.
2. **createdBy**: The userId of the corresponding user who created the event. This field is required.
3. **createdOn**: This is a date-time stamp in UTC representing the date-time of event generation. This field is required.
4. **registrationDeadline**: This is a date-time stamp in UTC representing the registration deadline for the event. This field is required.
5. **submissionDeadline**: This is a date-time stamp in UTC representing the submission deadline for the event. This field is required.
6. **minTeamSize**: This is the minimum size of the team required for the event. This field is required.
7. **maxTeamSize**: This is the maximum size of the team required for the event. This field is required.
8. **maxMarks**: These are the maximum marks for the event. This field is required.
9. **eventName**: This is the name of the event. This field is required.
10. **eventDescription**: This is the description of the event. This field is required.
11. **participants**: This is the list of participants' UUIDs in the event.This field is required.This list is empty by default.
12. **teams**: This is the list of teams' UUIDs in the event. This field is required.This list is empty by default.
13. **uploadedFiles**: This is the list of file IDs uploaded by the teacher for the event.
14. **referenceLinks**: List of reference links uploaded by the teacher for the event.

## Teams Table

This table contains the information about all the teams who will be participating in the events generated.

**Table Name**: `Teams`

### Columns of the Teams Table

1. **teamId**: A unique UUID associated with each team. This field is required.
2. **members**: The list of userIds of all members in the team. This field is required.
3. **teamName**: This is the name of the team. This field is required.
4. **submissionLink**: This is the submission link for submitting required output for the event. By default, it will be empty. This field is required.
5. **submittedOn**: This is a date-time stamp in UTC representing the date of submission by the team. This field is required.
6. **marksScored**: List of key-value pairs where the key is the userId of the member and value will be the corresponding marks scored out of max marks. This field is required.
7. **uploadedFiles**: List of file IDs submitted by the team. By default it will be an empty list.
8. **createdBy**: This is the userId of the member who created the team. This field is required.
9. **createdOn**: This is the date-time stamp in UTC of when the team was created. This field is required.

## Files Table

This table contains the information about all the files uploaded on the platform by all the teams for all the events.

**Table Name**: `Files`

### Columns of the Files Table

1. **fileId**: A unique UUID associated with each file. This field is required.
2. **fileName**: This is the name of the file. This field is required.
3. **uploadedBy**: This is the userId of the uploader. This field is required.
4. **uploadedOn**: This is a date-time stamp in UTC representing the date of file upload. This field is required.

## Schedule Table

This table contains the information about the schedule for presentations associated with
an event.

**Table Name**: `Schedule`

### Columns of the Files Table

1. **scheduleId**: A unique UUID associated with the presentation schedule of each event. This field is required.
2. **eventId**: This is the eventId of the corresponding event. This field is required.
3. **durationPerPresentation**: This is the duration of time for which each presentation will last. This field is required. This will be an integer denoting the number of minutes.
4. **schedule**: Object where each key will be a teamId and corresponding value will be the timing details for the presentation. This field is required. 

## Software Specifications

| Specification | Version       | 
|:-------------:|:-------------:|
| mongoDB | 5.0.3 |
| pymongo     | 3.12.1 | 

     

