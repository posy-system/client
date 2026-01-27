import axios from "axios";

export const GetBills = async () => {
    try {
        const response = await axios.get('/bill/all-bills');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const GetBillById = async (id) => {
    try {
        const response = await axios.get(`/bill/get-bill/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DeleteBill = async (id) => {
    try {
        const response = await axios.delete(`/bill/delete-bill/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
