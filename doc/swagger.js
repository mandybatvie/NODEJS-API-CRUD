/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - cpf
 *         - tipo_cadastro
 *         - senha
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         nome:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         cpf:
 *           type: string
 *           description: The CPF of the user
 *         tipo_cadastro:
 *           type: string
 *           description: The type of the user (e.g., admin or user)
 *         senha:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: 1
 *         nome: Amanda
 *         email: amanda@gmail.com
 *         cpf: 12345678901
 *         tipo_cadastro: Tipo1
 *         senha: password123
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API CRUD
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna uma lista com todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Altera um usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Deleted user
 *       404:
 *         description: The user was not found
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação para utilizar na rota autenticada (profile)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *           example: amanda@gmail.com
 *         senha:
 *           type: string
 *           description: The user's password
 *           example: password123
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: Invalid credentials
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successfully authenticated, returning JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user's ID
 *           example: 1
 *         nome:
 *           type: string
 *           description: The name of the user
 *           example: Amanda
 *         email:
 *           type: string
 *           description: The user's email
 *           example: amanda@gmail.com
 *         cpf:
 *           type: string
 *           description: The user's CPF
 *           example: 12345678901
 *         tipo_cadastro:
 *           type: string
 *           description: The user's registration type (e.g., admin, user)
 *           example: admin
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: User not found
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: rota autenticada, retorna as informações do perfil que está utilizando o token
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */