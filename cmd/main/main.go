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
	cors "github.com/rs/cors/wrapper/gin"
)

type Task struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Assigned    string `json:"assigned"`
	Status      string `json:"status"`
}

// Need to find exact way to make this work, currently routes are working with permissive CORS policies (AllowAll)
// TODO:Pull routes out into pkg/routes
func OptionMessage(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE")
	c.Header("Access-Control-Allow-Headers", "X-Requested-With")
	c.JSON(http.StatusOK, nil)
}
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

	router := gin.Default()
	router.Use(cors.AllowAll())
	router.GET("/tasks", getAllHandler(dbpool))
	router.GET("/tasks/:id", getByIdHandler(dbpool))
	router.POST("/tasks", postHandler(dbpool))
	router.DELETE("/tasks/:id", deleteHandler(dbpool))
	router.PUT("tasks", putHandler(dbpool))
	router.OPTIONS("/tasks/:id", OptionMessage)
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
		c.JSON(http.StatusOK, tasks)
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

// POST Handler
func postHandler(dbpool *pgxpool.Pool) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var newTask Task
		if err := c.BindJSON(&newTask); err != nil {
			return
		}
		id, er := postTask(newTask, dbpool)
		if er != nil {
			fmt.Fprintf(os.Stderr, "Task not added: %v", er)
		}
		fmt.Printf("task created: %v\n", id)
		c.IndentedJSON(http.StatusCreated, newTask)

	}
	return gin.HandlerFunc(fn)
}

// DELETE Handler
func deleteHandler(dbpool *pgxpool.Pool) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		id := c.Param("id")
		err := deleteTask(dbpool, id)
		if err != nil {
			fmt.Fprintf(os.Stderr, "No such task, task id: %v, %v", id, err)
			c.JSON(http.StatusNotFound, gin.H{"message": "Task not found"})
			return
		}

		c.JSON(http.StatusOK, nil)
	}
	return gin.HandlerFunc(fn)
}

// PUT Handler
func putHandler(dbpool *pgxpool.Pool) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var updatedTask Task
		if err := c.BindJSON(&updatedTask); err != nil {
			return
		}
		id, err := updateTask(updatedTask, dbpool)
		if err != nil {
			fmt.Fprintf(os.Stderr, "No such task, task id: %v, %v", updatedTask, err)
		}
		fmt.Printf("task created: %v\n", id)
		c.JSON(http.StatusOK, nil)
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

// POST
func postTask(tas Task, dbpool *pgxpool.Pool) (int64, error) {
	var id int64
	err := dbpool.QueryRow(context.Background(), "INSERT INTO task (name, description, assigned, status) VALUES ($1, $2, $3, $4) RETURNING id;", tas.Name, tas.Description, tas.Assigned, tas.Status).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("postTask: %v", err)
	}

	return id, nil
}

// DELETE
func deleteTask(dbpool *pgxpool.Pool, id string) error {
	err := dbpool.QueryRow(context.Background(), "DELETE FROM task WHERE id=$1 returning id", id).Scan(&id)
	if err != nil {
		return fmt.Errorf("DELETE failed, no id: %v, %v", id, err)
	}

	return nil
}

// PUT
func updateTask(tas Task, dbpool *pgxpool.Pool) (int64, error) {
	var id int64
	err := dbpool.QueryRow(context.Background(), `UPDATE task SET "name"=$1, "description"=$2, "assigned"=$3, "status"=$4 WHERE id=$5 RETURNING id;`, tas.Name, tas.Description, tas.Assigned, tas.Status, tas.ID).Scan(&id)
	if err != nil {
		return 0, fmt.Errorf("UPDATE failed: %v, %v", err, id)

	}
	return id, nil
}
