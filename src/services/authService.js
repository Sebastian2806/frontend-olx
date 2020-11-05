const API_URL = 'http://localhost:8080/';

class AuthService {
  signin(values) {
    return fetch(`${API_URL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  register(values) {
    return fetch(`${API_URL}signup`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  }

  getCurrentUser() {
    return localStorage.getItem('token');
  }

  getCurrentUserId() {
    return localStorage.getItem('user_id');
  }
}

export default new AuthService();
