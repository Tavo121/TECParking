// Contraseñas: user123 (usuario regular) y admin123 (administrador)

const users = [
    {
        id: 1,
        username: 'user',
        email: 'user@example.com',
        password_hash: '$2b$10$p5a/q0QkaFSINNh1J5qAku/w1aTalpQqbwiFgL/SNR2oO8BQpSkWu', // user123
        role: 'user',
        createdAt: new Date('2024-01-01')
    },
    {
        id: 2,
        username: 'admin',
        email: 'admin@example.com',
        password_hash: '$2b$10$yCoAy5e0MwMjZ.a.Zo9fA.xJFgD2TAoBn37yxQ6xhgvI/Y5Vx8Xti', // admin123
        role: 'admin',
        createdAt: new Date('2024-01-01')
    }
];

module.exports = { users };
