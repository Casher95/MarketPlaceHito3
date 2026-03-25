const request = require("supertest");
const app = require("../index"); // Importa tu servidor

describe("Pruebas de Rutas - Hito 3", () => {
    
    test("GET /usuarios devuelve 401 sin token (Autenticación)", async () => {
        const response = await request(app).get("/usuarios");
        expect(response.statusCode).toBe(401);
    });

    test("POST /login devuelve 401 con datos erróneos", async () => {
        const response = await request(app).post("/login").send({
            email: "no_existe@test.com",
            password: "123"
        });
        expect(response.statusCode).toBe(401);
    });

    test("POST /usuarios registra un usuario y devuelve 201", async () => {
        const idUnico = Math.floor(Math.random() * 999);
        const response = await request(app).post("/usuarios").send({
            email: `user${idUnico}@test.com`,
            password: "123",
            rol: "Admin",
            lenguaje: "JavaScript"
        });
        expect(response.statusCode).toBe(201);
    });

    test("Acceso a ruta inexistente devuelve 404", async () => {
        const response = await request(app).get("/ruta-falsa");
        expect(response.statusCode).toBe(404);
    });
});