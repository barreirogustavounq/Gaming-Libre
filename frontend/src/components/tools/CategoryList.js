const categories = [
  "Notebooks",
  "Fuentes",
  "Monitores",
  "PCs All in One",
  "Placas de Videos",
  "Motherboards",
  "Procesadores",
  "Memorias Ram",
  "Almacenamiento",
  "Gabinetes",
  "Refrigeracion PC",
  "Teclados",
  "Mouse",
  "Pads",
  "Auriculares",
  "Micrófonos",
  "Cámaras Web",
  "Impresoras",
  "Ups y Estabilizadores",
  "Sillas Gamer",
  "Consolas",
  "Parlantes",
  "Proyectores",
  "Software",
  "Tablets",
  "Cables",
  "Juegos",
];

export default categories.sort((a, b) => {
  if (a.toLowerCase() < b.toLowerCase()) return -1;
  if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0;
});
