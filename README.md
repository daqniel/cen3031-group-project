# cen3031-group-project
## Notes
Request/Recommendation schema/API's are a mess right now. Waiting on more info from client. Other API's should be pretty much functional, may need some additional functionality added later. Code could probably be cleaned up a bit too but not too important right now.

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

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|title|String|yes|Title of the special deal.|
|text|String|no|Text of the Special. Can be used for descriptions|
|expireDate|Date|no|Date the special deal expires|

* Get all specials: GET /api/specials

* Create special: POST /api/specials

* Get special by _id: GET /api/specials/(special._id)

* Update special by _id: PUT /api/specials/(special._id)

* Delete special by _id: DELETE /api/specials/(special._id)

NOTE: I have reimplemented this to use query params instead

* Get newest N specials: GET /api/specials/?num=N

* Get oldest N specials: GET /api/specials/?num=N&order=old

* Get all specials old to new: GET /api/specials/?order=old
 
TODO: Document rest of the API.

## Vendor

### Schema
|Field|Type|Required?|Description|
|-----|----|--------|-|
|name|String|yes|Name of a particular vendor|
|text|String|no|Text of the vendor. Can be used for descriptions|
|phoneNumber|String|no|Phone number of contact for the vendor|
|email|String|no|Email of contact for vendor|
|link|String|no|URL for vendor website|

### BlogPosts

Required fields: title(String). Optional fields: text(String). Maybe text should be a required field too? Although she may want to use her blogposts as announcements. Short announcements would only need the title field.

Get all blogposts: GET /api/blogposts

Create blogpost: POST /api/blogposts

Get blogpost by _id: GET /api/blogposts/(blogpost._id)

Update blogpost by _id: PUT /api/blogposts/(blogpost._id)

Delete blogpost by _id: DELETE /api/blogposts/(blogpost._id)

### Specials

Required fields: title(String). Optional fields: description(String), expireDate(Date). Date format should be 'YYYY-MM-DD'.

Get all specials: GET /api/specials

Create special: POST /api/specials

Get special by _id: GET /api/specials/(special._id)

Update special by _id: PUT /api/specials/(special._id)

Delete special by _id: DELETE /api/specials/(special._id)

NOTE: I have reimplemented this to use query params instead

Get newest N specials: GET /api/specials/?num=N

Get oldest N specials: GET /api/specials/?num=N&order=old

Get all specials old to new: GET /api/specials/?order=old

## Team 
Daniel Quintero (leingad)

Daniel Chalco (chalco)

Jack Fining (jackfining)

Sarah Walker (swalker15)
	
Daniel Garzon Moreno (dgarzonmoreno)
