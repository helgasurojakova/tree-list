import axios from 'axios'

const API = 'http://185.244.172.108:8081'

export const rowsApi = {
  async createEntity() {
    try {
      const response = await axios.post(`${API}/v1/outlay-rows/entity/create`);
      return response.data.id;
    } catch (error) {
        console.error('Error:', error);
    }
  },

  async getRows(eID: number, rowName: string) {
    try {
      const response = await axios.get(`${API}/v1/outlay-rows/entity/${eID}/row/list`, {
        data: {
          id: eID,
          rowName,
        }
      })
      console.log('getRows', response.data)
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async createRow(eID: number, parentID?: number) {
    try {
      const response = await axios.post(`${API}/v1/outlay-rows/entity/${eID}/row/create`, {
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: parentID || null,
          rowName: '',
          salary: 0,
          supportCosts: 0,
        }
      )
      console.log('createRow', response.data)
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async updateRow(eID: number, rID: number) {
    try {
      const response = await axios.post(`${API}/v1/outlay-rows/entity/${eID}/row/${rID}/update`, {
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          rowName: '',
          salary: 0,
          supportCosts: 0,
      })
      console.log('updateRow', response.data)
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  },

  async deleteRow(eID: number, rID: number) {
    try {
      const response = await axios.delete(`${API}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`)
      console.log('deleteRow', response.data)
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  },
}
