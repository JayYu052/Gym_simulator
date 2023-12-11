const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

// 配置 PostgreSQL 数据库连接
const pool = new Pool({
    user: 'postgres', // 替换为您的 PostgreSQL 用户名
    host: 'localhost',
    database: 'user', // 替换为您的数据库名称
    password: 'newpassword', // 替换为您的数据库密码
    port: 5432, // PostgreSQL 默认端口
});


app.get('/', (req, res) => {
    res.send('Wellcome to Gym Operating System');
});


// User Id signed up
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hashedPassword]);

        //res.status(201).send(`user successfully signed up，user id is：${result.rows[0].id}`);

        // send the user id that could be used for building fitnessGoal table
        res.status(201).json({ success: true, userId: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

app.post('/fitnessGoals', async (req, res) => {
    try {
        //
        const { user_id, weight, workout_frequency, health_goal } = req.body;

        const query = 'INSERT INTO fitnessGoals (user_Id, weight, workout_frequency, health_goal) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [user_id, weight, workout_frequency, health_goal];
        
        const result = await pool.query(query, values);

        res.status(201).json({ message: 'fitness goal saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }

});


// 服务器监听
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});