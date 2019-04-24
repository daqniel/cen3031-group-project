# cen3031-group-project

# API
The API is a way to interact with the documents stored in the database through HTTP requests.

## Users

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

#### GET

+ all users: 

## Notes

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
* Get all notes: GET /api/notes

* Get all notes by certain linkedId: GET /api/notes/?linkedId=xxxx

* Create note: POST /api/notes

* Get note by _id: GET /api/notes/(note._id)

* Update note by _id: PUT /api/notes/(note._id)

* Delete note by _id: DELETE /api/notes/(note._id)

## Blogposts

### Description
Provides blogpost CRUD functionality.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|title|String|yes|Title of the blogpost.|
|text|String|maybe|Text of the blogpost. Required if no title is provided.|

### HTTP Request
* Get all blogposts: GET /api/blogposts

* Create blogpost: POST /api/blogposts

* Get blogpost by _id: GET /api/blogposts/(blogpost._id)

* Update blogpost by _id: PUT /api/blogposts/(blogpost._id)

* Delete blogpost by _id: DELETE /api/blogposts/(blogpost._id)

## Special

### Description
Provides specials CRUD functionality. Can be retrieved by date.

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|title|String|yes|Title of the special deal.|
|text|String|no|Text of the Special. Can be used for descriptions|
|expireDate|Date|no|Date the special deal expires|

### HTTP Requests
* Get all specials: GET /api/specials

* Create special: POST /api/specials

* Get special by _id: GET /api/specials/(special._id)

* Update special by _id: PUT /api/specials/(special._id)

* Delete special by _id: DELETE /api/specials/(special._id)

* Get newest N specials: GET /api/specials/?num=N

* Get oldest N specials: GET /api/specials/?num=N&order=old

* Get all specials old to new: GET /api/specials/?order=old
 
TODO: Document rest of the API.

## Vendor

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
Required fields: title(String). Optional fields: text(String). Maybe text should be a required field too? Although she may want to use her blogposts as announcements. Short announcements would only need the title field.

* Get all vendor: GET /api/vendors

* Create vendor: POST /api/vendors

* Get vendor by _id: GET /api/vendors/(vendor._id)

* Update vendor by _id: PUT /api/vendors/(vendor._id)

* Delete vendor by _id: DELETE /api/vendors/(vendor._id)

## Request

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
* Get all requests for a client: GET /api/requests

* Create request: POST /api/requests

* Get request by _id: GET /api/requests/(request._id)

* Update request by _id: PUT /api/requests/(request._id)

* Delete request by _id: DELETE /api/requests/(request._id)

## Recommendation

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
* Get all recommendations: GET /api/recommendations

* Create recommendation: POST /api/recommendations

* Get recommendation by _id: GET /api/recommendations/(recommendation._id)

* Update recommendation by _id: PUT /api/recommendations/(recommendation._id)

* Delete recommendation by _id: DELETE /api/recommendations/(recommendation._id)


## Team 
Daniel Quintero (leingad)

Daniel Chalco (chalco)

Jack Fining (jackfining)

Sarah Walker (swalker15)
	
Daniel Garzon Moreno (dgarzonmoreno)
