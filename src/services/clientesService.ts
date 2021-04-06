import axios from 'axios'

const CLIENTES_GET_ALL = 'http://localhost:8081/api/v1/clientes';
const CLIENTES_CREATE = 'http://localhost:8081/api/v1/clientes';

class ClienteService {
    getClientes() {
        return axios.get(CLIENTES_GET_ALL)
    }
    createCliente(obj: any) {
        return axios.post(CLIENTES_CREATE, obj)
    }
}

export default new ClienteService();