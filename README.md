# cen3031-group-project
## Notes
Request/Recommendation schema/API's are a mess right now. Waiting on more info from client. Other API's should be pretty much functional, may need some additional functionality added later. Code could probably be cleaned up a bit too but not too important right now.

## API
#Notes
Currently separated into three categories: Client, Vendor, and Request. Each note linked to a Client/Vendor/Request via a 'linkedId' field, which is just the '_id' of what the note is linked to. Required fields: type, linkedId. Title and text fields cannot both be empty.

* Get all notes: GET /api/notes

* Get all notes by certain linkedId: GET /api/notes/?linkedId=xxxx

* Create note: POST /api/notes

* Get note by _id: GET /api/notes/(note._id)

* Update note by _id: PUT /api/notes/(note._id)

* Delete note by _id: DELETE /api/notes/(note._id)

TODO: Document rest of the API.

## Team 
Daniel Quintero (leingad)

Daniel Chalco (chalco)

Jack Fining (jackfining)

Sarah Walker (swalker15)
	
Daniel Garzon Moreno (dgarzonmoreno)
