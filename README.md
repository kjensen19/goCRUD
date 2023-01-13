var tasks = []task{
	{ID: "1", Name: "Build APIs", Description: "REST APIs", Assigned: "Kyle", Status: "In Progress"},
	{ID: "2", Name: "Build DB connection", Description: "Link with Postgres", Assigned: "Kyle", Status: "ToDo"},
	{ID: "3", Name: "Frontend", Description: "Style the boards", Assigned: "Kyle", Status: "Someday"},
}

GET all Request syntax:
 curl http://localhost:8080/tasks \
     --header "Content-Type: application/json" \
     --request "GET"

Get by id:
 curl http://localhost:8080/tasks/2

POST dummy data
 curl http://localhost:8080/tasks \
     --include \
     --header "Content-Type: application/json" \
     --request "POST" \
     --data '{"name": "Decide", "description": "Pick FrontEnd framework", "assigned": "Kyle", "status": "Someday"}'


     Replicache client side template:
        
  
{
	"task/D1BCF6A5-F314-4ECA-B03B-EB540A59D5E3": {
        id": "1", 
        "name": "Build APIs", 
        "description": "REST APIs", 
        "assigned": "Kyle", 
        "status": "In Progress"
    },
	"task/1F4E7403-7112-4B5B-9863-62F49F588AAB": {
        id": "2", 
        "name": "Build DB connection", "description": "Link with Postgres", "assigned": "Kyle", 
        "status": "ToDo"
    },
	"task/2G6Z1004-8390-2M6N-0357-01C39R403KSL"{
        id": "3", 
        "name": "Frontend", 
        "description": "Style the boards", "assigned": "Kyle", 
        "status": "Someday"
    }
}