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
<<<<<<< HEAD
				url: 'http://192.168.1.6:3000',
=======
				url: 'http://localhost:3000',
>>>>>>> c1d4ec409e557b9b197e5f0d51cc14abc7e32617
			}

		],
	},
	apis: ['./routes/*.js', './src/routes/**/*.js'], 

};
