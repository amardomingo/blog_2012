module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here
    migration.createTable(
      'Posts', {  id: { type: DataTypes.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                        unique: true },
            authorId: { type: DataTypes.INTEGER,
                        allowNull: false },
               title: { type: DataTypes.STRING,
                        allowNull: false,
                        defaultValue:'Titulo del Posts' },
                body: { type: DataTypes.TEXT,
                        allowNull: false },
           createdAt: { type: DataTypes.DATE,
                        allowNull: false },
           updatedAt: { type: DataTypes.DATE,
                        allowNull: false }
      }, { sync: {force:true} });
    migration.BulkUpdate(
    'Posts', [{ id: 3,
       authorId: 0,
       title: 'La disonancia de Melkor',
       body: 'Entonces las voces de los Ainur, como de arpas y laúdes, pífanos y trompetas, violas y órganos, y como de coros incontables que cantan con palabras, empezaron a convertir el tema de Ilúvatar en una gran música; y un sonido se elevó de innumerables melodías alternadas, entretejidas en una armonía que iba más allá del oído hasta las profundidades y las alturas, rebosando los espacios de la morada de Ilúvatar; y al fin la música y e1 eco de la música desbordaron volcándose en el Vacío, y ya no hubo vacío. Nunca desde entonces hicieron los Ainur una música como ésta aunque se ha dicho que los coros de los Ainur y los Hijos de Ilúvatar harán ante él una música todavía más grande, después del fin de los días. Entonces los temas de Ilúvatar se tocarán correctamente y tendrán ser en el momento en que aparezcan, pues todos entenderán entonces plenamente la intención del Único para cada una de las partes, y conocerán la comprensión de los demás, e Ilúvatar pondrá en los pensamientos de ellos el fuego secreto.\r\n\r\nPero ahora Ilúvatar escuchaba sentado, y durante un largo rato le pareció bien, pues no había fallas en la música. Pero a medida que el tema prosperaba, nació un deseo en el corazón de Melkor: entretejer asuntos de su propia imaginación que no se acordaban con el tema de Ilúvatar, porque intentaba así acrecentar el poder y la gloria de la parte que le había sido asignada. A Melkor, entre los Ainur, le habían sido dados los más grandes dones de poder y conocimiento, y tenía parte en todos los dones de sus hermanos. Con frecuencia había ido solo a los sitios vacíos en busca de la Llama Imperecedera; porque grande era el deseo que ardía en él de dar ser a cosas propias, y le parecía que Ilúvatar no se ocupaba del Vacío, cuya desnudez le impacientaba. No obstante, no encontró el Fuego, porque el Fuego está con Ilúvatar. Pero hallándose solo, había empezado a tener pensamientos propios, distintos de los de sus hermanos.\r\n',
       createdAt: Wed May 22 2013 19:02:48 GMT+0200 (CEST),
       updatedAt: Wed May 22 2013 19:02:48 GMT+0200 (CEST) },
     { id: 2,
       authorId: 0,
       title: 'La música de los Ainur',
       body: 'En el principio estaba Eru, el Único, que en Arda es llamado Ilúvatar; y primero hizo a los Ainur, los Sagrados, que eran vástagos de su pensamiento, y estuvieron con él antes que se hiciera alguna otra cosa. y les habló y les propuso temas de música; y cantaron ante él y él se sintió complacido. Pero por mucho tiempo cada uno de ellos cantó solo, o junto con unos pocos, mientras el resto escuchaba; porque cada uno sólo entendía aquella parte de la mente de Ilúvatar de la que provenía él mismo, y eran muy lentos en comprender el canto de sus hermanos. Pero cada vez que escuchaban, alcanzaban una comprensión más profunda, y crecían en unisonancia y armonía.\r\n\r\nY sucedió que Ilúvatar convocó a todos los Ainur , y les comunicó un tema poderoso, descubriendo para ellos cosas todavía más grandes y más maravillosas que las reveladas hasta entonces; y la gloria del principio y el esplendor del final asombraron a los Ainur, de modo que se inclinaron ante Ilúvatar y guardaron\r\nsilencio.\r\n\r\nEntonces les dijo Ilúvatar: —Del tema que os he comunicado, quiero ahora que hagáis, juntos y en armonía, una Gran Música. y como os he inflamado con la Llama Imperecedera, mostraréis vuestros poderes en el adorno de este tema mismo, cada cual con sus propios pensamientos y recursos, si así le place. Pero yo me sentaré y escucharé, y será de mi agradó que por medio de vosotros una gran belleza despierte en canción.\r\n\r\n',
       createdAt: Wed May 22 2013 18:59:37 GMT+0200 (CEST),
       updatedAt: Wed May 22 2013 18:59:37 GMT+0200 (CEST) },
 
     { id: 1,
       authorId: 0,
       title: 'Lorem ipsum',
       body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate nibh sed sapien ultricies ut molestie nisl ultrices. Fusce blandit eros pretium massa auctor feugiat nec vel nisl. Vivamus semper feugiat libero a blandit. Donec sollicitudin laoreet augue sed tincidunt. Maecenas rhoncus consequat lobortis. Nulla scelerisque congue quam, a tincidunt velit suscipit tempor. Donec eu metus vitae eros consectetur pretium. Vestibulum est tortor, consectetur eget bibendum vel, mattis eu mauris. Praesent lobortis congue elementum. Sed hendrerit, tortor ac cursus tristique, lectus magna egestas odio, id ullamcorper nulla tellus et lectus. Nunc sed congue elit.\r\n\r\nAliquam vestibulum, velit commodo consequat viverra, sem dui blandit lectus, at tincidunt nisi sem sed erat. Nulla libero sem, pretium vel consectetur faucibus, tempus nec metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis nunc nunc. Cras vitae libero eget velit consectetur aliquam eget sed massa. Nullam interdum iaculis eros, id pulvinar odio laoreet a. Nulla facilisi. ',
       createdAt: Wed May 22 2013 18:56:28 GMT+0200 (CEST),
       updatedAt: Wed May 22 2013 18:56:28 GMT+0200 (CEST) },
    {id: 1,
    authorId: 0,
    title: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate nibh sed sapien ultricies ut molestie nisl ultrices. Fusce blandit eros pretium massa auctor feugiat nec vel nisl. Vivamus semper feugiat libero a blandit. Donec sollicitudin laoreet augue sed tincidunt. Maecenas rhoncus consequat lobortis. Nulla scelerisque congue quam, a tincidunt velit suscipit tempor. Donec eu metus vitae eros consectetur pretium. Vestibulum est tortor, consectetur eget bibendum vel, mattis eu mauris. Praesent lobortis congue elementum. Sed hendrerit, tortor ac cursus tristique, lectus magna egestas odio, id ullamcorper nulla tellus et lectus. Nunc sed congue elit.\r\n\r\nAliquam vestibulum, velit commodo consequat viverra, sem dui blandit lectus, at tincidunt nisi sem sed erat. Nulla libero sem, pretium vel consectetur faucibus, tempus nec metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis nunc nunc. Cras vitae libero eget velit consectetur aliquam eget sed massa. Nullam interdum iaculis eros, id pulvinar odio laoreet a. Nulla facilisi. ',
    createdAt: Wed May 22 2013 18:56:28 GMT+0200 (CEST),
    updatedAt: Wed May 22 2013 18:56:28 GMT+0200 (CEST),
    }]
    ).complete(done);;

  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here
      migration.dropTable('Posts')
        .complete(done);
  }
}
