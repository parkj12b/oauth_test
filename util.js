async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

async function getData() {
    const url = 'http://ec2-35-77-196-143.ap-northeast-1.compute.amazonaws.com:3000/test';

    try {
        const data = await fetchData(url);

        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}