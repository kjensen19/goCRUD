package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type task struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Assigned    string `json:"assigned"`
	Status      string `json:"status"`
}

var tasks = []task{
	{ID: "1", Name: "Build APIs", Description: "REST APIs", Assigned: "Kyle", Status: "In Progress"},
	{ID: "2", Name: "Build DB connection", Description: "Link with Postgres", Assigned: "Kyle", Status: "ToDo"},
	{ID: "3", Name: "Frontend", Description: "Style the boards", Assigned: "Kyle", Status: "Someday"},
}

func main() {
	router := gin.Default()
	router.GET("/tasks", getTasks)
	router.POST("/tasks", addTask)

	router.Run("localhost:8080")
}

func getTasks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, tasks)
}

func addTask(c *gin.Context) {
	var newTask task

	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)

}

//GET Request syntax:
// curl http://localhost:8080/tasks \
//     --header "Content-Type: application/json" \
//     --request "GET"

//POST dummy data
// curl http://localhost:8080/tasks \
//     --include \
//     --header "Content-Type: application/json" \
//     --request "POST" \
//     --data '{"id": "4","name": "DnD","description": "Enable DnD","assigned": "Kyle", "status": "lol"}'
