
export default function getTask() {
    const task = async () => {
        try {
            const res = await fetch('https://localhost/8080/tasks');
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
};