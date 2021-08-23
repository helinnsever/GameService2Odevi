import {DataError2}  from "../models/dataError2.js" 
import { games } from "../models/game2.js" 



export default class GameServices2 {

    constructor() {

        this.strategies = [];
        this.arcades = [];
        this.errors = [];


    }

    load() {

        for (let game of games) {
            

            switch (game.type) {
                case "Strategy":
                    if (this.validateIfOnlyONe(game) && this.validateGameFields(game)) {
                        
                            this.strategies.push(game)

                        
                    }
                    break;

                case "Arcade":
                    if (this.validateIfOnlyONe(game) && this.validateGameFields(game)) {
                        
                            this.arcades.push(game)

                        
                    }
                    
                    break;
            
                default:
                    if(this.validateGameFields(game)){
                        this.errors.push(new DataError2({message : "Invalid data..", data :game}))
                    }
                    

              
                    break;

            }





        }


    }


    validateGameFields(game) {

        let requiredFields = ["id", "name", "unitPrice", "type"];
        let hasErrors = false;

        for (let field of requiredFields) {
            if (!game[field]) {

                this.errors.push(new DataError2("gecersiz alan: " + field, game))

                hasErrors = true;
            }
        }

        return !hasErrors;
    }

    validateIfOnlyONe(game) {



        let hasErrors = false;
        

        
            for (let i = 0; i < games.length; i++) {
                if (game.name == games[i].name && games.indexOf(game) != i) {
                     this.errors.push(new DataError2("iki kere aynı isimli oyun kaydedilemez :" , games[i].name ))
                     games.splice(i,1)
                     hasErrors = true
                     if(game.type==="Strategy"){
                         this.strategies.push(game)
                     }

                     else if(game.type==="Arcade"){
                        this.arcades.push(game)
                    }
                    
                    
                }
            }

            

        
        return !hasErrors;

    }

    




}



