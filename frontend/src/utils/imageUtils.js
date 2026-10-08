export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith("http")) return path;
  if (path.startsWith("data:")) return path; // In case of data URIs
  // Provide fallback to local server or render domain
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 
  // Wait, if fallback was `https://zerodegree-ixie.onrender.com` in api.js, let's keep it consistent.
  // Actually, import.meta.env.VITE_API_URL is the right way if defined.
  return `${import.meta.env.VITE_API_URL || 'https://zerodegree-ixie.onrender.com'}${path}`;
};
