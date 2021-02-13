window.onload = main;

let canvas;
let ctx;
let assets;
let niveauCourant = 1;
let etatJeu = "MenuPrincipal";
let score = 0;


// ici on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];
let balleChercheuse;
let musiqueCourante = null;

// programme principal
function main() {
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );
  loadAssets(startGame);
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  spanNiveau = document.querySelector("#niveau");
  spanScore = document.querySelector("#score");

  // on ajoute des écouteurs souris/clavier sur le canvas
  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  //canvas.addEventListener("mousedown", traiteMouseDown);
  //canvas.addEventListener("mousedown", traiteMouseDown2);

  // le canvas ne peut détecter les touches que si il a le focus (voir mooc)
  // c'est plus simple de mettre l'écouteur sur le document (la page)
  document.onkeydown = traiteKeyDown;
  document.onkeyup = traiteKeyUp;

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");
  

  console.log(monstre.donneTonNom());

  creerDesBalles(niveauCourant ++);
  creerDesBalles(10);

  requestAnimationFrame(animationLoop);
  setInterval(changePositionYeux, 300); // appelle la fonction changeCouleur toutes les n millisecondes
}
function startGame(assetsLoaded) {

    assets = assetsLoaded;
    //image1 = assetsLoaded[0];
   // musique = assetsLoaded[1];
    // On récupère grace à la selector API un pointeur vers le canvas
    canvas = document.querySelector("#myCanvas");

    // pour dessiner, on a besoin de son "contexte graphique", un objet qui va 
    // permettre de dessiner ou de changer les propriétés du canvas
    ctx = canvas.getContext("2d");

    setUpCanvas();
    assetsToLoadURLs.musique;

    // On ajoute des écouteurs sur le canvas
    canvas.onmousedown = traiteMouseDown;
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;

    // On peut détecter les touche que si il y a le focus sur le canvas
    // Donc on détecte sur le document entier (plus simple)
    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;

    gradient_green = ctx.createLinearGradient(-monstre.radius, 0, monstre.radius, monstre.radius);
    gradient_green.addColorStop(0, "darkgreen");
    gradient_green.addColorStop(0.5, "green");
    gradient_green.addColorStop(1, "white");

    colors = [gradient_green, "rgb(0,0,0,0)"];

    console.log(monstre.donneTonNom());

    initialiserNouvellePartie();

    requestAnimationFrame(animationLoop);
}

function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green", "yellow", "orange", "purple"];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let r = Math.random() * 30;
    let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
    let couleur = tabCouleurs[indexCouleur];
    let vx = -5 + Math.random() * 10;
    let vy = -5 + Math.random() * 10;

    let b = new BalleAvecVitesseXY(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBalles.push(b);
  }

  // on ajoute une balle chercheuse dans le tableau
  /*balleChercheuse = new BalleChercheuse(100, 100, 40, "red", 0, 0);
  tableauDesBalles.push(balleChercheuse);*/
}
function afficheInfoJeu() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.font = "30pt Calibri";

  ctx.fillText("Niveau : " + niveauCourant, 600, 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "blue";

  ctx.strokeText("Niveau : " + niveauCourant, 600, 40);

  ctx.fillText(etatJeu, 20, 40);
  ctx.restore();
}

// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  afficheInfoJeu(); // scores, niveau etc.

  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "EcranChangementNiveau":
      afficheEcranChangementNiveau();
      spanNiveau.innerHTML = niveauCourant;
      break;
    case "GameOver":
      afficheEcranGameOver();
      monstre.draw(ctx);

  updateBalles();

  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
  }

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}
function afficheMenuPrincipal() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";

  ctx.textAlign = 'center';
  ctx.fillText("Cliquez pour démarrer", 400, 200);

  ctx.restore();
}

function afficheEcranChangementNiveau() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "blue";
  ctx.font = "20pt CranberryBlues";
  
  ctx.textAlign = 'center';
  ctx.fillText("Changement niveau", 400, 100);

  ctx.textAlign = 'center';
  ctx.fillText("Cliquez pour niveau suivant", 400, 140);

  ctx.restore();

}

function afficheEcranGameOver() {}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant++;
  creerDesBalles(niveauCourant + 1);
  etatJeu = "JeuEnCours";
}
function afficheScore() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.font = "20pt Calibri";
  ctx.fillText("Niveau " + niveauCourant, 10, 20);
  ctx.fillText("Score :  " + score, 10, 45);
  ctx.restore();
}

function updateJeu() {
  monstre.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }
}

function niveauFini() {
  return tableauDesBalles.length === 0;
}

function traiteCollisionBalleAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon
    )
  ) {
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
    let index = tableauDesBalles.indexOf(b);

    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    tableauDesBalles.splice(index, 1);
    //b.couleur = "pink";
      
    score++;
    spanScore.innerHTML = score;
  }
}

function updateBalles() {
  // utilisation d'un itérateur sur le tableau
  tableauDesBalles.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleAvecMonstre(b);

    b.move();
  });
  
}
