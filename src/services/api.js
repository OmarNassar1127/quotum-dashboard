import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/dashboard",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
});

// Add token to requests if available
apiInstance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * API Services for Quotum Dashboard
 * All endpoints are prefixed with /api/dashboard
 */
const services = {
    auth: {
        login: async (credentials) => {
            const response = await apiInstance.post("/auth/login", credentials);
            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }
            return response.data;
        },
        register: async (userData) => {
            const response = await apiInstance.post("/auth/register", userData);
            return response.data;
        },
        logout: async () => {
            await apiInstance.post("/auth/logout");
            localStorage.removeItem("token");
        },
        getCurrentUser: async () => {
            const response = await apiInstance.get("/auth/user");
            return response.data;
        }
    },

    dashboard: {
        getStats: async () => {
            const response = await apiInstance.get("/stats");
            return response.data;
        },
        getRecentContent: async () => {
            const response = await apiInstance.get("/content/recent");
            return response.data;
        },
        getRecentActivity: async () => {
            const response = await apiInstance.get("/stats/recent-activity");
            return response.data;
        }
    },

    coins: {
        getAllCoins: async () => {
            const response = await apiInstance.get("/coins");
            return response.data;
        },
        getCoin: async (id) => {
            const response = await apiInstance.get(`/coins/${id}`);
            return response.data;
        },
        getCoinPosts: async (id) => {
            const response = await apiInstance.get(`/coins/${id}/posts`);
            return response.data;
        },
        createCoinPost: async (id, postData) => {
            const response = await apiInstance.post(`/coins/${id}/posts`, postData);
            return response.data;
        }
    },

    posts: {
        getAllPosts: async (coinId = null) => {
            const params = coinId ? { coin_id: coinId } : {};
            const response = await apiInstance.get("/content/posts", { params });
            return response.data;
        },
        getPost: async (id) => {
            const response = await apiInstance.get(`/content/posts/${id}`);
            return response.data;
        },
        createPost: async (postData) => {
            const formData = new FormData();
            Object.keys(postData).forEach(key => {
                if (key === "images") {
                    postData[key].forEach(image => {
                        formData.append("images[]", image);
                    });
                } else {
                    formData.append(key, postData[key]);
                }
            });
            const response = await apiInstance.post("/content/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        },
        updatePost: async (id, postData) => {
            const formData = new FormData();
            Object.keys(postData).forEach(key => {
                if (key === "images") {
                    postData[key].forEach(image => {
                        formData.append("images[]", image);
                    });
                } else {
                    formData.append(key, postData[key]);
                }
            });
            const response = await apiInstance.put(`/content/posts/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return response.data;
        },
        deletePost: async (id) => {
            await apiInstance.delete(`/content/posts/${id}`);
        }
    },

    admin: {
        // User Management
        getUsers: async () => {
            const response = await apiInstance.get("/admin/users");
            return response.data;
        },
        activateUser: async (userId) => {
            const response = await apiInstance.post(`/admin/users/${userId}/activate`);
            return response.data;
        },
        deactivateUser: async (userId) => {
            const response = await apiInstance.post(`/admin/users/${userId}/deactivate`);
            return response.data;
        },
        getActivityLog: async () => {
            const response = await apiInstance.get("/admin/activity");
            return response.data;
        },
        getSettings: async () => {
            const response = await apiInstance.get("/admin/settings");
            return response.data;
        },
        updateSettings: async (data) => {
            const response = await apiInstance.put("/admin/settings", data);
            return response.data;
        },
        // Coin Management
        createCoin: async (coinData) => {
            const response = await apiInstance.post("/admin/coins", coinData);
            return response.data;
        },
        updateCoin: async (id, coinData) => {
            const response = await apiInstance.put(`/admin/coins/${id}`, coinData);
            return response.data;
        },
        deleteCoin: async (id) => {
            await apiInstance.delete(`/admin/coins/${id}`);
        },
        // Background Jobs
        updateCoinPrices: async () => {
            const response = await apiInstance.post("/jobs/update-coin-prices");
            return response.data;
        },
        getJobStatus: async () => {
            const response = await apiInstance.get("/jobs/status");
            return response.data;
        }
    }
};

// Export all services as a single default export
export default services;
