export const getAllusers = async () => {
  try {
    const response = await apiClient.get('/all');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error(error.response.data?.message || 'An error occurred on the server.');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Unable to connect to the server. Please check your network connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};
