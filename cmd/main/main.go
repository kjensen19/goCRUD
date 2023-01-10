package main

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"net/http"
	"os"
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
	Dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	defer Dbpool.Close()
	var tonic (*gin.Context)
	router := gin.Default(),
		router.GET("/tasks", getTasks)
	router.GET("/tasks/:id", getTask)
	router.POST("/tasks", addTask)

	router.Run("localhost:8080")
}

func getTasks(c *gin.Context) {
	tasks, err := getTaskDB(Dbpool)
	if err != nil {
		return
	}
	c.IndentedJSON(http.StatusOK, tasks)

}

func getTaskDB(dbpool *pgxpool.Pool) ([]task, error) {
	var tasks []task

	rows, err := dbpool.Query(context.Background(), "select * from tasks")
	if err != nil {
		return nil, fmt.Errorf("GET all albums failed: %v", err)
	}
	defer rows.Close()
	for rows.Next() {
		var tas task
		if err := rows.Scan(&tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status); err != nil {
			return nil, fmt.Errorf("GET all albums failed: %v", err)
		}
		tasks = append(tasks, tas)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("GET all albums failed: %v", err)
	}
	return tasks, nil
}

func getTask(c *gin.Context) {
	id := c.Param("id")

	for _, t := range tasks {
		if t.ID == id {
			c.IndentedJSON(http.StatusOK, t)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "task not found"})
}

func addTask(c *gin.Context) {
	var newTask task

	if err := c.BindJSON(&newTask); err != nil {
		return
	}

	tasks = append(tasks, newTask)
	c.IndentedJSON(http.StatusCreated, newTask)

}

//GET all Request syntax:
// curl http://localhost:8080/tasks \
//     --header "Content-Type: application/json" \
//     --request "GET"

//Get by id:
// curl http://localhost:8080/tasks/2

//POST dummy data
// curl http://localhost:8080/tasks \
//     --include \
//     --header "Content-Type: application/json" \
//     --request "POST" \
//     --data '{"id": "4","name": "DnD","description": "Enable DnD","assigned": "Kyle", "status": "lol"}'
