# API Documentation

This page illustrates all the APIs that are essential for the working of the `Team-Up` application as well as the naming conventions to be followed for the same.

All the APIs by default must contain the following attributes in the data portion of the response JSON, thus redundant mentioning of the same has been skipped from the API section.

1. **statusCode**: One of the possible 5 series 1XX, 2XX, 3XX, 4XX, 5XX. This is mandatory.
2. **statusMsg**: The response JSON must contain the appropriate status message associated with `1XX`, `2XX`,  `3XX`, `4XX`, `5XX`. This is mandatory. For more information about HTTP response status code and messages please refer to [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
3. **errorMsg**: In case of any `4XX` or `5XX` status, this field must contain an informative and situation-appropriate message that would be shown to the user via notifications. This is mandatory for response JSON with statusCode as `4XX` or `5XX`.
sourceCodeErrorMsg: In case of any `4XX` or `5XX` status, this field must contain the Exception message that would be useful for the developer while debugging. This is mandatory for response JSON with statusCode as `4XX` or `5XX`.
4. **payload**: In case there is a payload associated with the response JSON, it must be put within this key. This is optional, depending upon the situation.

## Table of Contents

1. [Naming Convention](#naming-convention)
2. [Table of APIs](#table-of-apis)


## Naming Convention

The API endpoint to which the call must be made from the frontend would be of the following form.

```
{base URL}/{version}/{resource}/{sub-resource}/
```

**Base URL**: According to standards the base URL for the API endpoints will be `https://localhost:5000`

**Version**: The APIs will have versions in the form of `vn` where n represents a whole number. Eg: `v0`, `v1` ... so on.

**Resource**: A resource corresponds to an individual entity that contains 2 or more possible actions that must be performed on it. A resource may have more resources nested within it. Eg : `/users`

The kind of action that needs to be performed when an API call is made to a certain endpoint will be decided by one of the HTTP methods, namely [GET](https://restfulapi.net/http-methods/#get), [POST](https://restfulapi.net/http-methods/#post), [PUT](https://restfulapi.net/http-methods/#put), [DELETE](https://restfulapi.net/http-methods/#delete) and [PATCH](https://restfulapi.net/http-methods/#patch).

### Example API Endpoint 

```
https://localhost:5000/v0/users
```

## Table of APIs

| Method | End Point | Implementation Status | Testing Status | Integration Status | Documentation Status |
|:------:|:---------:| :--------------------:| :-------------:|:------------------:|:--------------------:|
| POST | [/users]() | 🕰️ | 🕰️ | 🕰️| ✅ |
| GET | [/users/{userId}]() | 🕰️ | 🕰️ | 🕰️| ✅ |
| DELETE | [/users/{userId}]() | 🕰️ | 🕰️ | 🕰️| ✅ |


## POST /users

### Description
This endpoint is used to to register a new user.

### Sample Request JSON data

```
```

### Sample Response JSON data

```
```

## GET /users/{userId}

### Description
This endpoint is used to to get information of the user with the corresponding user ID.

### Sample Response JSON data

```
```

## DELETE /users/{userId}

### Description
This endpoint is used to to delete information of the user with the corresponding user ID.

### Sample Response JSON data

```
```




