/* SKAB — opskrifter, egne opskrifter og opskriftsside */
"use strict";

const recipes = [
  { id:"tomatpasta", name:"Cremet tomatpasta", category:"Pasta", description:"En enkel og cremet pasta med tomat, hvidløg og parmesan.", time:"25 min", difficulty:"Nem",
    ingredients:[{name:"Tomat",amount:400,unit:"g"},{name:"Pasta",amount:200,unit:"g"},{name:"Hvidløg",amount:2,unit:"stk"},{name:"Fløde",amount:1,unit:"dl"},{name:"Parmesan",amount:50,unit:"g"}],
    steps:["Kog pastaen i letsaltet vand efter anvisningen på pakken.","Hak hvidløget fint og steg det kort i lidt olie.","Tilsæt tomater og fløde. Lad saucen simre i cirka 10 minutter.","Vend den kogte pasta i saucen.","Riv parmesan over pastaen og server."] },
  { id:"gronpasta", name:"Grøn pasta", category:"Vegetarisk", description:"Pasta med grønne grøntsager, citron og hvidløg.", time:"20 min", difficulty:"Nem",
    ingredients:[{name:"Pasta",amount:200,unit:"g"},{name:"Spinat",amount:100,unit:"g"},{name:"Broccoli",amount:150,unit:"g"},{name:"Hvidløg",amount:2,unit:"stk"},{name:"Citron",amount:1,unit:"stk"}],
    steps:["Kog pastaen i letsaltet vand.","Skær broccoli i små buketter og kog dem med pastaen de sidste minutter.","Steg hvidløg og spinat kort på en pande.","Vend pasta og broccoli sammen med spinaten.","Pres frisk citron over retten og server."] },
  { id:"kartoffel-bowl", name:"Sprød kartoffel-bowl", category:"Bowl", description:"Ovnbagte kartofler med grøntsager og en frisk dressing.", time:"35 min", difficulty:"Nem",
    ingredients:[{name:"Kartoffel",amount:500,unit:"g"},{name:"Gulerod",amount:2,unit:"stk"},{name:"Agurk",amount:0.5,unit:"stk"},{name:"Yoghurt",amount:2,unit:"dl"},{name:"Citron",amount:0.5,unit:"stk"}],
    steps:["Skær kartoflerne i mindre stykker.","Vend dem med olie, salt og peber og bag dem ved 220 grader i cirka 30 minutter.","Skær gulerødder og agurk i mindre stykker.","Bland yoghurt med citronsaft til en enkel dressing.","Anret grøntsagerne med de sprøde kartofler og dressing."] },
  { id:"omelet", name:"Omelet med grønt", category:"Æg", description:"En hurtig omelet med æg, grøntsager og friske urter.", time:"15 min", difficulty:"Nem",
    ingredients:[{name:"Æg",amount:3,unit:"stk"},{name:"Spinat",amount:100,unit:"g"},{name:"Tomat",amount:1,unit:"stk"},{name:"Løg",amount:0.5,unit:"stk"},{name:"Friske urter",amount:1,unit:"stk"}],
    steps:["Pisk æggene sammen i en skål.","Hak løg og tomat.","Steg løg, tomat og spinat kort på en pande.","Hæld æggene over grøntsagerne.","Lad omeletten sætte sig og fold den sammen."] },
  { id:"stegte-ris", name:"Stegte ris", category:"Asiatisk", description:"En nem måde at bruge ris og grøntsager fra køleskabet.", time:"20 min", difficulty:"Nem",
    ingredients:[{name:"Kogte ris",amount:300,unit:"g"},{name:"Æg",amount:2,unit:"stk"},{name:"Gulerod",amount:1,unit:"stk"},{name:"Ært",amount:100,unit:"g"},{name:"Sojasauce",amount:2,unit:"dl"}],
    steps:["Hak grøntsagerne i små stykker.","Steg grøntsagerne på en varm pande.","Tilsæt de kogte ris og steg dem sprøde.","Skub risene til siden og steg æggene på panden.","Bland det hele sammen og tilsæt sojasauce."] },
  { id:"grontsagssuppe", name:"Grøntsagssuppe", category:"Suppe", description:"En varm og enkel suppe lavet af de grøntsager, du har.", time:"40 min", difficulty:"Nem",
    ingredients:[{name:"Kartoffel",amount:300,unit:"g"},{name:"Gulerod",amount:2,unit:"stk"},{name:"Løg",amount:1,unit:"stk"},{name:"Bouillon",amount:5,unit:"dl"},{name:"Valgfrie grøntsager",amount:200,unit:"g"}],
    steps:["Skær alle grøntsagerne i mindre stykker.","Steg løget kort i lidt olie.","Tilsæt resten af grøntsagerne og bouillon.","Lad suppen simre i cirka 25 minutter.","Blend suppen eller server den med grøntsagsstykker."] }
];

const CUSTOM_RECIPES_KEY = "skabCustomRecipes";
function readStorage(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
  catch { return fallback; }
}
function getCustomRecipes() { return readStorage(CUSTOM_RECIPES_KEY, []); }
function getAllRecipes() { return [...recipes, ...getCustomRecipes()]; }
function saveCustomRecipe(recipe) {
  const custom = getCustomRecipes();
  const index = custom.findIndex(item => item.id === recipe.id);
  if (index >= 0) custom[index] = recipe; else custom.push(recipe);
  localStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(custom));
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}
function normalizeIngredientName(name) {
  const value = String(name).toLowerCase().trim();
  const variations = {"tomater":"tomat","kartofler":"kartoffel","gulerødder":"gulerod","citroner":"citron","agurker":"agurk","æbler":"æble","bananer":"banan","pærer":"pære","appelsiner":"appelsin","ærter":"ært"};
  return variations[value] || value;
}
function convertToBaseUnit(amount, unit) {
  switch (String(unit).toLowerCase()) {
    case "kg": return {amount:Number(amount)*1000,unit:"g"};
    case "g": return {amount:Number(amount),unit:"g"};
    case "l": return {amount:Number(amount)*1000,unit:"ml"};
    case "dl": return {amount:Number(amount)*100,unit:"ml"};
    case "ml": return {amount:Number(amount),unit:"ml"};
    case "stk": case "stk.": return {amount:Number(amount),unit:"stk"};
    default: return {amount:Number(amount),unit:String(unit).toLowerCase()};
  }
}
function convertFromBaseUnit(amount, unit) {
  switch (String(unit).toLowerCase()) {
    case "kg": return amount/1000; case "g": return amount;
    case "l": return amount/1000; case "dl": return amount/100;
    case "ml": case "stk": return amount; default: return amount;
  }
}
function findPantryIngredient(recipeIngredient, pantryIngredients) {
  const recipeName = normalizeIngredientName(recipeIngredient.name);
  return pantryIngredients.find(item => normalizeIngredientName(item.name) === recipeName);
}
function compareIngredient(recipeIngredient, pantryIngredient) {
  if (!pantryIngredient) return {status:"missing",missingAmount:recipeIngredient.amount,missingUnit:recipeIngredient.unit};
  const recipeBase = convertToBaseUnit(recipeIngredient.amount, recipeIngredient.unit);
  const pantryBase = convertToBaseUnit(pantryIngredient.quantity, pantryIngredient.unit);
  if (recipeBase.unit !== pantryBase.unit) return {status:"unknown",missingAmount:recipeIngredient.amount,missingUnit:recipeIngredient.unit};
  const difference = pantryBase.amount - recipeBase.amount;
  if (difference >= 0) return {status:"enough",missingAmount:0,missingUnit:recipeIngredient.unit};
  return {status:"partial",missingAmount:convertFromBaseUnit(Math.abs(difference),recipeIngredient.unit),missingUnit:recipeIngredient.unit};
}
function calculateDaysUntilExpiry(expiry) {
  if (!expiry) return Infinity;
  const today = new Date(); today.setHours(0,0,0,0);
  const expiryDate = new Date(expiry); expiryDate.setHours(0,0,0,0);
  return Math.ceil((expiryDate-today)/(1000*60*60*24));
}
function calculateRecipeMatch(recipe, pantryIngredients) {
  let enoughCount=0, partialCount=0, earliestExpiry=Infinity;
  recipe.ingredients.forEach(ingredient => {
    const pantryIngredient=findPantryIngredient(ingredient,pantryIngredients);
    const comparison=compareIngredient(ingredient,pantryIngredient);
    if(comparison.status==="enough") enoughCount++;
    if(comparison.status==="partial") partialCount++;
    if(pantryIngredient) earliestExpiry=Math.min(earliestExpiry,calculateDaysUntilExpiry(pantryIngredient.expiry));
  });
  return {enoughCount,partialCount,matchedCount:enoughCount+partialCount,totalCount:recipe.ingredients.length,earliestExpiry};
}
function sortRecipes(recipeArray, pantryIngredients) {
  return recipeArray.map(recipe => ({recipe,match:calculateRecipeMatch(recipe,pantryIngredients)}))
    .sort((a,b) => b.match.enoughCount-a.match.enoughCount || b.match.matchedCount-a.match.matchedCount || a.match.earliestExpiry-b.match.earliestExpiry);
}
function formatAmount(amount,unit) {
  const number=Number(amount);
  const rounded=Number.isInteger(number)?number:Number(number.toFixed(2));
  return `${rounded} ${unit==="stk"?"stk.":unit}`;
}
function getRatings() { return readStorage("skabRatings",{}); }
function saveRating(recipeId,rating) {
  const ratings=getRatings();
  if(typeof ratings[recipeId]==="number") ratings[recipeId]=[ratings[recipeId]];
  if(!Array.isArray(ratings[recipeId])) ratings[recipeId]=[];
  ratings[recipeId].push(Number(rating));
  localStorage.setItem("skabRatings",JSON.stringify(ratings));
  return ratings[recipeId];
}
function getAverageRating(ratings) {
  if(!Array.isArray(ratings)||!ratings.length) return 0;
  return ratings.reduce((sum,rating)=>sum+Number(rating),0)/ratings.length;
}
function getRecipeHistory() { return readStorage("skabRecipeHistory",{}); }
function registerRecipeMade(recipe) {
  const history=getRecipeHistory();
  if(!history[recipe.id]) history[recipe.id]={timesMade:0,lastMade:null};
  history[recipe.id].timesMade++;
  history[recipe.id].lastMade=new Date().toISOString();
  localStorage.setItem("skabRecipeHistory",JSON.stringify(history));
}
function makeRecipe(recipe) {
  registerRecipeMade(recipe);
  let pantryIngredients=readStorage("skabIngredients",[]);
  recipe.ingredients.forEach(recipeIngredient=>{
    const pantryIngredient=findPantryIngredient(recipeIngredient,pantryIngredients);
    if(!pantryIngredient) return;
    const recipeBase=convertToBaseUnit(recipeIngredient.amount,recipeIngredient.unit);
    const pantryBase=convertToBaseUnit(pantryIngredient.quantity,pantryIngredient.unit);
    if(recipeBase.unit!==pantryBase.unit) return;
    const remaining=pantryBase.amount-recipeBase.amount;
    if(remaining>0) pantryIngredient.quantity=convertFromBaseUnit(remaining,pantryIngredient.unit);
    else pantryIngredients=pantryIngredients.filter(item=>item.id!==pantryIngredient.id);
  });
  localStorage.setItem("skabIngredients",JSON.stringify(pantryIngredients));
  showRecipe(recipe,true);
}

/* Formular: egne opskrifter */
function addIngredientInput(value={name:"",amount:"",unit:"g"}) {
  const container=document.getElementById("ingredientRows"); if(!container) return;
  const row=document.createElement("div"); row.className="ingredient-row";
  row.innerHTML=`<input aria-label="Ingrediens" placeholder="Ingrediens" value="${escapeHtml(value.name)}">
    <input aria-label="Mængde" type="number" min="0" step="any" placeholder="Mængde" value="${escapeHtml(value.amount)}">
    <select aria-label="Enhed">${["g","kg","ml","dl","l","stk","tsk","spsk"].map(unit=>`<option ${unit===value.unit?"selected":""}>${unit}</option>`).join("")}</select>
    <button type="button" aria-label="Fjern ingrediens">×</button>`;
  row.querySelector("button").addEventListener("click",()=>row.remove()); container.appendChild(row);
}
function addStepInput(value="") {
  const container=document.getElementById("stepRows"); if(!container) return;
  const row=document.createElement("div"); row.className="step-row";
  row.innerHTML=`<textarea aria-label="Fremgangsmåde" placeholder="Beskriv dette trin…">${escapeHtml(value)}</textarea><button type="button" aria-label="Fjern trin">×</button>`;
  row.querySelector("button").addEventListener("click",()=>row.remove()); container.appendChild(row);
}
function initRecipeForm() {
  const dialog=document.getElementById("recipeDialog"); if(!dialog) return;
  const form=document.getElementById("recipeForm");
  const open=()=>{dialog.showModal(); if(!document.querySelector(".ingredient-row")) addIngredientInput(); if(!document.querySelector(".step-row")) addStepInput();};
  const close=()=>dialog.close();
  document.getElementById("openRecipeForm").addEventListener("click",open);
  document.getElementById("closeRecipeForm").addEventListener("click",close);
  document.getElementById("cancelRecipeForm").addEventListener("click",close);
  document.getElementById("addIngredientRow").addEventListener("click",()=>addIngredientInput());
  document.getElementById("addStepRow").addEventListener("click",()=>addStepInput());
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const error=document.getElementById("recipeFormError"); error.textContent="";
    const data=new FormData(form);
    const ingredients=[...document.querySelectorAll(".ingredient-row")].map(row=>{
      const inputs=row.querySelectorAll("input"); return {name:inputs[0].value.trim(),amount:Number(inputs[1].value),unit:row.querySelector("select").value};
    }).filter(item=>item.name && item.amount>0);
    const steps=[...document.querySelectorAll(".step-row textarea")].map(input=>input.value.trim()).filter(Boolean);
    if(!String(data.get("name")||"").trim()){error.textContent="Skriv et navn på opskriften.";return;}
    if(!ingredients.length){error.textContent="Tilføj mindst én ingrediens med en mængde.";return;}
    if(!steps.length){error.textContent="Tilføj mindst ét trin i fremgangsmåden.";return;}
    const name=String(data.get("name")).trim();
    const recipe={id:`egen-${Date.now()}`,name,category:String(data.get("category")||"Min opskrift").trim()||"Min opskrift",
      description:String(data.get("description")||"En opskrift fra dit eget SKAB.").trim(),time:String(data.get("time")||"Ikke angivet").trim(),
      difficulty:String(data.get("difficulty")||"Nem"),ingredients,steps,sourceUrl:""};
    saveCustomRecipe(recipe); form.reset(); document.getElementById("ingredientRows").innerHTML=""; document.getElementById("stepRows").innerHTML="";
    dialog.close(); renderRecipeList(); window.location.href=`opskrift.html?id=${encodeURIComponent(recipe.id)}`;
  });

  document.getElementById("importRecipeButton").addEventListener("click",async()=>{
    const url=document.getElementById("recipeUrl").value.trim();
    const status=document.getElementById("importStatus");
    if(!url){status.textContent="Indsæt først et link.";return;}
    try {
      const parsed=new URL(url);
      if(!["http:","https:"].includes(parsed.protocol)) throw new Error("Linket skal begynde med http:// eller https://.");
    } catch { status.textContent="Det ligner ikke et gyldigt link.";return; }
    status.textContent="Henter opskriften…";
    try {
      const response=await fetch("/api/import-recipe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error||"Opskriften kunne ikke hentes.");
      const recipe=result.recipe;
      form.elements.name.value=recipe.name||"";
      form.elements.category.value=recipe.category||"";
      form.elements.time.value=recipe.time||"";
      form.elements.difficulty.value=recipe.difficulty||"Nem";
      form.elements.description.value=recipe.description||"";
      document.getElementById("ingredientRows").innerHTML="";
      (recipe.ingredients||[]).forEach(addIngredientInput);
      document.getElementById("stepRows").innerHTML="";
      (recipe.steps||[]).forEach(addStepInput);
      document.getElementById("importStatus").textContent="Opskriften er hentet. Gennemgå og ret gerne indholdet, før du gemmer.";
    } catch(error) {
      status.textContent=error.message.includes("Failed to fetch")
        ?"Importserveren svarer ikke. Start serveren som beskrevet i README-filen."
        :error.message;
    }
  });
}

/* Opskriftsoversigt */
function renderRecipeList() {
  const recipeList=document.getElementById("recipeList"); if(!recipeList) return;
  const pantryIngredients=readStorage("skabIngredients",[]);
  const search=(document.getElementById("recipeSearch")?.value||"").toLowerCase().trim();
  const category=document.getElementById("categoryFilter")?.value||"";
  const all=getAllRecipes();
  const categories=[...new Set(all.map(recipe=>recipe.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"da"));
  const filter=document.getElementById("categoryFilter");
  if(filter) {
    const previous=filter.value;
    filter.innerHTML='<option value="">Alle kategorier</option>'+categories.map(item=>`<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
    filter.value=categories.includes(previous)?previous:"";
  }
  const visible=sortRecipes(all,pantryIngredients).filter(({recipe})=>{
    const matchesCategory=!category||recipe.category===category;
    const text=[recipe.name,recipe.category,recipe.description,...recipe.ingredients.map(item=>item.name)].join(" ").toLowerCase();
    return matchesCategory&&(!search||text.includes(search));
  });
  document.getElementById("recipeCount").textContent=`${all.length} OPSKRIFTER`;
  recipeList.innerHTML="";
  if(!visible.length) { recipeList.innerHTML='<p class="empty-recipes">Ingen opskrifter matcher din søgning. Prøv et andet ord eller tilføj en ny opskrift.</p>'; return; }
  visible.forEach(({recipe,match})=>{
    let matchText=match.enoughCount===match.totalCount?"Du har alt til opskriften":match.enoughCount>0?`${match.enoughCount} af ${match.totalCount} ingredienser`:match.matchedCount>0?`Du har ${match.matchedCount} af ${match.totalCount}`:"Flere ingredienser mangler";
    let expiryText=match.earliestExpiry===Infinity?"Ingen ingredienser fra dit skab":match.earliestExpiry<0?"Noget er udløbet":match.earliestExpiry===0?"Noget udløber i dag":match.earliestExpiry===1?"Noget udløber i morgen":`Noget udløber om ${match.earliestExpiry} dage`;
    const card=document.createElement("a"); card.className="recipe-card"; card.href=`opskrift.html?id=${encodeURIComponent(recipe.id)}`;
    card.innerHTML=`<div class="recipe-top"><span class="recipe-category">${escapeHtml(recipe.category)}</span><span class="recipe-arrow">↗</span></div>
      <div class="recipe-content"><h3>${escapeHtml(recipe.name)}</h3><p>${escapeHtml(recipe.description)}</p>
      <div class="recipe-info"><span>${escapeHtml(recipe.time)}</span><span>${escapeHtml(recipe.difficulty)}</span></div>
      <div class="recipe-match-preview"><strong>${escapeHtml(matchText)}</strong><span>${escapeHtml(expiryText)}</span></div></div>`;
    recipeList.appendChild(card);
  });
}

/* Enkeltside */
function showRecipe(recipe,wasMade=false) {
  const recipeDetail=document.getElementById("recipeDetail"); if(!recipeDetail) return;
  const pantryIngredients=readStorage("skabIngredients",[]);
  let enoughCount=0;
  const ingredientList=recipe.ingredients.map(ingredient=>{
    const pantryIngredient=findPantryIngredient(ingredient,pantryIngredients);
    const comparison=compareIngredient(ingredient,pantryIngredient);
    if(comparison.status==="enough") enoughCount++;
    const statusIcon=comparison.status==="enough"?"✓":comparison.status==="partial"?"−":"○";
    const statusText=comparison.status==="enough"?"Du har nok":comparison.status==="unknown"?"Kan ikke sammenlignes":`Mangler ${formatAmount(comparison.missingAmount,comparison.missingUnit)}`;
    return `<li class="${comparison.status}"><span><span class="ingredient-status">${statusIcon}</span>${escapeHtml(ingredient.name)}</span>
      <span class="ingredient-amount">${formatAmount(ingredient.amount,ingredient.unit)}<small>${escapeHtml(statusText)}</small></span></li>`;
  }).join("");
  const total=recipe.ingredients.length, percentage=total?enoughCount/total*100:0;
  const ratings=getRatings(); let recipeRatings=ratings[recipe.id];
  if(typeof recipeRatings==="number") recipeRatings=[recipeRatings];
  if(!Array.isArray(recipeRatings)) recipeRatings=[];
  const average=getAverageRating(recipeRatings), ratingCount=recipeRatings.length;
  const ratingSummary=ratingCount?`${average.toFixed(1)}/5 · ${ratingCount} vurdering${ratingCount===1?"":"er"}`:"Ingen vurderinger endnu";
  const history=getRecipeHistory(), timesMade=history[recipe.id]?.timesMade||0;
  recipeDetail.innerHTML=`
    <p class="recipe-category">${escapeHtml(recipe.category)}</p><h1>${escapeHtml(recipe.name)}</h1>
    <p class="recipe-description">${escapeHtml(recipe.description)}</p>
    <div class="recipe-match"><div><strong>${enoughCount} AF ${total}</strong><span>ingredienser har du nok af</span></div><div class="match-bar"><div class="match-progress" style="width:${percentage}%"></div></div></div>
    <div class="recipe-meta">
      <div class="recipe-meta-item"><span>Tid</span><strong>${escapeHtml(recipe.time)}</strong></div>
      <div class="recipe-meta-item"><span>Sværhedsgrad</span><strong>${escapeHtml(recipe.difficulty)}</strong></div>
      <div class="recipe-meta-item"><span>Vurdering</span><strong id="ratingMeta">${escapeHtml(ratingSummary)}</strong></div>
    </div>
    <div class="recipe-body">
      <div><h2>Ingredienser</h2><ul class="ingredients">${ingredientList}</ul>
        <div class="recipe-actions"><button id="makeRecipeButton" class="make-recipe-button" type="button">Lav opskriften</button><button id="rateRecipeButton" class="rate-recipe-button" type="button">Vurder opskrift</button></div>
        <div id="recipeConfirmation" class="recipe-confirmation hidden"><p class="recipe-confirmation-label">ER DU SIKKER?</p><h3>Lav ${escapeHtml(recipe.name)}?</h3><p>De ingredienser, du har i dit skab, bliver trukket fra dine beholdninger.</p>
          <div class="confirmation-buttons"><button id="confirmRecipeButton" class="confirm-button" type="button">Ja, lav opskriften</button><button id="cancelRecipeButton" class="cancel-button" type="button">Annuller</button></div></div>
        <div id="recipeRating" class="recipe-rating hidden"><p class="recipe-rating-label">DIN VURDERING</p><h3>Hvordan var opskriften?</h3>
          <div class="rating-stars">${[1,2,3,4,5].map(value=>`<button class="rating-star" data-rating="${value}" type="button" aria-label="${value} stjerner">★</button>`).join("")}</div>
          <button id="saveRatingButton" class="save-rating-button" type="button">Gem vurdering</button><div id="ratingSavedMessage" class="rating-saved-message"></div></div>
        <div id="recipeMadeMessage" class="recipe-made-message ${wasMade?"":"hidden"}"><strong>${escapeHtml(recipe.name)} er lavet.</strong><span>De ingredienser, du havde, er trukket fra dit skab.</span></div>
        <div class="recipe-history-info"><span>OPSKRIFTSHISTORIK</span><strong>${timesMade===1?"Lavet 1 gang":`Lavet ${timesMade} gange`}</strong></div>
      </div>
      <div><h2>Sådan gør du</h2><ol class="steps">${recipe.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join("")}</ol></div>
    </div>`;
  const makeButton=document.getElementById("makeRecipeButton"), confirmation=document.getElementById("recipeConfirmation");
  makeButton.addEventListener("click",()=>{confirmation.classList.remove("hidden");makeButton.style.display="none";});
  document.getElementById("cancelRecipeButton").addEventListener("click",()=>{confirmation.classList.add("hidden");makeButton.style.display="";});
  document.getElementById("confirmRecipeButton").addEventListener("click",()=>makeRecipe(recipe));
  document.getElementById("rateRecipeButton").addEventListener("click",()=>document.getElementById("recipeRating").classList.toggle("hidden"));
  let selectedRating=0;
  const stars=[...document.querySelectorAll(".rating-star")];
  stars.forEach(star=>star.addEventListener("click",()=>{
    selectedRating=Number(star.dataset.rating);
    stars.forEach(item=>item.classList.toggle("selected",Number(item.dataset.rating)<=selectedRating));
  }));
  document.getElementById("saveRatingButton").addEventListener("click",()=>{
    const message=document.getElementById("ratingSavedMessage");
    if(!selectedRating){message.textContent="Vælg en vurdering først.";return;}
    const saved=saveRating(recipe.id,selectedRating), newAverage=getAverageRating(saved);
    message.textContent=`Din vurdering er gemt · Gennemsnit: ${newAverage.toFixed(1)}/5 (${saved.length} vurdering${saved.length===1?"":"er"})`;
    document.getElementById("ratingMeta").textContent=`${newAverage.toFixed(1)}/5 · ${saved.length} vurdering${saved.length===1?"":"er"}`;
    selectedRating=0; stars.forEach(item=>item.classList.remove("selected"));
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  if(document.getElementById("recipeList")) {
    initRecipeForm();
    addIngredientInput(); addStepInput();
    renderRecipeList();
    document.getElementById("recipeSearch").addEventListener("input",renderRecipeList);
    document.getElementById("categoryFilter").addEventListener("change",renderRecipeList);
  }
  const detail=document.getElementById("recipeDetail");
  if(detail) {
    const id=new URLSearchParams(window.location.search).get("id");
    const recipe=getAllRecipes().find(item=>item.id===id);
    if(recipe) showRecipe(recipe);
    else detail.innerHTML='<p class="recipe-not-found">Opskriften blev ikke fundet.</p>';
  }
});
