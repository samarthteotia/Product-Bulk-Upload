const express = require("express");
const app = express();
const fs = require('fs');
const csv = require('fast-csv');
const inputFile = "input.csv"
const outputFile = 'output.csv';

app.use(express.json());


  const rows = [];
  fs.createReadStream(inputFile)
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    
    // Parse the nested JSON in the 'tactic' column
    const tactic = JSON.parse(row?.tactic);
    const sub_tactics=JSON.parse(row?.sub_tactics);
    const countries=JSON.parse(row?.countries)
    const campaign_briefs=JSON.parse(row?.campaign_briefs)
    const publications=JSON.parse(row?.publications)
    const languages=JSON.parse(row?.languages)
    const radio_stations=JSON.parse(row?.radio_stations)
    const categories=JSON.parse(row?.categories)
    const cart_items=JSON.parse(row?.cart_items)
    const regions=JSON.parse(row?.regions)
    const product_image=JSON.parse(row?.product_image)

    // Set 'createdAt' and 'updatedAt' to null in the nested JSON

    
    const tacticId = tactic.id ? parseInt(tactic.id, 10) : null;
    const subTacticsIds = sub_tactics.map((subTactic) => subTactic.id);
    const  countriesid= countries.map((subTactic) => subTactic.id);
    const pubid=publications.map((subTactic) => subTactic.id);
    const cartid=cart_items.map((subTactic) => subTactic.id);
    const categoriesid=categories.map((subTactic) => subTactic.id);
    const regid=regions.map((subTactic) => subTactic.id);
    const radioid=radio_stations.map((subTactic) => subTactic.id);
    const langid=languages.map((subTactic) => subTactic.id);
    const campid=campaign_briefs.map((subTactic) => subTactic.id);
    // Update the 'tactic' column with the numeric value
    row.tactic = tacticId;
    row.sub_tactics=subTacticsIds;
    row.countries=countriesid
    row.categories=categoriesid;
    row.radio_stations=radioid;
    row.campaign_briefs=campid;
    row.languages=langid;
    row.regions=regid;
    row.cart_items=cartid;
    row.publications=pubid;


    row.updatedAt=null;
    row.order= 0;
    row.quantity=0;
    if(row.price==null){
      row.price=0;
    }
    
    
  
   
 
    if (product_image?.updatedAt) {
product_image.updatedAt = null;
    }
    if (product_image?.createdAt) {
      product_image.createdAtAt = null;
          }
 
    
  

    // Update the 'tactic' column in the row
   
   
    
    // Add the updated row to the array
    rows.push(row);
  })
  .on('end', () => {
    // Write the updated data to a new CSV file
    csv.writeToPath(outputFile, rows, { headers: true })
      .on('finish', () => console.log('CSV file updated successfully'));
  });

app.listen("8000", () => {
  console.log("Backend is running..");
});

