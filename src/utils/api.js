const API_URL = 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

const authHeaders = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },
  
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  // Packages
  getPackages: async () => {
    const res = await fetch(`${API_URL}/packages`);
    if (!res.ok) throw new Error('Failed to fetch packages');
    return res.json();
  },

  getPackageById: async (id) => {
    const res = await fetch(`${API_URL}/packages/${id}`);
    if (!res.ok) throw new Error('Failed to fetch package');
    return res.json();
  },

  // Bookings
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...authHeaders()
      },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Booking failed');
    return res.json();
  },

  getMyBookings: async () => {
    const res = await fetch(`${API_URL}/bookings/my-bookings`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  // User Profile
  getProfile: async () => {
    const res = await fetch(`${API_URL}/users/profile`, {
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  updateProfile: async (data) => {
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders()
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  toggleCart: async (packageId) => {
    const res = await fetch(`${API_URL}/users/cart/${packageId}`, {
      method: 'POST',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error('Failed to update cart');
    return res.json();
  },

  addRecentlyViewed: async (packageId) => {
    const res = await fetch(`${API_URL}/users/recently-viewed/${packageId}`, {
      method: 'POST',
      headers: authHeaders()
    });
    // Doesn't strictly need error handling since it's fire-and-forget
    if (!res.ok) console.error('Failed to log recently viewed');
    return res.json();
  }
};
