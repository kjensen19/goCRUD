**Trello Clone** Building as a sort of Trello clone
- **Backend** Go with Gin framework (REST), PostgreSQL database
- **Backend Issues Resolved** CORS issue, lacking a header for anything aside from GET. Resolved via middleware with permissive settings, still working on a more targeted solution. Used closure to incorporate DB pool info into the gin context/handler function.
- **Frontend** Vanilla React with some Material UI components. Still working out total functionality, hoping to add some kind of drag and drop functionality as well as flesh out the detail view for tasks.
- **What's Next** Aside from the above, also planning on adding user authorization and expanding the database functionality to incorporate more complex data sets for groups. Perhaps incorporating Replicache to allow for multiple users to manipulate the same front end and to enable messaging somewhere down the road
- **Deployment** TBD


//TODO:
    General:
        1. Add tests
       X 2. Start working in branches
       X 3. Use normal PR procedure for merging branches etc
       X 4. More comments
        5. Task typing?
        6. Sortable/searchable tasks by type, user, status etc

    FrontEnd:
        1. Task Detail view with edit function
       X 2. Style
        3. Assign functionality (for existing tasks-- edit)
        4. Logo
        5. Login page
        6. page routing?
        7. Multiple boards
        8. App/Menu/Nav bar
        9. Avatars for users
        10. Shared boards
        11. Messaging?
        12. Cypress/Playwright
        13. Implement priority coloring
        14. Enable graphing (chart.js) of task statistics by user etc
        15. DnD?

    Backend:
        1. Clean up cors (currently allowing all)
        2. Implement authorization
        3. Add tables for users, multiple boards(shared)
        4. Unit tests for APIs (fuzz)
        5. Expand info in base table (for more detail view)
        6. Add priority that can be modified to tasks
        7. Track completed tasks (who, when, maybe how long open)