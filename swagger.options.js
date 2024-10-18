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
				url: 'https://192.168.1.6:3000',
			},
			{
				url: 'http://192.168.1.6:8080',
			}

		],
	},
	apis: ['./routes/*.js', './src/routes/**/*.js'], 

};
