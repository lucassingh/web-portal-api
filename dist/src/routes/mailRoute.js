"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailController_1 = require("../controllers/mailController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/send-mail:
 *   post:
 *     summary: Enviar un correo electrónico
 *     description: Endpoint para enviar un correo electrónico con los detalles proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service
 *               - challenge
 *               - name
 *               - email
 *               - phone
 *               - company
 *               - consent
 *             properties:
 *               service:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     description: Valor del servicio seleccionado.
 *                     example: "General Inquiry"
 *                   label:
 *                     type: string
 *                     description: Etiqueta del servicio seleccionado.
 *                     example: "General Inquiry"
 *               challenge:
 *                 type: string
 *                 description: Mensaje o descripción del desafío.
 *                 example: "Este es un mensaje de prueba"
 *               name:
 *                 type: string
 *                 description: Nombre del remitente.
 *                 example: "Juan Perez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del remitente.
 *                 example: "sales.bizit@gmail.com"
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del remitente.
 *                 example: "351568456"
 *               company:
 *                 type: string
 *                 description: Nombre de la compañía del remitente.
 *                 example: "Bizit"
 *               consent:
 *                 type: boolean
 *                 description: Indica si el remitente ha dado su consentimiento.
 *                 example: true
 *     responses:
 *       200:
 *         description: Correo enviado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Correo enviado correctamente"
 *       500:
 *         description: Error al enviar el correo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al enviar el correo"
 */
router.post('/send-mail', mailController_1.sendMailController);
exports.default = router;
