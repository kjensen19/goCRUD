export default handlePull;

async function handlePull(req, res){
    res.json({
        lastMutationID: 0,
        cookie: null,
        patch: [
            {op: 'clear'},
        {
            op: 'put',
            key: 'task/qpdgkvpb9ao',
            value: {
                from: 'Kyle',
                content: "Build APIs",
                order: 1,
            },
        },
        {
            op: 'put',
            key: 'task/5ahljadc408',
            value: {
                from: 'Future Kyle',
                content: 'Build DB connection',
                order: 2,
            },
        },
        ],
    });
    res.end();
}



// {
// 	"task/D1BCF6A5-F314-4ECA-B03B-EB540A59D5E3": {
//         id": "1", 
//         "name": "Build APIs", 
//         "description": "REST APIs", 
//         "assigned": "Kyle", 
//         "status": "In Progress"
//     },
// 	"task/1F4E7403-7112-4B5B-9863-62F49F588AAB": {
//         id": "2", 
//         "name": "Build DB connection", "description": "Link with Postgres", "assigned": "Kyle", 
//         "status": "ToDo"
//     },
// 	"task/2G6Z1004-8390-2M6N-0357-01C39R403KSL"{
//         id": "3", 
//         "name": "Frontend", 
//         "description": "Style the boards", "assigned": "Kyle", 
//         "status": "Someday"
//     }
// }