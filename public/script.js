/*
document.getElementById('registrationForm').addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('注册信息:', { name, email, password });

    // 这里可以添加更多的代码来处理表单数据，如发送到服务器等
});
*/


/*
// script accept id by user
fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'John', email: 'john@example.com', password: 'password123' })
    })
    .then(response => response.json()) // 解析 JSON 响应
    .then(data => {
        if (data.success) {
            console.log('User successfully signed up. User ID:', data.userId);
            globalUserId = data.userId;
            window.location.href = 'fitness_goals.html';
        } else {
            console.log('Registration failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/




let globalUserId = null;
document.addEventListener('DOMContentLoaded', function() {
if( document.getElementById('registrationForm')) {
    
    document.getElementById('registrationForm').addEventListener('submit', function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('User successfully signed up. User ID:', data.userId);
            globalUserId = data.userId;
            window.location.href = 'fitness_goals.html';
        } else {
            console.log('fuck');
            console.log('Registration failed:', data.message);
            
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    //window.location.href = 'fitness_goals.html';

    })

}
});




if( document.getElementById('fitnessGoalsForm')) {
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fitnessGoalsForm').addEventListener('submit', function(event){
        event.preventDefault();

        const user_id = globalUserId;
        const weight = document.getElementById('weight').value;
        const workout_frequency = document.getElementById('workout_frequency').value;
        const health_goal = document.getElementById('health_goal').value;

        fetch('/fitnessGoals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, weight, workout_frequency, health_goal }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        //window.location.href = 'heath.html';
    });
})
};
