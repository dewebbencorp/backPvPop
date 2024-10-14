export const swaggerOptions = {
	swaggerDefinition: {
	  openapi: '3.0.0',
	  info: {
		title: 'API de Ventas',
		version: '1.0.0',
		description: 'Documentación de la API de ventas',
	  },
	  servers: [

		{
			url: 'http://localhost:3000',
		}

	],
},
apis: ['./routes/.js', './src/routes//.js'], 
  };
  