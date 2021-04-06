import axios from 'axios'

const TECNICOS_GET_ALL = 'http://localhost:8081/api/v1/tecnicos';
const TECNICOS_CREATE = 'http://localhost:8081/api/v1/tecnicos';
const TECNICOS_GET_DISPONIVEIS = 'http://localhost:8081/api/v1/tecnicos/disponiveis'
const TECNICO_INCREASE = 'http://localhost:8081/api/v1/tecnicos/aumentar/'
const TECNICO_GET_ONE = 'http://localhost:8081/api/v1/tecnicos/'

class TecnicoService {
    getTecnicos() {
        return axios.get(TECNICOS_GET_ALL)
    }
    createTecnico(obj: any) {
        return axios.post(TECNICOS_CREATE, obj)
    }
    getTecnicosDisponiveis() {
        return axios.get(TECNICOS_GET_DISPONIVEIS)
    }
    increaseById(body: any) {
        return axios.put(TECNICO_INCREASE + `/${body.id}`, body)
    }
    getById(id: any) {
        return axios.get(TECNICO_GET_ONE + `${id}`)
    }

}

export default new TecnicoService();