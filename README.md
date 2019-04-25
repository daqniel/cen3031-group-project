# cen3031-group-project

**Bochitto Travel**

Spring 2019

# API
The API is a way to interact with the documents stored in the database through HTTP requests.

*Note*: All schemas have an **_id** field that is unique for each document within the database. This **_id** field is used in many of the HTTP Requests.

## Non-schema related HTTP Requests

##### Logout

* Logout from current user session: **GET** `/api/logout`

##### Get Session

* Get info about current user session: **GET** `/api/session`

    Info includes username/email, and name object with first, middle, last name.

## **Users**

### Description
Provides users CRUD and login/logout/authentication functionality.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|name.first|String|yes|User's first name|
|name.last|String|yes|User's last name|
|name.middle|String|no|User's middle name|
|email|String|yes|User's email, unique in database|
|password|String|yes|Hashed before storage in database|
|phoneNumber|String|no|US number format http://regexlib.com/REDetails.aspx?regexp_id=58|
|isAdmin|Boolean|no|Designates an Administrator account|

### HTTP Requests

##### CREATE

+ Create new user: **POST** /api/users

    All fields must be sent in request body in application/json format.

##### READ

+ All users' information: **GET** /api/users/

+ One user's information: **GET** /api/users/:email

##### UPDATE
 
+ Update a user: **PUT** /api/users/:email

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a user: **DELETE** /api/users/:email

##### OTHER

+ Login/Create user session: **POST** /api/users/login

    Request body must contain username and password fields.

## **Notes**

### Description
Provides notes CRUD functionality. Each note must be linked to a User, Vendor, or Request stored in the database.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|type|String|yes|Designates type that note is linked to. Possible values are 'Client', 'Vendor', and 'Request'.|
|linkedId|String|yes|The _id of document the note is linked to.|
|title|String|maybe|Title of the note. Required if no text is provided.|
|text|String|maybe|Text of the note. Required if no title is provided.|

### HTTP Requests

##### CREATE

+ Create new note: **POST** /api/notes

    All fields must be sent in request body in application/json format.

##### READ

+ All notes: **GET** /api/notes/

+ One note: **GET** /api/notes/:_id

##### UPDATE
 
+ Update a note: **PUT** /api/notes/:_id

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a note: **DELETE** /api/notes/:_id

## **Blogposts**

### Description
Provides blogpost CRUD functionality.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|title|String|yes|Title of the blogpost.|
|text|String|maybe|Text of the blogpost. Required if no title is provided.|

### HTTP Request

##### CREATE

+ Create new blogpost: **POST** /api/blogposts

    All fields must be sent in request body in application/json format.

##### READ

+ All blogposts: **GET** /api/blogposts

    Optional Query Parameters: 

        ?num=N - gets only the latest N blogposts, where N is a positive integer.

        ?order=old - gets oldest blogposts instead of newest

+ One blogpost: **GET** /api/blogposts/:_id

##### UPDATE
 
+ Update a blogpost: **PUT** /api/blogposts/:_id

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a note: **DELETE** /api/notes/:_id

## **Specials**

### Description
Provides specials CRUD functionality. Can be retrieved by date.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|title|String|yes|Title of the special deal.|
|text|String|no|Text of the Special. Can be used for descriptions|
|expireDate|Date|no|Date the special deal expires|

### HTTP Requests

##### CREATE

+ Create new special: **POST** /api/specials

    All fields must be sent in request body in application/json format.

##### READ

+ All specials: **GET** /api/specials

    Optional Query Parameters: 

        ?num=N - gets only the latest N specials, where N is a positive integer.

        ?order=old - gets oldest specials instead of newest

+ One special: **GET** /api/specials/:_id

##### UPDATE
 
+ Update a special: **PUT** /api/specials/:_id

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a special: **DELETE** /api/specials/:_id
 
## **Vendor**

### Description
Provides vendor CRUD functionality.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|name|String|yes|Name of a particular vendor|
|text|String|no|Text of the vendor. Can be used for descriptions|
|phoneNumber|String|no|Phone number of contact for the vendor|
|email|String|no|Email of contact for vendor|
|link|String|no|URL for vendor website|

### HTTP Requests

##### CREATE

+ Create new vendor: **POST** /api/vendors

    All fields must be sent in request body in application/json format.

##### READ

+ All vendors: **GET** /api/vendors

+ One vendor: **GET** /api/vendors/:_id

##### UPDATE
 
+ Update a vendor: **PUT** /api/vendors/:_id

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a vendor: **DELETE** /api/vendors/:_id

## **Requests**

### Description
Provides request CRUD functionality. Requests are created by a client and sent to admin

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|clientID|String|yes|Email associated with client account|
|requestState|String|yes|Pending/Declined/Accepted/Resolved states of request|
|budget.min|Number|no|Low end of budget for travel|
|budget.max|Number|no|High end of budget for travel|
|location.from|String|no|Departing location for travel|
|location.to|String|no|Desired destination for travel|
|travelDates.departing|Date|no|Date desired to leave for travel|
|travelDates.returning|Date|no|Date desired to return from travel|
|numChildren|Number|yes|Number of children that will be travelling|
|numAdults|Number|yes|Number of adults that will be travelling|
|partySize|Number|no|Total number of children and adults|
|wantTravelInsurance|Boolean|no|Decides if client wants to purchase travel insurance|
|wantCruise|Boolean|no|Decides if client wants to take a cruise|

### HTTP Requests
##### CREATE

+ Create new request: **POST** /api/requests

    All fields must be sent in request body in application/json format.

##### READ
+ All requests: **GET** /api/requests

    Optional Query Parameters: 

        ?clientId=email - gets all requests made by user with the specified email

+ One request: **GET** /api/requests/:_id

##### UPDATE
 
+ Update a request: **PUT** /api/requests/:_id

    Entire object including unchanged fields must be sent in request body in application/json format.

##### DELETE

+ Delete a request: **DELETE** /api/requests/:_id

## **Recommendations**

### Description
Provides recommendation CRUD functionality.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|client|String|yes|Name of a client being responded to|
|title|String|yes|Title of recommendation|
|text|String|no|Body of recommendation|
|link|String|no|URL for suggested travel website|

### HTTP Requests
##### CREATE

+ Create new recommendation: **POST** /api/recommendations

    All fields must be sent in recommendation body in application/json format.

##### READ
+ All recommendations: **GET** /api/recommendations

    Optional Query Parameters: 

        ?clientId=email - gets all recommendations made by user with the specified email

+ One recommendation: **GET** /api/recommendations/:_id

##### UPDATE
 
+ Update a recommendation: **PUT** /api/recommendations/:_id

    Entire object including unchanged fields must be sent in recommendation body in application/json format.

##### DELETE

+ Delete a recommendation: **DELETE** /api/recommendations/:_id

