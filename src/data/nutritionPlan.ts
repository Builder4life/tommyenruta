import { Meal } from '../types/nutrition';

export const meals: Meal[] = [
  {
    name: 'Avena Power con Frutas y Nueces',
    category: 'desayuno',
    macros: { calories: 650, carbs: 85, protein: 28, fats: 18 },
    timing: 'Días de entrenamiento - 1.5-2h antes del ride',
    ingredients: [
      '1 taza de avena integral',
      '1 scoop de proteína whey (vainilla)',
      '1 banana mediana',
      '1/4 taza de arándanos',
      '2 cdas de mantequilla de almendra',
      '1 cda de miel',
      'Canela al gusto',
      '1 taza de leche descremada o leche de almendras'
    ],
    instructions: [
      'Cocinar la avena con la leche hasta que esté cremosa',
      'Agregar el scoop de proteína y mezclar bien',
      'Añadir la banana en rodajas y los arándanos',
      'Cubrir con mantequilla de almendra y miel',
      'Espolvorear canela',
      'Comer 1.5-2 horas antes de entrenar para digestión óptima'
    ]
  },
  {
    name: 'Tortilla de Claras con Tostadas Integrales',
    category: 'desayuno',
    macros: { calories: 520, carbs: 55, protein: 45, fats: 12 },
    timing: 'Días de recuperación o descanso',
    ingredients: [
      '6 claras de huevo + 1 huevo completo',
      '1/2 taza de espinacas frescas',
      '1/4 taza de pimientos rojos',
      '2 rebanadas de pan integral',
      '1/4 de aguacate',
      '1 tomate mediano en rodajas',
      'Sal y pimienta al gusto'
    ],
    instructions: [
      'Batir las claras con el huevo completo',
      'Saltear las espinacas y pimientos en sartén antiadherente',
      'Agregar los huevos y cocinar la tortilla',
      'Tostar el pan integral',
      'Servir la tortilla con las tostadas y aguacate',
      'Acompañar con rodajas de tomate fresco'
    ]
  },
  {
    name: 'Pancakes de Proteína con Frutos Rojos',
    category: 'desayuno',
    macros: { calories: 580, carbs: 72, protein: 38, fats: 14 },
    timing: 'Post-entrenamiento matutino',
    ingredients: [
      '1 taza de harina de avena',
      '2 scoops de proteína (sabor vainilla)',
      '2 huevos completos',
      '1 taza de fresas',
      '1/2 taza de arándanos',
      '2 cdas de jarabe de maple puro',
      '1/4 taza de yogurt griego natural',
      'Polvo de hornear'
    ],
    instructions: [
      'Mezclar harina de avena, proteína, huevos y polvo de hornear',
      'Cocinar los pancakes en plancha caliente',
      'Preparar una compota ligera con las fresas y arándanos',
      'Servir los pancakes cubiertos con la compota de frutos',
      'Agregar una cucharada de yogurt griego',
      'Rociar con jarabe de maple',
      'Consumir dentro de 30-45min post-entrenamiento'
    ]
  },
  {
    name: 'Bowl de Arroz con Pollo y Vegetales',
    category: 'almuerzo',
    macros: { calories: 680, carbs: 75, protein: 52, fats: 16 },
    timing: 'Almuerzo estándar días de entrenamiento',
    ingredients: [
      '200g de pechuga de pollo a la plancha',
      '1.5 tazas de arroz integral cocido',
      '1 taza de brócoli al vapor',
      '1/2 taza de zanahorias',
      '1/2 aguacate pequeño',
      '1 cda de aceite de oliva',
      'Salsa de soya baja en sodio',
      'Ajo, jengibre, limón'
    ],
    instructions: [
      'Cocinar el arroz integral (preferiblemente el día anterior)',
      'Marinar el pollo con ajo, jengibre y salsa de soya',
      'Cocinar el pollo a la plancha hasta que esté bien cocido',
      'Cocer al vapor el brócoli y zanahorias hasta que estén tiernos',
      'Montar el bowl: arroz como base, luego vegetales y pollo en rebanadas',
      'Agregar medio aguacate en cubos',
      'Rociar con aceite de oliva y jugo de limón',
      'Opcional: agregar semillas de sésamo'
    ]
  },
  {
    name: 'Pasta Integral con Atún y Tomate',
    category: 'almuerzo',
    macros: { calories: 720, carbs: 88, protein: 48, fats: 18 },
    timing: 'Pre-carga de carbohidratos (día antes de salida larga)',
    ingredients: [
      '150g de pasta integral (peso seco)',
      '2 latas de atún en agua (escurrido)',
      '2 tazas de salsa de tomate casera',
      '1/2 taza de aceitunas negras',
      '2 dientes de ajo',
      'Albahaca fresca',
      '1 cda de aceite de oliva',
      'Queso parmesano (opcional, 20g)'
    ],
    instructions: [
      'Cocinar la pasta integral según instrucciones del paquete',
      'Mientras, saltear el ajo en aceite de oliva',
      'Agregar la salsa de tomate y cocinar 10 minutos',
      'Incorporar el atún escurrido y las aceitunas',
      'Mezclar la pasta cocida con la salsa',
      'Servir con albahaca fresca picada',
      'Opcional: espolvorear queso parmesano',
      'Ideal comerlo 12-18h antes de una salida larga'
    ]
  },
  {
    name: 'Sándwich de Pavo con Ensalada Grande',
    category: 'almuerzo',
    macros: { calories: 580, carbs: 62, protein: 45, fats: 15 },
    timing: 'Almuerzo ligero en días de descanso',
    ingredients: [
      '2 rebanadas de pan integral',
      '150g de pechuga de pavo',
      'Lechuga, tomate, pepino',
      '1 cda de mostaza dijon',
      '3 tazas de ensalada mixta',
      '1/4 taza de garbanzos',
      '2 cdas de vinagreta balsámica',
      'Espinacas baby'
    ],
    instructions: [
      'Tostar ligeramente el pan integral',
      'Untar mostaza dijon en ambas rebanadas',
      'Colocar el pavo, lechuga, tomate y pepino',
      'Preparar ensalada grande con mezcla de hojas verdes',
      'Agregar garbanzos para proteína adicional',
      'Aliñar con vinagreta balsámica',
      'Servir el sándwich con la ensalada al lado'
    ]
  },
  {
    name: 'Salmón al Horno con Quinoa y Espárragos',
    category: 'cena',
    macros: { calories: 620, carbs: 48, protein: 52, fats: 24 },
    timing: 'Cena recuperación post-entrenamiento intenso',
    ingredients: [
      '180g de filete de salmón',
      '1 taza de quinoa cocida',
      '15-20 espárragos',
      '1 cda de aceite de oliva',
      'Limón, ajo, eneldo',
      'Sal y pimienta',
      '1/2 taza de tomates cherry'
    ],
    instructions: [
      'Precalentar horno a 200°C',
      'Marinar el salmón con limón, ajo y eneldo',
      'Hornear el salmón 12-15 minutos',
      'Asar los espárragos con aceite de oliva y sal',
      'Cocinar la quinoa según instrucciones',
      'Añadir tomates cherry a los espárragos los últimos 5 minutos',
      'Servir el salmón sobre la quinoa con espárragos al lado',
      'Rico en Omega-3 para reducir inflamación'
    ]
  },
  {
    name: 'Pollo al Curry con Arroz Basmati',
    category: 'cena',
    macros: { calories: 640, carbs: 68, protein: 50, fats: 16 },
    timing: 'Cena estándar días moderados',
    ingredients: [
      '200g de pechuga de pollo en cubos',
      '1.5 tazas de arroz basmati',
      '1 taza de leche de coco light',
      '2 cdas de pasta de curry',
      '1 cebolla, 2 dientes de ajo',
      '1 taza de garbanzos cocidos',
      'Espinacas, pimientos',
      'Cilantro fresco'
    ],
    instructions: [
      'Cocinar el arroz basmati y reservar',
      'Saltear cebolla y ajo hasta que estén transparentes',
      'Agregar el pollo y dorar por todos lados',
      'Añadir pasta de curry y cocinar 1 minuto',
      'Incorporar leche de coco, garbanzos y vegetales',
      'Cocinar a fuego lento 15-20 minutos',
      'Agregar espinacas al final hasta que se marchiten',
      'Servir sobre arroz basmati con cilantro fresco'
    ]
  },
  {
    name: 'Carne Magra con Batata y Brócoli',
    category: 'cena',
    macros: { calories: 590, carbs: 52, protein: 54, fats: 18 },
    timing: 'Cena alta en proteína días de fuerza',
    ingredients: [
      '180g de carne de res magra (sirloin)',
      '1 batata grande',
      '2 tazas de brócoli',
      '1 cda de aceite de oliva',
      'Romero, tomillo, ajo',
      'Sal marina, pimienta',
      'Opcional: chimichurri ligero'
    ],
    instructions: [
      'Cortar la batata en cubos y hornear a 200°C por 25 minutos',
      'Sazonar la carne con sal, pimienta, romero y ajo',
      'Cocinar la carne a la plancha al término deseado',
      'Cocer el brócoli al vapor 5-7 minutos',
      'Servir la carne con batata asada y brócoli',
      'Opcional: agregar chimichurri casero bajo en aceite',
      'Dejar reposar la carne 5 minutos antes de cortar',
      'Alta en hierro y proteína para recuperación muscular'
    ]
  },
  {
    name: 'Batido Recuperación Post-Ride',
    category: 'snacks',
    macros: { calories: 420, carbs: 58, protein: 32, fats: 8 },
    timing: 'Dentro de 30min post-entrenamiento',
    ingredients: [
      '2 scoops de proteína whey',
      '1 banana grande',
      '1 taza de leche descremada',
      '1/2 taza de avena cruda',
      '1 cda de mantequilla de maní',
      '1 taza de fresas congeladas',
      'Hielo al gusto',
      'Opcional: 1 cda de miel'
    ],
    instructions: [
      'Colocar todos los ingredientes en la licuadora',
      'Licuar hasta obtener consistencia suave y cremosa',
      'Ajustar consistencia con más leche si es necesario',
      'Consumir INMEDIATAMENTE después del entrenamiento',
      'Ventana anabólica: primeros 30-45 minutos son críticos',
      'Relación 2:1 carbohidratos:proteína para recuperación óptima'
    ]
  },
  {
    name: 'Tostadas con Mantequilla de Almendra y Banana',
    category: 'snacks',
    macros: { calories: 380, carbs: 52, protein: 14, fats: 14 },
    timing: '1-1.5h antes del entrenamiento',
    ingredients: [
      '2 rebanadas de pan integral',
      '2 cdas de mantequilla de almendra natural',
      '1 banana mediana',
      'Canela',
      'Miel (opcional)',
      'Semillas de chía'
    ],
    instructions: [
      'Tostar el pan integral hasta que esté dorado',
      'Untar generosamente con mantequilla de almendra',
      'Cortar la banana en rodajas y colocar sobre las tostadas',
      'Espolvorear canela y semillas de chía',
      'Opcional: rociar ligeramente con miel',
      'Carbohidratos de liberación sostenida para energía constante',
      'Comer 60-90min antes de entrenar'
    ]
  },
  {
    name: 'Yogurt Griego con Granola y Frutos',
    category: 'snacks',
    macros: { calories: 340, carbs: 45, protein: 24, fats: 8 },
    timing: 'Media tarde o snack pre-cena',
    ingredients: [
      '1.5 tazas de yogurt griego natural 0% grasa',
      '1/2 taza de granola baja en azúcar',
      '1/2 taza de arándanos frescos',
      '1/4 taza de fresas',
      '1 cda de almendras laminadas',
      '1 cda de miel',
      'Semillas de calabaza'
    ],
    instructions: [
      'Colocar el yogurt griego en un bowl',
      'Agregar la granola sobre el yogurt',
      'Añadir los arándanos y fresas',
      'Espolvorear almendras laminadas y semillas de calabaza',
      'Rociar con miel al gusto',
      'Mezclar todo justo antes de comer',
      'Rico en probióticos para salud digestiva',
      'Alta proteína para saciedad prolongada'
    ]
  }
];

export const mealSchedule = [
  { time: '6:00 AM', meal: 'Desayuno pre-entrenamiento', example: 'Avena Power o Tostadas con Banana' },
  { time: '7:30 AM', meal: 'Durante el ride', example: '60-90g carbos/hora: geles, barras, bebida deportiva' },
  { time: '10:30 AM', meal: 'Post-ride inmediato', example: 'Batido de Recuperación (dentro de 30min)' },
  { time: '12:30 PM', meal: 'Almuerzo', example: 'Bowl de Arroz con Pollo o Pasta con Atún' },
  { time: '4:00 PM', meal: 'Snack tarde', example: 'Yogurt Griego con Granola' },
  { time: '7:00 PM', meal: 'Cena', example: 'Salmón con Quinoa o Pollo al Curry' }
];
