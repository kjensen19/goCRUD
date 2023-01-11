package main

import (
	"context"
	"database/sql"
	// "database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Task struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Assigned    string `json:"assigned"`
	Status      string `json:"status"`
}

// var tasks = []task{
// 	{ID: "1", Name: "Build APIs", Description: "REST APIs", Assigned: "Kyle", Status: "In Progress"},
// 	{ID: "2", Name: "Build DB connection", Description: "Link with Postgres", Assigned: "Kyle", Status: "ToDo"},
// 	{ID: "3", Name: "Frontend", Description: "Style the boards", Assigned: "Kyle", Status: "Someday"},
// }

func main() {
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}
	defer dbpool.Close()

	var greeting string
	err = dbpool.QueryRow(context.Background(), "select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(7)
	}

	fmt.Printf(greeting)
	tasks, err := getAllTasks(dbpool)
	if err != nil {
		fmt.Fprintf(os.Stderr, "find task failed: %v\n", err)
		os.Exit(10)
	}
	fmt.Printf("Tasks found: %v\n", tasks)

	router := gin.Default()

	router.GET("/tasks/:id", getByIdHandler(dbpool))
	// router.POST("/tasks", addTask)
	router.GET("/tasks", getAllHandler(dbpool))
	router.Run("localhost:8080")

}

//HANDLERS

// GET Handler
func getAllHandler(dbpool *pgxpool.Pool) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		tasks, err := getAllTasks(dbpool)
		if err != nil {
			fmt.Fprintf(os.Stderr, "find task failed: %v\n", err)
			os.Exit(10)
		}
		fmt.Printf("Tasks found: %v\n", tasks)
		c.IndentedJSON(http.StatusOK, tasks)
	}
	return gin.HandlerFunc(fn)
}

// GET BY ID Handler
func getByIdHandler(dbpool *pgxpool.Pool) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		id := c.Param("id")
		task, err := getByIdTask(dbpool, id)
		if err != nil {
			fmt.Fprintf(os.Stderr, "No such task, task id: %v", id)
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Task not found"})
			return
		}
		fmt.Printf("Task found: %v\n", task)
		c.IndentedJSON(http.StatusOK, task)
	}
	return gin.HandlerFunc(fn)
}

// TASK FUNCTIONS

// GET ALL TASKS
func getAllTasks(dbpool *pgxpool.Pool) ([]Task, error) {
	var tasks []Task

	rows, err := dbpool.Query(context.Background(), "select * from task")
	if err != nil {
		return nil, fmt.Errorf("tasks: %v", err)
	}
	defer rows.Close()
	for rows.Next() {
		var tas Task
		if err := rows.Scan(&tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status); err != nil {
			fmt.Fprintf(os.Stderr, "get all tasks failed: %v", err)
			os.Exit(3)
		}
		tasks = append(tasks, tas)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("tasks: %v", err)
	}
	return tasks, nil
}

// GET BY ID
func getByIdTask(dbpool *pgxpool.Pool, id string) (Task, error) {
	var tas Task
	row := dbpool.QueryRow(context.Background(), "SELECT * FROM task WHERE id=$1", id)
	if err := row.Scan(&tas.ID, &tas.Name, &tas.Description, &tas.Assigned, &tas.Status); err != nil {
		if err == sql.ErrNoRows {
			return tas, fmt.Errorf("GET by id: %v, no such task", id)
		}
		return tas, fmt.Errorf("GET by id %v: %v", id, err)
	}
	return tas, nil
}

// func addTask(c *gin.Context) {
// 	var newTask task

// 	if err := c.BindJSON(&newTask); err != nil {
// 		return
// 	}

// 	tasks = append(tasks, newTask)
// 	c.IndentedJSON(http.StatusCreated, newTask)

// }

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
