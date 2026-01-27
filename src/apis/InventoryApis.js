import axios   from "axios";

export const GetAllInventoryItems = async ({startIndex, endIndex}) => {
    try {
        const response = await axios.get(`/api/inventoryGetall?startindex=${startIndex}&endindex=${endIndex}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory items:", error);
        throw error;
    }
};