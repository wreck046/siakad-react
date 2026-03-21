import axios from "axios";

const API_URL = "http://localhost:8080/api/siswa";

export const getSiswa = () => axios.get(API_URL);
export const createSiswa = (data) => axios.post(API_URL, data);
export const updateSiswa = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteSiswa = (id) => axios.delete(`${API_URL}/${id}`);
