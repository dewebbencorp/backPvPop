export const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PVPOP',
			version: '1.0.0',
			description: 'Punto Venta POP',
		},
		servers: [

			{
				url: 'http://localhost:3000',
			}

		],
	},
	apis: ['./routes/*.js', './src/routes/**/*.js'], 

};
