import axios from 'axios'

const CLIENTES_GET_ALL = 'http://localhost:8081/api/v1/clientes';
const CLIENTES_CREATE = 'http://localhost:8081/api/v1/clientes';
const CLIENTE_BY_ID = 'http://localhost:8081/api/v1/clientes'

class ClienteService {
    getClientes() {
        return axios.get(CLIENTES_GET_ALL)
    }
    createCliente(obj: any) {
        return axios.post(CLIENTES_CREATE, obj)
    }
    editCliente(obj: any) {
        return axios.put(CLIENTE_BY_ID + `/${obj.id}`, obj)
    }
    deleteCliente(obj: any) {
        return axios.delete(CLIENTE_BY_ID + `/${obj.id}`, obj)
    }
}

export default new ClienteService();