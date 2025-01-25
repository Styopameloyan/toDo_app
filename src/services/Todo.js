
import { UserService } from "./User";



export class TodoService {
    static BASE_URL = "http://192.168.0.191:5001/api/todo/";

    static getTodos = async () => {
        const requestOptions = UserService.getRequestOptions();

        try {
            const response = await fetch(`${this.BASE_URL}find`, requestOptions);
            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        }
    }

    static createTodo = async (todo) => {
        const requestOptions = UserService.getRequestOptions(
            {
                body: {
                    title: todo.title,
                    description: todo.description,
                    status: todo.status,
                }
            });

        try {
            const response = await fetch(`${this.BASE_URL}create`, requestOptions);
            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        } finally {
            this.getTodos();
        }
    }
    static deleteTodo = async (id) => {
        const requestOptions = UserService.getRequestOptions({ method: 'DELETE' });

        try {
            const response = await fetch(`${this.BASE_URL}delete/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        } finally {
            this.getTodos();
        }

    }
    static updateTodo = async (id, status) => {
        const requestOptions = UserService.getRequestOptions({ method: 'PUT', body: { status: status } });
        try {
            const response = await fetch(`${this.BASE_URL}update/${id}`, requestOptions);


            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        } finally {
            this.getTodos();
        }
    }

    static editTodo = async (id, title, description) => {
        const requestOptions = UserService.getRequestOptions({ method: 'PUT', body: { title: title, description: description } });
        try {
            const response = await fetch(`${this.BASE_URL}update/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        } finally {
            this.getTodos();
        }
    }
    static makeAvatar = async (displayname) => {

        const fullName = displayname.split(' ');
        const firstName = fullName[0].charAt(0).toUpperCase();
        const lastName = fullName[1] ? fullName[1].charAt(0).toUpperCase() : '';
        return firstName + lastName
    }

    static setAssignee = async (user, todo) => {
        console.log(todo);

        const requestOptions = UserService.getRequestOptions({ method: 'PUT', body: { assignee: user.mail } });
        try {
            const response = await fetch(`${this.BASE_URL}update/${todo.rowid}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Fehler: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);

            return [null, data];
        } catch (error) {
            console.error(error);
            return [error, null];
        } finally {
            this.getTodos();
        }
    }


}
