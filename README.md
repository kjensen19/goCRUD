**Trello Clone** Building as a sort of Trello clone
- **Backend** Go with Gin framework (REST), PostgreSQL database
- **Backend Issues Resolved** CORS issue, lacking a header for anything aside from GET. Resolved via middleware with permissive settings, still working on a more targeted solution. Used closure to incorporate DB pool info into the gin context/handler function.
- **Frontend** Vanilla React with some Material UI components. Still working out total functionality, hoping to add some kind of drag and drop functionality as well as flesh out the detail view for tasks.
- **What's Next** Aside from the above, also planning on adding user authorization and expanding the database functionality to incorporate more complex data sets for groups. Perhaps incorporating Replicache to allow for multiple users to manipulate the same front end and to enable messaging somewhere down the road
- **Deployment** TBD


//TODO:
    FrontEnd:
        1. Task Detail view with edit function
        2. Style
        3. Assign functionality (for existing tasks)
        4. Logo
        5. Login page
        6. page routing
        7. Multiple boards
        8. App/Menu/Nav bar
        9. Avatars for users
        10. Shared boards
        11. Messaging?

    Backend: