// services/authentication/signup.ts
const sendFormData = async (formData: {
    username: string;
    email: string;
    password: string;
    age: number | null;    
    height: number | null;   
    weight: number | null;
    gender: string;
    workoutLevel: string;
}) => {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('User registered successfully:', data);

        
        if (data.token) {
            localStorage.setItem('authToken', data.token);
        }

        return data; 
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; 
    }
};

export default sendFormData;
