import axios from "axios";

export const fetchData = async (limit = null) => {
    
    try {
        const url = limit 
            ? `https://global-venture.onrender.com/api/users/fetch-products?limit=${limit}`
            : 'https://global-venture.onrender.com/api/users/fetch-products';
            // ?` /api/users/fetch-products?limit=${limit}`
            // : '/api/users/fetch-products'

        
        
        const response= await axios.get(url);
        return response.data;
        
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return null; // Return null on error
    }
};


// export const fetchData = async (limit = null) => {
//     try {

//         const url = limit 
//             ? `/api/users/fetch-products?limit=${limit}` 
//             : `/api/users/fetch-products`;

  
//         const response = await axios.get(url);
    
//         if (!response.data.success) {
//             throw new Error(response.data.message || "Failed to fetch data");
//         }
  
//       return {
//         data: response.data.data,
//         totalPages: response.data.totalPages,
//         currentPage: response.data.currentPage,
//         error: null,
//         status: response.status
//       };
  
//     } catch (error) {
//       const errorMessage = error.response?.data?.message ||
//                           error.message ||
//                           "Unknown error occurred";
      
//       console.error("API Error:", {
//         endpoint: "/api/users/fetch-products",
//         error: errorMessage,
//         timestamp: new Date().toISOString()
//       });
  
//       return {
//         data: null,
//         totalPages: 0,
//         currentPage: 0,
//         error: errorMessage,
//         status: error.response?.status || 500
//       };
//     }
//   };
