// exemple d'objet litteral
let monstre = {
  x: 100,
  y: 100,
  l: 80,
  h: 80,
  scale: 1,
  incScale: 0,
  xOeil: 450,
  yOeil: 60,
  angle: 0,
  incAngle: 0,
  vitesseX: 0,
  vitesseY: 0,
  donneTonNom: function () {
    return "Je m'appelle Paul, je suis en x= " + this.x + " y=" + this.y;
  },
  draw: function (ctx) {
    // bonne pratique : sauver le contexte courant
    // couleur courante, taille du trait, etc. avant
    // de dessiner ou de modifier qq chose dans le contexte
    ctx.save();
   
    ctx.fillStyle = "black";

    /*ctx.fillRect(110, 110, 30, 20);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(110, 110, 30, 20);*/
    
    ctx.translate(this.x, this.y);
   // ctx.rotate(0.2);

   /* ctx.fillRect(400, 10, this.l, this.h);
    // yeux
    ctx.fillStyle = "red";
    ctx.fillRect(440, 50, 20, 20);
    ctx.fillStyle = "white";

    ctx.fillRect(this.xOeil, this.yOeil, 10, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(540, 50, 20, 20);
    ctx.fillStyle = "white";
    ctx.fillRect(450, 60, 10, 10);
    // bouche
    ctx.fillRect(440, 140, 120, 20);
    ctx.strokeStyle = "rouge";
    ctx.lineWidth = 10;
    ctx.strokeRect(440, 140, 120, 20);

    //ctx.translate(this.x, this.y);
    */

    ctx.translate(this.l / 2, this.h / 2);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.angle);
    ctx.translate(-this.l / 2, -this.h / 2);

    ctx.fillRect(0, 0, this.l, this.h);
    this.drawOeil(ctx);

    // On restaure le contexte
    ctx.restore();
  },

  drawOeil(ctx) {
    ctx.save();

    ctx.fillStyle = "white";
    ctx.fillRect(10, 10, 10, 10);

    //ctx.rotate(0.4);
    ctx.fillStyle = "white";
    ctx.fillRect(50, 10, 10, 10);
    //la bouche
    ctx.fillRect(20,50, 30, 20);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.strokeRect(20,50, 30, 20);

    ctx.restore();
  },

  setPos: function (x, y) {
    this.x = x - this.l / 2;
    this.y = y - this.h / 2;
  },

  move: function () {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
    this.angle += this.incAngle;
    this.scale += this.incScale;
    if (this.scale > 2) this.incScale = -this.incScale;
    if (this.scale < 1) this.incScale = -this.incScale;
  },

  animeYeux: function () {
    this.xOeil = 450 + Math.random() * 5;
    this.yOeil = 60 + Math.random() * 5;
  },
};

function changePositionYeux() {
  //console.log("change changePositionYeux");
  monstre.animeYeux();
}
