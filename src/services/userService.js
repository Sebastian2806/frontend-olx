import authHeader from '../helpers/authHeader';

const API_URL = 'http://localhost:8080/';

class UserService {
  getCategories() {
    return fetch(`${API_URL}getCategories`, { headers: authHeader() });
  }
}

export default new UserService();
