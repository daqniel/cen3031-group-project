# cen3031-group-project

## API
### Notes

Currently separated into three categories: Client, Vendor, and Request. Each note linked to a Client/Vendor/Request via a 'linkedId' field, which is just the '_id' of what the note is linked to.
Required fields: type(String), linkedId(String). Other fields:  Title and text fields cannot both be empty.

* Get all notes: GET /api/notes

* Get all notes by certain linkedId: GET /api/notes/?linkedId=xxxx

* Create note: POST /api/notes

* Get note by _id: GET /api/notes/(note._id)

* Update note by _id: PUT /api/notes/(note._id)

* Delete note by _id: DELETE /api/notes/(note._id)

### Blogpost

Required fields: title(String). Optional fields: text(String). Maybe text should be a required field too? Although she may want to use her blogposts as announcements. Short announcements would only need the title field.

* Get all blogposts: GET /api/blogposts

* Create blogpost: POST /api/blogposts

* Get blogpost by _id: GET /api/blogposts/(blogpost._id)

* Update blogpost by _id: PUT /api/blogposts/(blogpost._id)

* Delete blogpost by _id: DELETE /api/blogposts/(blogpost._id)

### Special

Required fields: title(String). Optional fields: description(String), expireDate(Date). Date format should be 'YYYY-MM-DD'.

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
