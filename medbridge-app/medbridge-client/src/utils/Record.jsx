const API_URL = 'http://localhost:5000/api/records';

export const fetchRecords = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createRecord = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateRecord = async (recordId, formData) => {
  const res = await fetch(`/api/records/${recordId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  return await res.json();
};

