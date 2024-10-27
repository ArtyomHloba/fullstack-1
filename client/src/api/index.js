import axios from 'axios';

// TODO: host/post to constant
const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createUser = () => httpClient.post('/users', body);

export const getUsers = () => httpClient.get('/users?results=5&page=1');

export const removeUser = id => httpClient.delete(`/users/${id}`);
