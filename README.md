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