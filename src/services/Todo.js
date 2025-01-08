import { UserService } from "./User";



export class TodoService {
    static BASE_URL = "http://localhost:5001/api/todo/";

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
}
