import axios from 'axios'

const SERVICOS_GET_ALL = 'http://localhost:8081/api/v1/servicos';
const SERVICOS_CREATE = 'http://localhost:8081/api/v1/servicos';
const SERVICOS_BY_ID = 'http://localhost:8081/api/v1/servicos'

class ServicoService {
    getServicos() {
        return axios.get(SERVICOS_GET_ALL)
    }
    createServico(obj: any) {
        return axios.post(SERVICOS_CREATE, obj)
    }
    
    editServico(obj: any) {
        return axios.put(SERVICOS_BY_ID + `/${obj.id}`, obj)
    }
    deleteServico(obj: any) {
        return axios.delete(SERVICOS_BY_ID + `/${obj.id}`, obj)
    }
}

export default new ServicoService();