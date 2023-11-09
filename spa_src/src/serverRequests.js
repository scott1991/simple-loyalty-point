export const postJsonData = async (url, data) => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
}

export const getJsonData = async (url) => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}


export default {
  postJsonData: postJsonData,
  getJsonData: getJsonData
}
